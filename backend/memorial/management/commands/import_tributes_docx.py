from __future__ import annotations

import re
import zipfile
from dataclasses import dataclass
from html import unescape
from pathlib import Path
from xml.etree import ElementTree

from django.core.management.base import BaseCommand, CommandError

from memorial.models import MemorialProfile, Tribute


MOJIBAKE_REPLACEMENTS = {
    "Â ": " ",
    "â€™": "’",
    "â€œ": "“",
    "â€": "”",
    "â€”": "—",
    "â€“": "–",
    "â€¦": "…",
    "ðŸ˜‡": "😇",
    "VÃ‰RY": "VERY",
}

SPECIAL_AUTHOR_LINES = {
    "The Oguntoyinbo",
    "Cornerstone Independent High School",
    "New Life Independent Noble Academy Family",
    "The Asuquo family",
    "The Awodele’s",
    "The Awodele's",
}

EMBEDDED_AUTHOR_MARKERS = [
    "Prof. Olubunmi A. Fadipe -Joseph(for Kwara TOM)",
    "New Life Independent Noble Academy Family",
]

AUTHOR_LINE_CUES = (
    "(",
    "[",
    "wife",
    "son",
    "daughter",
    "brother",
    "sister",
    "nephew",
    "niece",
    "in-law",
    "church",
    "friend",
    "relative",
    "deacon",
    "pastor",
    "minister",
    "prophet",
    "evangelist",
    "napps",
    "school",
    "academy",
    "cem",
    "tom",
    "family",
)

FAMILY_KEYWORDS = (
    "wife",
    "husband",
    "son",
    "daughter",
    "brother",
    "sister",
    "in-law",
    "father-in-law",
    "mother-in-law",
    "nephew",
    "niece",
    "uncle",
    "aunty",
    "family",
)

RELATIVE_KEYWORDS = ("relative",)

CHURCH_KEYWORDS = (
    "church",
    "deacon",
    "pastor",
    "minister",
    "prophet",
    "evangel",
    "lord",
    "rhema",
    "foundation class",
    "membership class",
    "vineyard",
    "daughter in the lord",
    "board of hod",
    "yoruba hq",
)

INSTITUTION_KEYWORDS = (
    "school",
    "academy",
    "cem",
    "tom",
    "napps",
    "institution",
    "high school",
)

FRIEND_KEYWORDS = (
    "friend",
    "co-worker",
    "coworker",
    "colleague",
    "classmate",
)

COMMUNITY_KEYWORDS = (
    "community",
    "neighbourhood",
    "neighborhood",
)


@dataclass
class TributeRecord:
    name: str
    relationship: str
    message: str
    section: str


def clean_text(value: str) -> str:
    cleaned = unescape(value)
    for source, target in MOJIBAKE_REPLACEMENTS.items():
        cleaned = cleaned.replace(source, target)
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned.strip()


def extract_docx_paragraphs(docx_path: Path) -> list[str]:
    with zipfile.ZipFile(docx_path) as archive:
        xml = archive.read("word/document.xml").decode("utf-8")

    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    root = ElementTree.fromstring(xml)
    paragraphs: list[str] = []

    for paragraph_node in root.findall(".//w:body/w:p", namespace):
        text_fragments = [node.text or "" for node in paragraph_node.findall(".//w:t", namespace)]
        paragraph = clean_text("".join(text_fragments))
        if paragraph:
            paragraphs.append(paragraph)

    normalized: list[str] = []
    for paragraph in paragraphs:
        split_happened = False
        for marker in EMBEDDED_AUTHOR_MARKERS:
            if marker in paragraph and paragraph != marker:
                leading, trailing = paragraph.rsplit(marker, 1)
                leading = clean_text(leading)
                if leading:
                    normalized.append(leading)
                normalized.append(marker)
                trailing = clean_text(trailing)
                if trailing:
                    normalized.append(trailing)
                split_happened = True
                break
        if not split_happened:
            normalized.append(paragraph)

    return normalized


def is_probable_author_line(text: str) -> bool:
    candidate = text.strip()
    lower_candidate = candidate.lower()

    if candidate in SPECIAL_AUTHOR_LINES:
        return True

    if len(candidate) > 140:
        return False

    if candidate.endswith(("!", "?", "…")):
        return False

    if any(
        lower_candidate.startswith(prefix)
        for prefix in ("rest gently", "deacon gbenga", "the journey that started", "o daro oo")
    ):
        return False

    if candidate.lower().startswith(("with deep sorrow", "tribute to", "it is with deep sorrow")):
        return False

    if candidate.startswith("The ") and len(candidate.split()) <= 5:
        return True

    if len(candidate.split()) <= 10 and any(cue in lower_candidate for cue in AUTHOR_LINE_CUES):
        return True

    words = [word.strip(".,()[]") for word in candidate.split() if word.strip(".,()[]")]
    title_like = words and all(re.fullmatch(r"(?:[A-Z][A-Za-z0-9'’&.\-]*|[A-Z]{2,})", word) for word in words)
    if title_like and 1 <= len(words) <= 6:
        return True

    return False


def parse_author_line(author_line: str, message: str) -> tuple[str, str, str]:
    cleaned_line = author_line.strip().rstrip(".")

    if " - " in cleaned_line and "(" not in cleaned_line:
        name, relationship = [part.strip() for part in cleaned_line.split(" - ", 1)]
        relationship = relationship.title()
        return name, relationship, classify_section(relationship, name, message)

    match = re.match(r"^(?P<name>.+?)\s*\((?P<relationship>[^)]*)\)(?:\s*-\s*(?P<suffix>.+))?$", cleaned_line)
    if match:
        name = match.group("name").strip(" .")
        relationship = match.group("relationship").replace("[", "").replace("]", "").strip()
        relationship = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", relationship)
        if not relationship:
            relationship = infer_relationship(name, message, Tribute.SECTION_COMMUNITY)
        return name, relationship, classify_section(relationship, name, message)

    if "[" in cleaned_line and "]" in cleaned_line:
        bracket_match = re.search(r"\[(?P<name>[^\]]+)\]", cleaned_line)
        if bracket_match:
            name = bracket_match.group("name").strip()
            prefix = cleaned_line[: bracket_match.start()].strip(" ,.-")
            relationship = prefix.split()[-1] if prefix else "Family"
            return name, relationship, classify_section(relationship, name, message)

    section = classify_section("", cleaned_line, message)
    relationship = infer_relationship(cleaned_line, message, section)
    return cleaned_line, relationship, section


def infer_relationship(name: str, message: str, section: str) -> str:
    lower_name = name.lower()
    lower_message = message.lower()

    if "family" in lower_name:
        return "Family Tribute"
    if any(keyword in lower_name for keyword in ("school", "academy", "napps", "cem", "tom")):
        return "Institution"
    if section == Tribute.SECTION_FAMILY:
        return "Family"
    if section == Tribute.SECTION_RELATIVE:
        return "Relative"
    if section == Tribute.SECTION_CHURCH:
        return "Church Member"
    if section == Tribute.SECTION_FRIEND:
        return "Friend"
    if section == Tribute.SECTION_INSTITUTION:
        return "Institution"
    if "neighbourhood" in lower_message or "neighborhood" in lower_message:
        return "Neighbourhood"
    return "Community Tribute"


def classify_section(relationship: str, name: str, message: str) -> str:
    relationship_name_haystack = f"{relationship} {name}".lower()
    message_haystack = message.lower()

    if any(keyword in relationship_name_haystack for keyword in RELATIVE_KEYWORDS):
        return Tribute.SECTION_RELATIVE
    if any(keyword in relationship_name_haystack for keyword in FAMILY_KEYWORDS):
        return Tribute.SECTION_FAMILY
    if any(keyword in relationship_name_haystack for keyword in CHURCH_KEYWORDS):
        return Tribute.SECTION_CHURCH
    if any(keyword in relationship_name_haystack for keyword in INSTITUTION_KEYWORDS):
        return Tribute.SECTION_INSTITUTION
    if any(keyword in relationship_name_haystack for keyword in FRIEND_KEYWORDS):
        return Tribute.SECTION_FRIEND
    if any(keyword in relationship_name_haystack for keyword in COMMUNITY_KEYWORDS):
        return Tribute.SECTION_COMMUNITY

    if any(keyword in message_haystack for keyword in CHURCH_KEYWORDS):
        return Tribute.SECTION_CHURCH
    if any(keyword in message_haystack for keyword in INSTITUTION_KEYWORDS):
        return Tribute.SECTION_INSTITUTION
    if any(keyword in message_haystack for keyword in FAMILY_KEYWORDS):
        return Tribute.SECTION_FAMILY
    if any(keyword in message_haystack for keyword in FRIEND_KEYWORDS):
        return Tribute.SECTION_FRIEND
    if any(keyword in message_haystack for keyword in COMMUNITY_KEYWORDS):
        return Tribute.SECTION_COMMUNITY

    if name.lower().startswith("the "):
        return Tribute.SECTION_COMMUNITY
    return Tribute.SECTION_FRIEND


def parse_tributes(docx_path: Path) -> list[TributeRecord]:
    paragraphs = extract_docx_paragraphs(docx_path)
    records: list[TributeRecord] = []
    current_message_parts: list[str] = []

    for paragraph in paragraphs:
        if is_probable_author_line(paragraph):
            message = "\n\n".join(current_message_parts).strip()
            if message:
                name, relationship, section = parse_author_line(paragraph, message)
                records.append(
                    TributeRecord(
                        name=name,
                        relationship=relationship,
                        message=message,
                        section=section,
                    )
                )
                current_message_parts = []
            continue

        current_message_parts.append(paragraph)

    return records


class Command(BaseCommand):
    help = "Import tribute entries from a memorial DOCX file into the database."

    def add_arguments(self, parser):
        parser.add_argument("docx_path", type=str, help="Absolute or relative path to the tribute DOCX file.")
        parser.add_argument(
            "--profile-id",
            type=int,
            default=None,
            help="Optional memorial profile ID. Defaults to the first profile.",
        )
        parser.add_argument(
            "--replace",
            action="store_true",
            help="Delete existing tributes for the selected profile before importing.",
        )

    def handle(self, *args, **options):
        docx_path = Path(options["docx_path"]).expanduser()
        if not docx_path.exists():
            raise CommandError(f"File not found: {docx_path}")

        profile_id = options["profile_id"]
        profile = MemorialProfile.objects.filter(id=profile_id).first() if profile_id else MemorialProfile.objects.first()
        if profile is None:
            raise CommandError("No memorial profile exists yet. Create or seed a memorial profile first.")

        records = parse_tributes(docx_path)
        if not records:
            raise CommandError("No tribute entries could be parsed from the provided DOCX file.")

        if options["replace"]:
            Tribute.objects.filter(profile=profile).delete()

        tribute_objects = [
            Tribute(
                profile=profile,
                section=record.section,
                name=record.name[:120],
                relationship=record.relationship[:120],
                message=record.message,
                order=index,
                is_approved=True,
            )
            for index, record in enumerate(records, start=1)
        ]

        Tribute.objects.bulk_create(tribute_objects)

        self.stdout.write(
            self.style.SUCCESS(
                f"Imported {len(tribute_objects)} tributes into memorial profile '{profile.full_name}'."
            )
        )

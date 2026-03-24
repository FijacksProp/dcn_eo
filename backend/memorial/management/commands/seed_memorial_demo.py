from datetime import date, datetime

from django.core.management.base import BaseCommand
from django.utils import timezone

from memorial.models import (
    BiographySection,
    FamilyMessage,
    GalleryImage,
    LegacyValue,
    MemorialProfile,
    ServiceEvent,
    Tribute,
)


class Command(BaseCommand):
    help = "Seed or refresh the database with demo memorial content."

    def handle(self, *args, **options):
        profile, _created = MemorialProfile.objects.update_or_create(
            full_name="Dcn. Olugbenga Eyitayo Olugbemi",
            defaults={
                "honorific": "Dcn.",
                "birth_date": date(1970, 6, 4),
                "death_date": date(2026, 3, 14),
                "hero_title": "A faithful life lived in service, conviction, and quiet strength",
                "hero_quote": "Forever in our hearts",
                "hero_summary": (
                    "Dcn. Eyitayo Olugbenga Olugbemi lived a life shaped by faith, education, "
                    "agricultural service, evangelism, and devotion to family. His impact was "
                    "felt not only in the work he did, but in the encouragement, discipline, and "
                    "compassion he carried into the lives of others."
                ),
                "footer_note": "The Olugbemi Family",
                "portrait_image_url": (
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663398889538/"
                    "nWuFVxyg3TzwFtsbnznaQm/5897848971068116109_527ec747.jpg"
                ),
                "background_audio_url": "/api/audio/background/",
            },
        )

        BiographySection.objects.filter(profile=profile).delete()
        ServiceEvent.objects.filter(profile=profile).delete()
        LegacyValue.objects.filter(profile=profile).delete()
        GalleryImage.objects.filter(profile=profile).delete()
        Tribute.objects.filter(profile=profile).delete()
        FamilyMessage.objects.filter(profile=profile).delete()

        BiographySection.objects.bulk_create(
            [
                BiographySection(
                    profile=profile,
                    order=1,
                    title="Early Life & Formation",
                    body=(
                        "Dcn. Eyitayo Olugbenga Olugbemi was born on the 4th of June, 1970, in "
                        "Iyah-Gbede, Ijumu Local Government Area of Kogi State, Nigeria. He grew up "
                        "with strong values that shaped him into a disciplined, humble, and "
                        "compassionate man who touched many lives."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=2,
                    title="Educational Journey",
                    body=(
                        "He began his educational journey at Iyah-Gbede LSMB Primary School and later "
                        "attended Ilorin Teacher's College. His passion for learning and self-development "
                        "led him to Kwara State College of Education, where he obtained his NCE, and "
                        "subsequently to the University of Ado-Ekiti, where he earned a Bachelor in "
                        "Agric Extension and a Master's degree in Environmental Studies."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=3,
                    title="Teaching, Agriculture & Professional Service",
                    body=(
                        "Dcn. Olugbenga started his teaching profession at Trinity Nursery and Primary "
                        "School and Chapel Nursery and Primary School, where he impacted young lives "
                        "with knowledge and good character. He later served as an Extension Officer "
                        "with the Kogi State Agricultural Development Project, where he was deeply "
                        "committed to helping farmers improve their productivity and livelihoods. He "
                        "also worked with the FADAMA III Project as an Extension Agent, providing "
                        "guidance and support to farmers. In addition, he rendered advisory and "
                        "consultancy services in agriculture, particularly in rice production. He was "
                        "also the proprietor of New Life Independent Noble Academy, Laduba, where he "
                        "contributed to the development of education at the grassroots level."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=4,
                    title="Character, Counsel & Outlook on Life",
                    body=(
                        "Known for his selfless nature, Dcn. Olugbenga was always ready to help. He "
                        "believed strongly that every problem has a solution, and he lived this belief "
                        "daily by supporting, mentoring, and uplifting people around him. He was a man "
                        "who led by example, a generous giver, and a comforting presence to many. His "
                        "popular saying, 'Ko si nkan to le to o ni ro,' reflected his resilient and "
                        "positive outlook on life."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=5,
                    title="Spiritual Life & Christian Service",
                    body=(
                        "Spiritually, he was a devoted and committed Christian. He served faithfully "
                        "as a Deacon and was very active in church activities. He was an evangelist at "
                        "heart, an intercessor, and a dedicated member of the transportation department. "
                        "His passion for spreading the Gospel was evident in his life, and he also "
                        "served as the Kwara State Secretary and Patron of CEM. His life was a testimony "
                        "of service to God and humanity."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=6,
                    title="Family Life",
                    body=(
                        "Dcn. Olugbenga was a pillar of his family - a loving husband to his wife, "
                        "Victoria Titilayo Olugbemi, a devoted father to his four children: Emmanuel, "
                        "Joshua, Gideon, and Daniel, and a caring brother, uncle, and son. He played "
                        "his roles with dedication, love, and responsibility."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=7,
                    title="Leisure, Final Moments & Transition",
                    body=(
                        "In his leisure time, he enjoyed farming, reading, and evangelism - activities "
                        "that aligned with his passion for growth, both physical and spiritual.\n\n"
                        "On the 14th of March, 2026, after engaging in one of his old hobbies - playing "
                        "football - and in a moment of joy, he peacefully transitioned to glory. One of "
                        "his last words, 'Evangelism, the only department from heaven,' reflects the "
                        "depth of his passion and calling."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=8,
                    title="Legacy & Rest",
                    body=(
                        "Though his departure leaves a deep void, his legacy of faith, service, love, "
                        "and impact will continue to live on in the hearts of all who knew him.\n\n"
                        "May his gentle soul rest in perfect peace."
                    ),
                ),
            ]
        )

        ServiceEvent.objects.bulk_create(
            [
                ServiceEvent(
                    profile=profile,
                    order=1,
                    title="Wake Keep",
                    event_type="wake",
                    start_at=timezone.make_aware(datetime(2026, 3, 18, 16, 0, 0)),
                    venue_name="Rhema Chapel Stadium Church",
                    venue_address="Ilorin, Nigeria",
                    description="A time of fellowship, prayer, and celebration of his life.",
                ),
                ServiceEvent(
                    profile=profile,
                    order=2,
                    title="Burial Service",
                    event_type="burial",
                    start_at=timezone.make_aware(datetime(2026, 3, 19, 10, 0, 0)),
                    venue_name="Iyah-Gbede",
                    venue_address="Ijumu Local Council\nKogi State, Nigeria",
                    description="A Christian burial service for family, friends, and loved ones.",
                ),
            ]
        )

        LegacyValue.objects.bulk_create(
            [
                LegacyValue(
                    profile=profile,
                    order=1,
                    title="Faith",
                    icon_name="Heart",
                    description=(
                        "Faith was not just a part of his life; it was the ground on which he stood. "
                        "Dcn. Olugbenga loved God sincerely, served as a devoted Deacon, remained "
                        "steadfast in evangelism, and carried spiritual responsibility with quiet "
                        "conviction. He was known as an intercessor, a dependable worker in church, "
                        "and a man who spoke about heaven with confidence even in his final moments. "
                        "Whether in prayer meetings, foundation classes, transportation service, or "
                        "personal conversations, his life consistently pointed people back to Christ. "
                        "His faith was active, disciplined, and visible, and it continues to testify "
                        "that he truly lived for God."
                    ),
                ),
                LegacyValue(
                    profile=profile,
                    order=2,
                    title="Service",
                    icon_name="Users",
                    description=(
                        "He served with remarkable willingness across every sphere entrusted to him. "
                        "In education, he shaped young lives with knowledge and discipline. In "
                        "agriculture, he laboured to help farmers improve their productivity and "
                        "livelihoods. In church, he took responsibility seriously and gave himself to "
                        "the work without seeking recognition. In the family, he was present, reliable, "
                        "and sacrificial. His service was never noisy, but it was constant. He showed "
                        "up, took responsibility, and gave his strength wherever he was needed. That "
                        "pattern of faithful, practical service is one of the clearest marks he left "
                        "behind."
                    ),
                ),
                LegacyValue(
                    profile=profile,
                    order=3,
                    title="Helping Others",
                    icon_name="BookOpen",
                    description=(
                        "He was known as a sincere, humble, and generous man whose instinct was always "
                        "to help. He supported people with counsel, encouragement, prayer, and practical "
                        "assistance. He was the kind of person others could call at difficult moments, "
                        "because they knew he would respond with calmness and compassion. His home, his "
                        "time, and his strength were open to others. He believed deeply that every "
                        "problem has a solution, and he lived that conviction by standing with people "
                        "until they found stability, hope, or direction. His generosity was not merely "
                        "material; it was emotional, spiritual, and deeply human."
                    ),
                ),
                LegacyValue(
                    profile=profile,
                    order=4,
                    title="Mentorship",
                    icon_name="Lightbulb",
                    description=(
                        "He invested deliberately in the growth of those around him, especially his "
                        "children, younger people, church members, and those under his professional "
                        "influence. He taught by words, by correction, by example, and by consistency. "
                        "He wanted people to become better, wiser, and stronger, and he poured himself "
                        "into that process through guidance, accountability, and encouragement. As a "
                        "father, he laboured for the future of his children. As a teacher and community "
                        "builder, he nurtured minds and character. As a man of counsel, he left lessons "
                        "that will continue to shape lives long after his passing."
                    ),
                ),
            ]
        )

        FamilyMessage.objects.create(
            profile=profile,
            title="A Message from the Family",
            body=(
                "With hearts that are still tender from this painful loss, we write to express our "
                "deepest gratitude to everyone who has stood with us in the passing of our beloved "
                "husband, father, brother, son, and friend, Dcn. Olugbenga Eyitayo Olugbemi. The "
                "weight of his absence is one that words cannot fully carry, because he was not just "
                "a member of this family, he was a pillar within it. He loved deeply, gave generously, "
                "prayed fervently, and carried his responsibilities with sincerity, humility, and strength."
                "\n\n"
                "In these difficult days, your prayers, calls, visits, tributes, messages, and every "
                "act of support have reminded us that his life truly reached far beyond our home. We "
                "have been comforted by the many testimonies of lives he touched through faith, service, "
                "counsel, kindness, and practical help. To hear how he encouraged others, stood by them, "
                "and reflected Christ in ordinary moments has been both emotional and deeply strengthening "
                "for us."
                "\n\n"
                "We remember him as a loving husband, a devoted father, a dependable brother, a faithful "
                "servant of God, and a man whose presence brought reassurance. He believed in doing good, "
                "in helping others, in working hard, and in pointing people toward hope. He was sincere, "
                "humble, peace-loving, and generous, and those qualities defined the way he lived among us. "
                "Though we grieve, we are grateful for the gift of his life and for the legacy he has left "
                "behind in our hearts, in our home, and in the lives of so many people."
                "\n\n"
                "Please accept our heartfelt appreciation for mourning with us, praying with us, and "
                "honouring his memory with such love. Your support has helped carry us through moments "
                "that would have been much harder to bear alone. We pray that the Lord who comforts all "
                "hearts will bless you richly, uphold you, and remember your kindness. May the memory of "
                "our beloved Dcn. Olugbenga continue to inspire faith, service, generosity, and love in "
                "all who knew him."
            ),
            signature="The Olugbemi Family",
        )

        GalleryImage.objects.bulk_create(
            [
                GalleryImage(
                    profile=profile,
                    order=1,
                    title="Family Gathering",
                    alt_text="Family gathering",
                    category="family",
                    image_url="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop",
                    caption="A cherished family moment.",
                ),
                GalleryImage(
                    profile=profile,
                    order=2,
                    title="Church Service",
                    alt_text="Church service",
                    category="church",
                    image_url="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop",
                    caption="Serving faithfully in the church community.",
                ),
            ]
        )

        Tribute.objects.bulk_create(
            [
                Tribute(
                    profile=profile,
                    name="Adekunle Adeyemi",
                    relationship="Colleague & Friend",
                    message="Olugbenga was more than a colleague. He was a mentor and a true friend.",
                ),
                Tribute(
                    profile=profile,
                    name="Chioma Okafor",
                    relationship="Church Member",
                    message="His dedication to the church and his unwavering faith inspired us all.",
                ),
            ]
        )

        self.stdout.write(self.style.SUCCESS("Demo memorial data synced successfully."))

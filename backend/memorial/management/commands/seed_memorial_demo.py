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
    help = "Seed the database with a memorial profile based on the current frontend content."

    def handle(self, *args, **options):
        profile, created = MemorialProfile.objects.get_or_create(
            full_name="Dcn. Olugbenga Eyitayo Olugbemi",
            defaults={
                "honorific": "Dcn.",
                "birth_date": date(1970, 6, 4),
                "death_date": date(2026, 3, 14),
                "hero_title": "A life of faith, service, and impact",
                "hero_quote": "Forever in our hearts",
                "hero_summary": (
                    "Dcn. Olugbenga Eyitayo Olugbemi was a man of unwavering faith, "
                    "boundless compassion, and tireless service whose legacy continues "
                    "to inspire family, church, and community."
                ),
                "footer_note": "The Olugbemi Family",
                "portrait_image_url": (
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663398889538/"
                    "nWuFVxyg3TzwFtsbnznaQm/5897848971068116109_527ec747.jpg"
                ),
                "background_audio_url": (
                    "https://assets.mixkit.co/active_storage/sfx/2806/2806-preview.mp3"
                ),
            },
        )

        if not created:
            self.stdout.write(self.style.WARNING("Memorial profile already exists; skipping duplicate seed."))
            return

        BiographySection.objects.bulk_create(
            [
                BiographySection(
                    profile=profile,
                    order=1,
                    title="Early Life",
                    body=(
                        "Born on June 4, 1970, in Iyah-Gbede, Ijumu Local Council, Kogi State, "
                        "Olugbenga Eyitayo Olugbemi came from a family deeply rooted in faith "
                        "and community service."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=2,
                    title="Education",
                    body=(
                        "He pursued education with dedication and excellence, believing that "
                        "learning was about character, wisdom, and service."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=3,
                    title="Career & Professional Life",
                    body=(
                        "He was respected for integrity, diligence, wisdom, and the steady "
                        "counsel he gave to others."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=4,
                    title="Spiritual Life & Faith",
                    body=(
                        "As a Deacon, he lived out his faith with consistency, conviction, "
                        "kindness, generosity, and service."
                    ),
                ),
                BiographySection(
                    profile=profile,
                    order=5,
                    title="Family Life",
                    body=(
                        "He was a devoted husband, loving father, caring grandfather, and the "
                        "steady center of a warm family home."
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
                    venue_address="Ijumu Local Council, Kogi State, Nigeria",
                    description="A Christian burial service for family, friends, and loved ones.",
                ),
            ]
        )

        LegacyValue.objects.bulk_create(
            [
                LegacyValue(profile=profile, order=1, title="Faith", icon_name="Heart", description="Faith was the foundation of everything he did."),
                LegacyValue(profile=profile, order=2, title="Service", icon_name="Users", description="He served church, family, and community with selflessness."),
                LegacyValue(profile=profile, order=3, title="Helping Others", icon_name="BookOpen", description="He was always ready to support, counsel, and encourage others."),
                LegacyValue(profile=profile, order=4, title="Mentorship", icon_name="Lightbulb", description="He invested deeply in the growth and future of others."),
            ]
        )

        FamilyMessage.objects.create(
            profile=profile,
            title="A Message from the Family",
            body=(
                "To all who have shared in our grief and supported us during this difficult time, "
                "we extend our deepest gratitude. The outpouring of love, prayers, and condolences "
                "has been a source of great comfort to our family."
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

        self.stdout.write(self.style.SUCCESS("Demo memorial data seeded successfully."))

from datetime import date, datetime

from django.test import TestCase
from django.utils import timezone

from .models import FamilyMessage, MemorialProfile, Tribute


class MemorialApiTests(TestCase):
    def setUp(self):
        self.profile = MemorialProfile.objects.create(
            full_name="Dcn. Olugbenga Eyitayo Olugbemi",
            honorific="Dcn.",
            birth_date=date(1970, 6, 4),
            death_date=date(2026, 3, 14),
            hero_title="A life of faith, service, and impact",
            hero_quote="Forever in our hearts",
            hero_summary="A man of faith and service whose legacy continues to inspire.",
            footer_note="The Olugbemi Family",
            portrait_image_url="https://example.com/portrait.jpg",
        )
        FamilyMessage.objects.create(
            profile=self.profile,
            title="A Message from the Family",
            body="We are grateful for the love and support shown to our family.",
            signature="The Olugbemi Family",
        )
        Tribute.objects.create(
            profile=self.profile,
            name="Adekunle Adeyemi",
            relationship="Colleague & Friend",
            message="A mentor and true friend.",
            is_approved=True,
        )
        Tribute.objects.create(
            profile=self.profile,
            name="Hidden Tribute",
            relationship="Draft",
            message="Should not appear in public API.",
            is_approved=False,
        )

    def test_health_endpoint(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")

    def test_memorial_endpoint_returns_profile(self):
        response = self.client.get("/api/memorial/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["full_name"], self.profile.full_name)
        self.assertEqual(payload["family_message"]["signature"], "The Olugbemi Family")
        self.assertEqual(len(payload["tributes"]), 1)

    def test_tributes_endpoint_returns_only_approved_entries(self):
        response = self.client.get("/api/tributes/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload), 1)
        self.assertEqual(payload[0]["name"], "Adekunle Adeyemi")

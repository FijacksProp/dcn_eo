from pathlib import Path

from django.conf import settings
from django.urls import reverse
from rest_framework import serializers

from .models import (
    BiographySection,
    FamilyMessage,
    GalleryImage,
    LegacyValue,
    MemorialProfile,
    ServiceEvent,
    Tribute,
)


class BiographySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiographySection
        fields = ["id", "title", "body", "order"]


class ServiceEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceEvent
        fields = [
            "id",
            "title",
            "event_type",
            "start_at",
            "venue_name",
            "venue_address",
            "description",
            "order",
        ]


class LegacyValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegacyValue
        fields = ["id", "title", "description", "icon_name", "order"]


class FamilyMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMessage
        fields = ["title", "body", "signature"]


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "title", "alt_text", "category", "image_url", "caption", "order"]


class TributeSerializer(serializers.ModelSerializer):
    section_label = serializers.CharField(source="get_section_display", read_only=True)

    class Meta:
        model = Tribute
        fields = ["id", "section", "section_label", "name", "relationship", "message", "order", "created_at"]


class MemorialProfileSerializer(serializers.ModelSerializer):
    biography_sections = BiographySectionSerializer(many=True, read_only=True)
    service_events = ServiceEventSerializer(many=True, read_only=True)
    legacy_values = LegacyValueSerializer(many=True, read_only=True)
    family_message = FamilyMessageSerializer(read_only=True)
    gallery_images = GalleryImageSerializer(many=True, read_only=True)
    tributes = serializers.SerializerMethodField()
    background_audio_url = serializers.SerializerMethodField()

    class Meta:
        model = MemorialProfile
        fields = [
            "id",
            "full_name",
            "honorific",
            "birth_date",
            "death_date",
            "hero_title",
            "hero_quote",
            "hero_summary",
            "footer_note",
            "portrait_image_url",
            "background_audio_url",
            "biography_sections",
            "service_events",
            "legacy_values",
            "family_message",
            "gallery_images",
            "tributes",
        ]

    def get_tributes(self, obj):
        tributes = obj.tributes.filter(is_approved=True)
        return TributeSerializer(tributes, many=True).data

    def get_background_audio_url(self, obj):
        request = self.context.get("request")
        data_dir = Path(settings.BASE_DIR) / "data"
        has_local_audio = data_dir.exists() and any(
            file_path.is_file() and file_path.suffix.lower() in {".mp3", ".wav", ".m4a", ".ogg"}
            for file_path in data_dir.iterdir()
        )

        if has_local_audio:
            local_audio_path = reverse("background-audio")
            if request:
                return request.build_absolute_uri(local_audio_path)
            return local_audio_path

        if not obj.background_audio_url:
            return ""

        if request and obj.background_audio_url.startswith("/"):
            return request.build_absolute_uri(obj.background_audio_url)

        return obj.background_audio_url

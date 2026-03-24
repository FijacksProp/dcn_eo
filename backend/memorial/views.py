from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404, JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MemorialProfile, Tribute
from .serializers import MemorialProfileSerializer, TributeSerializer


def background_audio_file(_request):
    data_dir = Path(settings.BASE_DIR) / "data"
    audio_files = sorted(
        file_path
        for file_path in data_dir.iterdir()
        if file_path.is_file() and file_path.suffix.lower() in {".mp3", ".wav", ".m4a", ".ogg"}
    ) if data_dir.exists() else []

    if not audio_files:
        raise Http404("No background audio file is available.")

    return FileResponse(audio_files[0].open("rb"), content_type="audio/mpeg")


def health_check(_request):
    return JsonResponse(
        {
            "status": "ok",
            "service": "memorial-api",
        }
    )


class MemorialProfileDetailView(APIView):
    def get(self, _request):
        profile = (
            MemorialProfile.objects.prefetch_related(
                "biography_sections",
                "service_events",
                "legacy_values",
                "gallery_images",
                "tributes",
            )
            .select_related("family_message")
            .order_by("id")
            .first()
        )

        if profile is None:
            return Response(
                {
                    "detail": "No memorial profile has been created yet.",
                },
                status=404,
            )

        return Response(MemorialProfileSerializer(profile, context={"request": _request}).data)


class TributeListView(generics.ListAPIView):
    serializer_class = TributeSerializer

    def get_queryset(self):
        return Tribute.objects.filter(is_approved=True).select_related("profile")

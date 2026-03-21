from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MemorialProfile, Tribute
from .serializers import MemorialProfileSerializer, TributeSerializer


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

        return Response(MemorialProfileSerializer(profile).data)


class TributeListView(generics.ListAPIView):
    serializer_class = TributeSerializer

    def get_queryset(self):
        return Tribute.objects.filter(is_approved=True).select_related("profile")

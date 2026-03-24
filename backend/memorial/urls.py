from django.urls import path

from .views import MemorialProfileDetailView, TributeListView, background_audio_file, health_check

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("audio/background/", background_audio_file, name="background-audio"),
    path("memorial/", MemorialProfileDetailView.as_view(), name="memorial-detail"),
    path("tributes/", TributeListView.as_view(), name="tribute-list"),
]

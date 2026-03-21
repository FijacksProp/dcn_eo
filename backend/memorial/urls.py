from django.urls import path

from .views import MemorialProfileDetailView, TributeListView, health_check

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("memorial/", MemorialProfileDetailView.as_view(), name="memorial-detail"),
    path("tributes/", TributeListView.as_view(), name="tribute-list"),
]

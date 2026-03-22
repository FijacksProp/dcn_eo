from django.contrib import admin

from .models import (
    BiographySection,
    FamilyMessage,
    GalleryImage,
    LegacyValue,
    MemorialProfile,
    ServiceEvent,
    Tribute,
)


class BiographySectionInline(admin.TabularInline):
    model = BiographySection
    extra = 0


class ServiceEventInline(admin.TabularInline):
    model = ServiceEvent
    extra = 0


class LegacyValueInline(admin.TabularInline):
    model = LegacyValue
    extra = 0


class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 0


class FamilyMessageInline(admin.StackedInline):
    model = FamilyMessage
    extra = 0


@admin.register(MemorialProfile)
class MemorialProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "birth_date", "death_date")
    inlines = [
        BiographySectionInline,
        ServiceEventInline,
        LegacyValueInline,
        GalleryImageInline,
        FamilyMessageInline,
    ]


@admin.register(Tribute)
class TributeAdmin(admin.ModelAdmin):
    list_display = ("name", "section", "relationship", "order", "is_approved", "created_at")
    list_filter = ("section", "is_approved", "created_at")
    list_editable = ("section", "order", "is_approved")
    search_fields = ("name", "relationship", "message")

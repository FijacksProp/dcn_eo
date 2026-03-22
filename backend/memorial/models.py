from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class MemorialProfile(TimestampedModel):
    full_name = models.CharField(max_length=255)
    honorific = models.CharField(max_length=50, blank=True)
    birth_date = models.DateField()
    death_date = models.DateField()
    hero_title = models.CharField(max_length=255)
    hero_quote = models.CharField(max_length=255, blank=True)
    hero_summary = models.TextField()
    footer_note = models.CharField(max_length=255, blank=True)
    portrait_image_url = models.URLField(blank=True)
    background_audio_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Memorial profile"
        verbose_name_plural = "Memorial profile"

    def __str__(self):
        return self.full_name


class BiographySection(TimestampedModel):
    profile = models.ForeignKey(
        MemorialProfile,
        on_delete=models.CASCADE,
        related_name="biography_sections",
    )
    title = models.CharField(max_length=120)
    body = models.TextField()
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.order}. {self.title}"


class ServiceEvent(TimestampedModel):
    EVENT_TYPE_CHOICES = [
        ("wake", "Wake"),
        ("burial", "Burial"),
        ("service", "Service"),
        ("other", "Other"),
    ]

    profile = models.ForeignKey(
        MemorialProfile,
        on_delete=models.CASCADE,
        related_name="service_events",
    )
    title = models.CharField(max_length=120)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default="other")
    start_at = models.DateTimeField()
    venue_name = models.CharField(max_length=255)
    venue_address = models.TextField()
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "start_at", "id"]

    def __str__(self):
        return self.title


class LegacyValue(TimestampedModel):
    profile = models.ForeignKey(
        MemorialProfile,
        on_delete=models.CASCADE,
        related_name="legacy_values",
    )
    title = models.CharField(max_length=120)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class FamilyMessage(TimestampedModel):
    profile = models.OneToOneField(
        MemorialProfile,
        on_delete=models.CASCADE,
        related_name="family_message",
    )
    title = models.CharField(max_length=255, default="A Message from the Family")
    body = models.TextField()
    signature = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title


class GalleryImage(TimestampedModel):
    CATEGORY_CHOICES = [
        ("family", "Family"),
        ("work", "Work"),
        ("church", "Church"),
        ("moments", "Life Moments"),
    ]

    profile = models.ForeignKey(
        MemorialProfile,
        on_delete=models.CASCADE,
        related_name="gallery_images",
    )
    title = models.CharField(max_length=120)
    alt_text = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image_url = models.URLField()
    caption = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Tribute(TimestampedModel):
    SECTION_FAMILY = "family"
    SECTION_CHURCH = "church"
    SECTION_FRIEND = "friend"
    SECTION_RELATIVE = "relative"
    SECTION_INSTITUTION = "institution"
    SECTION_COMMUNITY = "community"

    SECTION_CHOICES = [
        (SECTION_FAMILY, "Family"),
        (SECTION_CHURCH, "Church"),
        (SECTION_FRIEND, "Friends"),
        (SECTION_RELATIVE, "Relatives"),
        (SECTION_INSTITUTION, "Institutions"),
        (SECTION_COMMUNITY, "Community"),
    ]

    profile = models.ForeignKey(
        MemorialProfile,
        on_delete=models.CASCADE,
        related_name="tributes",
    )
    section = models.CharField(max_length=20, choices=SECTION_CHOICES, default=SECTION_FAMILY)
    name = models.CharField(max_length=120)
    relationship = models.CharField(max_length=120)
    message = models.TextField()
    order = models.PositiveSmallIntegerField(default=0)
    is_approved = models.BooleanField(default=True)

    class Meta:
        ordering = ["section", "order", "name", "id"]

    def __str__(self):
        return f"{self.name} ({self.relationship})"

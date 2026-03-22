export interface BiographySection {
  id: number;
  title: string;
  body: string;
  order: number;
}

export interface ServiceEvent {
  id: number;
  title: string;
  event_type: "wake" | "burial" | "service" | "other";
  start_at: string;
  venue_name: string;
  venue_address: string;
  description: string;
  order: number;
}

export interface LegacyValue {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
}

export interface FamilyMessage {
  title: string;
  body: string;
  signature: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  alt_text: string;
  category: "family" | "work" | "church" | "moments";
  image_url: string;
  caption: string;
  order: number;
}

export interface Tribute {
  id: number;
  section: "family" | "church" | "friend" | "relative" | "institution" | "community";
  section_label: string;
  name: string;
  relationship: string;
  message: string;
  order: number;
  created_at: string;
}

export interface MemorialProfile {
  id: number;
  full_name: string;
  honorific: string;
  birth_date: string;
  death_date: string;
  hero_title: string;
  hero_quote: string;
  hero_summary: string;
  footer_note: string;
  portrait_image_url: string;
  background_audio_url: string;
  biography_sections: BiographySection[];
  service_events: ServiceEvent[];
  legacy_values: LegacyValue[];
  family_message: FamilyMessage | null;
  gallery_images: GalleryImage[];
  tributes: Tribute[];
}

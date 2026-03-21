import { useState } from "react";
import { X } from "lucide-react";

/**
 * Gallery Page - Memorial Website
 * Design: Timeless Elegance with Warm Reverence
 * 
 * Grid layout with lightbox preview
 * Categories: Family, Work, Church, Life Moments
 */

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "family" | "work" | "church" | "moments";
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop",
    alt: "Family gathering",
    category: "family",
    title: "Family Gathering",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop",
    alt: "Church service",
    category: "church",
    title: "Church Service",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    alt: "Professional setting",
    category: "work",
    title: "Professional Life",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    alt: "Life moment",
    category: "moments",
    title: "Life Moment",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop",
    alt: "Family portrait",
    category: "family",
    title: "Family Portrait",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop",
    alt: "Church gathering",
    category: "church",
    title: "Church Gathering",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory
    ? galleryImages.filter((img) => img.category === selectedCategory)
    : galleryImages;

  const categories = [
    { id: "family", label: "Family" },
    { id: "work", label: "Work" },
    { id: "church", label: "Church" },
    { id: "moments", label: "Life Moments" },
  ];

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container">
        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">
          Gallery
        </h1>
        <div className="divider-gold w-16 mb-12" />

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? "bg-accent text-accent-foreground"
                : "bg-card text-foreground border border-accent border-opacity-20 hover:border-opacity-50"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-foreground border border-accent border-opacity-20 hover:border-opacity-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg h-64 md:h-72">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-serif text-lg font-bold">{image.title}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground font-medium">
                {image.title}
              </p>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
              />

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-accent capitalize">
                  {selectedImage.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

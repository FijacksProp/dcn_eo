import PageState from "@/components/PageState";
import { useMemorialContent } from "@/contexts/MemorialContentContext";
import type { GalleryImage as GalleryImageType } from "@/types/memorial";
import { X } from "lucide-react";
import { useState } from "react";

export default function Gallery() {
  const { memorial, isLoading, error } = useMemorialContent();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImageType | null>(null);

  if (isLoading) {
    return <PageState title="Loading Gallery" message="Fetching the memorial photo collection." />;
  }

  if (error || !memorial) {
    return <PageState title="Gallery Unavailable" message={error || "Gallery content could not be loaded."} />;
  }

  const filteredImages = selectedCategory
    ? memorial.gallery_images.filter((img) => img.category === selectedCategory)
    : memorial.gallery_images;

  const categories = [
    { id: "family", label: "Family" },
    { id: "work", label: "Work" },
    { id: "church", label: "Church" },
    { id: "moments", label: "Life Moments" },
  ];

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-foreground">Gallery</h1>
        <div className="divider-gold w-16 mb-12" />

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg h-64 md:h-72">
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-serif text-lg font-bold">{image.title}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground font-medium">{image.title}</p>
            </div>
          ))}
        </div>

        {selectedImage ? (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <img
                src={selectedImage.image_url}
                alt={selectedImage.alt_text}
                className="w-full h-auto rounded-lg"
              />

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-accent capitalize">{selectedImage.category}</p>
                {selectedImage.caption ? <p className="mt-2 text-sm text-white/80">{selectedImage.caption}</p> : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

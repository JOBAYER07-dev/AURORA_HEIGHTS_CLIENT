"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const fallbackUrl = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";

  const initialImages = images && images.length > 0
    ? images.map(img => img && img !== "null" && img !== "undefined" ? img : fallbackUrl)
    : [fallbackUrl];

  const [loadedImages, setLoadedImages] = useState(initialImages);
  const [prevImages, setPrevImages] = useState(images);

  // Sync state if images prop changes
  if (images !== prevImages) {
    setPrevImages(images);
    setLoadedImages(initialImages);
  }

  const handleImageError = (index: number) => {
    if (loadedImages[index] !== fallbackUrl) {
      const updated = [...loadedImages];
      updated[index] = fallbackUrl;
      setLoadedImages(updated);
    }
  };

  const activeImage = loadedImages[activeIdx] || loadedImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-luxury-dark border border-luxury-sand/20 shadow-2xl group">
        <Image
          src={activeImage}
          alt={`${title} - Gallery Image ${activeIdx + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          onError={() => handleImageError(activeIdx)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
      </div>

      {/* Row of Thumbnails */}
      {loadedImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {loadedImages.map((img, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={`thumb-${idx}`}
                onClick={() => setActiveIdx(idx)}
                className={`relative w-20 aspect-[4/3] rounded-md overflow-hidden bg-luxury-dark border-2 transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive ? "border-gold-500 scale-[1.02] shadow-md shadow-gold-500/10" : "border-transparent hover:border-gold-500/50"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={() => handleImageError(idx)}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Property, formatPrice } from "@/lib/properties";
export type { Property };

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const fallbackUrl = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";
  const initialSrc = property.images?.[0] && property.images[0] !== "null" && property.images[0] !== "undefined"
    ? property.images[0]
    : fallbackUrl;

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [prevPropSrc, setPrevPropSrc] = useState(property.images?.[0]);

  if (property.images?.[0] !== prevPropSrc) {
    setPrevPropSrc(property.images?.[0]);
    setImgSrc(initialSrc);
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-luxury-sand/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(189,155,76,0.08)] hover:border-gold-500/20 transition-all duration-500 flex flex-col h-full">
      {/* Fixed aspect ratio Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-luxury-dark">
        <Image
          src={imgSrc}
          alt={property.title}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => {
            if (imgSrc !== fallbackUrl) {
              setImgSrc(fallbackUrl);
            }
          }}
        />
        {/* Subtle dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          {/* Location tag with indicator */}
          <div className="flex items-center gap-1.5 text-[10px] text-gold-600 font-semibold tracking-wider uppercase">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{property.location}</span>
          </div>

          {/* Title */}
          <h4 className="font-serif text-lg font-light text-luxury-charcoal group-hover:text-gold-700 transition-colors duration-300 line-clamp-1">
            {property.title}
          </h4>

          {/* Short Description */}
          <p className="text-xs text-luxury-charcoal/60 font-light leading-relaxed line-clamp-2">
            {property.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-luxury-sand/30 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-luxury-charcoal/40 font-semibold">
              Asking Price
            </span>
            <span className="font-serif text-base font-semibold text-luxury-charcoal">
              {formatPrice(property.price)}
            </span>
          </div>

          <Link
            href={`/properties/${property._id}`}
            className="px-4 py-2 border border-luxury-charcoal hover:border-gold-500 bg-transparent hover:bg-gold-500 hover:text-white text-luxury-charcoal text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 active:scale-[0.97] cursor-pointer text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import PropertyCard, { Property } from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";

const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    title: "The Malibu Sentinel",
    description: "An architectural marvel cantilevered over the Pacific coast. Includes private beach access, a glass-sided infinity pool, and custom smart-home tech.",
    price: "$18,950,000",
    location: "Malibu, California",
  },
  {
    id: "prop-2",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    title: "The Bel Air Pavilion",
    description: "A sprawling estate boasting double-height ceilings, a wine lounge, fully equipped private cinema, and views over the Los Angeles basin.",
    price: "$24,500,000",
    location: "Bel Air, California",
  },
  {
    id: "prop-3",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    title: "The Sunset Crest Villa",
    description: "A masterclass in organic architecture featuring native stone cladding, floating concrete stairs, and retractable walls of glass.",
    price: "$12,800,000",
    location: "Los Angeles, California",
  },
  {
    id: "prop-4",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    title: "The Crestview Manor",
    description: "Nestled in private woodlands with majestic views. Designed with sustainable materials, a geothermal wellness spa, and an orchard path.",
    price: "$15,200,000",
    location: "Beverly Hills, California",
  },
];

export default function PropertiesGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from a database with a 2 second delay
    const timer = setTimeout(() => {
      setProperties(MOCK_PROPERTIES);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="residences" className="py-24 bg-white border-t border-luxury-sand/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
              AVAILABLE LISTINGS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal leading-tight tracking-wide">
              Featured <span className="italic font-normal text-gold-700">Residences</span>
            </h2>
          </div>
          
          {/* Simulated Refetch / Reset button for demonstrating the skeleton load state again */}
          <button
            onClick={() => {
              setLoading(true);
              setProperties([]);
              setTimeout(() => {
                setProperties(MOCK_PROPERTIES);
                setLoading(false);
              }, 2000);
            }}
            className="flex items-center gap-2 px-5 py-2.5 border border-luxury-sand text-luxury-charcoal/80 hover:text-gold-700 hover:border-gold-500 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
            title="Reload and show skeleton animation"
          >
            <svg
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-gold-500" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M21 12v5h-5.582"
              />
            </svg>
            Re-simulate Fetch
          </button>
        </div>

        {/* 4 Cards Grid - 1 Col on Mobile, 2 Cols on Tablet, 4 Cols on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <PropertySkeleton key={`skeleton-${idx}`} />
              ))
            : properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
        </div>
      </div>
    </section>
  );
}

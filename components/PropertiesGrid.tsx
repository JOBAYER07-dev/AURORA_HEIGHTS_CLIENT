"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import { fetchProperties, Property } from "@/lib/properties";

export default function PropertiesGrid() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchProperties({
        search: "",
        propertyType: "all",
        minPrice: 0,
        maxPrice: 0,
        sortBy: "none",
      });
      // Slice to 4 featured properties for the homepage
      setProperties(response.data.slice(0, 4));
    } catch (err: any) {
      setError(err.message || "Failed to load listings from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
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
          
          <button
            onClick={loadProperties}
            className="flex items-center gap-2 px-5 py-2.5 border border-luxury-sand text-luxury-charcoal/80 hover:text-gold-700 hover:border-gold-500 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
            title="Reload listings from backend API"
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
            Reload From API
          </button>
        </div>

        {error && (
          <div className="w-full bg-red-50 border border-red-200/50 rounded-xl p-8 text-center text-red-700 text-xs font-light mb-8">
            {error}
          </div>
        )}

        {/* 4 Cards Grid - 1 Col on Mobile, 2 Cols on Tablet, 4 Cols on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <PropertySkeleton key={`skeleton-${idx}`} />
              ))
            : properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
        </div>
      </div>
    </section>
  );
}

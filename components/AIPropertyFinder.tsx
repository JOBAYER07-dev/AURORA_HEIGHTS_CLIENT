"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import { Property, formatPrice } from "@/lib/properties";

interface AIPropertyFinderProps {
  variant?: "hero" | "explore";
}

interface AIResponse {
  success: boolean;
  message: string;
  data: {
    extractedParameters: {
      location: string | null;
      maxPrice: number | null;
      category: string | null;
    };
    properties: Property[];
  };
}

export default function AIPropertyFinder({ variant = "hero" }: AIPropertyFinderProps) {
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation<AIResponse, Error, string>({
    mutationFn: async (searchPrompt: string) => {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiBase}/ai/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: searchPrompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch AI recommendations");
      }
      return data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    mutation.mutate(prompt);
  };

  const handleQuickSearch = (query: string) => {
    setPrompt(query);
    mutation.mutate(query);
  };

  const resultData = mutation.data?.data;
  const properties = resultData?.properties || [];
  const params = resultData?.extractedParameters;

  // Build the badges array based on extracted parameters
  const badges: string[] = [];
  if (params) {
    if (params.category) badges.push(`Category: ${params.category}`);
    if (params.location) badges.push(`Location: ${params.location}`);
    if (params.maxPrice) badges.push(`Max Price: ${formatPrice(params.maxPrice)}`);
  }

  const isHero = variant === "hero";

  return (
    <div className={`w-full ${isHero ? "py-16 bg-[#faf8f5] border-t border-luxury-sand/20 animate-[fadeIn_0.5s_ease-out]" : ""}`}>
      <div className={`${isHero ? "max-w-7xl mx-auto px-6 md:px-12" : ""}`}>
        
        {/* Main Search Panel */}
        <div className={`bg-white border border-luxury-sand/20 rounded-xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-500 hover:border-gold-500/10 ${isHero ? "mb-12" : "mb-8"}`}>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-gold-600 uppercase block">
                INTELLIGENT PROPERTY FINDER
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-light text-luxury-charcoal leading-tight tracking-wide mt-1">
                Search via <span className="italic font-normal text-gold-700">Natural Language AI</span>
              </h3>
              <p className="text-xs font-light text-luxury-charcoal/60 leading-relaxed max-w-xl mt-1">
                Describe your desired estate in plain sentences, and let Gemini extract your specifications to query our portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Show me villas in Malibu under $15M"
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-3 pl-10 pr-4 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all font-light"
                  disabled={mutation.isPending}
                />
                <svg
                  className="absolute left-3.5 top-3.5 w-4 h-4 text-luxury-charcoal/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                disabled={!prompt.trim() || mutation.isPending}
                className="px-8 py-3 bg-luxury-charcoal hover:bg-gold-600 disabled:bg-luxury-charcoal/40 text-white hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-sm transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {mutation.isPending && (
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {mutation.isPending ? "Analysing query..." : "Query AI Assistant"}
              </button>
            </form>

            {/* Quick Prompts */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-light text-luxury-charcoal/50">
              <span>Suggested searches:</span>
              {[
                "Villa in Malibu under $15M",
                "3 bedroom apartment near the coast",
                "Penthouse in Bel Air with private pool",
              ].map((query, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickSearch(query)}
                  className="px-2 py-1 bg-luxury-cream hover:bg-gold-50 border border-luxury-sand/30 hover:border-gold-500/30 text-gold-800 rounded-full transition-all cursor-pointer"
                  disabled={mutation.isPending}
                >
                  "{query}"
                </button>
              ))}
            </div>

            {/* Error Message Box */}
            {mutation.isError && (
              <div className="bg-red-50 border border-red-200/50 rounded-xl p-4 text-left text-red-700 text-xs font-light mt-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{mutation.error.message || "An unexpected error occurred during AI processing."}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Extracted Parameters and Results Container */}
        {mutation.isPending && (
          <div className="space-y-6">
            <div className="h-4 w-48 bg-zinc-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 4 }).map((_, idx) => (
                <PropertySkeleton key={`ai-skeleton-${idx}`} />
              ))}
            </div>
          </div>
        )}

        {!mutation.isPending && mutation.isSuccess && (
          <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            {/* Extracted Parameters Badge Row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest text-luxury-charcoal/50 uppercase">
                AI Extracted Specs:
              </span>
              {badges.length > 0 ? (
                badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gold-100/60 border border-gold-500/20 text-gold-800 text-[9px] uppercase tracking-widest font-bold rounded-sm"
                  >
                    {badge}
                  </span>
                ))
              ) : (
                <span className="text-xs font-light text-luxury-charcoal/60 italic">
                  No criteria extracted, showing all portfolio residences.
                </span>
              )}
            </div>

            {/* Results Grid */}
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="w-full bg-white border border-luxury-sand/20 rounded-xl p-16 text-center space-y-4">
                <svg className="w-12 h-12 text-gold-500/40 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-serif text-xl text-luxury-charcoal font-light">No Estates Found</h3>
                <p className="text-xs text-luxury-charcoal/50 max-w-sm mx-auto font-light leading-relaxed">
                  We could not find any properties in our portfolio matching the criteria extracted by our AI engine. Try adjusting your description.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

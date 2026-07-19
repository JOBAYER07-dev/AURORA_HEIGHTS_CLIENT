"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertySkeleton from "@/components/PropertySkeleton";
import { fetchProperties } from "@/lib/properties";

export default function ExplorePage() {
  // Search state
  const [search, setSearch] = useState("");
  
  // Filtering states
  const [propertyType, setPropertyType] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // Sorting state
  const [sortBy, setSortBy] = useState("none");

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 12;

  // Reset page to 1 on filter/search parameters modification
  useEffect(() => {
    setPage(1);
  }, [search, propertyType, minPrice, maxPrice, sortBy]);

  // TanStack Query for caching and state loading updates
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["properties", search, propertyType, minPrice, maxPrice, sortBy, page],
    queryFn: () => fetchProperties({ search, propertyType, minPrice, maxPrice, sortBy, page, limit }),
  });

  const properties = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 12, totalPages: 1 };

  const handleResetFilters = () => {
    setSearch("");
    setPropertyType("all");
    setMinPrice(0);
    setMaxPrice(0);
    setSortBy("none");
    setPage(1);
  };

  return (
    <>
      <Navbar />
      
      {/* Spacer for fixed Navbar */}
      <div className="h-[70px] bg-luxury-dark" />

      <main className="flex-1 bg-luxury-cream min-h-screen py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Block */}
          <div className="space-y-4 mb-16 text-center md:text-left">
            <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
              PORTFOLIO DISCOVERY
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-luxury-charcoal leading-tight tracking-wide">
              Explore Our <span className="italic font-normal text-gold-700">Signature Estates</span>
            </h1>
            <p className="text-xs md:text-sm font-light text-luxury-charcoal/60 leading-relaxed max-w-xl">
              Filter through award-winning architecture, sea-side duplexes, and peak cliff villas from around the globe.
            </p>
          </div>

          {/* Search, Filter & Sort Control Panel */}
          <div className="bg-white border border-luxury-sand/20 rounded-xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] mb-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              
              {/* Robust Search Input (5 Columns) */}
              <div className="md:col-span-4 space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Search Location or Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. Malibu, Bel Air..."
                    className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 pl-10 pr-4 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                  <svg
                    className="absolute left-3.5 top-3 w-4 h-4 text-luxury-charcoal/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Property Type Selector (2 Columns) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* Min Price Range (2 Columns) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Min Price
                </label>
                <select
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
                >
                  <option value="0">Any Price</option>
                  <option value="5000000">$5,000,000+</option>
                  <option value="10000000">$10,000,000+</option>
                  <option value="15000000">$15,000,000+</option>
                  <option value="20000000">$20,000,000+</option>
                </select>
              </div>

              {/* Max Price Range (2 Columns) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Max Price
                </label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
                >
                  <option value="0">Unlimited</option>
                  <option value="10000000">Up to $10,000,000</option>
                  <option value="15000000">Up to $15,000,000</option>
                  <option value="20000000">Up to $20,000,000</option>
                  <option value="25000000">Up to $25,000,000</option>
                </select>
              </div>

              {/* Sort Options (2 Columns) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Sort By Price
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
                >
                  <option value="none">No Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

            </div>

            {/* Bottom Actions Row (Filter summary & Reset trigger) */}
            <div className="pt-4 border-t border-luxury-sand/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[10px] text-luxury-charcoal/50 uppercase tracking-widest font-semibold">
                {isFetching ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3 w-3 text-gold-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating listings...
                  </span>
                ) : (
                  <span>Showing {properties.length} Matching Properties</span>
                )}
              </div>

              {(search || propertyType !== "all" || minPrice > 0 || maxPrice > 0 || sortBy !== "none") && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-700 hover:text-luxury-charcoal transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Listings Showcase Grid (4 columns on desktop, responsive) */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 8 }).map((_, idx) => (
                <PropertySkeleton key={`explore-skeleton-${idx}`} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-[fadeIn_0.5s_ease-out]">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Pagination UI */}
              {!isLoading && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-12 border-t border-luxury-sand/10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-luxury-sand text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white hover:border-luxury-charcoal disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-luxury-charcoal disabled:hover:border-luxury-sand cursor-pointer disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: meta.totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === page;
                    return (
                      <button
                        key={`page-btn-${pageNum}`}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                          isActive
                            ? "bg-gold-500 text-white shadow-md shadow-gold-500/10"
                            : "border border-luxury-sand/40 hover:border-gold-500 text-luxury-charcoal hover:text-gold-700 bg-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                    disabled={page === meta.totalPages}
                    className="px-4 py-2 border border-luxury-sand text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white hover:border-luxury-charcoal disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-luxury-charcoal disabled:hover:border-luxury-sand cursor-pointer disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full bg-white border border-luxury-sand/20 rounded-xl p-16 text-center space-y-4">
              <svg className="w-12 h-12 text-gold-500/40 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-serif text-xl text-luxury-charcoal font-light">No Estates Found</h3>
              <p className="text-xs text-luxury-charcoal/50 max-w-sm mx-auto font-light leading-relaxed">
                We could not find any properties matching your exact criteria. Try adjusting your price thresholds or clearing your search term.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-6 py-2.5 bg-luxury-charcoal hover:bg-gold-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

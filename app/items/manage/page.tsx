"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { fetchProperties, Property, formatPrice } from "@/lib/properties";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import PropertyCategoryChart from "@/components/PropertyCategoryChart";

export default function ManageItemsPage() {
  const { session, checkedAuth, isWakingUp, attempts, maxAttempts, isPending } = useAuthGuard("/items/manage");
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiBase}/properties/my-properties`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to load listings");
      }
      const propertiesList = Array.isArray(data) ? data : (data.data || []);
      setProperties(propertiesList);
    } catch (err: any) {
      setError(err.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently remove the signature estate "${title}" from the registry?`
    );
    if (!confirmDelete) return;

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiBase}/properties/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete property");
      }
      loadProperties();
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred while deleting.");
    }
  };

  useEffect(() => {
    if (session) {
      loadProperties();
    }
  }, [session]);

  if (isPending || !checkedAuth) {
    return (
      <>
        <Navbar />
        <div className="h-[70px] bg-luxury-dark" />
        <main className="flex-1 bg-luxury-cream min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="text-luxury-charcoal/80 text-sm uppercase tracking-widest font-semibold animate-pulse max-w-md leading-relaxed">
            {isWakingUp 
              ? "Waking up the server, this can take up to a minute on first load..." 
              : "Verifying Admin Access..."}
          </div>
          {isWakingUp && (
            <>
              <div className="text-luxury-charcoal/50 text-xs tracking-wider">
                Attempt {attempts} of {maxAttempts}
              </div>
              <div className="w-64 bg-luxury-sand/20 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-500 h-full transition-all duration-500 ease-out" 
                  style={{ width: `${(attempts / maxAttempts) * 100}%` }}
                />
              </div>
            </>
          )}
        </main>
        <Footer />
      </>
    );
  }

  if (!session) {
    return null; // Redirecting to login...
  }

  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-luxury-dark" />
      <main className="flex-1 bg-luxury-cream min-h-screen py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-4 text-center sm:text-left">
              <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
                ADMIN CONSOLE
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-light text-luxury-charcoal tracking-wide">
                Manage <span className="italic font-normal text-gold-700">Residences Portfolio</span>
              </h1>
              <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">
                Modify details, edit tags, or remove active listings from the public marketplace registry.
              </p>
            </div>
            
            <a
              href="/items/add"
              className="px-5 py-2.5 bg-luxury-charcoal hover:bg-gold-600 text-white hover:text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all text-center"
            >
              + Add Listing
            </a>
          </div>

          {/* Listings Table / Grid */}
          <div className="bg-white border border-luxury-sand/20 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-luxury-dark text-white border-b border-white/5 uppercase text-[9px] tracking-widest font-bold">
                    <th className="py-4 px-6">Residence</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Asking Price</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-sand/20 text-xs text-luxury-charcoal">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-8 px-6 text-center text-luxury-charcoal/50 animate-pulse text-xs tracking-widest font-semibold uppercase">
                        Loading Residences Portfolio...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="py-8 px-6 text-center text-red-600 text-xs font-light">
                        {error}
                      </td>
                    </tr>
                  ) : properties.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 px-6 text-center text-luxury-charcoal/50 text-xs font-light">
                        No signature estates found in database registry.
                      </td>
                    </tr>
                  ) : (
                    properties.map((prop) => {
                      const imageUrl = prop.images?.[0] || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";
                      const category = prop.category || "Residence";
                      const beds = prop.beds || 4;
                      const sqft = prop.sqft || 5200;
                      
                      return (
                        <tr key={prop._id} className="hover:bg-luxury-cream/30 transition-colors">
                          <td className="py-4 px-6 flex items-center gap-4 min-w-[280px]">
                            <div className="relative w-12 aspect-[4/3] rounded-sm overflow-hidden bg-luxury-dark flex-shrink-0">
                              <Image
                                src={imageUrl}
                                alt={prop.title}
                                fill
                                sizes="50px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium font-serif text-sm text-luxury-charcoal">
                                {prop.title}
                              </span>
                              <span className="text-[10px] text-luxury-charcoal/40 font-light">
                                {sqft.toLocaleString()} SQ FT | {beds} Beds
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-luxury-charcoal/70 font-light">
                            {prop.location}
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block bg-luxury-sand/30 border border-luxury-sand/40 text-[9px] font-bold uppercase tracking-wider text-gold-800 px-2 py-0.5 rounded-sm">
                              {category}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold">
                            {formatPrice(prop.price)}
                          </td>
                          <td className="py-4 px-6 text-right space-x-4 min-w-[150px]">
                            <Link
                              href={`/properties/${prop._id}`}
                              className="text-[10px] font-bold uppercase tracking-wider text-gold-700 hover:text-luxury-charcoal transition-colors cursor-pointer"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDelete(prop._id, prop.title)}
                              className="text-[10px] font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recharts analytics — listings by category */}
          {!loading && !error && properties.length > 0 && (
            <PropertyCategoryChart properties={properties} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

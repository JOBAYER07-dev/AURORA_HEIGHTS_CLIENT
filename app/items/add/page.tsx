"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth-client";

export default function AddItemPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Form input states
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Villa");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  // UI state feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Route guard: only redirect after isPending has resolved to false.
  // Using a ref ensures we never redirect on the very first render where
  // Better Auth briefly emits { isPending: false, data: null } before
  // its internal session fetch has even fired.
  const pendingSettled = useRef(false);
  useEffect(() => {
    if (isPending) {
      pendingSettled.current = false;
      return;
    }
    // isPending just became false — mark as settled
    pendingSettled.current = true;
  }, [isPending]);

  useEffect(() => {
    if (pendingSettled.current && !isPending && !session) {
      router.push("/login?redirect=/items/add");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!session?.user?.id) {
      setError("You must be logged in to create a listing.");
      return;
    }

    if (!title || !location || !price || !imageUrl || !description) {
      setError("Please fill out all fields.");
      return;
    }

    // Validate image URL hostname to match next.config.ts remotePatterns
    try {
      const parsedUrl = new URL(imageUrl);
      const allowedHostnames = [
        "images.unsplash.com",
        "example.com",
        "images.pexels.com",
        "plus.unsplash.com",
      ];
      if (!allowedHostnames.includes(parsedUrl.hostname)) {
        setError(
          `Image URL host '${parsedUrl.hostname}' is not whitelisted. Supported hosts: images.unsplash.com, images.pexels.com, plus.unsplash.com, or example.com.`
        );
        return;
      }
    } catch (e) {
      setError("Please enter a valid absolute Image URL (starting with http:// or https://).");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        description,
        price: Number(price),
        location,
        category,
        images: [imageUrl],
        user: session.user.id,
      };

      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiBase}/properties/create-property`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure session cookies are sent
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create signature listing.");
      }

      setSuccess(true);
      // Reset form fields
      setTitle("");
      setLocation("");
      setCategory("Villa");
      setPrice("");
      setImageUrl("");
      setDescription("");

      // Redirect to explore page after brief success delay
      setTimeout(() => {
        router.push("/explore");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <>
        <Navbar />
        <div className="h-[70px] bg-luxury-dark" />
        <main className="flex-1 bg-luxury-cream min-h-screen flex items-center justify-center">
          <div className="text-luxury-charcoal/50 text-xs uppercase tracking-widest font-semibold animate-pulse">
            Verifying Authorized Session...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!session) {
    return null; // Route Guard redirecting...
  }

  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-luxury-dark" />
      <main className="flex-1 bg-luxury-cream min-h-screen py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="space-y-4 mb-12">
            <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
              MANAGER CONSOLE
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-light text-luxury-charcoal tracking-wide">
              List New <span className="italic font-normal text-gold-700">Signature Estate</span>
            </h1>
            <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">
              Add a new luxury listing to the public portfolio database. All fields must be carefully specified.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
            
            {/* Feedback messages */}
            {error && (
              <div className="bg-red-50 border border-red-200/50 text-red-700 text-xs rounded-sm p-4 font-light leading-relaxed">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200/50 text-green-700 text-xs rounded-sm p-4 font-light leading-relaxed">
                Signature Estate published successfully! Redirecting to portfolio...
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Malibu Sentinel"
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Malibu, California"
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Property Type
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
                >
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Asking Price ($ USD)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 18500000"
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com..."
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                Detailed Description
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the architectural concept, materials, private amenities..."
                className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all resize-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <span className="text-[10px] text-green-600 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <span>Authorized Session Active</span>
              </span>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md shadow-gold-500/10 cursor-pointer disabled:bg-gold-500/60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  "Publish Listing"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

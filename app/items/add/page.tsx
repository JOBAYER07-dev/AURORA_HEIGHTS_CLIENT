"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AddItemPage() {
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
          <form className="bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Property Title
                </label>
                <input
                  type="text"
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
                <select className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal focus:outline-none focus:border-gold-500 transition-all">
                  <option>Villa</option>
                  <option>House</option>
                  <option>Apartment</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Asking Price ($ USD)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 18500000"
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Image URL
                </label>
                <input
                  type="text"
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
                placeholder="Describe the architectural concept, materials, private amenities..."
                className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <span className="text-[10px] text-green-600 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <span>Authorized Session Active</span>
              </span>
              <button
                type="button"
                onClick={() => alert("Mock listing created successfully!")}
                className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md shadow-gold-500/10 cursor-pointer"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

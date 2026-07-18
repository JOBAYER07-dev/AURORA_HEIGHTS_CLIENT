"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { MOCK_PROPERTIES } from "@/lib/properties";

export default function ManageItemsPage() {
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
                  {MOCK_PROPERTIES.map((prop) => (
                    <tr key={prop.id} className="hover:bg-luxury-cream/30 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-4 min-w-[280px]">
                        <div className="relative w-12 aspect-[4/3] rounded-sm overflow-hidden bg-luxury-dark flex-shrink-0">
                          <Image
                            src={prop.image}
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
                            {prop.sqft} SQ FT | {prop.beds} Beds
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-luxury-charcoal/70 font-light">
                        {prop.location}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-luxury-sand/30 border border-luxury-sand/40 text-[9px] font-bold uppercase tracking-wider text-gold-800 px-2 py-0.5 rounded-sm">
                          {prop.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold">
                        {prop.priceStr}
                      </td>
                      <td className="py-4 px-6 text-right space-x-3 min-w-[150px]">
                        <button
                          onClick={() => alert(`Edit simulated for ${prop.title}`)}
                          className="text-[10px] font-bold uppercase tracking-wider text-gold-700 hover:text-luxury-charcoal transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => alert(`Delete simulated for ${prop.title}`)}
                          className="text-[10px] font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

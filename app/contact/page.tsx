"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-luxury-dark" />
      <main className="flex-1 bg-luxury-cream min-h-screen py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Coordinates Block (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
                GET IN TOUCH
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal tracking-wide">
                Private <span className="italic font-normal text-gold-700">Inquiries</span>
              </h1>
              <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">
                Request further details on pricing, schedule a private presentation tour, or speak with an estate coordinator.
              </p>
            </div>

            <div className="bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold block">Presentation Gallery</span>
                <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                  Aurora Heights Presentation Gallery<br />
                  2800 Coronado Way, Malibu, CA
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-luxury-sand/20">
                <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold block">Direct Channels</span>
                <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                  Email: inquire@auroraheights.com<br />
                  Phone: +1 (310) 555-0190
                </p>
              </div>
            </div>
          </div>

          {/* Form Block (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
            <h2 className="font-serif text-xl font-light text-luxury-charcoal">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="bg-green-50 border border-green-200/50 text-green-700 text-xs rounded-sm p-4 font-light leading-relaxed">
                  Your message has been transmitted successfully! An estate coordinator will contact you shortly.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@vance.com"
                    className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-luxury-charcoal/50 font-bold">
                  Inquiry details
                </label>
                <textarea
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your design specifications, preferred location, target budget..."
                  className="w-full bg-luxury-cream border border-luxury-sand/40 rounded-sm py-2.5 px-3 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-luxury-charcoal hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md cursor-pointer disabled:bg-luxury-charcoal/60 flex items-center justify-center gap-2"
              >
                {loading ? "Transmitting..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  {
    src: "/images/hero-exterior.png",
    alt: "Aurora Heights Cliffside Villa Exterior",
    tagline: "ARCHITECTURAL MASTERPIECE",
    title: "Villas Above the Clouds",
    location: "Malibu Heights, California",
  },
  {
    src: "/images/hero-interior.png",
    alt: "Aurora Heights Luxury Interior Design",
    tagline: "REFINED MINIMALISM",
    title: "Double-Height Grand Living",
    location: "Ocean-View Living Salon",
  },
  {
    src: "/images/hero-amenity.png",
    alt: "Aurora Heights Rooftop Penthouse Terrace",
    tagline: "EXCLUSIVE PENTHOUSE AMENITIES",
    title: "Sunset Rooftop Skyline Deck",
    location: "Private Sky Lounge & Fireplace",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000); // Crossfade every 7 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-luxury-dark select-none">
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[2500ms] cubic-bezier(0.25, 1, 0.5, 1) ${
              idx === currentSlide ? "opacity-60 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className={`w-full h-full relative ${idx === currentSlide ? "animate-kenburns" : ""}`}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {/* Elegant overlay gradient to ensure readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-luxury-dark/60" />
          </div>
        ))}
      </div>

      {/* Floating Badge (Top Right) */}
      <div className="absolute top-28 right-6 md:right-12 z-20 hidden sm:flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full transition-all duration-500 hover:bg-white/10">
        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" />
        <span className="w-1.5 h-1.5 bg-gold-400 rounded-full absolute" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/90 font-medium">
          Limited Phase II Residences Released
        </span>
      </div>

      {/* Main Luxury Content Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Tagline & Main Title */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="overflow-hidden">
              <span className="block text-xs md:text-sm font-medium tracking-[0.4em] text-gold-300 uppercase animate-[fadeInUp_1s_ease-out]">
                {HERO_IMAGES[currentSlide].tagline}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light leading-[1.1] text-white tracking-wide transition-all duration-1000">
              The Heights of <br />
              <span className="italic font-normal text-gold-100">Refined Living</span>
            </h1>
            <p className="max-w-lg text-sm md:text-base font-light text-white/70 leading-relaxed tracking-wide">
              An architectural masterpiece rising above the horizon. Aurora Heights integrates organic modernism with breathtaking panoramic vistas.
            </p>

            {/* Quick Slide Navigation Details */}
            <div className="pt-4 flex items-center gap-6 text-white/50 text-[11px] uppercase tracking-[0.2em] font-medium border-t border-white/10 max-w-md">
              <div className="flex items-center gap-3">
                <span className="text-gold-400 font-bold">
                  {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-[1px] bg-white/20 relative">
                  <div
                    key={currentSlide} // Re-mount bar on slide change to restart animation
                    className="absolute top-0 left-0 h-full bg-gold-400 transition-all duration-[7000ms] ease-linear"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <span>{String(HERO_IMAGES.length).padStart(2, "0")}</span>
              </div>
              <span className="text-white/30">|</span>
              <span className="text-white/80 tracking-widest truncate">
                {HERO_IMAGES[currentSlide].location}
              </span>
            </div>
          </div>

          {/* Luxury Property Search Widget (Bottom Right Overlay) */}
          <div className="lg:col-span-5 w-full bg-luxury-charcoal/90 backdrop-blur-2xl border border-white/5 p-6 md:p-8 rounded-sm shadow-2xl space-y-6 self-end transition-all duration-500 hover:border-gold-500/20">
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold-300 font-bold">
              Schedule A Private Tour
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 font-medium">
                  Residence Type
                </label>
                <select className="w-full bg-luxury-dark/80 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-400 transition-colors">
                  <option>Grand Villa (4-5 Bedrooms)</option>
                  <option>Sky Penthouse (Duplex)</option>
                  <option>Signature Estate (Infinity View)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 font-medium">
                    Preferred Season
                  </label>
                  <select className="w-full bg-luxury-dark/80 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-400 transition-colors">
                    <option>Summer 2026</option>
                    <option>Autumn 2026</option>
                    <option>Winter 2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1.5 font-medium">
                    Guest Count
                  </label>
                  <select className="w-full bg-luxury-dark/80 border border-white/10 rounded-sm py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-400 transition-colors">
                    <option>1 - 2 Guests</option>
                    <option>3 - 4 Guests</option>
                    <option>Private Entity</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-white hover:text-white font-semibold text-[11px] uppercase tracking-[0.25em] rounded-sm transition-all duration-300 shadow-lg shadow-gold-500/10 active:scale-[0.98]">
              Request Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#residences"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 group-hover:text-gold-300 transition-colors duration-300">
          Scroll Down
        </span>
        <div className="w-[18px] h-[32px] border border-white/20 rounded-full flex justify-center p-1 group-hover:border-gold-400/50 transition-colors duration-300">
          <div className="w-[3px] h-[6px] bg-gold-400 rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIPropertyFinder from "@/components/AIPropertyFinder";
import Residences from "@/components/Residences";
import PropertiesGrid from "@/components/PropertiesGrid";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        
        {/* AI Property Finder Section */}
        <AIPropertyFinder variant="hero" />
        
        {/* Residences Collections Section */}
        <Residences />
        
        {/* Properties Grid Section */}
        <PropertiesGrid />

        {/* Stats Count Section */}
        <StatsSection />

        {/* Amenities Section */}
        <div id="amenities">
          <section className="py-24 bg-white border-t border-luxury-sand/20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="max-w-2xl mb-16 space-y-4">
                <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
                  UNRIVALED AMENITIES
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal leading-tight tracking-wide">
                  Crafted for a Life of <span className="italic font-normal text-gold-700">Infinite Luxury</span>
                </h2>
                <p className="text-sm font-light text-luxury-charcoal/60 leading-relaxed max-w-xl">
                  From a private cliffside spa to an advanced automated concierge, every detail is engineered to deliver effortless peace and ultimate comfort.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Glass-Edge Infinity Pool",
                    description: "Suspended over the cliff edge, presenting panoramic views that blur the line between sea and sky.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )
                  },
                  {
                    title: "Private Wellness Sanctuary",
                    description: "Geothermal hot springs, marble steam chambers, and private massage therapy suites.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Sommelier Wine Vault",
                    description: "Advanced climate-controlled cellar housing an curated selection of rare vintages for private tastings.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )
                  },
                  {
                    title: "Biometric Concierge Portal",
                    description: "Seamless security infrastructure powered by encrypted biometric keys and a 24/7 personal butler network.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.571V11a4.5 4.5 0 00-9 0v.091c0 1.916.587 3.73 1.597 5.257l.054.09m17.802-5.498a13.923 13.923 0 01-2.107 7.056m-2.694-1.865a13.916 13.916 0 021.1-6.183V11a4.5 4.5 0 00-9 0v1.17c0 2.901-1.17 5.532-3.077 7.427m9.883-16.177A9.066 9.066 0 0012 3C7.01 3 3 7.01 3 12c0 2.057.69 3.953 1.848 5.48M7 7h10M7 11h10M7 15h10" />
                      </svg>
                    )
                  }
                ].map((amenity, idx) => (
                  <div key={idx} className="group p-6 bg-luxury-cream/40 border border-luxury-sand/30 hover:border-gold-500/30 rounded-lg space-y-4 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm text-gold-600 shadow-sm border border-luxury-sand/20 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                      {amenity.icon}
                    </div>
                    <h4 className="font-serif text-lg font-light text-luxury-charcoal group-hover:text-gold-700 transition-colors duration-300">
                      {amenity.title}
                    </h4>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">
                      {amenity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Location Section */}
        <div id="location">
          <section className="relative py-32 bg-luxury-dark text-white overflow-hidden">
            {/* Background Image overlayed with dark gradient */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
                alt="Ocean coastline"
                fill
                sizes="100vw"
                className="object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark via-luxury-dark/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold tracking-[0.3em] text-gold-400 uppercase block">
                  PRIME LANDSCAPE
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight tracking-wide">
                  Where Mountains Meet the <span className="italic font-normal text-gold-300">Pacific Coast</span>
                </h2>
                <p className="text-sm font-light text-white/70 leading-relaxed max-w-lg">
                  Perched on the prestigious cliff ridges of Malibu, California, Aurora Heights resides at the ultimate convergence of untouched coastal wilderness and metropolitan convenience. 
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 max-w-md">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300 font-semibold block">Coordinates</span>
                    <span className="text-xs font-mono text-white/80 block mt-1">34.0259° N, 118.7798° W</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300 font-semibold block">Elevation</span>
                    <span className="text-xs font-mono text-white/80 block mt-1">420 Meters Above Sea Level</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 w-full">
                {/* Glassmorphic Map/Location Info Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 space-y-6 shadow-2xl max-w-md mx-auto lg:ml-auto">
                  <h4 className="font-serif text-xl font-light text-gold-300">Distances & Access</h4>
                  <div className="space-y-4">
                    {[
                      { site: "Private Helipad Access", time: "On-site" },
                      { site: "Malibu Beachfront Reserve", time: "4 min drive" },
                      { site: "Santa Monica Pier", time: "18 min drive" },
                      { site: "LAX International Airport", time: "35 min heli-transfer" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 text-xs font-light">
                        <span className="text-white/80">{item.site}</span>
                        <span className="text-gold-300 font-mono">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Philosophy Section */}
        <div id="philosophy">
          <section className="py-28 bg-[#faf8f5] text-center border-t border-luxury-sand/20">
            <div className="max-w-3xl mx-auto px-6 space-y-8">
              <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
                OUR ARCHITECTURAL PHILOSOPHY
              </span>
              
              <svg className="w-12 h-12 text-gold-300 mx-auto opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <h2 className="text-2xl md:text-4xl font-serif font-light italic text-luxury-charcoal leading-relaxed max-w-2xl mx-auto">
                "Architecture should not compete with nature. It should provide a canvas through which nature's voice is amplified."
              </h2>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-luxury-charcoal/80 font-bold block">Arthur Pendelton</span>
                <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal/40 block">Lead Master Architect, Aurora Heights</span>
              </div>

              <p className="text-xs md:text-sm font-light text-luxury-charcoal/60 leading-relaxed max-w-lg mx-auto pt-6 border-t border-luxury-sand/30">
                We believe that luxury is defined not by excess, but by the restraint of design and the absolute perfection of detail. Aurora Heights embodies this philosophy—where limestone, raw oak, and structural steel bow to the elements.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}



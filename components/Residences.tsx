"use client";

import Image from "next/image";

const COLLECTIONS = [
  {
    title: "The Sky Villas",
    description: "Nestled into the mountain contours, these homes feature structural glass walls, cantilevered terraces, and custom heated infinity pools facing the horizon.",
    image: "/images/hero-exterior.png",
    specs: "4 - 5 BEDROOMS  |  6,200 SQ FT  |  FROM $14.5M",
  },
  {
    title: "The Living Salons",
    description: "Impeccably detailed open-plan interiors featuring custom Travertine fireplaces, minimalist Italian kitchens, and ceiling heights exceeding 18 feet.",
    image: "/images/hero-interior.png",
    specs: "3 - 4 BEDROOMS  |  5,100 SQ FT  |  FROM $11.2M",
  },
  {
    title: "The Penthouse Suites",
    description: "Crowning Aurora Heights, the penthouses boast expansive rooftop sky lounges, private wellness spas, and 360-degree metropolitan and coastal panoramas.",
    image: "/images/hero-amenity.png",
    specs: "5 - 6 BEDROOMS  |  8,400 SQ FT  |  FROM $22.0M",
  },
];

export default function Residences() {
  return (
    <section id="residences" className="py-24 md:py-36 bg-luxury-cream border-t border-luxury-sand/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="max-w-2xl mb-20 space-y-4 md:space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase">
            THE ARCHITECTURAL COLLECTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal leading-tight tracking-wide">
            Curated Spaces Built to <br />
            <span className="italic font-normal text-gold-700">Elevate the Senses</span>
          </h2>
          <p className="text-sm md:text-base font-light text-luxury-charcoal/70 leading-relaxed max-w-xl">
            Each residential offering combines organic building materials with world-class engineering, resulting in spaces that feel both completely natural and boundary-pushing.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {COLLECTIONS.map((col, index) => (
            <div
              key={col.title}
              className="group flex flex-col bg-white border border-luxury-sand/20 rounded-sm overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold-500/10 transition-all duration-700 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-luxury-dark">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content Box */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gold-600 font-bold tracking-widest uppercase">
                      COLLECTION 0{index + 1}
                    </span>
                    <span className="w-4 h-[1px] bg-luxury-sand" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-luxury-charcoal font-light group-hover:text-gold-700 transition-colors duration-300">
                    {col.title}
                  </h3>
                  <p className="text-xs md:text-sm font-light text-luxury-charcoal/60 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-luxury-sand/30 space-y-3">
                  <p className="text-[10px] tracking-wider text-luxury-charcoal/50 font-medium uppercase">
                    {col.specs}
                  </p>
                  <a
                    href="#inquire"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-luxury-charcoal group-hover:text-gold-600 tracking-wider uppercase transition-colors duration-300"
                  >
                    Explore Floorplans
                    <span className="text-gold-500 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

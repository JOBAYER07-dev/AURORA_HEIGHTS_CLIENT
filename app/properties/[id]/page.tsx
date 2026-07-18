import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { fetchPropertyById } from "@/lib/properties";
import PropertyContactForm from "@/components/PropertyContactForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="h-[70px] bg-luxury-dark" />
        <main className="flex-1 flex items-center justify-center min-h-[70vh] bg-luxury-cream px-6">
          <div className="max-w-md w-full bg-white border border-luxury-sand/20 rounded-xl p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
            <svg className="w-16 h-16 text-gold-500/40 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="font-serif text-2xl text-luxury-charcoal font-light">Estate Not Found</h1>
            <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">
              The exclusive residence you are seeking is either off the market or does not exist in our portfolio.
            </p>
            <Link
              href="/explore"
              className="inline-block w-full py-3.5 bg-luxury-charcoal hover:bg-gold-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all duration-300 active:scale-[0.98] text-center"
            >
              Explore Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* Spacer for fixed Navbar */}
      <div className="h-[70px] bg-luxury-dark" />

      <main className="flex-1 bg-[#faf8f5] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Breadcrumbs & Back Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-sand/20">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-luxury-charcoal/40 font-semibold">
              <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/explore" className="hover:text-gold-600 transition-colors">Residences</Link>
              <span>/</span>
              <span className="text-gold-600 truncate max-w-[200px]">{property.title}</span>
            </div>
            
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-luxury-charcoal/60 hover:text-gold-700 transition-colors cursor-pointer group"
            >
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </Link>
          </div>

          {/* Grid Layout: Main info and sticky contact sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column - Large Image Showcase & Details (8/12 cols) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Image Container with Zoom effect on hover */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-luxury-dark border border-luxury-sand/20 shadow-2xl group">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
              </div>

              {/* Title, Category & Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-gold-100 text-gold-700 text-[9px] uppercase tracking-widest font-bold rounded-sm">
                    {property.type}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-luxury-charcoal/50 uppercase tracking-widest font-semibold">
                    <svg className="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{property.location}</span>
                  </div>
                </div>
                
                <h1 className="font-serif text-3xl md:text-5xl font-light text-luxury-charcoal leading-tight tracking-wide">
                  {property.title}
                </h1>
              </div>

              {/* Specs Bar (Horizontal Icons Grid) */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-luxury-sand/20">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-luxury-cream flex items-center justify-center rounded-sm text-gold-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-luxury-charcoal/40 font-semibold block">Bedrooms</span>
                    <span className="text-sm font-semibold text-luxury-charcoal">{property.beds} Bedrooms</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-luxury-cream flex items-center justify-center rounded-sm text-gold-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-luxury-charcoal/40 font-semibold block">Bathrooms</span>
                    <span className="text-sm font-semibold text-luxury-charcoal">{property.baths} Bathrooms</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-luxury-cream flex items-center justify-center rounded-sm text-gold-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-2 10v2a2 2 0 01-2 2h-2M9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-luxury-charcoal/40 font-semibold block">Living Area</span>
                    <span className="text-sm font-semibold text-luxury-charcoal">{property.sqft.toLocaleString()} Sq. Ft.</span>
                  </div>
                </div>

              </div>

              {/* Narrative / Description */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-light text-luxury-charcoal">
                  Architectural Narrative
                </h3>
                <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-light whitespace-pre-line">
                  {property.description}
                </p>
                <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                  Every element of this signature estate has been meticulously crafted to represent the zenith of contemporary luxury. From the custom structural elements to the natural materials selection, the home seamlessly integrates indoor sophistication with the natural grandeur of its environment. 
                </p>
              </div>

              {/* Signature Features */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-light text-luxury-charcoal">
                  Signature Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-luxury-sand/30 rounded-lg space-y-2 bg-white hover:border-gold-500/30 transition-colors duration-300">
                    <span className="font-serif text-sm font-semibold text-luxury-charcoal block">Home Automation & Security</span>
                    <p className="text-xs text-luxury-charcoal/60 font-light leading-relaxed">
                      Custom configured smart-home infrastructure managing lighting, temperature, biometric entry systems, and automated floor-to-ceiling glass screens.
                    </p>
                  </div>
                  <div className="p-5 border border-luxury-sand/30 rounded-lg space-y-2 bg-white hover:border-gold-500/30 transition-colors duration-300">
                    <span className="font-serif text-sm font-semibold text-luxury-charcoal block">Wellness & Leisure Amenities</span>
                    <p className="text-xs text-luxury-charcoal/60 font-light leading-relaxed">
                      Equipped with private wellness therapy suites, steam showers, state-of-the-art climate-controlled wine cellars, and fully-integrated outdoor entertainment systems.
                    </p>
                  </div>
                  <div className="p-5 border border-luxury-sand/30 rounded-lg space-y-2 bg-white hover:border-gold-500/30 transition-colors duration-300">
                    <span className="font-serif text-sm font-semibold text-luxury-charcoal block">Eco-Conscious Integration</span>
                    <p className="text-xs text-luxury-charcoal/60 font-light leading-relaxed">
                      Utilizes advanced geothermal HVAC engineering, triple-glazed heat retention glass, and locally sourced construction materials.
                    </p>
                  </div>
                  <div className="p-5 border border-luxury-sand/30 rounded-lg space-y-2 bg-white hover:border-gold-500/30 transition-colors duration-300">
                    <span className="font-serif text-sm font-semibold text-luxury-charcoal block">Customized Spatial Architecture</span>
                    <p className="text-xs text-luxury-charcoal/60 font-light leading-relaxed">
                      Featuring open layouts, expansive high-ceiling double volumes, floating limestone staircases, and cantilevered viewing terraces.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Pricing & Booking (4/12 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Pricing Block */}
              <div className="bg-white border border-luxury-sand/30 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-luxury-charcoal/40 font-semibold block">Asking Price</span>
                  <span className="font-serif text-3xl font-semibold text-luxury-charcoal block mt-1">{property.priceStr}</span>
                </div>
                <div className="pt-4 border-t border-luxury-sand/20 space-y-2">
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-luxury-charcoal/50">Est. Monthly Mortgage</span>
                    <span className="text-luxury-charcoal font-semibold">${Math.round(property.price / 240).toLocaleString()} /mo</span>
                  </div>
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-luxury-charcoal/50">Price per Sq. Ft.</span>
                    <span className="text-luxury-charcoal font-semibold">${Math.round(property.price / property.sqft).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-luxury-charcoal/50">Property Status</span>
                    <span className="text-emerald-600 font-semibold">Active Listing</span>
                  </div>
                </div>
              </div>

              {/* Booking Request Form Component */}
              <PropertyContactForm propertyTitle={property.title} />

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

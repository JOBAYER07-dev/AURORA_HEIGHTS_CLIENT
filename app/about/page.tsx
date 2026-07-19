import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-luxury-dark" />
      <main className="flex-1 bg-luxury-cream min-h-screen py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20">
          
          {/* Header */}
          <div className="space-y-4 mb-12">
            <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
              PORTFOLIO ORIGINS
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal tracking-wide">
              The Legacy of <span className="italic font-normal text-gold-700">Aurora Heights</span>
            </h1>
            <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light max-w-xl">
              Elevating architectural vision to match the pristine landscapes of the California coast.
            </p>
          </div>

          {/* Story & Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-light text-luxury-charcoal">Our Narrative</h2>
              <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                Founded in 2018, Aurora Heights emerged from a desire to combine luxury residential space planning with biological integration. By using materials like limestone, raw oak, and structural steel, we design sanctuaries that feel both completely organic and highly innovative.
              </p>
              <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                Each signature residence is built on a foundation of architectural restraint, allowing the surrounding ocean panoramas and mountain contours to define the interior layout.
              </p>
            </div>
            
            <div className="bg-white border border-luxury-sand/20 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-4">
              <span className="text-[10px] font-bold tracking-[0.15em] text-gold-600 uppercase block">OUR MISSION STATEMENT</span>
              <p className="font-serif text-sm italic text-luxury-charcoal leading-relaxed font-light">
                "To curate ultra-luxury sanctuaries where contemporary engineering and the natural environment reside in absolute equilibrium, providing an unmatched canvas for refined living."
              </p>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="space-y-12">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.15em] text-gold-600 uppercase block">OUR FOUNDING PARTNERS</span>
              <h2 className="font-serif text-2xl font-light text-luxury-charcoal">Leadership & Vision</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  name: "Julian Vance",
                  role: "Founder & Chief Executive Officer",
                  bio: "With over two decades of experience in global real estate, Julian Vance sets the operational standards and investment directions for the portfolio.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
                },
                {
                  name: "Arthur Pendelton",
                  role: "Lead Master Architect",
                  bio: "Arthur's organic modernism philosophy guides the design criteria, prioritizing light integration, double-height volumes, and material honesty.",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80"
                }
              ].map((member, idx) => (
                <div key={idx} className="bg-white border border-luxury-sand/20 rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row gap-6 items-center hover:border-gold-500/20 transition-all duration-300">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <div>
                      <h3 className="font-serif text-base font-semibold text-luxury-charcoal">{member.name}</h3>
                      <span className="text-[9px] uppercase tracking-wider text-gold-700 font-medium">{member.role}</span>
                    </div>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

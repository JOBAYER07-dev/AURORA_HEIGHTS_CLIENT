import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="h-[70px] bg-luxury-dark" />
      <main className="flex-1 bg-luxury-cream min-h-screen py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.3em] text-gold-600 uppercase block">
              LEGAL DOCUMENTATION
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-light text-luxury-charcoal tracking-wide">
              Terms of <span className="italic font-normal text-gold-700">Use</span>
            </h1>
            <p className="text-xs text-luxury-charcoal/40 font-mono uppercase tracking-widest">
              Last Updated: July 19, 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white border border-luxury-sand/20 rounded-xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-luxury-charcoal/80 space-y-8 font-light">
            <section className="space-y-3">
              <h2 className="font-serif text-lg text-luxury-charcoal font-semibold">1. Agreement to Terms</h2>
              <p className="text-xs leading-relaxed">
                By entering or browsing the Aurora Heights portal, you explicitly agree to comply with our code of conduct, security parameters, and property visitation regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-luxury-charcoal font-semibold">2. Listing & Portfolio Access</h2>
              <p className="text-xs leading-relaxed">
                All property data, images, architectural floorplans, and structural details presented remain the exclusive intellectual property of Aurora Heights Development. Unauthorized distribution, cloning, or crawling of these portfolios is strictly forbidden.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-luxury-charcoal font-semibold">3. Private Tours & Invitations</h2>
              <p className="text-xs leading-relaxed">
                Submitting a tour reservation request does not guarantee a property invitation. Viewing scheduling is subject to vetting, host confirmation, and active guest limit regulations.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

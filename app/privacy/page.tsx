import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
              Privacy <span className="italic font-normal text-gold-700">Policy</span>
            </h1>
            <p className="text-xs text-luxury-charcoal/40 font-mono uppercase tracking-widest">
              Last Updated: July 19, 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white border border-luxury-sand/20 rounded-xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.02)] text-luxury-charcoal/80 space-y-8 font-light">
            <section className="space-y-3">
              <h2 className="font-serif text-lg text-luxury-charcoal font-semibold">1. Collection of Signature Information</h2>
              <p className="text-xs leading-relaxed">
                At Aurora Heights, we are committed to safeguarding the confidentiality of our elite clientele. We collect information necessary to coordinate private property viewings, session credentials, and luxury portfolio discovery.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-luxury-charcoal font-semibold">2. Use of Authorized Credentials</h2>
              <p className="text-xs leading-relaxed">
                All data, including session tokens, credentials, and financial references, is held under high-end encrypted protocols. We never trade, share, or expose client profiles to third-party brokers without explicit signed consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-luxury-charcoal font-semibold">3. Encryption & Data Retention</h2>
              <p className="text-xs leading-relaxed">
                Our database systems employ industry-standard encryption layers. Audit logs are kept for security verification and automatically purged after standard compliance windows.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

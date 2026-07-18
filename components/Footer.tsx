"use client";

export default function Footer() {
  return (
    <footer id="philosophy" className="bg-luxury-dark text-white border-t border-white/5 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Block */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.25em] text-white">
              AURORA
            </span>
            <span className="text-[8px] tracking-[0.6em] text-gold-300/80 -mt-1 uppercase">
              HEIGHTS
            </span>
          </div>
          <p className="max-w-sm text-xs md:text-sm font-light text-white/50 leading-relaxed tracking-wide">
            Designed for those who seek height, serenity, and unparalleled architectural precision. An iconic presence on the California coastline.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
            Residences
          </h4>
          <ul className="space-y-2.5 text-xs text-white/60 font-light">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                The Sky Villas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                The Living Salons
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                The Penthouses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Floorplans & Layouts
              </a>
            </li>
          </ul>
        </div>

        {/* Contact/Address */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
            Private Viewings
          </h4>
          <p className="text-xs text-white/60 font-light leading-relaxed">
            Aurora Heights Presentation Gallery<br />
            2800 Coronado Way, Malibu, CA
          </p>
          <p className="text-xs text-gold-300 font-semibold tracking-wider pt-2">
            inquire@auroraheights.com
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/40 uppercase tracking-widest font-medium">
        <p>© 2026 Aurora Heights Development. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}

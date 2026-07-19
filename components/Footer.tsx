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
          <div className="flex gap-3 pt-2">
            <a href="https://instagram.com/auroraheights" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-gold-500 rounded-full text-white/60 hover:text-white transition-all duration-300 border border-white/10 flex items-center justify-center animate-[fadeIn_0.5s_ease-out]" aria-label="Instagram">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/auroraheights" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-gold-500 rounded-full text-white/60 hover:text-white transition-all duration-300 border border-white/10 flex items-center justify-center" aria-label="LinkedIn">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://facebook.com/auroraheights" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-gold-500 rounded-full text-white/60 hover:text-white transition-all duration-300 border border-white/10 flex items-center justify-center" aria-label="Facebook">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
            Residences
          </h4>
          <ul className="space-y-2.5 text-xs text-white/60 font-light">
            <li>
              <a href="/#collections" className="hover:text-white transition-colors">
                The Sky Villas
              </a>
            </li>
            <li>
              <a href="/#collections" className="hover:text-white transition-colors">
                The Living Salons
              </a>
            </li>
            <li>
              <a href="/#collections" className="hover:text-white transition-colors">
                The Penthouses
              </a>
            </li>
            <li>
              <a href="/explore" className="hover:text-white transition-colors">
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
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}

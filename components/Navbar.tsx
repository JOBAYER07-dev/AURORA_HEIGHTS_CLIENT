"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Client-side authentication status check (via cookie presence)
    const checkAuth = () => {
      const match = document.cookie.match(/(^|;)\s*auth_token\s*=\s*([^;]+)/);
      setIsAuthenticated(!!match);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuth();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear cookies by setting expiration in the past
    document.cookie = "auth_token=; path=/; max-age=0";
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-luxury-dark/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="group flex flex-col">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-gold-400">
            AURORA
          </span>
          <span className="text-[7px] tracking-[0.6em] text-gold-300/80 -mt-1 uppercase">
            HEIGHTS
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <a
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-gold-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </a>
          <a
            href="/explore"
            className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-gold-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Explore
          </a>

          {/* Protected Links visible only when authenticated */}
          {isAuthenticated ? (
            <>
              <a
                href="/items/add"
                className="text-xs uppercase tracking-[0.2em] text-gold-300 hover:text-white transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Add Listing
              </a>
              <a
                href="/items/manage"
                className="text-xs uppercase tracking-[0.2em] text-gold-300 hover:text-white transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Manage
              </a>
            </>
          ) : (
            // Public anchors
            ["Residences", "Amenities", "Location", "Philosophy"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-gold-400 transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))
          )}
        </div>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-red-500/50 hover:border-red-500 bg-transparent hover:bg-red-500/10 text-red-400 hover:text-white font-medium text-xs uppercase tracking-[0.25em] rounded-sm transition-all duration-500 ease-in-out shadow-lg cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <a
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-gold-400/50 hover:border-gold-400 bg-transparent hover:bg-gold-500/10 text-gold-300 hover:text-white font-medium text-xs uppercase tracking-[0.25em] rounded-sm transition-all duration-500 ease-in-out shadow-lg shadow-gold-500/5"
            >
              Portal Login
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-gold-400 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${
                isOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
              }`}
            />
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${
                isOpen ? "opacity-0 w-0" : "w-4"
              }`}
            />
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${
                isOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 top-[70px] bg-luxury-dark/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden border-t border-white/5 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] space-y-8 px-6 text-center">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-serif tracking-[0.2em] text-white/90 hover:text-gold-400 transition-colors"
          >
            Home
          </a>
          <a
            href="/explore"
            onClick={() => setIsOpen(false)}
            className="text-lg font-serif tracking-[0.2em] text-white/90 hover:text-gold-400 transition-colors"
          >
            Explore
          </a>

          {isAuthenticated ? (
            <>
              <a
                href="/items/add"
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif tracking-[0.2em] text-gold-300 hover:text-white transition-colors"
              >
                Add Listing
              </a>
              <a
                href="/items/manage"
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif tracking-[0.2em] text-gold-300 hover:text-white transition-colors"
              >
                Manage Portfolio
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full max-w-[260px] py-3.5 border border-red-500 bg-red-500/10 text-red-400 font-medium text-xs uppercase tracking-[0.25em] rounded-sm transition-all duration-300 cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {["Residences", "Amenities", "Location", "Philosophy"].map((item) => (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif tracking-[0.2em] text-white/90 hover:text-gold-400 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-[260px] py-3.5 border border-gold-400 bg-gold-500/10 text-gold-300 font-medium text-xs uppercase tracking-[0.25em] rounded-sm transition-all duration-300"
              >
                Portal Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

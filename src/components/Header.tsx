"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/constants/product";
import { Menu, X, Moon } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px] sm:h-[56px]">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Moda Digital <span className="text-primary">Pro</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 xl:px-3.5 py-1.5 text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg hover:bg-foreground/5 text-white/75 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-border/40">
              <button
                className="p-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10"
                aria-label="Toggle theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold tracking-wider rounded-lg border transition-all duration-200 border-white/20 text-white/85 hover:bg-white hover:text-navy">
                ES
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="flex lg:hidden items-center gap-1">
            <button className="p-1.5 rounded-md transition-colors text-white/70">
              <Moon className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded-md transition-colors ml-0.5 text-white"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-navy-dark/98 backdrop-blur-lg border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { NAV_ITEMS } from "@/constants/product";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && theme !== "light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-800/50"
            : "bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-transparent"
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
              <span
                className={`font-bold text-lg tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
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
                className={`px-3 xl:px-3.5 py-1.5 text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg ${
                  isDark
                    ? "text-slate-300 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div
              className={`flex items-center gap-1.5 ml-2 pl-2 ${
                isDark ? "border-l border-slate-700/50" : "border-l border-slate-200"
              }`}
            >
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <button
              className={`p-1.5 rounded-md transition-colors ml-0.5 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
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
        <div
          className={`lg:hidden backdrop-blur-lg border-t ${
            isDark
              ? "bg-slate-950/95 border-slate-800/50"
              : "bg-white/95 border-slate-200"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                  isDark
                    ? "text-slate-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
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

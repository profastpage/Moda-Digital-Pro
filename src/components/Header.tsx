"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { NAV_ITEMS } from "@/constants/product";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import PlotterIcon from "./PlotterIcon";

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

  /* When NOT scrolled → transparent over dark Hero → always white text.
     When scrolled → adapt to current theme background. */
  const textLogo = !scrolled
    ? "text-white"
    : isDark
      ? "text-white"
      : "text-slate-900";

  const textNav = !scrolled
    ? "text-white/90 hover:text-white hover:bg-white/10"
    : isDark
      ? "text-slate-200 hover:text-white hover:bg-white/10"
      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100";

  const textMobile = !scrolled
    ? "text-white"
    : isDark
      ? "text-white"
      : "text-slate-900";

  const borderDiv = !scrolled
    ? "border-transparent"
    : isDark
      ? "border-slate-800/50"
      : "border-slate-200";

  const bgMobileMenu = isDark
    ? "bg-slate-950/95 border-slate-800/50"
    : "bg-white/95 border-slate-200";

  const mobileMenuLink = isDark
    ? "text-slate-200 hover:text-white hover:bg-white/5"
    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100";

  const dividerBorder = !scrolled
    ? "border-white/20"
    : isDark
      ? "border-white/20"
      : "border-slate-200";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "bg-slate-950/90 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      } border-b ${borderDiv}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[52px] sm:h-[56px]">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <PlotterIcon className="w-8 h-8" />
              <span className={`font-bold text-lg tracking-tight ${textLogo}`}>
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
                className={`px-3 xl:px-3.5 py-1.5 text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg ${textNav}`}
              >
                {item.label}
              </a>
            ))}
            <div
              className={`flex items-center gap-1.5 ml-2 pl-2 border-l ${dividerBorder}`}
            >
              <ThemeToggle scrolled={scrolled} isDark={isDark} />
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle scrolled={scrolled} isDark={isDark} />
            <button
              className={`p-1.5 rounded-md transition-colors ml-0.5 ${textMobile}`}
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
        <div className={`lg:hidden backdrop-blur-lg border-t ${bgMobileMenu}`}>
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${mobileMenuLink}`}
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

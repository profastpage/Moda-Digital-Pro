"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG } from "@/constants/product";
import { Menu, X, ArrowRight, Sun, Moon, MessageCircle, ChevronDown } from "lucide-react";
import PlotterIcon from "./PlotterIcon";
import { useHasMounted } from "@/hooks/useHasMounted";

/* ============================================
   MENÚ FULLSCREEN PREMIUM — FRAMER MOTION
   ============================================ */

/* Stagger: cada item aparece 0.1s después del anterior */
const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1, when: "afterChildren" },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 24,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const panelVariants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      clipPath: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.4, delay: 0.1 },
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: {
      clipPath: { duration: 0.4, ease: [0.65, 0, 0.35, 1] as const },
      opacity: { duration: 0.2 },
    },
  },
};

/* Botón CTA con pulso suave */
const ctaPulse = {
  rest: { scale: 1, boxShadow: "0 0 0 0 rgba(6, 182, 212, 0.4)" },
  hover: {
    scale: 1.03,
    boxShadow: "0 0 0 12px rgba(6, 182, 212, 0)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  tap: { scale: 0.97 },
} as const;

const whatsappPulse = {
  rest: { scale: 1, boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.4)" },
  hover: {
    scale: 1.03,
    boxShadow: "0 0 0 12px rgba(37, 211, 102, 0)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  tap: { scale: 0.97 },
} as const;

/* ============================================
   COMPONENTE HEADER
   ============================================ */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll lock al abrir menú */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isDark = mounted && theme !== "light";

  /* When NOT scrolled (over hero video with gradient) → always white text.
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

  const dividerBorder = !scrolled
    ? "border-white/20"
    : isDark
      ? "border-white/20"
      : "border-slate-200";

  const iconColor = !scrolled
    ? "text-white/80 hover:text-white hover:bg-white/10"
    : isDark
      ? "text-slate-300 hover:text-white hover:bg-white/10"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100";

  const closeItem = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 shadow-none ${
          scrolled
            ? isDark
              ? "bg-slate-950/90 backdrop-blur-md"
              : "bg-white/90 backdrop-blur-md"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
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
              <div className={`flex items-center gap-1.5 ml-2 pl-2 border-l ${dividerBorder}`}>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`p-2 rounded-lg transition-all duration-200 ${iconColor}`}
                  aria-label="Cambiar tema"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile: Theme + Hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-lg transition-all duration-200 ${iconColor}`}
                aria-label="Cambiar tema"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                className={`p-1.5 rounded-md transition-colors ml-0.5 ${textMobile}`}
                aria-label="Abrir menú"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ============================================
          FULLSCREEN MENU OVERLAY
          ============================================ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Fullscreen Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[101] flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #000000 0%, #0a0a0a 40%, #111111 100%)",
              }}
            >
              {/* Top bar: Logo + Close */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2 sm:px-10 sm:pt-6">
                <div className="flex items-center gap-2">
                  <PlotterIcon className="w-7 h-7" />
                  <span className="font-bold text-base text-white tracking-tight">
                    Moda Digital <span className="text-cyan-400">Pro</span>
                  </span>
                </div>

                {/* Top-right controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                    aria-label="Cambiar tema"
                  >
                    {mounted && theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                    aria-label="Cerrar menú"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16"
              >
                <nav className="space-y-0">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      variants={menuItemVariants}
                      onClick={(e) => {
                        e.preventDefault();
                        closeItem(item.href);
                      }}
                      className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/[0.06] cursor-pointer"
                    >
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span className="text-white/20 text-sm font-mono w-6">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/0 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
                    </motion.a>
                  ))}
                </nav>
              </motion.div>

              {/* Bottom CTA Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                exit={{ opacity: 0, y: 10 }}
                className="px-6 pb-8 sm:px-10 sm:pb-10 space-y-4"
              >
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="#productos"
                    variants={ctaPulse}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(e) => {
                      e.preventDefault();
                      closeItem("#productos");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03]"
                  >
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    Explorar Equipos
                  </motion.a>

                  <motion.a
                    href="https://wa.me/51944252684?text=%F0%9F%91%8B%20%C2%A1Hola%20Moda%20Digital%20Pro!%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20plotters%20y%20equipos%20textiles.%20%C2%BFPodr%C3%ADan%20asesorarme%3F%20%f0%9f%8f%ad%f0%9f%93%90"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={whatsappPulse}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Escríbenos por WhatsApp
                  </motion.a>
                </div>

                {/* Bottom tagline */}
                <p className="text-center text-white/30 text-xs sm:text-sm">
                  {SITE_CONFIG.description}
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

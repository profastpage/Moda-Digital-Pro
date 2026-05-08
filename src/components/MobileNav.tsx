"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Package, Wrench, MessageCircle, HelpCircle, Phone } from "lucide-react";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useHasMounted } from "@/hooks/useHasMounted";

/* ── 5 items: elimina "Nosotros", WhatsApp es el centro ── */
const TABS_LEFT: { label: string; icon: typeof Package; href: string }[] = [
  { label: "Productos", icon: Package, href: "#productos" },
  { label: "Servicios", icon: Wrench, href: "#servicios" },
];

const TABS_RIGHT: { label: string; icon: typeof Package; href: string }[] = [
  { label: "FAQ", icon: HelpCircle, href: "#faq" },
  { label: "Contacto", icon: Phone, href: "#contacto" },
];

const ALL_HREFS = [...TABS_LEFT, ...TABS_RIGHT].map((t) => t.href);

export default function MobileNav() {
  const [active, setActive] = useState("#productos");
  const mounted = useHasMounted();
  const { theme } = useTheme();
  const { toggleModal } = useWhatsAppModal();

  /* ── Scroll spy: marca la sección visible ── */
  useEffect(() => {
    const onScroll = () => {
      for (let i = ALL_HREFS.length - 1; i >= 0; i--) {
        const el = document.querySelector(ALL_HREFS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(ALL_HREFS[i]);
            return;
          }
        }
      }
      setActive(ALL_HREFS[0]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const isDark = theme !== "light";

  /* ── Color tokens ── */
  const inactiveColor = isDark ? "text-slate-500" : "text-slate-400";
  const activeColor = isDark ? "text-cyan-400" : "text-cyan-600";
  const waLabelColor = isDark ? "text-[#25D366]" : "text-green-600";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden">
      {/* ═══ Barra principal ═══ */}
      <div
        className={`
          flex items-end justify-around
          /* Márgenes interiores para que los extremos no toquen el borde del celular */
          px-4 sm:px-6
          pt-2.5 pb-2
          ${isDark
            ? "bg-[#020617]/95 border-t border-white/[0.06]"
            : "bg-white border-t border-slate-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
          }
        `}
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        {/* ── Tabs izquierdos: Productos + Servicios ── */}
        {TABS_LEFT.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.href;
          return (
            <a
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-1 min-w-[56px] py-1"
            >
              <Icon
                className={`w-[20px] h-[20px] transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}

        {/* ── WhatsApp central — círculo que sobresale ── */}
        <button
          data-wa-trigger
          onClick={toggleModal}
          type="button"
          className="flex flex-col items-center justify-center -mt-5 min-w-[56px] bg-transparent border-none cursor-pointer"
          aria-label="Abrir menú de productos por WhatsApp"
        >
          <div
            className={`
              w-[52px] h-[52px] rounded-full
              bg-[#25D366]
              flex items-center justify-center
              active:scale-95 transition-transform duration-200
              shadow-lg shadow-[#25D366]/30
              ring-[3px] ${isDark ? "ring-[#020617]" : "ring-white"}
            `}
          >
            {/* WhatsApp SVG icon */}
            <svg
              viewBox="0 0 32 32"
              className="w-6 h-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.054-1.95A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.392 1.104-1.944 2.02-3.2 2.288-.854.18-1.972.324-5.732-1.232-4.812-2.006-7.908-6.892-8.148-7.208-.232-.316-1.94-2.584-1.94-4.928s1.228-3.496 1.662-3.972c.392-.432 1.078-.648 1.738-.648.21 0 .398.01.568.018.434.018.652.044 1.178.914.636 1.058 2.174 3.736 2.366 4.008.194.272.386.678.128 1.06-.248.394-.47.568-.744.878-.274.31-.534.548-.808.884-.25.292-.53.606-.218 1.142.314.528 1.396 2.304 3 3.728 2.06 1.838 3.8 2.408 4.336 2.67.536.26.848.218 1.16-.134.314-.354 1.342-1.562 1.698-2.098.354-.536.71-.448 1.196-.268.488.18 3.076 1.452 3.604 1.718.528.266.88.4 1.012.618.128.218.128 1.264-.264 2.368z" />
            </svg>
          </div>
          <span className={`text-[10px] font-medium mt-1 leading-none ${waLabelColor}`}>
            WhatsApp
          </span>
        </button>

        {/* ── Tabs derechos: FAQ + Contacto ── */}
        {TABS_RIGHT.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.href;
          return (
            <a
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-1 min-w-[56px] py-1"
            >
              <Icon
                className={`w-[20px] h-[20px] transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* ── Safe area para iPhones con notch/home indicator ── */}
      <div
        className={`h-[env(safe-area-inset-bottom)] ${
          isDark ? "bg-[#020617]/95" : "bg-white"
        }`}
      />
    </nav>
  );
}

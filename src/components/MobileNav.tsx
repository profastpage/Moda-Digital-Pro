"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Box, Wrench, MessageCircle, Users, Phone } from "lucide-react";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useHasMounted } from "@/hooks/useHasMounted";

const TABS: { label: string; icon: typeof Box; href?: string; isCenter?: boolean }[] = [
  { label: "Productos", icon: Box, href: "#productos" },
  { label: "Servicios", icon: Wrench, href: "#servicios" },
  { label: "WhatsApp", icon: MessageCircle, isCenter: true },
  { label: "Nosotros", icon: Users, href: "#nosotros" },
  { label: "Contacto", icon: Phone, href: "#contacto" },
];

export default function MobileNav() {
  const [active, setActive] = useState("#productos");
  const mounted = useHasMounted();
  const { theme } = useTheme();
  const { toggleModal } = useWhatsAppModal();

  useEffect(() => {
    const onScroll = () => {
      const sections = TABS.filter((t) => !t.isCenter && t.href).map((t) => t.href!);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sections[i]);
            return;
          }
        }
      }
      setActive(sections[0] || "#productos");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const isDark = theme !== "light";

  /* Theme-aware color tokens */
  const inactiveColor = isDark ? "text-[#94a3b8]" : "text-slate-500";
  const activeColor = isDark ? "text-[#06b6d4]" : "text-cyan-600";
  const waLabelColor = isDark ? "text-[#25D366]" : "text-green-600";

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden h-14 flex items-center justify-around px-2 transition-colors duration-300 ${
        isDark
          ? "bg-[#020617]/95 border-t border-[#334155]"
          : "bg-white border-t border-slate-100"
      }`}
      style={{ backdropFilter: "blur(10px)" }}
    >
      {/* Left tabs */}
      {TABS.filter((t) => !t.isCenter)
        .slice(0, 2)
        .map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.href;
          return (
            <a
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1"
            >
              <Icon
                className={`w-[18px] h-[18px] transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}

      {/* Center WhatsApp button — triggers product modal */}
      <button
        data-wa-trigger
        onClick={toggleModal}
        type="button"
        className="flex flex-col items-center justify-center -mt-4 min-w-[48px] bg-transparent border-none cursor-pointer"
        aria-label="Abrir menú de productos por WhatsApp"
      >
        <div
          className={`w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center active:scale-95 transition-transform duration-200 ${
            isDark
              ? "shadow-lg shadow-[#25D366]/30"
              : "shadow-lg shadow-green-600/25 ring-2 ring-white"
          }`}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <span className={`text-[10px] font-medium mt-0.5 ${waLabelColor}`}>
          WhatsApp
        </span>
      </button>

      {/* Right tabs */}
      {TABS.filter((t) => !t.isCenter)
        .slice(2)
        .map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.href;
          return (
            <a
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1"
            >
              <Icon
                className={`w-[18px] h-[18px] transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                  isActive ? activeColor : inactiveColor
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}
    </nav>
  );
}

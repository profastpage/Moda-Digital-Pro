"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Box, Wrench, MessageCircle, Users, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/constants/product";

const TABS = [
  { label: "Productos", icon: Box, href: "#productos" },
  { label: "Servicios", icon: Wrench, href: "#servicios" },
  { label: "WhatsApp", icon: MessageCircle, href: SITE_CONFIG.whatsapp, isCenter: true },
  { label: "Nosotros", icon: Users, href: "#nosotros" },
  { label: "Contacto", icon: Phone, href: "#contacto" },
];

export default function MobileNav() {
  const [active, setActive] = useState("#productos");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const sections = TABS.filter((t) => !t.isCenter).map((t) => t.href);
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

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden h-14 flex items-center justify-around px-2 transition-colors duration-300 ${
        isDark
          ? "bg-[#020617]/95 border-t border-[#334155]"
          : "bg-white/95 border-t border-slate-200"
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
                  isActive ? "text-[#06b6d4]" : "text-[#94a3b8]"
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                  isActive ? "text-[#06b6d4]" : "text-[#94a3b8]"
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}

      {/* Center WhatsApp button — compact */}
      <a
        href={SITE_CONFIG.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center -mt-4 min-w-[48px]"
      >
        <div
          className="w-11 h-11 rounded-full bg-[#06b6d4] flex items-center justify-center shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform duration-200"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] font-medium text-[#06b6d4] mt-0.5">
          WhatsApp
        </span>
      </a>

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
                  isActive ? "text-[#06b6d4]" : "text-[#94a3b8]"
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                  isActive ? "text-[#06b6d4]" : "text-[#94a3b8]"
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

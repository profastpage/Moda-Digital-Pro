"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

  const handleTap = (tab: (typeof TABS)[number]) => {
    if (tab.isCenter) return;
    setActive(tab.href);
  };

  if (!mounted) return null;

  const isDark = theme !== "light";

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-colors duration-300 ${
        isDark
          ? "bg-[#020617] border-t border-[#334155]"
          : "bg-white/95 border-t border-slate-200"
      }`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-end justify-around px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] relative">
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
                onClick={() => handleTap(tab)}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1 px-2 transition-colors duration-200"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive
                      ? "text-[#06b6d4]"
                      : isDark
                        ? "text-[#94a3b8]"
                        : "text-[#94a3b8]"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#06b6d4]"
                      : isDark
                        ? "text-[#94a3b8]"
                        : "text-[#94a3b8]"
                  }`}
                >
                  {tab.label}
                </span>
              </a>
            );
          })}

        {/* Center WhatsApp button — raised */}
        <a
          href={SITE_CONFIG.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-5 min-w-[56px]"
        >
          <div
            className="w-14 h-14 rounded-full bg-[#06b6d4] flex items-center justify-center shadow-lg shadow-cyan-500/40 active:scale-95 transition-transform duration-200"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-[#06b6d4] mt-1">
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
                onClick={() => handleTap(tab)}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1 px-2 transition-colors duration-200"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive
                      ? "text-[#06b6d4]"
                      : isDark
                        ? "text-[#94a3b8]"
                        : "text-[#94a3b8]"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#06b6d4]"
                      : isDark
                        ? "text-[#94a3b8]"
                        : "text-[#94a3b8]"
                  }`}
                >
                  {tab.label}
                </span>
              </a>
            );
          })}
      </div>
    </nav>
  );
}

"use client";

import { useTheme } from "next-themes";
import { SITE_CONFIG, FOOTER_LINKS, CONTACT_INFO } from "@/constants/product";
import PlotterIcon from "./PlotterIcon";
import { useHasMounted } from "@/hooks/useHasMounted";

interface FooterProps {
  footerLinks?: {
    productos: { label: string; href: string }[];
    servicios: { label: string; href: string }[];
    empresa: { label: string; href: string }[];
  };
  tagline?: string;
  contactInfo?: { phone?: string; email?: string; address?: string; hours?: string };
}

export default function Footer({
  footerLinks: footerLinksProp,
  tagline: taglineProp,
  contactInfo: contactInfoProp,
}: FooterProps) {
  const { theme } = useTheme();
  const mounted = useHasMounted();

  const isDark = !mounted || theme !== "light";
  const footerLinks = footerLinksProp || FOOTER_LINKS;
  const tagline = taglineProp || SITE_CONFIG.description;
  const contactInfo = contactInfoProp || CONTACT_INFO;

  return (
    <footer
      className={`pt-16 pb-20 md:pb-8 transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 border-t border-slate-800/50"
          : "bg-slate-50 border-t border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <PlotterIcon className="w-8 h-8" />
              <span className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Moda Digital <span className="text-primary">Pro</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed mb-4 max-w-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {tagline}
            </p>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {contactInfo.email}
            </p>
          </div>

          {/* Productos */}
          <div>
            <h4 className={`font-semibold text-sm mb-4 tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Productos
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm hover:text-primary transition-colors duration-200 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className={`font-semibold text-sm mb-4 tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm hover:text-primary transition-colors duration-200 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className={`font-semibold text-sm mb-4 tracking-wider uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm hover:text-primary transition-colors duration-200 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={`pt-8 flex flex-col items-center gap-3 border-t ${
          isDark ? "border-slate-800/50" : "border-slate-200"
        }`}>
          <p className={`text-xs sm:text-sm text-center ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.brand}. Todos los derechos reservados.
          </p>
          <p className={`text-xs text-center ${isDark ? "text-slate-600" : "text-slate-400"}`}>
            Diseñado y desarrollado por{" "}
            <a
              href="https://fastpagepro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary/70 hover:text-primary transition-colors duration-200"
            >
              FastPagePro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

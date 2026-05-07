"use client";

import { SITE_CONFIG, FOOTER_LINKS, CONTACT_INFO } from "@/constants/product";

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-border/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Moda Digital <span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <p className="text-muted-foreground text-sm">{CONTACT_INFO.email}</p>
          </div>

          {/* Productos */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Productos
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.productos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.brand} — Moda Digital Pro. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-xs">
            Diseñado con tecnología de grado industrial
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// SiteComponents — Renderiza WhatsApp, BackToTop, MobileNav
// SOLO en rutas públicas. Se oculta completamente en /admin.
// ============================================================

"use client";

import { usePathname } from "next/navigation";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";
import MobileNav from "@/components/MobileNav";

const HIDDEN_PREFIXES = ["/admin"];

export default function SiteComponents() {
  const pathname = usePathname();
  const isAdmin = HIDDEN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  if (isAdmin) return null;

  return (
    <>
      <BackToTop />
      <FloatingWhatsApp />
      <MobileNav />
    </>
  );
}

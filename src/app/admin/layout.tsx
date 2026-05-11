// ============================================================
// Layout dedicado para /admin — Sanity Studio a pantalla completa
// Sin WhatsApp, BackToTop, MobileNav, ni componentes del sitio.
// ============================================================

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Moda Digital Pro CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}

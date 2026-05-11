// ============================================================
// Sanity Studio embebido en Next.js App Router — ruta: /admin
// Pantalla completa sin componentes del sitio público.
// ============================================================

"use client";

import { Studio } from "sanity";
import config from "../../../../sanity.config";

export default function AdminPage() {
  return (
    <div className="h-screen w-screen">
      <Studio config={config} />
    </div>
  );
}

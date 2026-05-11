// ============================================================
// Sanity Studio embebido en Next.js App Router — ruta: /admin
// Usa el componente <Studio /> de sanity para SSR del Studio.
// ============================================================

"use client";

import { Studio } from "sanity";
import config from "../../../../sanity.config";

export default function AdminPage() {
  return <Studio config={config} />;
}

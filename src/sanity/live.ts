// ============================================================
// FAST PAGE PRO — Sanity Live (defineLive)
// Configura sanityFetch + SanityLive para revalidación en tiempo real
//
// COMPORTAMIENTO:
// - Producción (sin draft mode): usaCDN=true → cache CDN rápido
// - Draft Mode (preview): usaCDN=false → datos inmediatos desde API
// - perspective="published" en producción, "previewDrafts" en draft
//
// IMPORTANTE: El client DEBE tener stega.studioUrl configurado
// para que sanityFetch retorne datos con source maps (stega)
// cuando Draft Mode está activo.
// ============================================================

import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// ── Token de lectura para acceder a drafts (sin CDN) ──
// Necesario para Draft Mode — generar en:
// sanity.io/manage → API → Tokens → New Token (Reader)
const token = process.env.SANITY_API_READ_TOKEN;
const browserToken = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

// ── Cliente de Sanity con stega para Visual Editing ──
// - useCdn: true en producción (cache rápido)
// - perspective: detecta automáticamente Draft Mode vía cookies
//   y cambia a "previewDrafts" para mostrar borradores
// - stega.studioUrl: habilita source maps para overlay Visual Editing
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: !token, // Si hay token → useCdn=false (datos frescos). Sin token → useCdn=true (cache)
  perspective: token ? "previewDrafts" : "published",
  token: token, // Token para acceso a drafts
  // ── STEGA: habilita source maps en datos para Visual Editing ──
  stega: {
    enabled: true,
    studioUrl: "/admin",
  },
});

// ── Exportar sanityFetch y SanityLive ──
// - sanityFetch: para Server Components, detecta Draft Mode automáticamente
//   Cuando Draft Mode está activo, retorna datos con stega (source maps)
//   para que el overlay VisualEditing pueda identificar campos editables
// - SanityLive: componente Server que envuelve el client component de
//   revalidación en tiempo real (WebSocket + refresh)
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: browserToken,
});

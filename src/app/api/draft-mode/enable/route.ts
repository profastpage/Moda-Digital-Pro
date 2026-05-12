// ============================================================
// FAST PAGE PRO — Draft Mode Enable API Route
// Activa Draft Mode de Next.js cuando el Presentation Tool lo solicita.
//
// SEGURIDAD: Valida que el token enviado por Presentation Tool
// coincida con SANITY_REVALIDATE_SECRET. Sin esto, cualquiera
// podría activar Draft Mode y ver contenido no publicado.
//
// El Presentation Tool envía el token como query param ?secret=
// configurado en sanity.config.ts → previewMode.token
// ============================================================

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // ── 1. Verificar token de seguridad ──
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectUrl = searchParams.get("redirect") || "/";

  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error("[draft-mode] SANITY_REVALIDATE_SECRET no configurado en el servidor");
    return NextResponse.json(
      { message: "Secret no configurado en el servidor", success: false },
      { status: 500 },
    );
  }

  if (secret !== expectedSecret) {
    console.warn("[draft-mode] Token invalido — rechazando activacion de Draft Mode");
    return NextResponse.json(
      { message: "Token invalido", success: false },
      { status: 401 },
    );
  }

  // ── 2. Activar Draft Mode de Next.js ──
  const draft = await draftMode();
  draft.enable();

  // ── 3. Redirigir a la página solicitada con cookie __prerender_bypass ──
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

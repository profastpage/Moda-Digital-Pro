// ============================================================
// FAST PAGE PRO — API Route: On-demand Revalidation (Webhook)
// Recibe webhooks de Sanity cuando se publica/modifica/borra contenido.
// Limpia el caché de Next.js para que la web refleje los cambios al instante.
//
// Seguridad: Verifica un secret token para evitar revalidaciones no autorizadas.
// Configurar: SANITY_REVALIDATE_SECRET en Vercel Environment Variables.
//
// Uso: Sanity GROQ-powered mutations → POST /api/revalidate → revalidatePath("/")
// ============================================================

import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// ── Secret token para validar que el webhook viene de Sanity ──
// Debe coincidir con el token configurado en:
// 1. Vercel: Settings > Environment Variables > SANITY_REVALIDATE_SECRET
// 2. Sanity: manage.sanity.io > API > Webhooks > Header > Authorization
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

// ── Body del webhook de Sanity ──
interface SanityWebhookBody {
  _id: string;
  _type: string;
  title?: string;
  slug?: { current?: string };
  transition: "create" | "update" | "delete" | "disappear" | "appear";
  ids?: string[];
}

export async function POST(request: NextRequest) {
  // ── 1. Verificar secret token ──
  if (!REVALIDATE_SECRET) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET no configurado");
    return NextResponse.json(
      { message: "Error: Secret no configurado en el servidor", success: false },
      { status: 500 },
    );
  }

  // Sanity envía el secret en header "Authorization" como "Bearer <token>"
  const authHeader = request.headers.get("authorization");
  const webhookSecret = request.headers.get("x-sanity-webhook-secret");

  // Aceptar tanto header Authorization como x-sanity-webhook-secret
  const providedSecret =
    (authHeader?.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null) ||
    webhookSecret ||
    null;

  if (providedSecret !== REVALIDATE_SECRET) {
    console.warn("[revalidate] Secret invalido — rechazando webhook");
    return NextResponse.json(
      { message: "Secret invalido", success: false },
      { status: 401 },
    );
  }

  // ── 2. Parsear body del webhook ──
  let body: SanityWebhookBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Body invalido", success: false },
      { status: 400 },
    );
  }

  const { _type, _id, transition } = body;

  if (!_type || !_id) {
    return NextResponse.json(
      { message: "Faltan campos requeridos (_type, _id)", success: false },
      { status: 400 },
    );
  }

  console.log(`[revalidate] Webhook recibido: ${transition} ${_type} (${_id})`);

  // ── 3. Revalidar según tipo de documento ──
  const revalidatedPaths: string[] = [];
  const revalidatedTags: string[] = [];

  try {
    // Tipos que afectan la página principal
    const affectsHomePage = [
      "homeContent",
      "product",
      "category",
      "siteSettings",
    ].includes(_type);

    if (affectsHomePage) {
      // Revalidar toda la página principal (contiene todos los componentes)
      revalidatePath("/");
      revalidatedPaths.push("/");

      // Tags granulares para revalidación específica
      // Next.js 16: revalidateTag requiere 2 args (tag, profile)
      if (_type === "product") {
        revalidateTag("products", "default");
        revalidatedTags.push("products");
      }
      if (_type === "category") {
        revalidateTag("categories", "default");
        revalidatedTags.push("categories");
      }
      if (_type === "homeContent") {
        revalidateTag("home-content", "default");
        revalidatedTags.push("home-content");
      }
      if (_type === "siteSettings") {
        revalidateTag("site-settings", "default");
        revalidatedTags.push("site-settings");
      }
    }

    console.log(
      `[revalidate] OK: ${revalidatedPaths.length} rutas, ${revalidatedTags.length} tags`,
    );

    return NextResponse.json({
      message: `Revalidacion exitosa: ${transition} ${_type}`,
      success: true,
      revalidated: { paths: revalidatedPaths, tags: revalidatedTags },
    });
  } catch (error) {
    console.error(`[revalidate] Error:`, error);
    return NextResponse.json(
      { message: "Error interno al revalidar", success: false },
      { status: 500 },
    );
  }
}

// ── GET: Endpoint de verificación ──
export async function GET() {
  return NextResponse.json({
    message: "Webhook de revalidacion activo. Usa POST para revalidar.",
    configured: !!REVALIDATE_SECRET,
  });
}

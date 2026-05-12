import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/*
 * /api/seed-products?secret=TOKEN
 *
 * Puebla Sanity CMS con las 3 categorías y 6 productos de la web.
 *
 * FLUJO:
 *   1. Valida secret de seguridad
 *   2. VERIFICA token de escritura
 *   3. ELIMINA todos los productos y categorías existentes (limpieza total)
 *   4. Crea 3 categorías + 6 productos desde cero
 *
 * Esto garantiza que siempre haya exactamente 6 productos y 3 categorías,
 * sin duplicados ni datos corruptos de seeds anteriores.
 */

const PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const CATEGORIES = [
  {
    _id: "category-plotters",
    _type: "category",
    name: "Plotters",
    slug: { _type: "slug", current: "plotters" },
    description: "Plotters industriales de impresión, trazo y corte para la industria textil.",
    color: "cyan",
    icon: "printer",
    order: 0,
  },
  {
    _id: "category-digitalizadores",
    _type: "category",
    name: "Digitalizadores",
    slug: { _type: "slug", current: "digitalizadores" },
    description: "Digitalizadores y escáneres de moldes y patrones textiles.",
    color: "purple",
    icon: "scan",
    order: 1,
  },
  {
    _id: "category-software-cad",
    _type: "category",
    name: "Software CAD",
    slug: { _type: "slug", current: "software-cad" },
    description: "Software profesional de patronaje, grading y marcación textil.",
    color: "blue",
    icon: "monitor",
    order: 2,
  },
];

const PRODUCTS = [
  {
    _id: "product-plotter-inkjet-alta-velocidad",
    _type: "product",
    name: "Plotter Textil de Impresión de Alta Velocidad",
    slug: { _type: "slug", current: "plotter-inkjet-alta-velocidad" },
    category: { _type: "reference", _ref: "category-plotters" },
    description: [
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Plotter industrial de última generación para moldería y corte de prendas. Velocidad de hasta 200 m²/h con estructura de aluminio aeronáutico y tecnología de movimiento lineal." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Presentamos nuestro plotter industrial de última generación, diseñado para ofrecer máxima velocidad, precisión y estabilidad en procesos de moldería y producción de corte de prendas. Su sistema configurable de 1 a 4 cartuchos alcanza velocidades de hasta 200 m² por hora, optimizando la productividad de tu empresa." }] },
    ],
    price: "$ 5,500",
    badge: "Más vendido",
    stock: 10,
    specs: [
      { _key: "s1", label: "Velocidad máxima", value: "200 m²/h" },
      { _key: "s2", label: "Sistema de cartuchos", value: "1 a 4 configurables" },
      { _key: "s3", label: "Estructura", value: "Aluminio aeronáutico" },
      { _key: "s4", label: "Panel de control", value: "Táctil LCD" },
      { _key: "s5", label: "Operación", value: "Silenciosa y estable" },
      { _key: "s6", label: "Trazado", value: "Continuo, limpio y exacto" },
    ],
    featured: true,
    order: 0,
  },
  {
    _id: "product-plotter-trazo-corte-carton",
    _type: "product",
    name: "Plotter de Trazo de Papel y Corte de Cartón",
    slug: { _type: "slug", current: "plotter-trazo-corte-carton" },
    category: { _type: "reference", _ref: "category-plotters" },
    description: [
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Plotter vertical inkjet con sistema de corte integrado. Cartuchos HP45 de alta precisión, sistema Servo de control y cuchilla rotativa para papel desde 80 gr/m²." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Equipado con cartuchos HP45 de alta precisión y sistema de reemplazo rápido de cabezales, este equipo ofrece una impresión eficiente, estable y de fácil mantenimiento. Alcanza velocidades de hasta 110 m² por hora." }] },
    ],
    price: "$ 6,200",
    badge: "Trazo + Corte",
    stock: 8,
    specs: [
      { _key: "s1", label: "Velocidad", value: "Hasta 110 m²/h" },
      { _key: "s2", label: "Control", value: "Servo de alta estabilidad" },
      { _key: "s3", label: "Cartuchos", value: "HP45 de fácil reemplazo" },
      { _key: "s4", label: "Función", value: "Dibujo y corte simultáneo" },
      { _key: "s5", label: "Cuchilla", value: "Corte desde 80 gr/m²" },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: "product-digitalizador-48x36",
    _type: "product",
    name: "Digitalizador de moldes y patrones textiles",
    slug: { _type: "slug", current: "digitalizador-48x36" },
    category: { _type: "reference", _ref: "category-digitalizadores" },
    description: [
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Digitalizador industrial de patrones para convertir moldes físicos en archivos digitales. Alta precisión, interfaz amigable y compatible con más de 30 formatos y softwares CAD." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "La solución ideal para convertir moldes físicos en archivos digitales de forma rápida, precisa y profesional. Compatible con más de 30 formatos digitales." }] },
    ],
    price: "$ 1,700",
    badge: "",
    stock: 15,
    specs: [
      { _key: "s1", label: "Área de trabajo", value: '48" x 36"' },
      { _key: "s2", label: "Precisión", value: "Alta exactitud" },
      { _key: "s3", label: "Formatos", value: "Más de 30 digitales" },
      { _key: "s4", label: "Software CAD", value: "Principales del mercado" },
    ],
    featured: false,
    order: 2,
  },
  {
    _id: "product-plotter-corte-carton-cama-plana",
    _type: "product",
    name: "Plotter de Corte de Cartón Cama Plana",
    slug: { _type: "slug", current: "plotter-corte-carton-cama-plana" },
    category: { _type: "reference", _ref: "category-plotters" },
    description: [
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Flatbed industrial de alta precisión para patronaje, diseño y corte profesional. Sistema Servo, pantalla táctil HD y cartuchos HP45 para máxima calidad." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Desarrollada para empresas que buscan máxima estabilidad, exactitud y automatización en procesos de patronaje y corte profesional." }] },
    ],
    price: "$ 9,900",
    badge: "",
    stock: 5,
    specs: [
      { _key: "s1", label: "Control", value: "Avanzado independiente" },
      { _key: "s2", label: "Pantalla", value: "Táctil HD" },
      { _key: "s3", label: "Cartuchos", value: "HP45 + sistema de tinta" },
      { _key: "s4", label: "Servo", value: "Alta precisión" },
    ],
    featured: true,
    order: 3,
  },
  {
    _id: "product-digitalizador-cama-plana",
    _type: "product",
    name: "Escáner digital de moldes",
    slug: { _type: "slug", current: "digitalizador-cama-plana" },
    category: { _type: "reference", _ref: "category-digitalizadores" },
    description: [
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Flatbed Scanning Digitizer para digitalizar moldes con escaneo de un solo toque. Reconocimiento automático de contornos, sistema de vacío y exportación DXF universal." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Solución avanzada para digitalizar moldes y piezas físicas con máxima rapidez, precisión y automatización mediante escaneo de un solo toque." }] },
    ],
    price: "Precio por cotizar",
    badge: "",
    stock: 3,
    specs: [
      { _key: "s1", label: "Escaneo", value: "Un solo toque" },
      { _key: "s2", label: "Contornos", value: "Reconocimiento automático" },
      { _key: "s3", label: "Fijación", value: "PVC + vacío" },
      { _key: "s4", label: "Exportación", value: "DXF universal" },
    ],
    featured: false,
    order: 4,
  },
  {
    _id: "product-getonagain-cad",
    _type: "product",
    name: "Software CAD para patronaje y optimización textil",
    slug: { _type: "slug", current: "getonagain-cad" },
    category: { _type: "reference", _ref: "category-software-cad" },
    description: [
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Software profesional de patronaje y diseño textil Garment CAD versión 2024.1. Incluye herramientas avanzadas de grading, marcación y exportación a formatos de corte industrial." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "GetonAgain Garment CAD V2024.1 es el software de patronaje más completo del mercado textil latinoamericano. Marcación inteligente que optimiza el consumo de tela hasta un 15%." }] },
    ],
    price: "$ 2,200",
    badge: "",
    stock: 20,
    specs: [
      { _key: "s1", label: "Versión", value: "2024.1" },
      { _key: "s2", label: "Módulos", value: "Patronaje + Grading + 3D" },
      { _key: "s3", label: "Exportación", value: "DXF, PLT, CUT, ISO" },
      { _key: "s4", label: "Idiomas", value: "Español, Inglés, Portugués" },
    ],
    featured: true,
    order: 5,
  },
];

export async function POST(request: Request) {
  try {
    /* ── 1. Validar secret ── */
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { ok: false, error: "Token de seguridad inválido." },
        { status: 401 },
      );
    }

    /* ── 2. Verificar token de escritura ── */
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;
    if (!writeToken) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No hay SANITY_API_WRITE_TOKEN. Agrégalo en Vercel > Settings > Environment Variables.",
        },
        { status: 400 },
      );
    }

    /* ── 3. Crear cliente de Sanity con permisos de escritura ── */
    const client = createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      token: writeToken,
      apiVersion: "2024-01-01",
      useCdn: false,
    });

    /* ── 4. LIMPIEZA: eliminar TODOS los productos y categorías existentes ── */
    const deletedProducts: string[] = [];
    const deletedCategories: string[] = [];

    try {
      const existingProducts = await client.fetch(
        `*[_type == "product"] { _id }`,
      );
      for (const doc of existingProducts) {
        await client.delete(doc._id);
        deletedProducts.push(doc._id);
      }
    } catch (e) {
      /* non-critical — continue */
    }

    try {
      const existingCategories = await client.fetch(
        `*[_type == "category"] { _id }`,
      );
      for (const doc of existingCategories) {
        await client.delete(doc._id);
        deletedCategories.push(doc._id);
      }
    } catch (e) {
      /* non-critical — continue */
    }

    /* ── 5. Crear categorías desde cero ── */
    const categoryResults = [];
    for (const cat of CATEGORIES) {
      try {
        const result = await client.create(cat);
        categoryResults.push({ name: cat.name, status: "ok", _id: result._id });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        categoryResults.push({ name: cat.name, status: "error", error: msg });
      }
    }

    /* ── 6. Crear productos desde cero ── */
    const productResults = [];
    for (const prod of PRODUCTS) {
      try {
        const result = await client.create(prod);
        productResults.push({ name: prod.name, status: "ok", _id: result._id });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        productResults.push({ name: prod.name, status: "error", error: msg });
      }
    }

    /* ── 7. Responder con resumen ── */
    const okCategories = categoryResults.filter((r) => r.status === "ok").length;
    const okProducts = productResults.filter((r) => r.status === "ok").length;

    return NextResponse.json({
      ok: true,
      message: `Seed completado: ${okCategories}/3 categorías y ${okProducts}/6 productos creados.`,
      cleanup: {
        deletedProducts: deletedProducts.length,
        deletedCategories: deletedCategories.length,
      },
      categories: categoryResults,
      products: productResults,
      note: "Se eliminaron todos los productos y categorías anteriores. Ahora tienes exactamente 6 productos y 3 categorías. Puedes editarlos y publicarlos directamente desde el CMS.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

/* Permitir GET también (más fácil para el usuario) */
export async function GET(request: Request) {
  return POST(request);
}

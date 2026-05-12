import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/*
 * /api/seed-products?secret=TOKEN
 *
 * Puebla Sanity CMS con las 3 categorías y 6 productos de la web.
 * Solo se ejecuta si:
 *   1. Se envía ?secret= con el SANITY_REVALIDATE_SECRET correcto
 *   2. Existe SANITY_API_WRITE_TOKEN en las variables de entorno
 *
 * Los productos creados en Sanity REEMPLAZARÁN a los estáticos del
 * código fuente cuando coincidan por slug. Los productos estáticos
 * siempre aparecen como fallback — NUNCA desaparecen de la web.
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
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Presentamos nuestro plotter industrial de última generación, diseñado para ofrecer máxima velocidad, precisión y estabilidad en procesos de moldería y producción de corte de prendas. Su sistema configurable de 1 a 4 cartuchos alcanza velocidades de hasta 200 m² por hora, optimizando la productividad de tu empresa. Fabricado con estructura de aluminio aeronáutico y componentes de alta precisión, garantiza trazados continuos, limpios y exactos incluso en trabajos de alta demanda." }] },
    ],
    price: "$ 5,500",
    badge: "Más vendido",
    stock: 10,
    specs: [
      { label: "Velocidad máxima", value: "200 m²/h" },
      { label: "Sistema de cartuchos", value: "1 a 4 configurables" },
      { label: "Estructura", value: "Aluminio aeronáutico" },
      { label: "Panel de control", value: "Táctil LCD" },
      { label: "Operación", value: "Silenciosa y estable" },
      { label: "Trazado", value: "Continuo, limpio y exacto" },
      { label: "Protección", value: "Visor de correas y cabezales" },
      { label: "Mantenimiento", value: "Bajo, diseño duradero" },
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
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Equipado con cartuchos HP45 de alta precisión y sistema de reemplazo rápido de cabezales, este equipo ofrece una impresión eficiente, estable y de fácil mantenimiento. Su avanzada tecnología con sistema de control Servo permite realizar trazos y cortes mucho más rápidos y precisos, alcanzando velocidades de hasta 110 m² por hora." }] },
    ],
    price: "$ 6,200",
    badge: "",
    stock: 8,
    specs: [
      { label: "Velocidad de impresión", value: "Hasta 110 m²/h" },
      { label: "Sistema de control", value: "Servo de alta estabilidad" },
      { label: "Cartuchos", value: "HP45 de fácil reemplazo" },
      { label: "Función", value: "Dibujo y corte simultáneo" },
      { label: "Cuchilla rotativa", value: "Corte desde 80 gr/m²" },
      { label: "Pantalla", value: "Táctil de configuración rápida" },
      { label: "Eficiencia", value: "3 a 5x vs métodos manuales" },
      { label: "Operación", value: "Rápida, precisa y silenciosa" },
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
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "La solución ideal para convertir moldes físicos en archivos digitales de forma rápida, precisa y profesional. Gracias a su sistema de lectura de alta exactitud, permite digitalizar patrones con gran precisión, optimizando el trabajo de diseño, escalado y producción en la industria de confección y moda." }] },
    ],
    price: "$ 1,700",
    badge: "",
    stock: 15,
    specs: [
      { label: "Área de trabajo", value: '48" x 36"' },
      { label: "Precisión de lectura", value: "Alta exactitud" },
      { label: "Formatos compatibles", value: "Más de 30 formatos digitales" },
      { label: "Software CAD", value: "Principales del mercado" },
      { label: "Aplicaciones", value: "Confección, moda, patronaje" },
      { label: "Interfaz", value: "Amigable e intuitiva" },
      { label: "Operación", value: "Sencilla y cómoda" },
      { label: "Integración", value: "Rápida y profesional" },
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
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "Desarrollada para empresas que buscan máxima estabilidad, exactitud y automatización en procesos de patronaje, diseño y corte profesional. Su moderna pantalla táctil HD ofrece una interacción hombre-máquina intuitiva y sencilla, facilitando una operación más rápida, eficiente y cómoda para el usuario." }] },
    ],
    price: "$ 9,900",
    badge: "",
    stock: 5,
    specs: [
      { label: "Sistema de control", value: "Avanzado independiente" },
      { label: "Pantalla", value: "Táctil HD" },
      { label: "Cartuchos", value: "HP45 + sistema de tinta" },
      { label: "Sistema Servo", value: "Alta precisión en alineación" },
      { label: "Impresión", value: "Tinta uniforme y HD" },
      { label: "Corte", value: "Altamente preciso" },
      { label: "Producción", value: "Jornadas continuas" },
      { label: "Operación", value: "Estable y confiable" },
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
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "La solución avanzada para digitalizar moldes y piezas físicas con máxima rapidez, precisión y automatización. Este innovador sistema reemplaza los métodos tradicionales de digitalización manual, permitiendo convertir patrones en papel y piezas cortadas físicas en archivos digitales mediante escaneo de un solo toque." }] },
    ],
    price: "Precio por cotizar",
    badge: "",
    stock: 3,
    specs: [
      { label: "Escaneo", value: "Un solo toque, alta definición" },
      { label: "Contornos", value: "Reconocimiento automático" },
      { label: "Fijación", value: "PVC + adsorción al vacío" },
      { label: "Modos de fondo", value: "Oscuro y claro intercambiables" },
      { label: "Iluminación", value: "No requiere luces adicionales" },
      { label: "Software", value: "Extracción de contornos" },
      { label: "Exportación", value: "DXF universal" },
      { label: "Compatible con", value: "Principales CAD industriales" },
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
      { _type: "block", _key: "p1", style: "normal", children: [{ _type: "span", text: "Software profesional de patronaje y diseño textil Garment CAD versión 2024.1. Incluye herramientas avanzadas de grading, marcación, modificación de patrones y exportación a formatos de corte industrial compatible con plotters CNC." }] },
      { _type: "block", _key: "p2", style: "normal", children: [{ _type: "span", text: "GetonAgain Garment CAD V2024.1 es el software de patronaje más completo del mercado textil latinoamericano. Incluye herramientas avanzadas de diseño de patrones desde cero, grading automático con tablas de medidas personalizables, marcación inteligente que optimiza el consumo de tela hasta un 15%, y exportación directa a formatos de corte compatible con todos los plotters CNC del mercado." }] },
    ],
    price: "$ 2,200",
    badge: "",
    stock: 20,
    specs: [
      { label: "Versión", value: "2024.1 (última actualización)" },
      { label: "Módulos incluidos", value: "Patronaje + Grading + Marcación + 3D" },
      { label: "Formatos de exportación", value: "DXF, PLT, CUT, ISO, CSV" },
      { label: "Idiomas", value: "Español, Inglés, Portugués, Chino" },
      { label: "Licencia", value: "Perpetua con 1 año de actualizaciones" },
      { label: "Requisitos", value: "Windows 10/11, 8 GB RAM, SSD" },
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
        {
          ok: false,
          error:
            "Token de seguridad inválido. Necesitas el secret correcto para ejecutar este endpoint.",
        },
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
            "No hay SANITY_API_WRITE_TOKEN configurado. Sigue estos pasos:\n\n" +
            "1. Ve a https://www.sanity.io/manage\n" +
            "2. Selecciona tu proyecto (Moda Digital Pro)\n" +
            "3. Ve a API > Tokens > Add API Token\n" +
            "4. Nombre: 'Seed Products'\n" +
            "5. Permissions: 'Editor' (permite crear/editar documentos)\n" +
            "6. Copia el token\n" +
            "7. En Vercel > Settings > Environment Variables, agrega:\n" +
            "   SANITY_API_WRITE_TOKEN = (tu token)\n" +
            "8. También agrégalo en .env.local localmente\n" +
            "9. Re-despliega en Vercel y vuelve a ejecutar este endpoint",
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

    /* ── 4. Crear categorías (createOrReplace = idempotente) ── */
    const categoryResults = [];
    for (const cat of CATEGORIES) {
      try {
        const result = await client.createOrReplace(cat);
        categoryResults.push({ name: cat.name, status: "ok", _id: result._id });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        categoryResults.push({ name: cat.name, status: "error", error: msg });
      }
    }

    /* ── 5. Crear productos (createOrReplace = idempotente) ── */
    const productResults = [];
    for (const prod of PRODUCTS) {
      try {
        const result = await client.createOrReplace(prod);
        productResults.push({ name: prod.name, status: "ok", _id: result._id });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        productResults.push({ name: prod.name, status: "error", error: msg });
      }
    }

    /* ── 6. Responder con resumen ── */
    const okCategories = categoryResults.filter((r) => r.status === "ok").length;
    const okProducts = productResults.filter((r) => r.status === "ok").length;

    return NextResponse.json({
      ok: true,
      message: `Seed completado: ${okCategories}/3 categorías y ${okProducts}/6 productos creados en Sanity CMS.`,
      categories: categoryResults,
      products: productResults,
      note: "Los productos ahora aparecen en el CMS bajo 'Productos'. En la web, los datos de Sanity REEMPLAZAN a los estáticos cuando coinciden por slug. Los productos estáticos siempre aparecen como fallback.",
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

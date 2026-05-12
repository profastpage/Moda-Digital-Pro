// ============================================================
// FAST PAGE PRO — Script de Migración: Productos a Sanity CMS
// Crea 3 categorías + 6 productos con imágenes subidas a Assets.
//
// USO:
//   cd Moda-Digital-Pro
//   node scripts/migrate-products.mjs
//
// REQUISITOS:
//   - @sanity/client instalado
//   - NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local
//   - NEXT_PUBLIC_SANITY_DATASET en .env.local
//
// NOTA: Este script es IDEMPOTENTE — si el documento ya existe
// (mismo slug), lo actualiza en lugar de crear duplicados.
// ============================================================

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// ── Leer .env.local manualmente (sin dotenv) ──
function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ No se encontró .env.local");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    env[key] = value;
  }
  return env;
}

const env = loadEnv();

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID no está definido en .env.local");
  process.exit(1);
}

console.log(`📦 Proyecto: ${projectId} / ${dataset}`);

// ── Cliente de Sanity con permisos de escritura ──
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: env.SANITY_API_READ_TOKEN || undefined,
});

// ── Datos de categorías ──
const CATEGORIES = [
  {
    _id: "category-plotters",
    name: "Plotters",
    slug: { _type: "slug", current: "plotters" },
    description: "Plotters textiles industriales de alta velocidad para trazado, impresión y corte.",
    color: "cyan",
    icon: "printer",
    order: 1,
  },
  {
    _id: "category-digitalizadores",
    name: "Digitalizadores",
    slug: { _type: "slug", current: "digitalizadores" },
    description: "Digitalizadores y escáneres para convertir moldes físicos en archivos digitales.",
    color: "purple",
    icon: "scan",
    order: 2,
  },
  {
    _id: "category-software-cad",
    name: "Software CAD",
    slug: { _type: "slug", current: "software-cad" },
    description: "Software profesional de patronaje, grading y marcación para producción textil.",
    color: "blue",
    icon: "monitor",
    order: 3,
  },
];

// ── Datos de productos ──
const PRODUCTS = [
  {
    _id: "product-plotter-inkjet-alta-velocidad",
    name: "Plotter Textil de Impresión de Alta Velocidad",
    slug: { _type: "slug", current: "plotter-inkjet-alta-velocidad" },
    imageFile: "product-01-plotter-inkjet-alta-velocidad.png",
    categoryRef: { _type: "reference", _ref: "category-plotters" },
    description: "Plotter industrial de última generación para moldería y corte de prendas. Velocidad de hasta 200 m²/h con estructura de aluminio aeronáutico y tecnología de movimiento lineal.",
    longDescription: "Presentamos nuestro plotter industrial de última generación, diseñado para ofrecer máxima velocidad, precisión y estabilidad en procesos de moldería y producción de corte de prendas. Su sistema configurable de 1 a 4 cartuchos alcanza velocidades de hasta 200 m² por hora, optimizando la productividad de tu empresa. Fabricado con estructura de aluminio aeronáutico y componentes de alta precisión, garantiza trazados continuos, limpios y exactos incluso en trabajos de alta demanda. Gracias a su avanzada tecnología de movimiento lineal, ofrece una operación silenciosa, estable y de baja vibración, mejorando la calidad de impresión y reduciendo errores en moldes y patrones. Cuenta con panel táctil LCD de fácil manejo, visor protector de correas y cabezales, además de un diseño pensado para brindar seguridad, durabilidad y bajo mantenimiento.",
    price: "$ 5,500",
    badge: "Más vendido",
    specs: [
      "Velocidad máxima: 200 m²/h",
      "Sistema de cartuchos: 1 a 4 configurables",
      "Estructura: Aluminio aeronáutico",
      "Panel de control: Táctil LCD",
      "Operación: Silenciosa y estable",
      "Trazado: Continuo, limpio y exacto",
      "Protección: Visor de correas y cabezales",
      "Mantenimiento: Bajo, diseño duradero",
    ],
    order: 1,
    featured: true,
  },
  {
    _id: "product-plotter-trazo-corte-carton",
    name: "Plotter de Trazo de Papel y Corte de Cartón",
    slug: { _type: "slug", current: "plotter-trazo-corte-carton" },
    imageFile: "product-02-plotter-trazo-corte-carton.png",
    categoryRef: { _type: "reference", _ref: "category-plotters" },
    description: "Plotter vertical inkjet con sistema de corte integrado. Cartuchos HP45 de alta precisión, sistema Servo de control y cuchilla rotativa para papel desde 80 gr/m².",
    longDescription: "Presentamos nuestro Plotter Vertical Inkjet de última generación, diseñado para optimizar los procesos de patronaje, dibujo y corte en la industria de confección. Equipado con cartuchos HP45 de alta precisión y sistema de reemplazo rápido de cabezales, este equipo ofrece una impresión eficiente, estable y de fácil mantenimiento. Su avanzada tecnología con sistema de control Servo permite realizar trazos y cortes mucho más rápidos y precisos, alcanzando velocidades de hasta 110 m² por hora. Su diseño multifuncional permite trabajar dibujo y corte simultáneamente o utilizar cada función de manera independiente.",
    price: "$ 6,200",
    badge: "Destacado",
    specs: [
      "Velocidad de impresión: Hasta 110 m²/h",
      "Sistema de control: Servo de alta estabilidad",
      "Cartuchos: HP45 de fácil reemplazo",
      "Función: Dibujo y corte simultáneo",
      "Cuchilla rotativa: Corte desde 80 gr/m²",
      "Pantalla: Táctil de configuración rápida",
      "Eficiencia: 3 a 5x vs métodos manuales",
      "Operación: Rápida, precisa y silenciosa",
    ],
    order: 2,
    featured: true,
  },
  {
    _id: "product-digitalizador-48x36",
    name: "Digitalizador de moldes y patrones textiles",
    slug: { _type: "slug", current: "digitalizador-48x36" },
    imageFile: "product-03-digitalizador-48x36.png",
    categoryRef: { _type: "reference", _ref: "category-digitalizadores" },
    description: "Digitalizador industrial de patrones para convertir moldes físicos en archivos digitales. Alta precisión, interfaz amigable y compatible con más de 30 formatos y softwares CAD.",
    longDescription: "Presentamos nuestro Digitalizador Industrial de Patrones, la solución ideal para convertir moldes físicos en archivos digitales de forma rápida, precisa y profesional. Diseñado para facilitar la lectura y digitalización de patrones en papel, este equipo ofrece un posicionamiento cómodo, operación sencilla y alta precisión en la captura de moldes. Compatible con más de 30 formatos digitales y programas de diseño CAD del mercado.",
    price: "$ 1,700",
    badge: "Nuevo",
    specs: [
      'Área de trabajo: 48" x 36"',
      "Precisión de lectura: Alta exactitud",
      "Formatos compatibles: Más de 30 formatos digitales",
      "Software CAD: Principales del mercado",
      "Aplicaciones: Confección, moda, patronaje",
      "Interfaz: Amigable e intuitiva",
      "Operación: Sencilla y cómoda",
      "Integración: Rápida y profesional",
    ],
    order: 3,
    featured: false,
  },
  {
    _id: "product-plotter-corte-carton-cama-plana",
    name: "Plotter de Corte de Cartón Cama Plana",
    slug: { _type: "slug", current: "plotter-corte-carton-cama-plana" },
    imageFile: "product-04-plotter-corte-cama-plana.png",
    categoryRef: { _type: "reference", _ref: "category-plotters" },
    description: "Flatbed industrial de alta precisión para patronaje, diseño y corte profesional. Sistema Servo, pantalla táctil HD y cartuchos HP45 para máxima calidad.",
    longDescription: "Presentamos nuestra Flatbed Industrial de alta precisión, desarrollada para empresas que buscan máxima estabilidad, exactitud y automatización en procesos de patronaje, diseño y corte profesional. Fabricada bajo un avanzado sistema de control desarrollado de forma independiente, esta tecnología garantiza un funcionamiento estable, preciso y confiable incluso durante largas jornadas de producción continua.",
    price: "$ 9,900",
    badge: "Destacado",
    specs: [
      "Sistema de control: Avanzado independiente",
      "Pantalla: Táctil HD",
      "Cartuchos: HP45 + sistema de tinta",
      "Sistema Servo: Alta precisión en alineación",
      "Impresión: Tinta uniforme y HD",
      "Corte: Altamente preciso",
      "Producción: Jornadas continuas",
      "Operación: Estable y confiable",
    ],
    order: 4,
    featured: true,
  },
  {
    _id: "product-digitalizador-cama-plana",
    name: "Escáner digital de moldes",
    slug: { _type: "slug", current: "digitalizador-cama-plana" },
    imageFile: "product-05-digitalizador-cama-plana.png",
    categoryRef: { _type: "reference", _ref: "category-digitalizadores" },
    description: "Flatbed Scanning Digitizer para digitalizar moldes con escaneo de un solo toque. Reconocimiento automático de contornos, sistema de vacío y exportación DXF universal.",
    longDescription: "Presentamos nuestro Flatbed Scanning Digitizer Industrial, la solución avanzada para digitalizar moldes y piezas físicas con máxima rapidez, precisión y automatización. Este innovador sistema reemplaza los métodos tradicionales de digitalización manual, permitiendo convertir patrones en papel y piezas cortadas físicas en archivos digitales mediante escaneo de un solo toque.",
    price: "Precio por cotizar",
    badge: "Nuevo",
    specs: [
      "Escaneo: Un solo toque, alta definición",
      "Contornos: Reconocimiento automático",
      "Fijación: PVC + adsorción al vacío",
      "Modos de fondo: Oscuro y claro intercambiables",
      "Iluminación: No requiere luces adicionales",
      "Software: Extracción de contornos",
      "Exportación: DXF universal",
      "Compatible con: Principales CAD industriales",
    ],
    order: 5,
    featured: false,
  },
  {
    _id: "product-getonagain-cad",
    name: "Software CAD para patronaje y optimización textil",
    slug: { _type: "slug", current: "getonagain-cad" },
    imageFile: "product-06-getonagain-cad.jpg",
    categoryRef: { _type: "reference", _ref: "category-software-cad" },
    description: "Software profesional de patronaje y diseño textil Garment CAD versión 2024.1. Incluye herramientas avanzadas de grading, marcación, modificación de patrones y exportación a formatos de corte industrial compatible con plotters CNC.",
    longDescription: "GetonAgain Garment CAD V2024.1 es el software de patronaje más completo del mercado textil latinoamericano. Esta versión incluye herramientas avanzadas de diseño de patrones desde cero, grading automático con tablas de medidas personalizables, marcación inteligente que optimiza el consumo de tela hasta un 15%, y exportación directa a formatos de corte compatible con todos los plotters CNC del mercado.",
    price: "$ 2,200",
    badge: "",
    specs: [
      "Versión: 2024.1 (última actualización)",
      "Módulos incluidos: Patronaje + Grading + Marcación + 3D",
      "Formatos de exportación: DXF, PLT, CUT, ISO, CSV",
      "Idiomas: Español, Inglés, Portugués, Chino",
      "Licencia: Perpetua con 1 año de actualizaciones",
      "Requisitos: Windows 10/11, 8 GB RAM, SSD",
    ],
    order: 6,
    featured: false,
  },
];

// ── Helpers ──

/** Convierte texto plano a Portable Text (blocks) */
function toPortableText(text) {
  return [
    {
      _type: "block",
      _key: "block-main",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "span-1",
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

/** Sube una imagen a Sanity Assets y retorna el documento de imagen */
async function uploadImage(filePath, filename) {
  const fullPath = path.join(PROJECT_ROOT, "public", "images", filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  Imagen no encontrada: ${filePath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/webp";

  console.log(`  📤 Subiendo ${filePath} (${(fileBuffer.length / 1024 / 1024).toFixed(1)} MB)...`);

  try {
    const asset = await client.assets.upload("image", fileBuffer, {
      filename,
      contentType,
    });
    console.log(`  ✅ Asset creado: ${asset._id}`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`  ❌ Error subiendo ${filePath}:`, err.message);
    return null;
  }
}

// ── MAIN ──

async function main() {
  console.log("\n🚀 Iniciando migración de productos a Sanity CMS\n");

  // ── PASO 1: Crear categorías ──
  console.log("📋 PASO 1: Creando categorías...");
  for (const cat of CATEGORIES) {
    try {
      // Usar createOrReplace para idempotencia
      await client.createOrReplace({
        _id: cat._id,
        _type: "category",
        ...cat,
      });
      console.log(`  ✅ Categoría: ${cat.name} (${cat.slug.current})`);
    } catch (err) {
      console.error(`  ❌ Error creando ${cat.name}:`, err.message);
    }
  }
  console.log("");

  // ── PASO 2: Crear productos con imágenes ──
  console.log("📦 PASO 2: Creando productos...");

  for (const product of PRODUCTS) {
    console.log(`\n  ── ${product.name} ──`);

    // Subir imagen principal
    const imageDoc = await uploadImage(product.imageFile, product.imageFile);

    // Construir documento
    const doc = {
      _id: product._id,
      _type: "product",
      name: product.name,
      slug: product.slug,
      description: toPortableText(product.longDescription),
      category: product.categoryRef,
      price: product.price,
      specs: product.specs,
      stock: 0,
      badge: product.badge || "",
      featured: product.featured,
      order: product.order,
    };

    if (imageDoc) {
      doc.image = imageDoc;
    }

    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ Producto creado: ${product.name} (${product.slug.current})`);
    } catch (err) {
      console.error(`  ❌ Error creando ${product.name}:`, err.message);
    }
  }

  console.log("\n🎉 Migración completada.\n");
  console.log("📌 Verifica los resultados en:");
  console.log(`   https://www.sanity.io/manage/project/${projectId}/datasets/${dataset}/content`);
}

main().catch((err) => {
  console.error("💥 Error fatal:", err);
  process.exit(1);
});

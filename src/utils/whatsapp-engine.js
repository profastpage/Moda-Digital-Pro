/**
 * Moda Digital Pro — WhatsApp Engine v2
 * Centraliza el número de contacto y la generación de enlaces de WhatsApp
 * con mensajes pre-rellenados premium: doble salto de línea, negritas,
 * emojis estratégicos y encodeURIComponent.
 */

const CONTACT_NUMBER = "51944252684";

// ────────────────────────────────────────────────────────
//  Core URL builder
// ────────────────────────────────────────────────────────

/**
 * Genera un enlace de WhatsApp con un mensaje pre-rellenado.
 * Usa encodeURIComponent para manejar acentos, emojis y saltos de línea.
 * @param {string} message - Texto del mensaje (se codifica automáticamente).
 * @returns {string} URL completa de WhatsApp.
 */
export function generateWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_NUMBER}?text=${encoded}`;
}

// ────────────────────────────────────────────────────────
//  Premium message builder (product-aware)
// ────────────────────────────────────────────────────────

/**
 * Extrae la característica clave de un producto para el mensaje de WhatsApp.
 * Prioriza: badge > primera spec > fragmento de descripción.
 * @param {{ badge?: string; specs?: Array<{ label: string; value: string }>; description?: string }} product
 * @returns {string} Característica clave (≤ 50 chars).
 */
function extractKeyFeature(product) {
  if (product.badge) return product.badge;
  if (product.specs?.length > 0) return product.specs[0].value;
  if (product.description) return product.description.slice(0, 50).trim() + "…";
  return "equipo industrial";
}

/**
 * Verifica si un precio es numérico (ej: "$ 5,500" → true, "Precio por cotizar" → false).
 * @param {string|undefined} price
 * @returns {boolean}
 */
export function hasNumericPrice(price) {
  return !!price && /^\$/.test(price.trim());
}

/**
 * Construye un mensaje WhatsApp premium para un producto específico.
 *
 * ── Con precio ──
 * "¡Hola! 👋\n\nHe visto el *[Nombre]* por *$[Precio]* en su web.\n\n
 *  Deseo adquirir este equipo. ¿Podrían indicarme los pasos para la compra? 🚀"
 *
 * ── Sin precio ──
 * "¡Hola! 👋\n\nQuiero cotizar el *[Nombre]* ([característica clave]).\n\n
 *  ¿Podrían indicarme precio y disponibilidad de entrega? 📈"
 *
 * @param {{ title: string; price?: string; badge?: string; specs?: Array; description?: string }} product
 * @returns {string} Mensaje formateado listo para generateWhatsAppLink().
 */
export function buildProductMessage(product) {
  const name = product.title || "este equipo";
  const withPrice = hasNumericPrice(product.price);

  if (withPrice) {
    // ── Mensaje para productos con precio publicado ──
    return [
      "¡Hola! 👋",
      "",
      `He visto el *${name}* por *${product.price}* en su web.`,
      "",
      "Deseo adquirir este equipo. ¿Podrían indicarme los pasos para la compra? 🚀",
    ].join("\n");
  }

  // ── Mensaje para productos sin precio (cotización) ──
  const feature = extractKeyFeature(product);
  return [
    "¡Hola! 👋",
    "",
    `Quiero cotizar el *${name}* (${feature}).`,
    "",
    "¿Podrían indicarme precio y disponibilidad de entrega? 📈",
  ].join("\n");
}

/**
 * Genera la URL completa de WhatsApp para un producto,
 * combinando buildProductMessage() + generateWhatsAppLink().
 * @param {{ title: string; price?: string; badge?: string; specs?: Array; description?: string }} product
 * @returns {string} URL de WhatsApp con mensaje pre-rellenado.
 */
export function buildProductWhatsAppURL(product) {
  return generateWhatsAppLink(buildProductMessage(product));
}

// ────────────────────────────────────────────────────────
//  General-purpose WhatsApp messages (non-product)
// ────────────────────────────────────────────────────────

/** Mensaje general de cotización para el Header y ContactSection */
export const GENERAL_MESSAGES = {
  /** Usado en el Header — CTA principal del sitio */
  header:
    "¡Hola Moda Digital Pro! 👋 Me gustaría recibir información sobre sus plotters y equipos textiles. ¿Podrían asesorarme? 🏭📐",
  /** Usado en la sección Contacto — solicitud de cotización personalizada */
  contact:
    "¡Hola Moda Digital Pro! 👋 Me gustaría recibir una cotización personalizada. ¿Podrían asesorarme? 🏭📐",
};

/**
 * Genera la URL de WhatsApp para un mensaje general (header/contacto).
 * @param {"header"|"contact"} type
 * @returns {string} URL de WhatsApp.
 */
export function buildGeneralWhatsAppURL(type = "header") {
  const message = GENERAL_MESSAGES[type] || GENERAL_MESSAGES.header;
  return generateWhatsAppLink(message);
}

// ────────────────────────────────────────────────────────
//  WhatsApp product catalog (used by FloatingWhatsApp panel)
// ────────────────────────────────────────────────────────

/**
 * Catálogo de productos con mensajes personalizados para WhatsApp.
 * Cada entrada usa el mismo formato premium con doble salto de línea,
 * negritas (*texto*) y emojis estratégicos.
 *
 * NOTA: Estos mensajes son para el panel flotante rápido.
 * Para el modal de producto, usa buildProductMessage() directamente.
 */
export const WHATSAPP_PRODUCTS = [
  {
    id: 1,
    name: "Plotter Textil de Impresión de Alta Velocidad",
    image: "/images/product-01-plotter-inkjet-alta-velocidad.png",
    message: [
      "¡Hola! 👋",
      "",
      "He visto el *Plotter Textil de Impresión de Alta Velocidad* por *$ 5,500* en su web.",
      "",
      "Deseo adquirir este equipo. ¿Podrían indicarme los pasos para la compra? 🚀",
    ].join("\n"),
  },
  {
    id: 2,
    name: "Plotter de Trazo de Papel y Corte de Cartón",
    image: "/images/product-02-plotter-trazo-corte-carton.png",
    message: [
      "¡Hola! 👋",
      "",
      "Quiero cotizar el *Plotter de Trazo de Papel y Corte de Cartón* (Trazo + Corte).",
      "",
      "¿Podrían indicarme precio y disponibilidad de entrega? 📈",
    ].join("\n"),
  },
  {
    id: 3,
    name: "Digitalizador de moldes y patrones textiles",
    image: "/images/product-03-digitalizador-48x36.png",
    message: [
      "¡Hola! 👋",
      "",
      "He visto el *Digitalizador de moldes y patrones textiles* por *$ 1,700* en su web.",
      "",
      "Deseo adquirir este equipo. ¿Podrían indicarme los pasos para la compra? 🚀",
    ].join("\n"),
  },
  {
    id: 4,
    name: "Plotter de Corte de Cartón Cama Plana",
    image: "/images/product-04-plotter-corte-cama-plana.png",
    message: [
      "¡Hola! 👋",
      "",
      "He visto el *Plotter de Corte de Cartón Cama Plana* por *$ 9,900* en su web.",
      "",
      "Deseo adquirir este equipo. ¿Podrían indicarme los pasos para la compra? 🚀",
    ].join("\n"),
  },
  {
    id: 5,
    name: "Escáner digital de moldes",
    image: "/images/product-05-digitalizador-cama-plana.png",
    message: [
      "¡Hola! 👋",
      "",
      "Quiero cotizar el *Escáner digital de moldes* (Escaneo Automático).",
      "",
      "¿Podrían indicarme precio y disponibilidad de entrega? 📈",
    ].join("\n"),
  },
  {
    id: 6,
    name: "Software CAD para patronaje y optimización textil",
    image: "/images/product-06-getonagain-cad.jpg",
    message: [
      "¡Hola! 👋",
      "",
      "He visto el *Software CAD para patronaje y optimización textil* por *$ 2,200* en su web.",
      "",
      "Deseo adquirir este equipo. ¿Podrían indicarme los pasos para la compra? 🚀",
    ].join("\n"),
  },
];

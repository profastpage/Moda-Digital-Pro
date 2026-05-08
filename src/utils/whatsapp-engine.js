/**
 * Moda Digital Pro — WhatsApp Engine
 * Centraliza el número de contacto y la generación de enlaces de WhatsApp
 * con mensajes pre-rellenados para cada producto del catálogo.
 */

const CONTACT_NUMBER = "51944252684";

/**
 * Genera un enlace de WhatsApp con un mensaje pre-rellenado.
 * @param {string} message - Texto del mensaje (se codifica automáticamente).
 * @returns {string} URL completa de WhatsApp.
 */
export function generateWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_NUMBER}?text=${encoded}`;
}

/**
 * Catálogo de productos con mensajes personalizados para WhatsApp.
 * Cada producto incluye emoji contextual, nombre, specs clave,
 * solicitud de precio y disponibilidad.
 */
export const WHATSAPP_PRODUCTS = [
  {
    id: 1,
    name: "Digitalizador de Escaneo Plano",
    image: "/images/product-01-escaneo-plano.jpg",
    message:
      "📋 ¡Hola! Me interesa el *Digitalizador de Escaneo Plano* (1800×1200mm, 600dpi). Vi que exporta a DXF, PLT, AI, SVG, PDF y es compatible con GetonAgain, Lectra y Gerber. ¿Podrían enviarme precio y disponibilidad? 📐✨",
  },
  {
    id: 2,
    name: "Plotter de Corte de Inyección Vertical",
    image: "/images/product-02-plotter-corte-vertical.jpg",
    message:
      "🖨️ Hola Moda Digital Pro, necesito cotizar el *Plotter de Corte de Inyección de Tinta Vertical* (1600mm, 45m²/h, 1440dpi). ¿Tienen stock disponible? ¿Cuál es el precio? ¿Incluye tintas pigmentadas CMYK? 📏",
  },
  {
    id: 3,
    name: "Plotter de Corte de Inyección Cama Plana",
    image: "/images/product-03-plotter-corte-cama-plana.jpg",
    message:
      "⚙️ ¡Buen día! Quiero información del *Plotter de Corte de Inyección de Tinta de Cama Plana* (1800×2500mm, 1440dpi, succión programable). Por favor envíenme ficha técnica, precio y disponibilidad inmediata. 📐",
  },
  {
    id: 4,
    name: "Digitalizador de Escaneo Plano (Gran Formato)",
    image: "/images/product-04-escaneo-plano-2.jpg",
    message:
      "🚀 Hola, estoy interesado en el *Digitalizador de Escaneo Plano de Gran Formato* (1118mm, 1200dpi, 48-bit). Vi que maneja TIFF, JPEG, PNG, PDF y DXF. ¿Cuál es el precio y hay stock disponible? 📂",
  },
  {
    id: 5,
    name: "Digitalizador Compacto",
    image: "/images/product-05-digitalizador.jpg",
    message:
      "💎 ¡Hola! Quiero cotizar el *Digitalizador Compacto* (A3+, 1200dpi, USB-C, 4.2kg). ¿Podrían indicarme precio, disponibilidad y si incluye software de vectorización? ✂️",
  },
  {
    id: 6,
    name: "Software GetonAgain Garment CAD V2024.1",
    image: "/images/product-06-getonagain-cad.jpg",
    message:
      "💻 ¡Hola! Me interesa la licencia de *GetonAgain Garment CAD V2024.1* (Patronaje + Grading + Marcación + 3D). ¿Incluye 1 año de actualizaciones? ¿Precio y disponibilidad inmediata? 👕",
  },
];

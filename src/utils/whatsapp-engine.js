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
    name: "Plotter Inkjet de Alta Velocidad",
    image: "/images/product-01-plotter-inkjet-alta-velocidad.png",
    message:
      "📋 ¡Hola! Me interesa el *Plotter Inkjet de Alta Velocidad* (200 m²/h, aluminio aeronáutico, 1-4 cartuchos, panel táctil LCD). ¿Podrían enviarme precio y disponibilidad? 📐✨",
  },
  {
    id: 2,
    name: "Plotter de Trazo de Papel y Corte de Cartón",
    image: "/images/product-02-plotter-trazo-corte-carton.png",
    message:
      "🖨️ Hola Moda Digital Pro, necesito cotizar el *Plotter de Trazo de Papel y Corte de Cartón* (110 m²/h, Servo, HP45, cuchilla rotativa). ¿Tienen stock disponible? ¿Cuál es el precio? 📏",
  },
  {
    id: 3,
    name: "Digitalizador de 48x36",
    image: "/images/product-03-digitalizador-48x36.png",
    message:
      "⚙️ ¡Buen día! Quiero información del *Digitalizador de 48x36* (compatible con +30 formatos CAD, alta precisión). Por favor envíenme precio y disponibilidad. 📐",
  },
  {
    id: 4,
    name: "Plotter de Corte de Cartón Cama Plana",
    image: "/images/product-04-plotter-corte-cama-plana.png",
    message:
      "🚀 Hola, estoy interesado en el *Plotter de Corte de Cartón Cama Plana* (Flatbed industrial, Servo, HP45, pantalla táctil HD). ¿Cuál es el precio y hay stock disponible? 📂",
  },
  {
    id: 5,
    name: "Digitalizador de Cama Plana",
    image: "/images/product-05-digitalizador-cama-plana.png",
    message:
      "💎 ¡Hola! Quiero cotizar el *Digitalizador de Cama Plana* (escaneo un solo toque, vacío, DXF universal, reconocimiento automático de contornos). ¿Podrían indicarme precio y disponibilidad? ✂️",
  },
  {
    id: 6,
    name: "Software GetonAgain Garment CAD V2024.1",
    image: "/images/product-06-getonagain-cad.jpg",
    message:
      "💻 ¡Hola! Me interesa la licencia de *GetonAgain Garment CAD V2024.1* (Patronaje + Grading + Marcación + 3D). ¿Incluye 1 año de actualizaciones? ¿Precio y disponibilidad inmediata? 👕",
  },
];

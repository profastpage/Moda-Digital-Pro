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
 * Cada producto incluye su miniatura, nombre y mensaje de consulta único.
 */
export const WHATSAPP_PRODUCTS = [
  {
    id: 1,
    name: "Digitalizador de Escaneo Plano",
    image: "/images/product-01-escaneo-plano.jpg",
    message:
      "¡Hola! 👋 Me interesa recibir información técnica y precio del *Digitalizador de Escaneo Plano* para patrones y moldes. 📂✨",
  },
  {
    id: 2,
    name: "Plotter de Corte de Inyección Vertical",
    image: "/images/product-02-plotter-corte-vertical.jpg",
    message:
      "Hola Moda Digital Pro, me gustaría cotizar el *Plotter de Corte de Inyección de Tinta Vertical*. ¿Tienen stock disponible? 🖨️📏",
  },
  {
    id: 3,
    name: "Plotter de Corte de Inyección Cama Plana",
    image: "/images/product-03-plotter-corte-cama-plana.jpg",
    message:
      "¡Hola! Solicito detalles y ficha técnica del *Plotter de Corte de Inyección de Tinta de Cama Plana*. ⚙️📐",
  },
  {
    id: 4,
    name: "Digitalizador de Escaneo Plano (Gran Formato)",
    image: "/images/product-04-escaneo-plano-2.jpg",
    message:
      "Buen día, deseo información sobre el *Digitalizador de Escaneo Plano de Gran Formato*. Me interesa para mi flujo de producción. 🚀📂",
  },
  {
    id: 5,
    name: "Digitalizador Compacto",
    image: "/images/product-05-digitalizador.jpg",
    message:
      "Hola, estoy interesado en el *Digitalizador Compacto* de alto rendimiento. Por favor, envíenme modelos y precios. 💎✂️",
  },
  {
    id: 6,
    name: "Software GetonAgain Garment CAD V2024.1",
    image: "/images/product-06-getonagain-cad.jpg",
    message:
      "¡Hola! Me interesa la licencia del *Software GetonAgain Garment CAD V2024.1*. ¿Qué incluye la versión de este año? 💻👕",
  },
];

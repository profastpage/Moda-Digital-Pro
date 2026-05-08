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
    name: "Plotter Sublimación Industrial",
    image: "/images/product-01-escaneo-plano.jpg",
    message:
      "¡Hola! 👋 Me interesa recibir información técnica y el precio del *Plotter de Sublimación Industrial*. Quedo atento. 🖨️✨",
  },
  {
    id: 2,
    name: "Plotter Textil Gran Formato",
    image: "/images/product-02-plotter-corte-vertical.jpg",
    message:
      "Hola Moda Digital Pro, me gustaría cotizar el *Plotter Textil de Gran Formato* y conocer las facilidades de pago. 📏👕",
  },
  {
    id: 3,
    name: "Impresora DTF Alta Resolución",
    image: "/images/product-03-plotter-corte-cama-plana.jpg",
    message:
      "¡Hola! Solicito detalles sobre la *Impresora DTF de Alta Resolución*. Me interesa para un proyecto de producción moderna. 🚀🔥",
  },
  {
    id: 4,
    name: "Calandra de Transferencia Térmica",
    image: "/images/product-04-escaneo-plano-2.jpg",
    message:
      "Buen día, deseo información sobre la *Calandra de Transferencia Térmica*. ¿Podrían enviarme la ficha técnica? ⚙️⚡",
  },
  {
    id: 5,
    name: "Plotter de Corte de Precisión",
    image: "/images/product-05-digitalizador.jpg",
    message:
      "Hola, estoy interesado en el *Plotter de Corte de Precisión*. Por favor, envíenme modelos disponibles y precios. ✂️💎",
  },
  {
    id: 6,
    name: "Kit de Insumos Premium (Tintas/Papel)",
    image: "/images/product-06-getonagain-cad.jpg",
    message:
      "¡Hola! Quisiera consultar por el *Stock de Insumos y Tintas Premium* para mis equipos industriales. 🎨📦",
  },
];

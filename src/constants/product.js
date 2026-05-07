/**
 * Moda Digital Pro — Central Data File
 * Todos los textos, rutas de imágenes y datos editables están centralizados aquí.
 * Preparación para Panel Admin: conectar este módulo a una API o CMS.
 */

const SITE_CONFIG = {
  brand: "Moda Digital Pro",
  tagline: "Construimos tu solución en Moda Digital",
  description:
    "Plotter Textil de alta precisión. Tecnología de grado aeronáutico para impresión de trazos a gran escala.",
  cta: {
    label: "Cotizar Plotter $5,600",
    href: "#contacto",
  },
  whatsapp: "https://wa.me/51999999999",
};

const NAV_ITEMS = [
  { label: "Productos", href: "#productos" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

const HERO_ROTATIONS = [
  {
    title: "La nueva generación del trazado industrial",
    subtitle:
      "Plotters de alta velocidad fabricados con componentes electrónicos de clase mundial, estructura en aluminio aeronáutico y panel táctil inteligente.",
  },
  {
    title: "Diseñados para producción de alto rendimiento",
    subtitle:
      "Plotters industriales ultrarrápidos con estructura reforzada en aluminio aeronáutico, acabados premium y operación táctil intuitiva.",
  },
];

const HERO = {
  badge: "Moda Digital & Plotter Textil",
  title: SITE_CONFIG.tagline,
  subtitle: SITE_CONFIG.description,
  cta: SITE_CONFIG.cta,
  images: {
    desktop: ["/images/hero-1.jpg", "/images/hero-2.jpg"],
    mobile: ["/images/hero-mobile-1.jpg", "/images/hero-mobile-2.jpg"],
  },
  scrollLabel: "Descubre más",
};

const PRODUCTS = [
  {
    id: "escaneo-plano-1",
    title: "Digitalizador de Escaneo Plano",
    image: "/images/product-01-escaneo-plano.jpg",
    description:
      "Sistema de digitalización de alta precisión para escaneo de patrones, moldes y diseños textiles sobre superficies planas. Captura con resolución profesional y exportación directa a formatos CAD compatibles con software de patronaje industrial.",
    price: "Cotizar",
    cta: "Cotizar Ahora",
    badge: "Escaneo",
  },
  {
    id: "plotter-corte-vertical",
    title: "Plotter de Corte de Inyección de Tinta Vertical",
    image: "/images/product-02-plotter-corte-vertical.jpg",
    description:
      "Plotter vertical de inyección de tinta con sistema de corte integrado para producción textil en continuo. Diseño compacto que optimiza espacio en el taller con alimentación por rollo y corte automatizado de alta velocidad.",
    price: "Cotizar",
    cta: "Cotizar Ahora",
    badge: "Corte + Impresión",
  },
  {
    id: "plotter-corte-cama-plana",
    title: "Plotter de Corte de Inyección de Tinta de Cama Plana",
    image: "/images/product-03-plotter-corte-cama-plana.jpg",
    description:
      "Plotter de cama plana con tecnología de inyección de tinta y cabeza de corte para materiales textiles rígidos y semirrígidos. Ideal para corte preciso sobre telas montadas, vinilos y substratos especiales.",
    price: "Cotizar",
    cta: "Cotizar Ahora",
    badge: "Cama Plana",
  },
  {
    id: "escaneo-plano-2",
    title: "Digitalizador de Escaneo Plano",
    image: "/images/product-04-escaneo-plano-2.jpg",
    description:
      "Digitalizador profesional para escaneo de documentos físicos y patrones textiles de gran formato. Alta velocidad de captura con conversión digital inmediata para integración en flujos de trabajo de diseño y producción textil.",
    price: "Cotizar",
    cta: "Cotizar Ahora",
    badge: "Gran Formato",
  },
  {
    id: "digitalizador",
    title: "Digitalizador",
    image: "/images/product-05-digitalizador.jpg",
    description:
      "Digitalizador compacto de alto rendimiento para la conversión precisa de diseños físicos a formato digital. Captura nítida con sensores de última generación para patrones, moldes y trazos textiles de cualquier escala.",
    price: "Cotizar",
    cta: "Cotizar Ahora",
    badge: "Compacto",
  },
  {
    id: "getonagain-cad",
    title: "GetonAgain Garment CAD V2024.1",
    image: "/images/product-06-getonagain-cad.jpg",
    description:
      "Software profesional de patronaje y diseño textil Garment CAD versión 2024.1. Incluye herramientas avanzadas de grading, marcación, modificación de patrones y exportación a formatos de corte industrial compatible con plotters CNC.",
    price: "Cotizar",
    cta: "Cotizar Ahora",
    badge: "Software",
  },
];

const CATALOG = [
  {
    id: "catalogo-interiores",
    title: "Estampados de Interiores",
    image: "/images/catalogo-interiores.jpg",
    description:
      "Diseños exclusivos para decoración de interiores: cortinas, tapicería y textiles para el hogar con acabados premium de alta durabilidad.",
  },
  {
    id: "catalogo-moda",
    title: "Moda Deportiva & Técnica",
    image: "/images/catalogo-moda.jpg",
    description:
      "Colecciones de estampados para ropa deportiva y técnica. Telas con propiedades de secado rápido, anti-UV y transpirables.",
  },
];

const SERVICES = [
  {
    id: "impresion-digital",
    icon: "Printer",
    title: "Impresión Digital Textil",
    description:
      "Servicio de impresión digital sobre telas de todo tipo: algodón, poliéster, lino y mezclas. Tecnología de inyección directa con tintas reactivas y pigmentadas de grado industrial. Producción desde 1 metro hasta rollos completos con colores vibrantes y fijación permanente.",
  },
  {
    id: "sublimacion",
    icon: "Flame",
    title: "Sublimación Textil",
    description:
      "Transferencia de diseños de alta definición mediante proceso de sublimación térmica. Ideal para prendas deportivas, uniformes y artículos promocionales. Garantizamos fidelidad cromática y resistencia al lavado superior a 50 ciclos.",
  },
  {
    id: "diseno-cam",
    icon: "Palette",
    title: "Diseño & CAM",
    description:
      "Servicio integral de diseño textil asistido por computadora (CAM). Digitalización de patrones, vectorización de trazos y preparación de archivos para producción en serie. Nuestro equipo especializado transforma tu creatividad en producción industrial.",
  },
];

const STATS = [
  { value: "15+", label: "Años de experiencia", icon: "TrendingUp" },
  { value: "2,400+", label: "Proyectos entregados", icon: "Layers" },
  { value: "98%", label: "Clientes satisfechos", icon: "Star" },
  { value: "48h", label: "Tiempo de entrega estándar", icon: "Clock" },
];

const ADVANTAGES = [
  {
    number: "01",
    title: "Precisión aeronáutica en cada trazo",
    description:
      "Nuestros plotters utilizan tecnología de grado aeronáutico que garantiza trazos milimétricos perfectos. Cada diseño se reproduce con una precisión superior a 0.01 mm, asegurando resultados impecables en producciones de gran escala.",
  },
  {
    number: "02",
    title: "Tintas de alta fijación y durabilidad",
    description:
      "Trabajamos exclusivamente con tintas industriales de fijación permanente. Nuestros procesos garantizan resistencia al lavado superior a 50 ciclos, resistencia UV para colores que no se decoloran con el sol, y texturas que mantienen su suavidad original.",
  },
  {
    number: "03",
    title: "Soporte técnico y capacitación incluida",
    description:
      "Cada equipo incluye instalación profesional, capacitación completa para tu equipo de producción y soporte técnico remoto durante 12 meses. Además, ofrecemos mantenimiento preventivo programado para maximizar la vida útil de tu inversión.",
  },
];

const FAQ_ITEMS = [
  {
    question: "¿Cuál es la vida útil de un plotter textil de Moda Digital Pro?",
    answer:
      "Nuestros plotters tienen una vida útil estimada de 8 a 12 años con mantenimiento adecuado. Cada equipo incluye un programa de mantenimiento preventivo que extiende significativamente la durabilidad de los cabezales de impresión y los sistemas mecánicos.",
  },
  {
    question: "¿Qué tipo de telas puedo imprimir con el Plotter T-1800?",
    answer:
      "El Plotter T-1800 es compatible con algodón, poliéster, lino, seda, tela de mezcla y substratos sintéticos. Utilizamos tintas reactivas para fibras naturales y tintas dispersas para fibras sintéticas, garantizando la mejor calidad en cada material.",
  },
  {
    question: "¿Ofrecen servicio de impresión por metro lineal?",
    answer:
      "Sí, ofrecemos impresión por metro lineal desde 1 metro mínimo hasta rollos completos. Nuestros precios varían según el tipo de tela, la cantidad y la complejidad del diseño. Contáctanos para una cotización personalizada sin compromiso.",
  },
  {
    question: "¿Incluyen capacitación al comprar un equipo?",
    answer:
      "Absolutamente. Cada compra incluye: instalación profesional en tu taller, capacitación completa de 2 días para tu equipo operativo, manual técnico detallado, y 12 meses de soporte técnico remoto. También ofrecemos cursos avanzados de diseño textil en CAM.",
  },
  {
    question: "¿Cuál es el tiempo de entrega de un pedido de impresión?",
    answer:
      "El tiempo estándar de entrega es de 48 horas para pedidos estándar y 24 horas para urgencias con recargo. Para producciones de gran volumen (más de 500 metros), el tiempo puede variar entre 3 a 5 días hábiles según la complejidad del diseño.",
  },
];

const CONTACT_INFO = {
  phone: "+51 999 999 999",
  email: "ventas@modadigitalpro.com",
  address: "Lima, Perú",
  hours: "Lun - Vie: 8:00 - 18:00 | Sáb: 9:00 - 13:00",
};

const FOOTER_LINKS = {
  productos: [
    { label: "Escaneo Plano", href: "#productos" },
    { label: "Plotter Corte Vertical", href: "#productos" },
    { label: "Plotter Cama Plana", href: "#productos" },
    { label: "GetonAgain CAD", href: "#productos" },
    { label: "Ver todos", href: "#productos" },
  ],
  servicios: [
    { label: "Impresión Digital", href: "#servicios" },
    { label: "Sublimación Textil", href: "#servicios" },
    { label: "Diseño & CAM", href: "#servicios" },
    { label: "Asesoría", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contacto" },
    { label: "Términos", href: "#" },
  ],
};

export {
  SITE_CONFIG,
  NAV_ITEMS,
  HERO_ROTATIONS,
  HERO,
  PRODUCTS,
  CATALOG,
  SERVICES,
  STATS,
  ADVANTAGES,
  FAQ_ITEMS,
  CONTACT_INFO,
  FOOTER_LINKS,
};

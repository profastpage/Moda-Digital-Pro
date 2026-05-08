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
    label: "Explorar Equipos",
    href: "#productos",
  },
  whatsapp: "https://wa.me/51944252684",
};

const NAV_ITEMS = [
  { label: "Productos", href: "#productos" },
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
  video: {
    /*
     * PLOTTER_PRINCIPAL_2.mp4 — Ultra-HD Hero Video
     * Cloud Name: dqk6ol7id
     * Public ID: PLOTTER_PRINCIPAL_2_k96ktp
     *
     * DESKTOP (PC — Alta Resolución):
     *   URL directa con q_auto:best → máxima calidad fidelidad.
     *   Streaming por bytes con cache inmutable.
     *
     * MOBILE (IA Cloudinary — Enfoque Inteligente):
     *   g_auto:subject → la IA detecta el sujeto (plotter)
     *   y lo centra al recortar de horizontal a vertical (9:16).
     *   c_fill,ar_9:16,w_720,q_auto:best → 720x1280 optimizado.
     *
     * IMPORTANTE: No agregar e_sharpen ni e_improve a las URLs
     * porque activan "backfill" on-the-fly que elimina el cache
     * y cambia accept-ranges a none, rompiendo el streaming.
     */
    raw: "https://res.cloudinary.com/dqk6ol7id/video/upload/PLOTTER_PRINCIPAL_2_k96ktp.mp4",
    desktop: "https://res.cloudinary.com/dqk6ol7id/video/upload/q_auto:best/PLOTTER_PRINCIPAL_2_k96ktp.mp4",
    mobile: "https://res.cloudinary.com/dqk6ol7id/video/upload/g_auto:subject/c_fill,ar_9:16,w_720,q_auto:best/PLOTTER_PRINCIPAL_2_k96ktp.mp4",
  },
  images: {
    desktop: ["/images/hero-1.jpg", "/images/hero-2.jpg"],
    mobile: ["/images/hero-mobile-1.jpg", "/images/hero-mobile-2.jpg"],
  },
  scrollLabel: "Descubre más",
};

const PRODUCTS = [
  {
    id: "plotter-inkjet-alta-velocidad",
    title: "Plotter Inkjet de Alta Velocidad",
    image: "/images/product-01-plotter-inkjet-alta-velocidad.png",
    description:
      "Plotter industrial de última generación para moldería y corte de prendas. Velocidad de hasta 200 m²/h con estructura de aluminio aeronáutico y tecnología de movimiento lineal.",
    price: "$ 5,500",
    cta: "Cotizar Ahora",
    badge: "Alta Velocidad",
    longDescription:
      "Presentamos nuestro plotter industrial de última generación, diseñado para ofrecer máxima velocidad, precisión y estabilidad en procesos de moldería y producción de corte de prendas. Su sistema configurable de 1 a 4 cartuchos alcanza velocidades de hasta 200 m² por hora, optimizando la productividad de tu empresa. Fabricado con estructura de aluminio aeronáutico y componentes de alta precisión, garantiza trazados continuos, limpios y exactos incluso en trabajos de alta demanda. Gracias a su avanzada tecnología de movimiento lineal, ofrece una operación silenciosa, estable y de baja vibración, mejorando la calidad de impresión y reduciendo errores en moldes y patrones. Cuenta con panel táctil LCD de fácil manejo, visor protector de correas y cabezales, además de un diseño pensado para brindar seguridad, durabilidad y bajo mantenimiento.",
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
  },
  {
    id: "plotter-trazo-corte-carton",
    title: "Plotter de Trazo de Papel y Corte de Cartón",
    image: "/images/product-02-plotter-trazo-corte-carton.png",
    description:
      "Plotter vertical inkjet con sistema de corte integrado. Cartuchos HP45 de alta precisión, sistema Servo de control y cuchilla rotativa para papel desde 80 gr/m².",
    price: "$ 6,200",
    cta: "Cotizar Ahora",
    badge: "Trazo + Corte",
    longDescription:
      "Presentamos nuestro Plotter Vertical Inkjet de última generación, diseñado para optimizar los procesos de patronaje, dibujo y corte en la industria de confección. Equipado con cartuchos HP45 de alta precisión y sistema de reemplazo rápido de cabezales, este equipo ofrece una impresión eficiente, estable y de fácil mantenimiento. Su avanzada tecnología con sistema de control Servo permite realizar trazos y cortes mucho más rápidos y precisos, alcanzando velocidades de hasta 110 m² por hora. Gracias a su alto rendimiento, logra entre 3 y 5 veces más eficiencia que los métodos tradicionales de dibujo y corte manual, reduciendo tiempos de producción y mejorando la productividad de tu empresa. Su diseño multifuncional permite trabajar dibujo y corte simultáneamente o utilizar cada función de manera independiente, adaptándose a diferentes necesidades de producción y desarrollo de muestras. Además, incorpora cuchilla rotativa de alta calidad capaz de cortar papel desde 80 gr/m², ideal para diseño de muestras y reducción de costos operativos. El sistema inteligente de alimentación de papel puede configurarse fácilmente desde su pantalla táctil, brindando una operación más cómoda, rápida e intuitiva.",
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
  },
  {
    id: "digitalizador-48x36",
    title: "Digitalizador de 48\"x36\"",
    image: "/images/product-03-digitalizador-48x36.png",
    description:
      "Digitalizador industrial de patrones para convertir moldes físicos en archivos digitales. Alta precisión, interfaz amigable y compatible con más de 30 formatos y softwares CAD.",
    price: "Precio por cotizar",
    cta: "Cotizar Ahora",
    badge: "Digitalizador",
    longDescription:
      "Presentamos nuestro Digitalizador Industrial de Patrones, la solución ideal para convertir moldes físicos en archivos digitales de forma rápida, precisa y profesional. Diseñado para facilitar la lectura y digitalización de patrones en papel, este equipo ofrece un posicionamiento cómodo, operación sencilla y alta precisión en la captura de moldes, convirtiéndose en una herramienta fundamental para modernizar procesos tradicionales de patronaje manual. Gracias a su sistema de lectura de alta exactitud, permite digitalizar patrones con gran precisión, optimizando el trabajo de diseño, escalado y producción en la industria de confección y moda. El digitalizador puede utilizarse en múltiples áreas como: industria de confección, diseño de modas, patronaje industrial, desarrollo de producto y producción textil. Cuenta con interfaz amigable y alta compatibilidad, permitiendo una integración rápida y sencilla con los principales softwares CAD del mercado. Compatible con más de 30 formatos digitales y programas de diseño.",
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
  },
  {
    id: "plotter-corte-carton-cama-plana",
    title: "Plotter de Corte de Cartón Cama Plana",
    image: "/images/product-04-plotter-corte-cama-plana.png",
    description:
      "Flatbed industrial de alta precisión para patronaje, diseño y corte profesional. Sistema Servo, pantalla táctil HD y cartuchos HP45 para máxima calidad.",
    price: "$ 9,900",
    cta: "Cotizar Ahora",
    badge: "Cama Plana",
    longDescription:
      "Presentamos nuestra Flatbed Industrial de alta precisión, desarrollada para empresas que buscan máxima estabilidad, exactitud y automatización en procesos de patronaje, diseño y corte profesional. Fabricada bajo un avanzado sistema de control desarrollado de forma independiente, esta tecnología garantiza un funcionamiento estable, preciso y confiable incluso durante largas jornadas de producción continua. Su moderna pantalla táctil HD ofrece una interacción hombre-máquina intuitiva y sencilla, facilitando una operación más rápida, eficiente y cómoda para el usuario. Equipada con sistema combinado de suministro de tinta y cartuchos HP45, proporciona una salida de tinta uniforme, estable y de alta definición, logrando líneas de impresión nítidas y precisas en cada trabajo. El avanzado sistema Servo de alta precisión asegura una alineación exacta de las líneas impresas sobre papel continuo, además de un corte altamente preciso para optimizar la calidad del patronaje y desarrollo de muestras.",
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
  },
  {
    id: "digitalizador-cama-plana",
    title: "Digitalizador de Cama Plana",
    image: "/images/product-05-digitalizador-cama-plana.png",
    description:
      "Flatbed Scanning Digitizer para digitalizar moldes con escaneo de un solo toque. Reconocimiento automático de contornos, sistema de vacío y exportación DXF universal.",
    price: "Precio por cotizar",
    cta: "Cotizar Ahora",
    badge: "Escaneo Automático",
    longDescription:
      "Presentamos nuestro Flatbed Scanning Digitizer Industrial, la solución avanzada para digitalizar moldes y piezas físicas con máxima rapidez, precisión y automatización. Este innovador sistema reemplaza los métodos tradicionales de digitalización manual, permitiendo convertir patrones en papel y piezas cortadas físicas en archivos digitales mediante escaneo de un solo toque, optimizando significativamente la eficiencia del área de patronaje y desarrollo de producto. Equipado con módulo de escaneo de alta definición, el sistema trabaja con gran precisión sin verse afectado por la iluminación ambiental, eliminando la necesidad de luces adicionales y garantizando resultados claros y exactos. Las piezas son fijadas y niveladas mediante lámina de PVC y sistema de adsorción al vacío, asegurando máxima estabilidad y precisión durante el proceso de escaneo. Además, incorpora dos modos de fondo intercambiables (oscuro y claro), permitiendo escanear piezas de diferentes colores con excelente reconocimiento y definición. Su tecnología inteligente identifica automáticamente contornos, piquetes, perforaciones y detalles del patrón, reduciendo tiempos de trabajo manual y aumentando la productividad. Incluye software de extracción de contornos y exportación en formato universal DXF, compatible con los principales sistemas CAD utilizados en patronaje industrial y diseño textil.",
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
  },
  {
    id: "getonagain-cad",
    title: "GetonAgain Garment CAD V2024.1",
    image: "/images/product-06-getonagain-cad.jpg",
    description:
      "Software profesional de patronaje y diseño textil Garment CAD versión 2024.1. Incluye herramientas avanzadas de grading, marcación, modificación de patrones y exportación a formatos de corte industrial compatible con plotters CNC.",
    price: "Precio por cotizar",
    cta: "Cotizar Ahora",
    badge: "Software",
    longDescription:
      "GetonAgain Garment CAD V2024.1 es el software de patronaje más completo del mercado textil latinoamericano. Esta versión incluye herramientas avanzadas de diseño de patrones desde cero, grading automático con tablas de medidas personalizables, marcación inteligente que optimiza el consumo de tela hasta un 15%, y exportación directa a formatos de corte compatible con todos los plotters CNC del mercado. Su interfaz ha sido rediseñada para mayor productividad, con atajos de teclado personalizables y vista previa 3D del prendido terminado.",
    specs: [
      { label: "Versión", value: "2024.1 (última actualización)" },
      { label: "Módulos incluidos", value: "Patronaje + Grading + Marcación + 3D" },
      { label: "Formatos de exportación", value: "DXF, PLT, CUT, ISO, CSV" },
      { label: "Idiomas", value: "Español, Inglés, Portugués, Chino" },
      { label: "Licencia", value: "Perpetua con 1 año de actualizaciones" },
      { label: "Requisitos", value: "Windows 10/11, 8 GB RAM, SSD" },
    ],
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
  phone: "+51 944 252 684",
  email: "ventas@modadigitalpro.com",
  address: "Lima, Perú",
  hours: "Lun - Vie: 8:00 - 18:00 | Sáb: 9:00 - 13:00",
};

const FOOTER_LINKS = {
  productos: [
    { label: "Plotter Inkjet Alta Velocidad", href: "#productos" },
    { label: "Plotter Trazo y Corte", href: "#productos" },
    { label: "Digitalizador 48x36", href: "#productos" },
    { label: "Plotter Cama Plana", href: "#productos" },
    { label: "Digitalizador Cama Plana", href: "#productos" },
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

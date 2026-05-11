// ============================================================
// MODA DIGITAL PRO — Esquema de Contenido de Página Principal
// Singleton: contiene TODAS las secciones editables del homepage
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeContent",
  title: "Contenido de Página Principal",
  type: "document",
  icon: () => "🏠",

  // ── Fieldsets: agrupación visual para UX intuitiva ──
  fieldsets: [
    {
      name: "hero",
      title: "🎬 Sección Hero",
      description: "Banner principal con rotación de textos animados y botón de acción.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "products",
      title: "📦 Sección Productos",
      description: "Encabezado y descripción de la sección de productos destacados.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "services",
      title: "🛠️ Sección Servicios",
      description: "Tarjetas de servicios profesionales ofrecidos por la empresa.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "about",
      title: "🏢 Sección Nosotros (About)",
      description: "Estadísticas, ventajas y propuesta de valor de la empresa.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "faq",
      title: "❓ Sección FAQ",
      description: "Preguntas frecuentes con respuestas desplegables.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "contact",
      title: "📞 Sección Contacto",
      description: "Información de contacto y horarios de atención.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "footer",
      title: "🦶 Footer",
      description: "Enlaces y tagline que aparecen en el pie de página.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "navigation",
      title: "🧭 Navegación",
      description: "Items del menú de navegación principal.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Fieldset: Hero ──
    defineField({
      name: "heroBadge",
      title: "Badge del Hero",
      fieldset: "hero",
      description: 'Texto del badge superior del hero. Ejemplo: "Moda Digital & Plotter Textil".',
      type: "string",
      validation: (Rule) => Rule.required().error("El badge del hero es obligatorio."),
    }),

    defineField({
      name: "heroRotations",
      title: "Rotaciones de Texto del Hero",
      fieldset: "hero",
      description:
        "Textos animados que rotan en el hero. Cada rotación tiene un título y un subtítulo. Mínimo 2 rotaciones.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Título",
              type: "string",
              description: "Texto principal de esta rotación.",
              validation: (Rule: any) => Rule.required().error("El título es obligatorio."),
            },
            {
              name: "subtitle",
              title: "Subtítulo",
              type: "string",
              description: "Texto secundario de esta rotación.",
              validation: (Rule: any) => Rule.required().error("El subtítulo es obligatorio."),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
            },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return {
                title: title || "Sin título",
                subtitle: subtitle || "Sin subtítulo",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .error("Se requieren al menos 2 rotaciones de texto."),
    }),

    defineField({
      name: "heroCTALabel",
      title: "Texto del Botón CTA",
      fieldset: "hero",
      description: 'Texto del botón principal de acción. Ejemplo: "Explorar Equipos".',
      type: "string",
      validation: (Rule) => Rule.required().error("El texto del CTA es obligatorio."),
    }),

    defineField({
      name: "heroScrollLabel",
      title: "Texto del Indicador de Scroll",
      fieldset: "hero",
      description: 'Texto del indicador animado de scroll. Ejemplo: "Descubre más".',
      type: "string",
      validation: (Rule) => Rule.required().error("El texto del scroll indicator es obligatorio."),
    }),

    // ── Fieldset: Productos ──
    defineField({
      name: "productsBadge",
      title: "Badge de Productos",
      fieldset: "products",
      description: 'Texto del badge superior de la sección. Ejemplo: "Nuestros Productos".',
      type: "string",
      validation: (Rule) => Rule.required().error("El badge de productos es obligatorio."),
    }),

    defineField({
      name: "productsTitle",
      title: "Título de Productos",
      fieldset: "products",
      description:
        "Título principal de la sección de productos.",
      type: "string",
      validation: (Rule) => Rule.required().error("El título de productos es obligatorio."),
    }),

    defineField({
      name: "productsDescription",
      title: "Descripción de Productos",
      fieldset: "products",
      description: "Párrafo descriptivo que acompaña al título de la sección de productos.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().error("La descripción de productos es obligatoria."),
    }),

    // ── Fieldset: Servicios ──
    defineField({
      name: "servicesBadge",
      title: "Badge de Servicios",
      fieldset: "services",
      description: 'Texto del badge superior de la sección. Ejemplo: "Nuestros Servicios".',
      type: "string",
      validation: (Rule) => Rule.required().error("El badge de servicios es obligatorio."),
    }),

    defineField({
      name: "servicesTitle",
      title: "Título de Servicios",
      fieldset: "services",
      description: "Título principal de la sección de servicios.",
      type: "string",
      validation: (Rule) => Rule.required().error("El título de servicios es obligatorio."),
    }),

    defineField({
      name: "servicesDescription",
      title: "Descripción de Servicios",
      fieldset: "services",
      description: "Párrafo descriptivo de la sección de servicios.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required().error("La descripción de servicios es obligatoria."),
    }),

    defineField({
      name: "services",
      title: "Servicios",
      fieldset: "services",
      description: "Lista de servicios ofrecidos con ícono, título y descripción.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Ícono",
              type: "string",
              description: "Nombre del ícono de Lucide React.",
              options: {
                list: [
                  { title: "Palette (Diseño)", value: "Palette" },
                  { title: "Flame (Capacitación)", value: "Flame" },
                  { title: "Printer (Impresión)", value: "Printer" },
                  { title: "Monitor (Software)", value: "monitor" },
                  { title: "Star (Calidad)", value: "star" },
                  { title: "Lamp (Iluminación)", value: "lamp" },
                  { title: "Settings (Configuración)", value: "Settings" },
                  { title: "Wrench (Soporte)", value: "Wrench" },
                ],
                layout: "radio",
              },
              validation: (Rule: any) => Rule.required().error("El ícono es obligatorio."),
            },
            {
              name: "title",
              title: "Título",
              type: "string",
              description: "Nombre del servicio.",
              validation: (Rule: any) => Rule.required().error("El título es obligatorio."),
            },
            {
              name: "description",
              title: "Descripción",
              type: "text",
              description: "Descripción detallada del servicio.",
              rows: 3,
              validation: (Rule: any) =>
                Rule.required().error("La descripción es obligatoria."),
            },
          ],
          preview: {
            select: {
              title: "title",
              icon: "icon",
            },
            prepare({ title, icon }: { title?: string; icon?: string }) {
              return {
                title: `[${icon || "?"}] ${title || "Sin título"}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Agrega al menos un servicio."),
    }),

    // ── Fieldset: About ──
    defineField({
      name: "aboutBadge",
      title: "Badge de Nosotros",
      fieldset: "about",
      description: 'Texto del badge superior de la sección. Ejemplo: "Por qué Moda Digital Pro".',
      type: "string",
      validation: (Rule) => Rule.required().error("El badge de nosotros es obligatorio."),
    }),

    defineField({
      name: "aboutTitle",
      title: "Título de Nosotros",
      fieldset: "about",
      description: "Título principal de la sección sobre la empresa.",
      type: "string",
      validation: (Rule) => Rule.required().error("El título de nosotros es obligatorio."),
    }),

    defineField({
      name: "advantagesTitle",
      title: "Título de Ventajas",
      fieldset: "about",
      description:
        'Título que encabeza la lista de ventajas. Ejemplo: "Ventajas de elegir Moda Digital Pro".',
      type: "string",
      validation: (Rule) => Rule.required().error("El título de ventajas es obligatorio."),
    }),

    defineField({
      name: "stats",
      title: "Estadísticas",
      fieldset: "about",
      description: "Métricas clave mostradas como contadores (años, proyectos, satisfacción, etc.).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Valor",
              type: "string",
              description: 'Valor numérico con sufijo. Ejemplo: "15+", "2,400+", "98%".',
              validation: (Rule: any) => Rule.required().error("El valor es obligatorio."),
            },
            {
              name: "label",
              title: "Etiqueta",
              type: "string",
              description: 'Texto descriptivo. Ejemplo: "Años de experiencia".',
              validation: (Rule: any) => Rule.required().error("La etiqueta es obligatoria."),
            },
            {
              name: "icon",
              title: "Ícono",
              type: "string",
              description: "Nombre del ícono de Lucide React.",
              options: {
                list: [
                  { title: "TrendingUp (Crecimiento)", value: "TrendingUp" },
                  { title: "Layers (Capas)", value: "Layers" },
                  { title: "Star (Estrella)", value: "Star" },
                  { title: "Clock (Tiempo)", value: "Clock" },
                  { title: "Users (Clientes)", value: "Users" },
                  { title: "Award (Premio)", value: "Award" },
                  { title: "Zap (Velocidad)", value: "Zap" },
                  { title: "Shield (Confianza)", value: "Shield" },
                ],
                layout: "radio",
              },
              validation: (Rule: any) => Rule.required().error("El ícono es obligatorio."),
            },
          ],
          preview: {
            select: {
              value: "value",
              label: "label",
              icon: "icon",
            },
            prepare({ value, label, icon }: { value?: string; label?: string; icon?: string }) {
              return {
                title: `${value || "?"} — ${label || "Sin etiqueta"}`,
                subtitle: `Ícono: ${icon || "?"}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Agrega al menos una estadística."),
    }),

    defineField({
      name: "advantages",
      title: "Ventajas",
      fieldset: "about",
      description: "Lista numerada de ventajas competitivas de la empresa.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "number",
              title: "Número",
              type: "string",
              description: 'Número ordinal. Ejemplo: "01", "02", "03".',
              validation: (Rule: any) => Rule.required().error("El número es obligatorio."),
            },
            {
              name: "title",
              title: "Título",
              type: "string",
              description: "Título de la ventaja.",
              validation: (Rule: any) => Rule.required().error("El título es obligatorio."),
            },
            {
              name: "description",
              title: "Descripción",
              type: "text",
              description: "Descripción detallada de la ventaja.",
              rows: 3,
              validation: (Rule: any) =>
                Rule.required().error("La descripción es obligatoria."),
            },
          ],
          preview: {
            select: {
              number: "number",
              title: "title",
            },
            prepare({ number, title }: { number?: string; title?: string }) {
              return {
                title: `${number || "?"}. ${title || "Sin título"}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Agrega al menos una ventaja."),
    }),

    // ── Fieldset: FAQ ──
    defineField({
      name: "faqBadge",
      title: "Badge de FAQ",
      fieldset: "faq",
      description: 'Texto del badge superior. Ejemplo: "Preguntas Frecuentes".',
      type: "string",
      validation: (Rule) => Rule.required().error("El badge de FAQ es obligatorio."),
    }),

    defineField({
      name: "faqTitle",
      title: "Título de FAQ",
      fieldset: "faq",
      description: "Título principal de la sección de preguntas frecuentes.",
      type: "string",
      validation: (Rule) => Rule.required().error("El título de FAQ es obligatorio."),
    }),

    defineField({
      name: "faqDescription",
      title: "Descripción de FAQ",
      fieldset: "faq",
      description: "Párrafo introductorio de la sección de preguntas frecuentes.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().error("La descripción de FAQ es obligatoria."),
    }),

    defineField({
      name: "faqItems",
      title: "Preguntas y Respuestas",
      fieldset: "faq",
      description: "Lista de preguntas frecuentes con sus respuestas.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Pregunta",
              type: "string",
              description: "Texto de la pregunta frecuente.",
              validation: (Rule: any) =>
                Rule.required().error("La pregunta es obligatoria."),
            },
            {
              name: "answer",
              title: "Respuesta",
              type: "text",
              description: "Respuesta detallada a la pregunta.",
              rows: 5,
              validation: (Rule: any) =>
                Rule.required().error("La respuesta es obligatoria."),
            },
          ],
          preview: {
            select: {
              question: "question",
              answer: "answer",
            },
            prepare({ question, answer }: { question?: string; answer?: string }) {
              return {
                title: question || "Sin pregunta",
                subtitle: answer ? answer.substring(0, 80) + (answer.length > 80 ? "..." : "") : "Sin respuesta",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Agrega al menos una pregunta frecuente."),
    }),

    // ── Fieldset: Contacto ──
    defineField({
      name: "contactBadge",
      title: "Badge de Contacto",
      fieldset: "contact",
      description: 'Texto del badge superior. Ejemplo: "Contáctanos".',
      type: "string",
      validation: (Rule) => Rule.required().error("El badge de contacto es obligatorio."),
    }),

    defineField({
      name: "contactTitle",
      title: "Título de Contacto",
      fieldset: "contact",
      description: "Título principal de la sección de contacto.",
      type: "string",
      validation: (Rule) => Rule.required().error("El título de contacto es obligatorio."),
    }),

    defineField({
      name: "contactDescription",
      title: "Descripción de Contacto",
      fieldset: "contact",
      description: "Párrafo introductorio de la sección de contacto.",
      type: "text",
      rows: 2,
      validation: (Rule) =>
        Rule.required().error("La descripción de contacto es obligatoria."),
    }),

    defineField({
      name: "contactHours",
      title: "Horario de Atención",
      fieldset: "contact",
      description:
        'Horarios de atención al público. Ejemplo: "Lun - Vie: 8:00 - 18:00 | Sáb: 9:00 - 13:00".',
      type: "string",
      validation: (Rule) => Rule.required().error("El horario de atención es obligatorio."),
    }),

    // ── Fieldset: Footer ──
    defineField({
      name: "footerTagline",
      title: "Tagline del Footer",
      fieldset: "footer",
      description: "Frase descriptiva que aparece en el pie de página.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().error("El tagline del footer es obligatorio."),
    }),

    defineField({
      name: "footerProducts",
      title: "Enlaces de Productos (Footer)",
      fieldset: "footer",
      description: "Lista de enlaces a productos que se muestran en la columna de productos del footer.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Etiqueta",
              type: "string",
              description: "Texto visible del enlace.",
              validation: (Rule: any) => Rule.required().error("La etiqueta es obligatoria."),
            },
            {
              name: "href",
              title: "Enlace (href)",
              type: "string",
              description: 'URL o ancla. Ejemplo: "#productos" o "/equipo/plotter".',
              validation: (Rule: any) => Rule.required().error("El enlace es obligatorio."),
            },
          ],
          preview: {
            select: {
              label: "label",
              href: "href",
            },
            prepare({ label, href }: { label?: string; href?: string }) {
              return {
                title: label || "Sin etiqueta",
                subtitle: href || "#",
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "footerServices",
      title: "Enlaces de Servicios (Footer)",
      fieldset: "footer",
      description: "Lista de enlaces a servicios que se muestran en la columna de servicios del footer.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Etiqueta",
              type: "string",
              description: "Texto visible del enlace.",
              validation: (Rule: any) => Rule.required().error("La etiqueta es obligatoria."),
            },
            {
              name: "href",
              title: "Enlace (href)",
              type: "string",
              description: 'URL o ancla. Ejemplo: "#servicios".',
              validation: (Rule: any) => Rule.required().error("El enlace es obligatorio."),
            },
          ],
          preview: {
            select: {
              label: "label",
              href: "href",
            },
            prepare({ label, href }: { label?: string; href?: string }) {
              return {
                title: label || "Sin etiqueta",
                subtitle: href || "#",
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "footerCompany",
      title: "Enlaces de Empresa (Footer)",
      fieldset: "footer",
      description: "Lista de enlaces institucionales que se muestran en la columna de empresa del footer.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Etiqueta",
              type: "string",
              description: "Texto visible del enlace.",
              validation: (Rule: any) => Rule.required().error("La etiqueta es obligatoria."),
            },
            {
              name: "href",
              title: "Enlace (href)",
              type: "string",
              description: 'URL o ancla. Ejemplo: "#nosotros".',
              validation: (Rule: any) => Rule.required().error("El enlace es obligatorio."),
            },
          ],
          preview: {
            select: {
              label: "label",
              href: "href",
            },
            prepare({ label, href }: { label?: string; href?: string }) {
              return {
                title: label || "Sin etiqueta",
                subtitle: href || "#",
              };
            },
          },
        },
      ],
    }),

    // ── Fieldset: Navegación ──
    defineField({
      name: "navItems",
      title: "Items de Navegación",
      fieldset: "navigation",
      description: "Enlaces que aparecen en el menú de navegación principal del sitio.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Etiqueta",
              type: "string",
              description: "Texto visible en el menú. Ejemplo: 'Productos', 'Servicios'.",
              validation: (Rule: any) => Rule.required().error("La etiqueta es obligatoria."),
            },
            {
              name: "href",
              title: "Enlace (href)",
              type: "string",
              description: 'URL o ancla. Ejemplo: "#productos".',
              validation: (Rule: any) => Rule.required().error("El enlace es obligatorio."),
            },
          ],
          preview: {
            select: {
              label: "label",
              href: "href",
            },
            prepare({ label, href }: { label?: string; href?: string }) {
              return {
                title: label || "Sin etiqueta",
                subtitle: href || "#",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Agrega al menos un item de navegación."),
    }),
  ],

  // ── Preview en lista de documentos ──
  preview: {
    prepare() {
      return {
        title: "Contenido de Página Principal",
        subtitle: "Hero, Productos, Servicios, Nosotros, FAQ, Contacto, Footer y Navegación",
      };
    },
  },

  // ── Valores iniciales (contenido actual del sitio) ──
  initialValue: {
    heroBadge: "Moda Digital & Plotter Textil",
    heroRotations: [
      {
        title: "Plotters textiles industriales y software CAD para confección en Perú",
        subtitle:
          "Soluciones profesionales para patronaje, trazado, digitalización y producción textil.",
      },
      {
        title: "Diseñados para producción de alto rendimiento",
        subtitle:
          "Plotters industriales ultrarrápidos con estructura reforzada en aluminio aeronáutico, acabados premium y operación táctil intuitiva.",
      },
    ],
    heroCTALabel: "Explorar Equipos",
    heroScrollLabel: "Descubre más",

    productsBadge: "Nuestros Productos",
    productsTitle: "Equipos y software de última generación",
    productsDescription:
      "Soluciones integrales para la industria textil: digitalizadores, plotters de corte e inyección, y software CAD profesional. Todo lo que necesitas para escalar tu producción.",

    servicesBadge: "Nuestros Servicios",
    servicesTitle: "Soluciones Industriales para Patronaje y Producción Textil",
    servicesDescription:
      "Ofrecemos soluciones profesionales para impresión de moldes, patronaje digital, trazado industrial y producción textil asistida por computadora.",
    services: [
      {
        icon: "Palette",
        title: "Software CAD y Patronaje Industrial",
        description:
          "Digitalización de moldes, escalado, trazado industrial y preparación de archivos para producción textil. Soluciones CAD/CAM para optimizar procesos de confección y maximizar productividad.",
      },
      {
        icon: "Flame",
        title: "Capacitación en Software y Equipos",
        description:
          "Capacitación especializada en software CAD/CAM, patronaje digital, trazado industrial y operación de equipos para producción textil. Entrenamiento práctico orientado a optimizar procesos de confección y maximizar productividad.",
      },
      {
        icon: "Printer",
        title: "Soporte Técnico Especializado",
        description:
          "Asistencia técnica para plotters industriales, digitalizadores y sistemas CAD de confección. Diagnóstico, configuración, mantenimiento y soporte profesional para garantizar continuidad operativa en producción textil.",
      },
    ],

    aboutBadge: "Por qué Moda Digital Pro",
    aboutTitle: "Tecnología de grado industrial para tu producción textil",
    advantagesTitle: "Ventajas de elegir Moda Digital Pro",
    stats: [
      { value: "15+", label: "Años de experiencia", icon: "TrendingUp" },
      { value: "2,400+", label: "Proyectos entregados", icon: "Layers" },
      { value: "98%", label: "Clientes satisfechos", icon: "Star" },
      { value: "48h", label: "Tiempo de entrega estándar", icon: "Clock" },
    ],
    advantages: [
      {
        number: "01",
        title: "Equipos Industriales con Mayor Vida Útil",
        description:
          "Nuestros equipos incorporan componentes electrónicos de marcas reconocidas internacionalmente como Samsung, Altera y Winbond, garantizando mayor estabilidad operativa, durabilidad y rendimiento continuo para producción industrial.",
      },
      {
        number: "02",
        title: "Tecnología Certificada con Respaldo Internacional",
        description:
          "Trabajamos con equipos GETONAGAIN respaldados por certificaciones internacionales ISO 9001, ISO 14001 e ISO 45001. Una marca con presencia global y reconocimiento en la industria por su calidad, innovación y soporte técnico especializado.",
      },
      {
        number: "03",
        title: "Soporte técnico y capacitación incluida",
        description:
          "Cada equipo incluye instalación profesional, capacitación completa para tu equipo de producción y soporte técnico remoto durante 12 meses. Además, ofrecemos mantenimiento preventivo programado para maximizar la vida útil de tu inversión.",
      },
    ],

    faqBadge: "Preguntas Frecuentes",
    faqTitle: "Todo lo que necesitas saber",
    faqDescription:
      "Resolvemos tus dudas más comunes sobre nuestros equipos, servicios y procesos de producción textil.",
    faqItems: [
      {
        question: "¿Qué garantía ofrecen sus plotters y digitalizadores industriales?",
        answer:
          "Todos nuestros equipos cuentan con garantía de fábrica de 12 meses que cubre defectos de fabricación en componentes electrónicos, mecánicos y estructurales. Adicionalmente, fabricamos nuestros plotters con estructura de aluminio aeronáutico y componentes de alta precisión, lo que garantiza una vida útil estimada de 8 a 12 años con mantenimiento adecuado. Cada equipo incluye un programa de mantenimiento preventivo que extiende significativamente la durabilidad de cabezales, sistemas de movimiento lineal y paneles de control táctil.",
      },
      {
        question: "¿Sus digitalizadores son compatibles con otros software CAD del mercado?",
        answer:
          "Sí. Tanto nuestro Digitalizador de Moldes y Patrones Textiles como el Escáner Digital de Moldes son compatibles con más de 30 formatos digitales y se integran de forma nativa con los principales softwares CAD de patronaje industrial: GetonAgain, Lectra, Gerber, Optitex, Diamino, Accumark y otros sistemas líderes del mercado. La exportación es directa en formato universal DXF, lo que permite un flujo de trabajo fluido entre la digitalización del patrón físico y su edición en cualquier entorno CAD profesional.",
      },
      {
        question: "¿Realizan instalaciones y capacitaciones a nivel nacional?",
        answer:
          "Sí, contamos con un equipo técnico certificado que realiza instalaciones in situ en cualquier ciudad del país. Cada compra incluye: instalación profesional en tu taller o planta de producción, capacitación completa de 2 días para tu equipo operativo, manual técnico detallado en español, y 12 meses de soporte técnico remoto. Para proyectos corporativos o compras de múltiples equipos, coordinamos visitas de capacitación especializada y acompañamiento durante la primera semana de producción.",
      },
      {
        question: "¿Cómo puedo obtener una cotización formal de un equipo con precio publicado?",
        answer:
          "Para equipos con precio publicado (como el Plotter Textil de Alta Velocidad a USD 5,500, el Plotter de Trazo y Corte a USD 6,200, el Digitalizador de Moldes y Patrones a USD 1,700 o la Flatbed Industrial a USD 9,900), puedes solicitar tu cotización formal directamente a través del botón de WhatsApp en nuestra web o escribiendo a ventas@modadigitalpro.com. Te enviaremos una proforma con detalle del equipo, condiciones de pago, tiempos de entrega y cobertura de garantía. Para equipos sin precio publicado, nuestro equipo comercial te brindará una cotización personalizada según tus requerimientos específicos de producción.",
      },
      {
        question: "¿Cuál es el tiempo de entrega de un equipo?",
        answer:
          "El tiempo estándar de entrega de equipos es de 48 a 72 horas hábiles para productos con stock disponible en Lima. Para equipos que requieren configuración especial o despacho a provincias, el tiempo puede variar entre 5 a 10 días hábiles según la ubicación y logística de transporte. Todos nuestros envíos incluyen embalaje industrial con protección anticompresión y seguimiento en tiempo real para garantizar que el equipo llegue en perfectas condiciones a tu taller.",
      },
      {
        question: "¿Qué tipo de soporte técnico ofrecen después de la compra?",
        answer:
          "Nuestro programa de soporte post-venta incluye: 12 meses de asistencia técnica remota por WhatsApp y videollamada, actualizaciones de firmware y software de forma gratuita durante el primer año, acceso prioritario a repuestos originales con envío express, y consultoría de optimización de producción. Además, ofrecemos contratos de mantenimiento preventivo extendido que incluyen visitas programadas para calibración de cabezales, verificación de sistemas mecánicos y actualización de software CAD.",
      },
      {
        question: "¿Qué tipo de tintas y materiales son compatibles con sus plotters?",
        answer:
          "Nuestros plotters utilizan cartuchos HP45 de alta precisión y sistemas de suministro de tinta continuo compatible con tintas pigmentadas, reactivas y de sublimado. El Plotter Textil de Impresión de Alta Velocidad acepta configuraciones de 1 a 4 cartuchos para trazado sobre papel continuo, mientras que el Plotter de Corte de Cartón Cama Plana trabaja con sistema combinado de suministro de tinta y cartuchos HP45 para impresión y corte sobre múltiples materiales: papel kraft desde 80 gr/m², cartón corrugado, vinilo, transfer térmico y substratos especiales de producción textil.",
      },
      {
        question: "¿El Software CAD para patronaje y optimización textil es compatible con todos sus equipos?",
        answer:
          "Sí. El Software CAD para Patronaje y Optimización Textil (GetonAgain V2024.1) es totalmente compatible con toda nuestra línea de plotters y digitalizadores. El software incluye módulos de Patronaje, Grading, Marcación y vista previa 3D, con exportación directa a formatos de corte (DXF, PLT, CUT, ISO, CSV) reconocidos por todos nuestros equipos. La licencia es perpetua con 1 año de actualizaciones gratuitas, está disponible en 4 idiomas (español, inglés, portugués y chino), y funciona sobre Windows 10/11 con 8 GB de RAM mínimo. Es la herramienta ideal para completar un flujo de trabajo integrado desde la digitalización hasta la producción.",
      },
    ],

    contactBadge: "Contáctanos",
    contactTitle: "Impulsa tu producción textil",
    contactDescription:
      "Estamos listos para asesorarte. Escríbenos y recibe una cotización personalizada sin costo.",
    contactHours: "Lun - Vie: 8:00 - 18:00 | Sáb: 9:00 - 13:00",

    footerTagline:
      "Plotter Textil de alta precisión. Tecnología de grado aeronáutico para impresión de trazos a gran escala.",
    footerProducts: [
      { label: "Plotter Textil de Impresión", href: "#productos" },
      { label: "Plotter Trazo y Corte", href: "#productos" },
      { label: "Digitalizador de Moldes", href: "#productos" },
      { label: "Plotter Corte de Cartón", href: "#productos" },
      { label: "Escáner Digital de Moldes", href: "#productos" },
      { label: "Software CAD Textil", href: "#productos" },
      { label: "Ver todos", href: "#productos" },
    ],
    footerServices: [
      { label: "Software CAD y Patronaje", href: "#servicios" },
      { label: "Capacitación", href: "#servicios" },
      { label: "Soporte Técnico", href: "#servicios" },
      { label: "Asesoría", href: "#servicios" },
    ],
    footerCompany: [
      { label: "Sobre Nosotros", href: "#nosotros" },
      { label: "FAQ", href: "#faq" },
      { label: "Contacto", href: "#contacto" },
      { label: "Términos", href: "#" },
    ],

    navItems: [
      { label: "Productos", href: "#productos" },
      { label: "Servicios", href: "#servicios" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "FAQ", href: "#faq" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
});

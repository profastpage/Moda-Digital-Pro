"use client";

import { motion } from "framer-motion";
import { CATALOG } from "@/constants/product";

export default function CatalogSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
    }),
  };

  const cardUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.15, duration: 0.7, ease: "easeOut" as const },
    }),
  };

  return (
    <section id="catalogo" className="py-20 sm:py-28 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full">
            Catálogo de Diseños
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Detalles que hacen la diferencia
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center">
            Cada diseño es creado con precisión técnica y sensibilidad estética.
            Explora nuestras colecciones especializadas para distintos segmentos del mercado textil.
          </p>
        </motion.div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CATALOG.map((item, i) => (
            <motion.article
              key={item.id}
              custom={i}
              variants={cardUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/60 hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {/* Placeholder pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-navy-dark/60 flex items-center justify-center">
                  <p className="text-white/30 text-sm">Catálogo — {item.title}</p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

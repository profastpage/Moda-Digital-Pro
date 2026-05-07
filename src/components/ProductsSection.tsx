"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/constants/product";
import { MessageCircle } from "lucide-react";

export default function ProductsSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
    }),
  };

  const cardUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.15, duration: 0.7, ease: "easeOut" as const },
    }),
  };

  return (
    <section id="productos" className="py-20 sm:py-28 lg:py-32 bg-background">
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
            Nuestros Productos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Equipos de impresión de última generación
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center">
            Plotters textiles de alta precisión diseñados para la industria de la moda.
            Tecnología que transforma diseños en realidad con colores vibrantes y trazos perfectos.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              custom={i}
              variants={cardUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/60 hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                {/* Placeholder pattern for product image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-navy-dark/80 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <span className="text-primary text-2xl font-bold">
                        {product.price.replace("$", "").replace(",", "")}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">Imagen del producto</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {product.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white bg-primary rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                    {product.title}
                  </h3>
                  <span className="text-primary-light font-bold text-lg">{product.price}</span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#25D366] rounded-xl hover:bg-[#20bd59] transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  {product.cta}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

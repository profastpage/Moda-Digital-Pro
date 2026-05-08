"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/constants/product";
import { ArrowRight } from "lucide-react";
import ProductModal from "./ProductModal";

/* Standardized animation: short slide (20px), fast (0.6s), easeOut */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const cardUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    /* Delay unmount for exit animation */
    setTimeout(() => setSelectedProduct(null), 350);
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
            Equipos y software de última generación
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center">
            Soluciones integrales para la industria textil: digitalizadores, plotters de corte
            e inyección, y software CAD profesional. Todo lo que necesitas para escalar tu producción.
          </p>
        </motion.div>

        {/* Product Cards — simplified, fully clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              custom={i}
              variants={cardUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              onClick={() => openModal(product)}
              className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/60 hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-52 w-full bg-muted overflow-hidden flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info — image + title + CTA only */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 leading-snug flex-grow">
                  {product.title}
                </h3>
                <span className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 w-full text-sm font-semibold text-primary border-2 border-primary/30 rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  Ver detalles
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

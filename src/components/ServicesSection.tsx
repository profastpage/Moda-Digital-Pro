"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/constants/product";
import { Printer, Flame, Palette } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Printer,
  Flame,
  Palette,
};

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
    transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 sm:py-28 lg:py-32 bg-muted/40">
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
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Soluciones Industriales para Patronaje y Producción Textil
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center">
            Ofrecemos soluciones profesionales para impresión de moldes, patronaje digital,
            trazado industrial y producción textil asistida por computadora.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon] || Printer;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="group bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-border/60 hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto flex items-center justify-center bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mx-auto max-w-md">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

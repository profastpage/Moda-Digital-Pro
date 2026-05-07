"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/constants/product";
import { CircleQuestionMark, ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full">
            <CircleQuestionMark className="w-3.5 h-3.5" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Todo lo que necesitas saber
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Resolvemos tus dudas más comunes sobre nuestros equipos, servicios y procesos de producción textil.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border transition-all duration-300 border-border hover:border-border/80 bg-background"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-sm sm:text-base pr-6 transition-colors duration-200 text-foreground">
                  {item.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
                    openIndex === i
                      ? "bg-primary text-white rotate-180"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

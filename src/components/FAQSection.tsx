"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/useHasMounted";
import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/constants/product";
import { CircleQuestionMark, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  }),
};

const listUp = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const mounted = useHasMounted();

  const isDark = !mounted || theme !== "light";

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`py-20 sm:py-28 lg:py-32 transition-colors duration-300 ${
        isDark ? "bg-[#020617]" : "bg-slate-50"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full ${
              isDark
                ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
                : "text-cyan-600 bg-cyan-50"
            }`}
          >
            <CircleQuestionMark className="w-3.5 h-3.5" />
            Preguntas Frecuentes
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Todo lo que necesitas saber
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Resolvemos tus dudas más comunes sobre nuestros equipos, servicios y
            procesos de produccion textil.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={listUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all duration-300 shadow-sm ${
                  isOpen
                    ? isDark
                      ? "bg-cyan-500/10 border border-cyan-500/30 shadow-md"
                      : "bg-blue-50 shadow-md"
                    : isDark
                      ? "bg-[#0f172a] border border-slate-700/50 hover:shadow-md hover:border-primary/30"
                      : "bg-white hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={`font-semibold text-sm sm:text-base pr-6 ${
                      isDark ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 ${
                      isOpen
                        ? "bg-cyan-500 text-white rotate-180"
                        : isDark
                          ? "bg-slate-700/50 text-slate-400"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div
                    className={`px-6 pb-5 text-sm leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/useHasMounted";
import { motion, AnimatePresence } from "framer-motion";
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

interface FAQSectionProps {
  faqItems?: { question: string; answer: string }[];
  badge?: string;
  title?: string;
  description?: string;
}

export default function FAQSection({
  faqItems: faqItemsProp,
  badge,
  title,
  description,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const mounted = useHasMounted();

  const isDark = !mounted || theme !== "light";
  const faqItems = faqItemsProp?.length ? faqItemsProp : FAQ_ITEMS;

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
            {badge || "Preguntas Frecuentes"}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title || "Todo lo que necesitas saber"}
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {description || "Resolvemos tus dudas más comunes sobre nuestros equipos, servicios y procesos de producción textil."}
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
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? isDark
                      ? "bg-cyan-500/10 border border-cyan-500/30 shadow-md shadow-cyan-500/5"
                      : "bg-white border border-cyan-200/60 shadow-md shadow-slate-200/50"
                    : isDark
                      ? "bg-[#0f172a] border border-slate-700/50 hover:shadow-md hover:border-primary/30"
                      : "bg-white border border-slate-200/60 hover:shadow-md hover:border-cyan-200"
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
                        ? "bg-cyan-500 text-white"
                        : isDark
                          ? "bg-slate-700/50 text-slate-400"
                          : "bg-slate-100 text-slate-500"
                    }`}
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth accordion with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-6 pb-5 text-sm leading-relaxed ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

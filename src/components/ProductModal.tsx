"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/useHasMounted";
import { buildProductWhatsAppURL, hasNumericPrice } from "@/utils/whatsapp-engine";

/* ================================================================
   ProductModal v3 — Deep Dark + Sticky Image + Grid Layout
   ─────────────────────────────────────────────────────────
   PC   : grid-cols-2, imagen sticky a la izquierda, scroll a la derecha
   Móvil: columna única vertical con px-6 py-8
   ================================================================ */

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductData {
  id: string;
  title: string;
  image: string;
  description: string;
  longDescription: string;
  specs: ProductSpec[];
  badge?: string;
  price?: string;
}

interface ProductModalProps {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { theme } = useTheme();
  const mounted = useHasMounted();
  const isDark = !mounted || theme !== "light";

  /* ── Lock body scroll ── */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Close on Escape ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!product) return null;

  /* ── CTA dinámico ── */
  const withPrice = hasNumericPrice(product.price);
  const ctaLabel = withPrice
    ? "Deseo adquirir este equipo"
    : "Cotizar este equipo por WhatsApp";
  const waUrl = buildProductWhatsAppURL(product);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ══════════ BACKDROP ══════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* ══════════ MODAL WRAPPER ══════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`
                pointer-events-auto relative w-full
                h-[92vh] max-h-[92vh]
                lg:h-auto lg:max-h-[90vh] lg:max-w-6xl
                overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl
                border transition-colors duration-300
                ${isDark
                  ? "bg-gradient-to-br from-slate-900 via-black to-slate-950 border-white/10"
                  : "bg-white border-slate-200"
                }
              `}
            >

              {/* ══════════ CLOSE (X) — Fuera del flujo ══════════ */}
              <button
                onClick={onClose}
                className={`
                  absolute top-3 right-3 sm:top-4 sm:right-4 z-50
                  w-10 h-10 flex items-center justify-center rounded-full
                  border transition-all duration-200 hover:scale-110 active:scale-95
                  ${isDark
                    ? "bg-white/5 border-white/10 text-white/40 hover:text-white/90 hover:bg-white/10"
                    : "bg-black/5 border-black/5 text-slate-400 hover:text-slate-900 hover:bg-black/10"
                  }
                `}
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ══════════ GRID: 1-col mobile / 2-col PC ══════════ */}
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">

                {/* ──── COLUMNA IZQUIERDA — IMAGEN (sticky en PC) ──── */}
                <div className={`
                  /* Móvil: imagen compacta arriba */
                  flex-shrink-0 aspect-[4/3] lg:aspect-auto lg:h-full
                  ${isDark ? "bg-white/[0.02]" : "bg-slate-50"}
                `}>
                  <div className="w-full h-full flex items-center justify-center p-5 sm:p-8 lg:p-10">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain rounded-xl"
                      style={{ maxHeight: "100%" }}
                    />
                  </div>
                </div>

                {/* ──── COLUMNA DERECHA — INFO (scrollable) ──── */}
                <div className="
                  overflow-y-auto
                  /* Scrollbar minimalista */
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-white/10
                  hover:[&::-webkit-scrollbar-thumb]:bg-white/20
                ">
                  <div className="p-6 sm:p-8 lg:p-10 lg:pr-14">

                    {/* ── Badge ── */}
                    {product.badge && (
                      <span className="inline-block self-start px-3 py-1.5 mb-6 text-[10px] font-bold tracking-widest uppercase rounded-full border
                        text-cyan-400 bg-cyan-400/10 border-cyan-400/20">
                        {product.badge}
                      </span>
                    )}

                    {/* ── Título ── */}
                    <h2 className={`
                      text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-2
                      ${isDark ? "text-white" : "text-slate-900"}
                    `}>
                      {product.title}
                    </h2>

                    {/* ── Precio ── */}
                    {product.price && (
                      <div className="mb-8 mt-4">
                        <span className={`
                          text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                          ${withPrice ? "text-cyan-400" : isDark ? "text-slate-300" : "text-slate-600"}
                        `}>
                          {product.price}
                        </span>
                        {withPrice && (
                          <span className={`
                            block text-xs font-medium mt-2 tracking-wider uppercase
                            ${isDark ? "text-white/30" : "text-slate-400"}
                          `}>
                            Dólares americanos
                          </span>
                        )}
                      </div>
                    )}

                    {/* ── Descripciones — max-w-prose para lectura cómoda ── */}
                    <div className="max-w-prose space-y-6 mb-8">
                      <p className={`
                        text-sm leading-relaxed
                        ${isDark ? "text-white/50" : "text-slate-500"}
                      `}>
                        {product.description}
                      </p>
                      <p className={`
                        text-sm sm:text-[15px] leading-relaxed
                        ${isDark ? "text-white/70" : "text-slate-600"}
                      `}>
                        {product.longDescription}
                      </p>
                    </div>

                    {/* ── Tabla de Especificaciones — Ficha de ingeniería ── */}
                    <div className="mb-8">
                      <h3 className={`
                        text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-5
                        ${isDark ? "text-white/25" : "text-slate-400"}
                      `}>
                        Especificaciones Clave
                      </h3>

                      <div className={`
                        rounded-xl border overflow-hidden
                        ${isDark ? "border-white/[0.06]" : "border-slate-100"}
                      `}>
                        {product.specs.map((spec, i) => (
                          <div
                            key={i}
                            className={`
                              flex items-baseline justify-between gap-4
                              px-5 py-4
                              transition-colors duration-150
                              ${isDark
                                ? "hover:bg-white/[0.03]"
                                : "hover:bg-slate-50"
                              }
                              ${i < product.specs.length - 1
                                ? isDark
                                  ? "border-b border-white/[0.06]"
                                  : "border-b border-slate-100"
                                : ""
                              }
                            `}
                          >
                            {/* Label — 60% opacidad */}
                            <span className={`
                              text-sm font-medium shrink-0
                              ${isDark ? "text-white/60" : "text-slate-500"}
                            `}>
                              {spec.label}
                            </span>
                            {/* Value — blanco puro + font-mono (ficha técnica) */}
                            <span className={`
                              text-sm font-mono font-semibold text-right whitespace-nowrap
                              ${isDark ? "text-white" : "text-slate-900"}
                            `}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── WhatsApp CTA — Cierre natural de la lectura ── */}
                    <div className="mt-12 pb-4 lg:pb-6">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex items-center justify-center gap-3 w-full
                          px-6 py-[18px] text-lg font-bold text-white
                          bg-[#25D366] rounded-2xl
                          hover:bg-[#20bd59]
                          shadow-lg shadow-[#25D366]/25
                          hover:shadow-[#25D366]/40
                          hover:-translate-y-0.5
                          active:translate-y-0 active:shadow-[#25D366]/20
                          transition-all duration-300
                        "
                      >
                        <MessageCircle className="w-6 h-6 shrink-0" />
                        <span className="text-center leading-snug">{ctaLabel}</span>
                        <ArrowRight className="w-5 h-5 shrink-0" />
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

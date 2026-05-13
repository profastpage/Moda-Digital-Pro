"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight, ImageIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/useHasMounted";
import { buildProductWhatsAppURL, hasNumericPrice } from "@/utils/whatsapp-engine";

/* ================================================================
   ProductModal v4 — Single Column, 100% Responsive, Scroll Fix
   ────────────────────────────────────────────────────────────────
   Layout unificado PC + Móvil:
     1. Imagen arriba (centrada, max-h controlada)
     2. Contenido abajo (scroll dentro de max-h-[90vh])
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

          {/* ══════════ MODAL CONTAINER ══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`
                pointer-events-auto relative w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
                rounded-2xl shadow-2xl
                border transition-colors duration-300
                ${isDark
                  ? "bg-gradient-to-br from-slate-900 via-black to-slate-950 border-white/10"
                  : "bg-white border-slate-200"
                }
                /* Scrollbar sutil */
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-white/10
                hover:[&::-webkit-scrollbar-thumb]:bg-white/20
              `}
            >

              {/* ══════════ CLOSE (X) — Absolute, siempre visible ══════════ */}
              <button
                onClick={onClose}
                className={`
                  sticky top-3 float-right mr-3 z-50
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

              {/* ══════════ IMAGEN — Centrada arriba, fallback si no hay ══════════ */}
              <div className={`
                w-full flex items-center justify-center
                px-6 pt-6
                max-h-[200px] sm:max-h-[250px] md:max-h-[300px]
                ${isDark ? "bg-white/[0.02]" : "bg-slate-50"}
                rounded-t-2xl
              `}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <ImageIcon className="w-12 h-12 opacity-30" />
                    <span className="text-xs opacity-40">Imagen no disponible</span>
                  </div>
                )}
              </div>

              {/* ══════════ CONTENIDO — Debajo de la imagen ══════════ */}
              <div className="px-6 sm:px-8 pt-6 pb-16">

                {/* ── Badge ── */}
                {product.badge && (
                  <span className={`
                    inline-block self-start px-3 py-1.5 mb-6
                    text-[10px] font-bold tracking-widest uppercase rounded-full border
                    ${isDark
                      ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
                      : "text-cyan-600 bg-cyan-50 border-cyan-200"
                    }
                  `}>
                    {product.badge}
                  </span>
                )}

                {/* ── Título ── */}
                <h2 className={`
                  text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-2
                  ${isDark ? "text-white" : "text-slate-900"}
                `}>
                  {product.title}
                </h2>

                {/* ── Precio ── */}
                {product.price && (
                  <div className="mt-4 mb-8">
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

                {/* ── Descripciones ── */}
                <div className="max-w-prose space-y-5 mb-8">
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

                {/* ── Especificaciones — Lista técnica legible ── */}
                <div className="mb-10">
                  <h3 className={`
                    text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4
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
                          px-4 sm:px-5 py-3
                          transition-colors duration-150
                          ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"}
                          ${i < product.specs.length - 1
                            ? isDark
                              ? "border-b border-white/[0.06]"
                              : "border-b border-slate-100"
                            : ""
                          }
                        `}
                      >
                        {/* Móvil: stacked (label arriba, valor abajo) */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
                          {/* Label — 60% opacidad */}
                          <span className={`
                            text-xs sm:text-sm font-medium leading-snug
                            ${isDark ? "text-white/60" : "text-slate-500"}
                          `}>
                            {spec.label}
                          </span>
                          {/* Value — blanco puro + font-mono */}
                          <span className={`
                            text-sm font-mono font-semibold leading-snug
                            sm:text-right
                            ${isDark ? "text-white" : "text-slate-900"}
                          `}>
                            {spec.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── WhatsApp CTA — Cierre natural con pb-16 breathing room ── */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

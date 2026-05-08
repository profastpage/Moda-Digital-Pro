"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/useHasMounted";
import { buildProductWhatsAppURL, hasNumericPrice } from "@/utils/whatsapp-engine";

/* ================================================================
   ProductModal — Premium UX Responsive
   ────────────────────────────────────────
   PC  : Horizontal 2-column (image left / info right), scroll en columna B
   Móvil: Vertical single-column, h-[92vh], scroll completo
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

  /* ── Lock body scroll when modal is open ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Close on Escape ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!product) return null;

  /* ── Dynamic CTA: price vs no-price ── */
  const withPrice = hasNumericPrice(product.price);
  const ctaLabel = withPrice
    ? "Deseo adquirir este equipo"
    : "Cotizar este equipo por WhatsApp";
  const waUrl = buildProductWhatsAppURL(product);

  /* ── Theme tokens (applied consistently) ── */
  const t = {
    modalBg: isDark ? "bg-slate-900 border-slate-700/50" : "bg-white border-slate-200",
    imageBg: isDark ? "bg-slate-800/50" : "bg-slate-50",
    title: isDark ? "text-white" : "text-slate-900",
    body: isDark ? "text-slate-300" : "text-slate-600",
    muted: isDark ? "text-slate-400" : "text-slate-500",
    subtle: isDark ? "text-slate-500" : "text-slate-400",
    divider: isDark ? "border-slate-700/30" : "border-slate-100",
    closeBg: isDark
      ? "bg-black/30 border-white/10 text-white/60 hover:text-white hover:bg-black/50"
      : "bg-black/10 border-black/5 text-slate-500 hover:text-slate-900 hover:bg-black/20",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ══════════ BACKDROP — Deep blur overlay ══════════ */}
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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`pointer-events-auto relative w-full
                /* Móvil: altura casi completa */
                h-[92vh] max-h-[92vh]
                /* PC: ancho horizontal, altura con límite */
                lg:h-auto lg:max-h-[88vh] lg:max-w-5xl
                overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl border transition-colors duration-300
                ${t.modalBg}`}
            >
              {/* ══════════ CLOSE BUTTON — Absolute, translucent ══════════ */}
              <button
                onClick={onClose}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full
                  backdrop-blur-md border transition-all duration-200 hover:scale-110 active:scale-95 ${t.closeBg}`}
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ══════════ LAYOUT: 2-col PC / 1-col Mobile ══════════ */}
              <div className="flex flex-col lg:flex-row h-full overflow-hidden">

                {/* ══════════ SIDE A — PRODUCT IMAGE ══════════ */}
                <div className="
                  /* Móvil: imagen compacta arriba */
                  w-full flex-shrink-0 aspect-[4/3] lg:aspect-auto lg:h-full lg:w-[45%]
                ">
                  <div className={`w-full h-full flex items-center justify-center p-5 sm:p-8 lg:p-10 transition-colors duration-300 ${t.imageBg}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain rounded-xl drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* ══════════ SIDE B — PRODUCT INFO (scrollable) ══════════ */}
                <div className="
                  flex-1 overflow-y-auto
                  /* Scrollbar sutil en Webkit */
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-slate-400/20
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/40
                  transition-colors duration-300
                ">
                  <div className="p-5 sm:p-7 lg:p-10 lg:pr-12 flex flex-col">

                    {/* ── Badge ── */}
                    {product.badge && (
                      <span className="inline-block self-start px-3 py-1.5 mb-6 text-[10px] font-bold tracking-widest uppercase rounded-full border
                        text-cyan-600 bg-cyan-50 border-cyan-200">
                        {product.badge}
                      </span>
                    )}

                    {/* ── Title ── */}
                    <h2 className={`text-2xl sm:text-3xl font-bold leading-tight mb-6 ${t.title}`}>
                      {product.title}
                    </h2>

                    {/* ── Price — Resaltado con aire generoso ── */}
                    {product.price && (
                      <div className="mb-8">
                        <span className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                          withPrice ? "text-cyan-500" : t.body
                        }`}>
                          {product.price}
                        </span>
                        {withPrice && (
                          <span className={`block text-xs font-medium mt-2 tracking-wide ${t.subtle}`}>
                            Dólares americanos
                          </span>
                        )}
                      </div>
                    )}

                    {/* ── Reading container: max-w-prose para líneas cómodas ── */}
                    <div className="max-w-prose">
                      {/* Short description */}
                      <p className={`text-sm leading-[1.7] mb-6 ${t.muted}`}>
                        {product.description}
                      </p>

                      {/* Long description */}
                      <p className={`text-sm sm:text-[15px] leading-[1.7] mb-8 ${t.body}`}>
                        {product.longDescription}
                      </p>
                    </div>

                    {/* ── Specs Table — Lista técnica de lujo ── */}
                    <div className="mb-0 lg:mb-0">
                      <h3 className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-5 ${t.subtle}`}>
                        Especificaciones Clave
                      </h3>
                      <div className={`rounded-xl border ${t.divider} overflow-hidden`}>
                        {product.specs.map((spec, i) => (
                          <div
                            key={i}
                            className={`flex items-start justify-between px-4 py-3.5 sm:px-5 sm:py-4
                              transition-colors duration-150 ${
                                isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50/80"
                              }
                              ${i < product.specs.length - 1 ? `border-b ${t.divider}` : ""}`}
                          >
                            <span className={`text-sm font-medium pr-4 leading-snug ${t.muted}`}>
                              {spec.label}
                            </span>
                            <span className={`text-sm font-semibold text-right whitespace-nowrap leading-snug ${t.title}`}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── WhatsApp CTA — Cierre natural de la lectura ── */}
                    <div className="mt-12 lg:mt-12">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full px-6 py-[18px] text-lg font-bold text-white bg-[#25D366]
                          rounded-2xl hover:bg-[#20bd59] transition-all duration-300
                          shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5
                          active:translate-y-0 active:shadow-[#25D366]/20"
                      >
                        <MessageCircle className="w-6 h-6 flex-shrink-0" />
                        <span className="text-center leading-snug">{ctaLabel}</span>
                        <ArrowRight className="w-5 h-5 flex-shrink-0" />
                      </a>
                    </div>

                    {/* Bottom breathing room for mobile scroll */}
                    <div className="h-4 lg:h-2" />
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

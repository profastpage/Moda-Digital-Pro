"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Play, Monitor } from "lucide-react";

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
  /* Lock body scroll when modal is open */
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

  /* Close on Escape key */
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

  return (
    <AnimatePresence>
      {isOpen && product && (
        /* Backdrop */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a1628] border border-slate-700/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content: Side A (Visual) + Side B (Info) */}
            <div className="flex flex-col lg:flex-row">
              {/* SIDE A — Visual (Video / Image) */}
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-slate-900/50 flex items-center justify-center p-6 lg:p-8">
                  {/* Product image with optional video placeholder overlay */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  {/* Video placeholder badge */}
                  <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-slate-600/30">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-300 font-medium">Video disponible — Próximamente</span>
                  </div>
                </div>
              </div>

              {/* SIDE B — Info */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col">
                {/* Badge */}
                {product.badge && (
                  <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  {product.title}
                </h2>

                {/* Long description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  {product.longDescription}
                </p>

                {/* Specs table */}
                <div className="mb-8 flex-grow">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Especificaciones Clave
                  </h3>
                  <div className="space-y-0">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className={`flex items-start justify-between py-3 border-b border-slate-700/40 ${
                          i === product.specs.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <span className="text-sm text-slate-400 font-medium pr-4">
                          {spec.label}
                        </span>
                        <span className="text-sm text-white font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/51999999999?text=Hola, estoy interesado en: ${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-3 w-full px-6 py-4 text-base font-semibold text-white bg-[#25D366] rounded-xl hover:bg-[#20bd59] transition-all duration-300 shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

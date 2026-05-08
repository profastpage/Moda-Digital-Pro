"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { SITE_CONFIG } from "@/constants/product";
import { useHasMounted } from "@/hooks/useHasMounted";

const WA_NUMBER = SITE_CONFIG.whatsapp.replace("https://wa.me/", "");

/** Mensajes contextuales por producto para WhatsApp */
const WA_MESSAGES: Record<string, string> = {
  "plotter-inkjet-alta-velocidad":
    "📋 ¡Hola! Vi el *Plotter Inkjet de Alta Velocidad* en su web (200 m²/h, aluminio aeronáutico, 1-4 cartuchos). Me interesa cotizar este equipo. ¿Tienen stock y disponibilidad inmediata? 📐",
  "plotter-trazo-corte-carton":
    "🖨️ Hola Moda Digital Pro, vi el *Plotter de Trazo de Papel y Corte de Cartón* (110 m²/h, Servo, HP45, cuchilla rotativa) en su catálogo. Me gustaría conocer el precio y disponibilidad. 📏",
  "digitalizador-48x36":
    "⚙️ ¡Buen día! Vi el *Digitalizador de 48x36* en su web (compatible con +30 formatos CAD). Por favor envíenme precio y disponibilidad. 📐",
  "plotter-corte-carton-cama-plana":
    "🚀 Hola, vi el *Plotter de Corte de Cartón Cama Plana* (Flatbed industrial, Servo, HP45, pantalla HD) en su web. Me interesa cotizar. ¿Hay stock? 📂",
  "digitalizador-cama-plana":
    "💎 ¡Hola! Quiero cotizar el *Digitalizador de Cama Plana* (escaneo un solo toque, vacío, DXF universal) que vi en su catálogo. ¿Podrían indicarme precio y disponibilidad? ✂️",
  "getonagain-cad":
    "💻 Hola, me interesa la licencia de *GetonAgain Garment CAD V2024.1* que vi en su web. ¿Incluye Patronaje + Grading + Marcación + 3D? ¿Precio y disponibilidad inmediata? 👕",
};

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

  if (!product) return null;

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    WA_MESSAGES[product.id] || `Hola, estoy interesado en: ${product.title}. ¿Podrían darme más información y precio?`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ===== BACKDROP — Deep blur overlay ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* ===== MODAL — Scale up + fade in ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`pointer-events-auto relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border transition-colors duration-300 ${
                isDark
                  ? "bg-slate-900 border-slate-700/50"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* ===== FLOATING CLOSE BUTTON — Translucent ===== */}
              <button
                onClick={onClose}
                className={`sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 flex items-center justify-center rounded-full
                  backdrop-blur-md border transition-all duration-200 hover:scale-110 ${
                    isDark
                      ? "bg-black/40 border-white/10 text-white/70 hover:text-white hover:bg-black/60"
                      : "bg-black/10 border-black/5 text-slate-500 hover:text-slate-900 hover:bg-black/20"
                  }`}
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ===== CONTENT: Image (top) + Info (bottom) ===== */}
              <div className="flex flex-col lg:flex-row">
                {/* Side A — Product Image */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  <div className={`relative aspect-[4/3] lg:aspect-auto lg:h-full flex items-center justify-center p-6 lg:p-10 transition-colors duration-300 ${
                    isDark ? "bg-slate-800/50" : "bg-slate-50"
                  }`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Side B — Full Product Info */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col">
                  {/* Badge */}
                  {product.badge && (
                    <span className="inline-block self-start px-3 py-1 mb-5 text-[10px] font-bold tracking-widest uppercase rounded-full border
                      text-cyan-600 bg-cyan-50 border-cyan-200">
                      {product.badge}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className={`text-2xl sm:text-3xl font-bold mb-4 leading-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {product.title}
                  </h2>

                  {/* Price — Celeste highlight */}
                  {product.price && (
                    <div className="mb-4">
                      <span className={`text-2xl sm:text-3xl font-bold ${
                        product.price.startsWith("$")
                          ? "text-cyan-500"
                          : isDark ? "text-slate-300" : "text-slate-600"
                      }`}>
                        {product.price}
                      </span>
                      {product.price.startsWith("$") && (
                        <span className={`block text-xs font-medium mt-1 ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}>
                          Dólares americanos
                        </span>
                      )}
                    </div>
                  )}

                  {/* Short description */}
                  <p className={`text-sm leading-relaxed mb-3 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {product.description}
                  </p>

                  {/* Long description */}
                  <p className={`text-sm sm:text-base leading-relaxed mb-8 ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {product.longDescription}
                  </p>

                  {/* Specs Table */}
                  <div className="mb-8 flex-grow">
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}>
                      Especificaciones Clave
                    </h3>
                    <div className="space-y-0">
                      {product.specs.map((spec, i) => (
                        <div
                          key={i}
                          className={`flex items-start justify-between py-3 border-b ${
                            isDark ? "border-slate-700/40" : "border-slate-100"
                          } ${i === product.specs.length - 1 ? "border-b-0" : ""}`}
                        >
                          <span className={`text-sm font-medium pr-4 ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}>
                            {spec.label}
                          </span>
                          <span className={`text-sm font-semibold text-right ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}>
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ===== WHATSAPP CTA — Big Green Button ===== */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-3 w-full px-6 py-5 text-lg font-bold text-white bg-[#25D366] rounded-2xl hover:bg-[#20bd59] transition-all duration-300 shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Cotizar este equipo por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

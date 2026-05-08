"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_PRODUCTS, generateWhatsAppLink } from "@/utils/whatsapp-engine";
import { X, MessageCircle } from "lucide-react";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";

export default function FloatingWhatsApp() {
  const { isOpen, toggleModal, closeModal } = useWhatsAppModal();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest("[data-wa-trigger]")
      ) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeModal]);

  /* Close on Escape */
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  /* Scroll lock when modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ===== Product Menu Panel — visible on both mobile and desktop ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[6.5rem] md:bottom-28 right-4 md:right-8 z-[9999] w-[280px] sm:w-80 bg-[#020617] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden pointer-events-auto"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0f172a] to-[#020617] border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">
                  Consulta por Producto
                </span>
              </div>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Product List — white-space: normal (no ellipsis) */}
            <div className="max-h-[340px] md:max-h-[360px] overflow-y-auto py-2">
              {WHATSAPP_PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    const link = generateWhatsAppLink(product.message);
                    window.open(link, "_blank", "noopener,noreferrer");
                    closeModal();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 transition-colors group text-left"
                >
                  {/* Mini product image */}
                  <div className="w-11 h-11 rounded-lg bg-[#0f172a] border border-slate-700/50 flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  {/* Product name — full text, no truncation */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white whitespace-normal leading-snug group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Consultar por WhatsApp →
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Panel Footer */}
            <div className="px-4 py-2.5 border-t border-cyan-500/15 bg-[#0f172a]/50">
              <p className="text-[10px] text-white/30 text-center">
                Moda Digital Pro · Respuesta rápida
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Floating Button — visible on both mobile and PC ===== */}
      <button
        data-wa-trigger
        onClick={toggleModal}
        aria-label="Abrir menú de productos WhatsApp"
        className="flex fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[9999] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

        {/* WhatsApp SVG */}
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.054-1.95A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.392 1.104-1.944 2.02-3.2 2.288-.854.18-1.972.324-5.732-1.232-4.812-2.006-7.908-6.892-8.148-7.208-.232-.316-1.94-2.584-1.94-4.928s1.228-3.496 1.662-3.972c.392-.432 1.078-.648 1.738-.648.21 0 .398.01.568.018.434.018.652.044 1.178.914.636 1.058 2.174 3.736 2.366 4.008.194.272.386.678.128 1.06-.248.394-.47.568-.744.878-.274.31-.534.548-.808.884-.25.292-.53.606-.218 1.142.314.528 1.396 2.304 3 3.728 2.06 1.838 3.8 2.408 4.336 2.67.536.26.848.218 1.16-.134.314-.354 1.342-1.562 1.698-2.098.354-.536.71-.448 1.196-.268.488.18 3.076 1.452 3.604 1.718.528.266.88.4 1.012.618.128.218.128 1.264-.264 2.368z" />
        </svg>

        {/* "6" badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">6</span>
        </span>
      </button>
    </>
  );
}

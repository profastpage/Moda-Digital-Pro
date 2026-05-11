"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function BackToTop() {
  const isScrolled = useScrollPosition(500);

  const scrollToTop = useCallback(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="
            /* ── Posición estratégica ── */
            fixed
            z-[9998]
            /* Móvil: arriba del botón verde WhatsApp de MobileNav */
            bottom-28 right-6
            /* PC: a la izquierda del botón flotante WhatsApp */
            md:bottom-8 md:right-[6.5rem]

            /* ── Forma y tamaño ── */
            w-10 h-10
            rounded-full

            /* ── Fondo translúcido con blur ── */
            bg-black/20
            backdrop-blur-md
            border border-white/10

            /* ── Hover: más opaco ── */
            hover:bg-black/40
            hover:border-white/20

            /* ── Flecha blanca centrada ── */
            flex items-center justify-center
            text-white/70 hover:text-white

            /* ── Transiciones suaves ── */
            transition-colors duration-200
            active:scale-90
          "
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

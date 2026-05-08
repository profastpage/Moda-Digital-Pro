"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO, HERO_ROTATIONS } from "@/constants/product";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const progressKeyRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Rotate hero texts every 6 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % HERO_ROTATIONS.length);
      progressKeyRef.current += 1;
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  /* Force autoplay on mount */
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        const resumeOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", resumeOnInteraction);
          document.removeEventListener("touchstart", resumeOnInteraction);
        };
        document.addEventListener("click", resumeOnInteraction, { once: true });
        document.addEventListener("touchstart", resumeOnInteraction, { once: true });
      });
    }
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" as const } },
  };

  return (
    <section className="hero-section relative w-full overflow-hidden bg-black" style={{ height: "100dvh", minHeight: "100vh" }}>
      {/* ===== LAYER 1: Video Background =====
          
          NOTA: No usamos transformaciones on-the-fly de Cloudinary en la URL
          porque: (1) g_auto NO funciona en video (HTTP 400, solo imágenes),
          (2) CUALQUIER transformación on-the-fly genera accept-ranges: none
          que bloquea el streaming y autoplay del navegador.
          
          En su lugar, usamos la URL raw con version ID para streaming correcto
          y logramos el mismo efecto visual via CSS:
            - object-cover: equivale a c_fill (llena sin letterboxing)
            - scale-[1.3]: equivale a z_1.3 (zoom para recortar bordes con texto)
            - object-position: center (centra el sujeto, equivalente a g_center)
            - En móvil 9:16, object-cover recorta automáticamente de horizontal a vertical
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full h-full object-cover object-center scale-[1.3]"
        poster="/images/hero-1.jpg"
      >
        <source src={HERO.video.raw} type="video/mp4" />
      </video>

      {/* ===== LAYER 2: Image Fallback (hidden by default) ===== */}
      <div className="absolute top-0 left-0 z-[1] w-full h-full" aria-hidden="true">
        <img
          src={HERO.images.desktop[0]}
          alt=""
          className="w-full h-full object-cover opacity-0"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "1";
          }}
        />
      </div>

      {/* ===== LAYER 3: Dark Overlay — legible en AMBOS modos =====
          Overlay oscuro garantiza que el texto blanco sea legible
          sin importar si el usuario está en modo claro u oscuro.
          Sin overlay, el modo claro haría invisible el texto blanco
          sobre las partes claras del video. */}
      <div className="absolute inset-0 z-[2] bg-black/40" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      {/* ===== LAYER 4: Content — vertically centered ===== */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full py-16 sm:py-0">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm"
          >
            {HERO.badge}
          </motion.span>

          {/* ===== Rotating Content Block ===== */}
          <div className="min-h-[140px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[220px] mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Texto SIEMPRE blanco con drop-shadow para legibilidad
                    en ambos modos (el overlay oscuro garantiza el contraste).
                    Se usa text-shadow + drop-shadow para proteger contra
                    cualquier fondo claro del video. */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-3 sm:mb-6"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0px 4px rgba(0,0,0,0.6)" }}
                >
                  {HERO_ROTATIONS[currentText].title}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
                >
                  {HERO_ROTATIONS[currentText].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2 mb-6 sm:mb-12">
            {HERO_ROTATIONS.map((_, idx) => (
              <div
                key={idx}
                className="h-1 w-8 bg-white/20 overflow-hidden rounded-full"
              >
                <div
                  key={`bar-${idx}-${progressKeyRef.current}`}
                  className={`h-full rounded-full ${
                    idx === currentText
                      ? "bg-cyan-400 animate-progress"
                      : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={HERO.cta.href}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-primary-light transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              {HERO.cta.label}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator — siempre blanco con fondo oscuro */}
      <motion.a
        href="#productos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">{HERO.scrollLabel}</span>
        <ChevronDown className="w-6 h-6" />
      </motion.a>

      {/* Bottom gradient — smooth blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-transparent to-[#020617] dark:to-[#020617] pointer-events-none z-[5]" />
    </section>
  );
}

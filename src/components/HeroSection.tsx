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
    <section
      className="hero-section relative w-full overflow-hidden bg-black"
      style={{ height: "100svh", minHeight: "100vh" }}
    >
      {/* ===== LAYER 1: VIDEO FULLSCREEN (alta calidad CSS) =====

          Calidad de video garantizada por:
            1. URL raw con version ID → streaming correcto (accept-ranges: bytes)
            2. image-rendering: -webkit-optimize-contrast → bordes más nítidos en móvil
            3. filter: contrast(1.03) saturate(1.05) → ligeramente más vibrante
            4. preload="auto" + fetchPriority="high" → carga prioritaria
            5. object-cover: rellena sin distorsión (equivale a c_fill)

          POR QUÉ NO usamos transforms en la URL Cloudinary:
            - g_auto:subject → HTTP 400 (solo funciona en imágenes, no video)
            - q_auto, e_sharpen → accept-ranges: none → bloquea autoplay
            - Cualquier transform on-the-fly rompe el streaming del navegador

          El video original es 1920x1080 @ 2.5 Mbps (50MB total),
          calidad suficiente para cualquier pantalla móvil o desktop.
          Si se ve pixelado, el problema es el bitrate del SOURCE,
          no del delivery. Solución: re-encode con bitrate mayor.
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover object-center z-0"
        style={{
          imageRendering: "-webkit-optimize-contrast" as React.CSSProperties["imageRendering"],
          filter: "contrast(1.03) saturate(1.05)",
        }}
        poster="/images/hero-1.jpg"
      >
        <source src={HERO.video.raw} type="video/mp4" />
      </video>

      {/* ===== LAYER 2: OVERLAY OSCURO (efecto cine — sutil) ===== */}
      <div className="absolute inset-0 z-[2] bg-black/25" />

      {/* ===== LAYER 3: GRADIENT para fusionar con secciones ===== */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* ===== LAYER 4: CONTENIDO — CENTRADO VERTICAL ===== */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 sm:px-8">
        <div className="max-w-3xl w-full">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-block px-4 py-1.5 mb-5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/10 backdrop-blur-sm"
          >
            {HERO.badge}
          </motion.span>

          {/* Rotating Content */}
          <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[200px] mb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h1
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.5)" }}
                >
                  {HERO_ROTATIONS[currentText].title}
                </h1>
                <p
                  className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
                  style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
                >
                  {HERO_ROTATIONS[currentText].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-6 sm:mb-8">
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
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={HERO.cta.href}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5"
            >
              {HERO.cta.label}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#productos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">{HERO.scrollLabel}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>

      {/* Bottom gradient — smooth blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[5]" />
    </section>
  );
}

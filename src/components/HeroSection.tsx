"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO, HERO_ROTATIONS, SITE_CONFIG } from "@/constants/product";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const [videoSrc, setVideoSrc] = useState(HERO.video.desktop);
  const progressKeyRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ===== DYNAMIC VIDEO URL BY VIEWPORT =====
     Mobile (<768px): Cloudinary AI-cropped vertical (720x1280, 4MB)
     Desktop (>=768px): Raw original (1920x1080, 59MB)
     Both have accept-ranges: bytes + cache-control: immutable */
  const updateVideoSrc = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const newSrc = isMobile ? HERO.video.mobile : HERO.video.desktop;
    setVideoSrc(newSrc);
  }, []);

  useEffect(() => {
    updateVideoSrc();
    const handleResize = () => updateVideoSrc();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateVideoSrc]);

  /* Re-play video when source changes (viewport change) */
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }, [videoSrc]);

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
      {/* ===== LAYER 1: VIDEO — URL DINÁMICA POR VIEWPORT =====

          DESKTOP (>=768px):
            URL raw → 1920x1080, 59MB, streaming perfecto
            El video horizontal cubre todo el ancho

          MOBILE (<768px):
            Cloudinary g_auto:subject → 720x1280, 4MB
            La IA detecta el plotter y recorta horizontal→vertical
            g_auto está encadenado como componente separado para
            que Cloudinary pre-renderice y cachee el resultado
            con accept-ranges: bytes
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/hero-1.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* ===== LAYER 2: OVERLAY (efecto cine) ===== */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ===== LAYER 3: CONTENIDO — CENTRO PERFECTO ===== */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-6">
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
              href="https://wa.me/51944252684?text=%F0%9F%91%8B%20%C2%A1Hola%20Moda%20Digital%20Pro!%20Me%20interesa%20cotizar%20el%20Plotter%20Textil%20T-1800%20a%20%245%2C600.%20%C2%BFTienen%20disponibilidad%20inmediata%3F%20%f0%9f%8f%ad%f0%9f%93%90"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-[#20BD5A] transition-all duration-300 shadow-lg shadow-[#25D366]/25 hover:shadow-[#20BD5A]/40 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar Plotter $5,600
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
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">{HERO.scrollLabel}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>

      {/* Bottom gradient — smooth blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[5]" />
    </section>
  );
}

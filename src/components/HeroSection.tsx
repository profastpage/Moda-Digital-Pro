"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO, HERO_ROTATIONS } from "@/constants/product";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const [videoSrc, setVideoSrc] = useState(HERO.video.desktop);
  const [mobileFailed, setMobileFailed] = useState(false);
  const progressKeyRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ===== DYNAMIC VIDEO URL BY VIEWPORT =====
     Mobile (<768px): Cloudinary AI-cropped vertical (720x1280)
     Desktop (>=768px): Raw original (1920x1080)
     If Cloudinary transform fails → fallback to raw desktop URL */
  const getVideoSrc = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && !mobileFailed) {
      return HERO.video.mobile;
    }
    return HERO.video.desktop;
  }, [mobileFailed]);

  const updateVideoSrc = useCallback(() => {
    setVideoSrc(getVideoSrc());
  }, [getVideoSrc]);

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

  /* Fallback: if Cloudinary mobile URL fails to load, use desktop raw URL */
  const handleVideoError = useCallback(() => {
    if (window.innerWidth < 768 && !mobileFailed) {
      setMobileFailed(true);
      setVideoSrc(HERO.video.desktop);
    }
  }, [mobileFailed]);

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
      className="hero-section relative w-full h-[100svh] overflow-hidden bg-black"
    >
      {/* ===== LAYER 1: VIDEO — FULLSCREEN BACKGROUND =====
          DESKTOP (>=768px): Raw 1920x1080 → object-cover fills viewport
          MOBILE (<768px): Cloudinary g_auto:subject 720x1280 vertical
          Fallback: if Cloudinary transform fails → raw desktop URL
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0"
        style={{ objectFit: "cover" }}
        poster="/images/hero-1.jpg"
        onError={handleVideoError}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* ===== LAYER 2: OVERLAY — subtle for text legibility ===== */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* ===== LAYER 3: CONTENT — centered with text shadow ===== */}
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

          {/* CTA — Explorar Equipos → scroll suave a #productos */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 active:scale-[0.98]"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explorar Equipos
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
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">{HERO.scrollLabel}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>

      {/* Bottom gradient — smooth blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none z-[5]" />
    </section>
  );
}

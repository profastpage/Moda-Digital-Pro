"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO, HERO_ROTATIONS } from "@/constants/product";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  /* Rotate background images every 6 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  /* Rotate hero texts every 5.5 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % HERO_ROTATIONS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" as const },
    }),
  };

  /* Exit: slide up & fade out | Enter: slide from below & fade in */
  const textVariants = {
    enter: { opacity: 0, y: 40 },
    center: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.45, ease: "easeIn" as const } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        <img
          src={HERO.images.desktop[0]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={HERO.images.desktop[1]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Dark gradient — always opaque enough for white text in both themes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0f172a]/60 to-[#020617]/85" />
      </div>

      {/* Mobile Background */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <img
          src={HERO.images.mobile[0]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={HERO.images.mobile[1]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0f172a]/60 to-[#020617]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-3xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm"
          >
            {HERO.badge}
          </motion.span>

          {/* Rotating Title — fixed min-height prevents layout jump */}
          <div className="min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5rem] lg:min-h-[5.5rem] mb-6 sm:mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentText}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                {HERO_ROTATIONS[currentText].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Rotating Subtitle — fixed min-height prevents layout jump */}
          <div className="min-h-[4.5rem] sm:min-h-[3.5rem] md:min-h-[4rem] mb-8 sm:mb-12 max-w-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentText}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed"
              >
                {HERO_ROTATIONS[currentText].subtitle}
              </motion.p>
            </AnimatePresence>
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

      {/* Scroll Indicator */}
      <motion.a
        href="#productos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">{HERO.scrollLabel}</span>
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}

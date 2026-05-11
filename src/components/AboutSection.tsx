"use client";

import { motion } from "framer-motion";
import { STATS, ADVANTAGES } from "@/constants/product";
import { TrendingUp, Layers, Star, Clock, Shield, Zap, HeadphonesIcon, Award } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Layers,
  Star,
  Clock,
  Shield,
  Zap,
  HeadphonesIcon,
  Award,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const statUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

interface AboutSectionProps {
  stats?: { value: string; label: string; icon: string }[];
  advantages?: { number: string; title: string; description: string }[];
  badge?: string;
  title?: string;
  advantagesTitle?: string;
}

export default function AboutSection({
  stats: statsProp,
  advantages: advantagesProp,
  badge,
  title,
  advantagesTitle,
}: AboutSectionProps) {
  const stats = statsProp?.length ? statsProp : STATS;
  const advantages = advantagesProp?.length ? advantagesProp : ADVANTAGES;

  return (
    <section id="nosotros" className="relative py-20 sm:py-28 lg:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full">
            {badge || "Por qué Moda Digital Pro"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {title || "Tecnología de grado industrial para tu producción textil"}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-14 sm:mb-20 max-w-4xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || TrendingUp;
            return (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center p-5 sm:p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/20 transition-all duration-300"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3 sm:mb-4" />
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <p className="text-white/60 text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Advantages */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h3
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold"
          >
            {advantagesTitle || "Ventajas de elegir Moda Digital Pro"}
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.number}
              custom={i}
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-xl flex-shrink-0">
                <span className="text-primary font-bold text-lg">{adv.number}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-bold mb-2">{adv.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{adv.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient — smooth blend into next section (FAQ bg-card / #0f172a) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-card pointer-events-none" />
    </section>
  );
}

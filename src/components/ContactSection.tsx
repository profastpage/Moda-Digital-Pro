"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_INFO, SITE_CONFIG } from "@/constants/product";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gracias ${formData.name}, tu mensaje ha sido enviado. Nos pondremos en contacto pronto.`);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
    }),
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 lg:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 rounded-full">
            Contáctanos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Impulsa tu producción textil
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Estamos listos para asesorarte. Escríbenos y recibe una cotización personalizada sin costo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-border/60"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Carlos Mendoza"
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Producto de interés
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm appearance-none"
                  >
                    <option value="">Selecciona un producto</option>
                    <option value="plotter-t1800">Plotter T-1800</option>
                    <option value="plotter-t3200">Plotter T-3200</option>
                    <option value="sublima-s1200">Sublimación S-1200</option>
                    <option value="impresion">Servicio de Impresión</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-semibold text-base rounded-xl hover:bg-primary-light transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Enviar Mensaje
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border/60">
              <h3 className="text-lg font-bold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Teléfono</p>
                    <p className="text-sm text-muted-foreground">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Correo</p>
                    <p className="text-sm text-muted-foreground">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Horario</p>
                    <p className="text-sm text-muted-foreground">{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <p className="text-white font-bold text-lg mb-1">¿Prefieres WhatsApp?</p>
              <p className="text-white/80 text-sm">Escríbenos directamente y recibe atención inmediata</p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { CONTACT_INFO, SITE_CONFIG } from "@/constants/product";
import { Send, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ContactSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme !== "light";

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

  return (
    <section id="contacto" className={`py-20 sm:py-28 lg:py-32 transition-colors duration-300 ${isDark ? "bg-slate-950" : "bg-white"}`}>
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
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
            Impulsa tu producción textil
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
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
              className={`${isDark ? "bg-slate-900 border-slate-700/50" : "bg-white border-slate-200"} rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Carlos Mendoza"
                    required
                    className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"} border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    required
                    className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"} border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 944 252 684"
                    className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"} border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Producto de interés
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-600 text-white" : "bg-white border-slate-300 text-slate-900"} border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm appearance-none`}
                  >
                    <option value="">Selecciona un producto</option>
                    <option value="escaneo-plano">Digitalizador de Escaneo Plano</option>
                    <option value="plotter-corte-vertical">Plotter de Corte Vertical</option>
                    <option value="plotter-cama-plana">Plotter de Corte Cama Plana</option>
                    <option value="digitalizador">Digitalizador</option>
                    <option value="getonagain-cad">GetonAgain Garment CAD V2024.1</option>
                    <option value="impresion">Servicio de Impresión</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                  rows={5}
                  required
                  className={`w-full px-4 py-3 ${isDark ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"} border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm resize-none`}
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
            className="lg:col-span-2 space-y-5"
          >
            <div className={`${isDark ? "bg-slate-900 border-slate-700/50" : "bg-white border-slate-200"} rounded-2xl p-6 sm:p-8 shadow-sm border`}>
              <h3 className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
                Información de Contacto
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                    <Phone className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>Teléfono</p>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                    <Mail className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>Correo</p>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>Ubicación</p>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{CONTACT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
                    <Clock className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>Horario</p>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA — compact clickable card */}
            <a
              href="https://wa.me/51944252684?text=%F0%9F%91%8B%20%C2%A1Hola%20Moda%20Digital%20Pro!%20Me%20gustar%C3%ADa%20recibir%20una%20cotizaci%C3%B3n%20personalizada.%20%C2%BFPodr%C3%ADan%20asesorarme%3F%20%f0%9f%8f%ad%f0%9f%93%90"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] rounded-2xl p-5 sm:p-6 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base">¿Prefieres WhatsApp?</p>
                <p className="text-white/80 text-sm">Escríbenos y recibe atención inmediata</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { sanityFetch } from "@/sanity/live";
import { HOME_CONTENT_QUERY, ALL_PRODUCTS_QUERY } from "@/lib/sanity.queries";
import {
  HERO,
  HERO_ROTATIONS,
  PRODUCTS,
  SERVICES,
  STATS,
  ADVANTAGES,
  FAQ_ITEMS,
  CONTACT_INFO,
  FOOTER_LINKS,
  NAV_ITEMS,
  SITE_CONFIG,
} from "@/constants/product";
import type { SanityProduct } from "@/lib/sanity.client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/* ── Type for homeContent sanity document ── */
interface HomeContent {
  navItems?: { label: string; href: string }[];
  heroBadge?: string;
  heroCTALabel?: string;
  heroScrollLabel?: string;
  heroRotations?: { title: string; subtitle: string }[];
  productsBadge?: string;
  productsTitle?: string;
  productsDescription?: string;
  servicesBadge?: string;
  servicesTitle?: string;
  servicesDescription?: string;
  services?: { id?: string; icon: string; title: string; description: string }[];
  aboutBadge?: string;
  aboutTitle?: string;
  advantagesTitle?: string;
  stats?: { value: string; label: string; icon: string }[];
  advantages?: { number: string; title: string; description: string }[];
  faqBadge?: string;
  faqTitle?: string;
  faqDescription?: string;
  faqItems?: { question: string; answer: string }[];
  contactBadge?: string;
  contactTitle?: string;
  contactDescription?: string;
  contactHours?: string;
  footerTagline?: string;
  footerProducts?: { label: string; href: string }[];
  footerServices?: { label: string; href: string }[];
  footerCompany?: { label: string; href: string }[];
}

export default async function Home() {
  /* ── Parallel fetch: homeContent + all products ── */
  const [contentResult, productsResult] = await Promise.all([
    sanityFetch({ query: HOME_CONTENT_QUERY }).catch(() => null),
    sanityFetch({ query: ALL_PRODUCTS_QUERY }).catch(() => null),
  ]);

  /* Extract data or null */
  const content = (contentResult?.data as HomeContent | null) || null;
  const sanityProducts = (productsResult?.data as SanityProduct[] | null) || null;

  /* ── Derived props with fallback to constants ── */

  // Header
  const navItems = content?.navItems?.length
    ? content.navItems
    : NAV_ITEMS;

  // Hero
  const heroBadge = content?.heroBadge || HERO.badge;
  const heroRotations = content?.heroRotations?.length
    ? content.heroRotations
    : HERO_ROTATIONS;
  const heroCtaLabel = content?.heroCTALabel || HERO.cta.label;
  const heroScrollLabel = content?.heroScrollLabel || HERO.scrollLabel;

  // Products section header
  const productsBadge = content?.productsBadge || "Nuestros Productos";
  const productsTitle = content?.productsTitle || "Equipos y software de última generación";
  const productsDescription = content?.productsDescription || "Soluciones integrales para la industria textil: digitalizadores, plotters de corte e inyección, y software CAD profesional. Todo lo que necesitas para escalar tu producción.";

  // Services
  const services = content?.services?.length
    ? content.services
    : SERVICES;
  const servicesBadge = content?.servicesBadge || "Nuestros Servicios";
  const servicesTitle = content?.servicesTitle || "Soluciones Industriales para Patronaje y Producción Textil";
  const servicesDescription = content?.servicesDescription || "Ofrecemos soluciones profesionales para impresión de moldes, patronaje digital, trazado industrial y producción textil asistida por computadora.";

  // About
  const stats = content?.stats?.length ? content.stats : STATS;
  const advantages = content?.advantages?.length ? content.advantages : ADVANTAGES;
  const aboutBadge = content?.aboutBadge || "Por qué Moda Digital Pro";
  const aboutTitle = content?.aboutTitle || "Tecnología de grado industrial para tu producción textil";
  const advantagesTitle = content?.advantagesTitle || "Ventajas de elegir Moda Digital Pro";

  // FAQ
  const faqItems = content?.faqItems?.length ? content.faqItems : FAQ_ITEMS;
  const faqBadge = content?.faqBadge || "Preguntas Frecuentes";
  const faqTitle = content?.faqTitle || "Todo lo que necesitas saber";
  const faqDescription = content?.faqDescription || "Resolvemos tus dudas más comunes sobre nuestros equipos, servicios y procesos de producción textil.";

  // Contact
  const contactInfo = content?.contactHours
    ? {
        phone: CONTACT_INFO.phone,
        email: CONTACT_INFO.email,
        address: CONTACT_INFO.address,
        hours: content.contactHours,
      }
    : CONTACT_INFO;
  const contactBadge = content?.contactBadge || "Contáctanos";
  const contactTitle = content?.contactTitle || "Impulsa tu producción textil";
  const contactDescription = content?.contactDescription || "Estamos listos para asesorarte. Escríbenos y recibe una cotización personalizada sin costo.";

  // Footer
  const footerLinks = content?.footerProducts?.length
    ? {
        productos: content.footerProducts,
        servicios: content.footerServices?.length ? content.footerServices : FOOTER_LINKS.servicios,
        empresa: content.footerCompany?.length ? content.footerCompany : FOOTER_LINKS.empresa,
      }
    : FOOTER_LINKS;
  const footerTagline = content?.footerTagline || SITE_CONFIG.description;
  const footerContactInfo = contactInfo;

  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={navItems} />
      <main className="flex-1">
        <HeroSection
          badge={heroBadge}
          rotations={heroRotations}
          ctaLabel={heroCtaLabel}
          scrollLabel={heroScrollLabel}
        />
        <ProductsSection
          sanityProducts={sanityProducts}
          fallbackProducts={PRODUCTS}
          badge={productsBadge}
          title={productsTitle}
          description={productsDescription}
        />
        <ServicesSection
          services={services}
          badge={servicesBadge}
          title={servicesTitle}
          description={servicesDescription}
        />
        <AboutSection
          stats={stats}
          advantages={advantages}
          badge={aboutBadge}
          title={aboutTitle}
          advantagesTitle={advantagesTitle}
        />
        <FAQSection
          faqItems={faqItems}
          badge={faqBadge}
          title={faqTitle}
          description={faqDescription}
        />
        <ContactSection
          contactInfo={contactInfo}
          badge={contactBadge}
          title={contactTitle}
          description={contactDescription}
        />
      </main>
      <Footer
        footerLinks={footerLinks}
        tagline={footerTagline}
        contactInfo={footerContactInfo}
      />
    </div>
  );
}

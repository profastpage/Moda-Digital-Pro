"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/constants/product";
import { getProductImageUrl, plainText, type SanityProduct } from "@/lib/sanity.client";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import ProductModal from "./ProductModal";

/* Standardized animation: short slide (20px), fast (0.6s), easeOut */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const cardUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

/**
 * Resolve slug to string regardless of format.
 * GROQ projects slug as string: "slug": slug.current
 * But the TS type allows both string and {current, _type}.
 */
function resolveSlug(product: SanityProduct): string {
  if (typeof product.slug === "string") return product.slug;
  return product.slug?.current || product._id.replace(/^drafts\./, "");
}

/* ── Transform a SanityProduct into the flat ProductModal format ──
 *  Image resolution chain:
 *    1. Sanity CDN URL (if product has uploaded image with asset)
 *    2. Matching hardcoded product's local image (/public/images/product-XX.png)
 *    3. Generic placeholder
 */
function transformSanityProduct(product: SanityProduct, fallbackImage?: string) {
  const description = plainText(product.description);
  return {
    id: resolveSlug(product),
    title: product.name,
    image: getProductImageUrl(product.image) || fallbackImage || "/images/placeholder.png",
    description,
    longDescription: description,
    price: product.price,
    cta: "Cotizar Ahora",
    badge: product.badge || undefined,
    specs: (product.specs || []).map((s) => {
      if (typeof s === "string") {
        return {
          label: s.split(":")[0]?.trim() || s,
          value: s.includes(":") ? s.split(":").slice(1).join(":").trim() : s,
        };
      }
      const obj = s as { label?: string; value?: string } | undefined;
      return { label: obj?.label || "", value: obj?.value || "" };
    }),
  };
}

/* ── Shared product type ── */
interface ProductItem {
  id: string;
  title: string;
  image: string;
  description: string;
  longDescription: string;
  price?: string;
  cta?: string;
  badge?: string;
  specs: { label: string; value: string }[];
}

interface ProductsSectionProps {
  sanityProducts?: SanityProduct[] | null;
  badge?: string;
  title?: string;
  description?: string;
}

export default function ProductsSection({
  sanityProducts,
  badge,
  title,
  description,
}: ProductsSectionProps) {
  /*
   * MERGE STRATEGY:
   * 1. Always show the 6 static fallback products
   * 2. If Sanity CMS has products with matching slug → CMS version wins (updated data)
   * 3. If Sanity CMS has NEW products (not in static) → append them at the end
   *
   * This ensures products NEVER disappear from the website,
   * even if Sanity is empty or unreachable.
   */
  const products: ProductItem[] = useMemo(() => {
    const fallback = PRODUCTS as unknown as ProductItem[];

    if (!sanityProducts?.length) return fallback;

    // CMS products that match a fallback slug → replace it
    // KEY FIX: GROQ returns slug as string via "slug": slug.current
    // So we use resolveSlug() which handles both string and {current} formats.
    // Previous bug: slug?.current returned undefined for strings,
    // falling back to _id with "drafts." prefix → no slug match → 12 duplicates.
    const replaced = new Set<string>();
    const merged = fallback.map((fp) => {
      const cmsMatch = sanityProducts.find(
        (cp) => resolveSlug(cp) === fp.id,
      );
      if (cmsMatch) {
        replaced.add(resolveSlug(cmsMatch));
        return transformSanityProduct(cmsMatch, fp.image); // Pass fallback image
      }
      return fp;
    });

    // CMS products NOT in fallback → append at the end
    const newFromCms = sanityProducts
      .filter((cp) => !replaced.has(resolveSlug(cp)))
      .map((cp) => transformSanityProduct(cp));

    return [...merged, ...newFromCms];
  }, [sanityProducts]);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 350);
  };

  return (
    <section id="productos" className="py-20 sm:py-28 lg:py-32 bg-background">
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
            {badge || "Nuestros Productos"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {title || "Equipos y software de última generación"}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center">
            {description || "Soluciones integrales para la industria textil: digitalizadores, plotters de corte e inyección, y software CAD profesional. Todo lo que necesitas para escalar tu producción."}
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.article
              key={product.id}
              custom={i}
              variants={cardUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              onClick={() => openModal(product)}
              className="group relative flex flex-col bg-card rounded-2xl overflow-hidden cursor-pointer
                border border-border/40 hover:border-primary/30
                shadow-sm hover:shadow-xl hover:shadow-primary/5
                transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Product Image — fixed height, fallback si no hay imagen */}
              <div className="relative w-full h-64 sm:h-72 bg-muted flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-contain p-5 sm:p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="w-10 h-10 opacity-30" />
                    <span className="text-xs opacity-40">Imagen no disponible</span>
                  </div>
                )}
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white bg-primary/80 backdrop-blur-md rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Card Footer — Title + "Ver más" pill */}
              <div className="px-5 sm:px-6 py-4 flex items-center justify-between gap-3">
                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug line-clamp-2 flex-grow">
                  {product.title}
                </h3>
                <span
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-slate-800/60 border border-slate-700/60
                    group-hover:bg-primary group-hover:border-primary
                    transition-all duration-300"
                >
                  <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 group-hover:text-white transition-colors duration-300">
                    Ver más
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

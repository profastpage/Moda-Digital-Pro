import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // ── Sanity CDN: dominios permitidos para <Image /> de Next.js ──
  // Necesario si en el futuro se migran los <img> nativos a <Image />
  // Por ahora ProductsSection usa <img> con @sanity/image-url (funciona sin esto)
  // pero se agrega de preventa para futuras optimizaciones.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;

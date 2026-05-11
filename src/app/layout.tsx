import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { WhatsAppModalProvider } from "@/context/WhatsAppModalContext";
import SiteComponents from "@/components/SiteComponents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moda Digital Pro | Plotters Textiles de Alta Precisión",
  description:
    "Líderes en tecnología de impresión textil de gran formato. Construimos tu solución en moda digital.",
  keywords:
    "moda digital, plotter textil, impresión textil, sublimación, diseño CAM, Perú, plotter industrial, plotters textiles",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Moda Digital Pro | Plotters Textiles de Alta Precisión",
    description:
      "Líderes en tecnología de impresión textil de gran formato. Construimos tu solución en moda digital.",
    siteName: "Moda Digital Pro",
    type: "website",
    locale: "es_PE",
    url: "https://moda-digital-pro.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moda Digital Pro | Plotters Textiles de Alta Precisión",
    description:
      "Líderes en tecnología de impresión textil de gran formato. Construimos tu solución en moda digital.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
  ],
};

/* JSON-LD Structured Data for LocalBusiness */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Moda Digital Pro",
  description:
    "Líderes en tecnología de impresión textil de gran formato. Plotters textiles, digitalizadores y software CAD profesional.",
  url: "https://moda-digital-pro.vercel.app",
  telephone: "+51944252684",
  email: "ventas@modadigitalpro.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-12.0464",
    longitude: "-77.0428",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  image: "https://moda-digital-pro.vercel.app/images/product-01-escaneo-plano.jpg",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Force dark mode BEFORE hydration — prevents FOUC and stale localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('dark');try{localStorage.setItem('theme','dark')}catch(e){}})()`,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <WhatsAppModalProvider>
            {children}
            <SiteComponents />
          </WhatsAppModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import MobileNav from "@/components/MobileNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WhatsAppModalProvider } from "@/context/WhatsAppModalContext";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Moda Digital Pro | Plotters Textiles de Alta Precisión",
    description:
      "Líderes en tecnología de impresión textil de gran formato. Construimos tu solución en moda digital.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Force dark mode BEFORE hydration — prevents FOUC and stale localStorage */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('dark');try{localStorage.setItem('theme','dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <WhatsAppModalProvider>
            {children}
            <FloatingWhatsApp />
            <MobileNav />
          </WhatsAppModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

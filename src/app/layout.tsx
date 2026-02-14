import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fillezy.com"),
  title: {
    template: "%s | Fillezy - Smart Industrial Packaging",
    default: "Fillezy - Leading Sustainable Void Fill Automation",
  },
  description: "Advanced industrial void fill solutions and sustainable packaging automation. Engineered for high-velocity fulfillment centers with 100% house-compostable Bio-Aer materials.",
  keywords: ["void fill automation", "sustainable packaging India", "air cushion machine", "compostable air pillows", "industrial fulfillment solutions"],
  alternates: {
    canonical: "https://www.fillezy.com",
  },
  icons: {
    icon: [
      { url: '/logo/fill-fav.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/logo/fill-fav.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/logo/fill-fav.png?v=2',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fillezy.com",
    siteName: "Fillezy Industrial Packaging",
    title: "Fillezy - The Future of Sustainable Industrial Packaging",
    description: "Engineering smarter fulfillment protocols. Switch to Bio-Aer compostable solutions and high-velocity automation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fillezy Industrial Packaging Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fillezy - Sustainable Packaging Automation",
    description: "Next-gen void fill systems and plant-based packaging resins.",
    site: "@fillezy",
    creator: "@fillezy",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300 relative`}
      >
        <div className="fixed inset-0 network-pattern z-[-1] pointer-events-none" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
            <BackToTop />
          </SmoothScroll>
          <WhatsAppWidget />
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}

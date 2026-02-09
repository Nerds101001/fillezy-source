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
    template: "%s | Fillezy - Smart Packaging Systems",
    default: "Fillezy - Smart. Sustainable. Industrial-Grade Packaging.",
  },
  description: "Next-generation void fill automation and sustainable packaging materials. Engineered for high-velocity fulfillment centers and global supply chains.",
  keywords: ["void fill", "air cushion machine", "sustainable packaging", "biodegradable film", "packaging automation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fillezy.com",
    siteName: "Fillezy",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added or referenced
        width: 1200,
        height: 630,
        alt: "Fillezy Industrial Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fillezy",
    creator: "@fillezy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}

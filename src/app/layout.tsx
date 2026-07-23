import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingLanguageToggle from "@/components/FloatingLanguageToggle";
import LangUpdater from "@/components/LangUpdater";
import { LanguageProvider } from "@/contexts/LanguageContext";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edwin Zuleta — Full Stack Developer & AI Engineer Portfolio",
  description:
    "Full Stack Developer & AI Engineer specializing in Next.js, React, Node.js, and AI-assisted development. Building modern, high-performance web applications with clean design and scalable architecture. Based in Venezuela.",
  keywords: [
    "Edwin Zuleta",
    "full stack developer",
    "next.js developer",
    "react developer",
    "AI engineer",
    "web development portfolio",
    "venezuela developer",
    "frontend developer",
    "typescript developer",
    "node.js developer",
    "ai-assisted development",
    "porfolio desarrollador web",
  ],
  metadataBase: new URL("https://edwinzuleta.dev"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/",
    },
  },
  openGraph: {
    title: "Edwin Zuleta — Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Engineer. Building modern web apps with Next.js, React, and AI-assisted development. Explore my portfolio projects.",
    type: "website",
    locale: "en_US",
    siteName: "Edwin Zuleta Portfolio",
    url: "https://edwinzuleta.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Edwin Zuleta — Full Stack Developer & AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edwin Zuleta — Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Engineer. Building modern web apps with Next.js, React, and AI-assisted development.",
    images: ["/og-image.png"],
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
  verification: {
    google: "", // Add your Google Search Console verification code
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/models/yo.png" as="image" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <JsonLd />
        <LangUpdater />
        <LoadingScreen />
        <LanguageProvider>
          <TooltipProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </TooltipProvider>
          <FloatingLanguageToggle />
        </LanguageProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

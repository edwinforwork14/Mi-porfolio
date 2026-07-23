import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex — Full Stack Developer & 3D Designer Portfolio",
  description:
    "Full Stack Developer specializing in Next.js, React, Node.js, and AI-assisted development. Building modern web apps with clean design and scalable architecture.",
  keywords: [
    "full stack developer",
    "next.js developer",
    "react developer",
    "web development",
    "portfolio",
    "ai-assisted development",
    "3d designer",
    "venezuela developer",
  ],
  openGraph: {
    title: "Alex — Full Stack Developer & Portfolio",
    description: "Modern web apps built with Next.js, React, and AI-assisted development.",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col bg-black text-white">
        <TooltipProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </TooltipProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

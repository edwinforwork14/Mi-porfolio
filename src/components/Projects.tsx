"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  client: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
}

// ─── Web images (mismas que InfiniteScrollSection) ───────────────────────────
const webImages = [
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM.jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (1).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (3).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (4).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (5).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (6).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (7).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (8).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (9).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (10).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (11).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (12).jpeg",
  "/images/webs/WhatsApp Image 2026-07-22 at 9.14.34 PM (13).jpeg",
];

// Deterministic shuffle (misma semilla = mismo orden en server y cliente)
const shuffled = webImages
  .map((img, i) => ({ img, key: (i * 7 + 13) % webImages.length }))
  .sort((a, b) => a.key - b.key)
  .map(({ img }) => img);

// ─── Project data ────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: "01",
    client: "Untitled Tech Company (UTC)",
    title: "Corporate Website Redesign",
    description:
      "Complete redesign and development of the corporate website with modern UI/UX patterns, optimized performance, and AI-assisted workflows.",
    fullDescription:
      "Led the end-to-end redesign of UTC's corporate web presence, transforming a legacy site into a modern, high-performance digital experience. Implemented server-side rendering, lazy loading, and automated image optimization to achieve sub-2-second load times. Introduced AI-assisted development workflows that reduced iteration cycles by 40%. The project encompassed information architecture restructuring, component library creation, and seamless CMS integration for non-technical content editors.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Vercel",
    ],
    liveUrl: "https://example.com/utc",
    githubUrl: "https://github.com/example/utc",
    images: [shuffled[0], shuffled[1], shuffled[2]],
  },
  {
    id: "02",
    client: "WH MattDress",
    title: "E-commerce Platform",
    description:
      "Full-featured e-commerce platform with custom product configurator, real-time inventory management, and seamless checkout experience.",
    fullDescription:
      "Architected and built a comprehensive e-commerce solution for WH MattDress, a luxury mattress brand. Features include a custom 3D product configurator allowing customers to customize mattress firmness, materials, and dimensions in real-time. Implemented a headless CMS architecture with real-time inventory sync across multiple warehouses. The checkout flow was optimized to reduce cart abandonment by 25% through streamlined UX and multiple payment gateway integration.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Supabase",
      "Express",
      "MySQL",
    ],
    liveUrl: "https://example.com/whmattdress",
    images: [shuffled[3], shuffled[4], shuffled[5]],
  },
  {
    id: "03",
    client: "Independent",
    title: "AI-Powered SaaS Platform",
    description:
      "A cutting-edge SaaS platform leveraging AI/ML capabilities for automated content generation and intelligent data analysis.",
    fullDescription:
      "Developed a full-stack SaaS platform from concept to deployment, serving over 500 active users. The platform leverages OpenAI's GPT models for intelligent content generation, featuring a custom fine-tuning pipeline that adapts to each user's brand voice and style preferences. Built with a microservices architecture for scalability, implemented real-time collaborative editing with WebSockets, and deployed a multi-tenant database schema ensuring data isolation and security compliance.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    liveUrl: "https://example.com/saas",
    githubUrl: "https://github.com/example/saas",
    images: [shuffled[6], shuffled[7], shuffled[8]],
  },
];

// ─── Tech icon colors ────────────────────────────────────────────────────────
const techColors: Record<string, string> = {
  "Next.js": "#000000",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "Tailwind CSS": "#06B6D4",
  "Node.js": "#339933",
  Express: "#000000",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  Supabase: "#3ECF8E",
  Vercel: "#000000",
  Stripe: "#008CDD",
  Python: "#3776AB",
  Docker: "#2496ED",
  AWS: "#FF9900",
  Redis: "#DC382D",
};

// ─── Overlay Component ───────────────────────────────────────────────────────
function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const handleClose = () => onClose();

  // Keyboard support + body overflow
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setImgIndex((p) => (p + 1) % project.images.length);
      if (e.key === "ArrowLeft")
        setImgIndex((p) => (p - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
        className="relative w-[95vw] max-w-6xl lg:max-h-[85vh] max-h-[90vh] lg:overflow-hidden overflow-y-auto rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:h-[85vh] min-h-0">
          {/* ── LEFT: Image Gallery ── */}
          <div className="lg:col-span-3 relative bg-black/40">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full h-full min-h-[250px] overflow-hidden bg-neutral-900">
              <Image
                src={project.images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button
                  onClick={() =>
                    setImgIndex(
                      (p) => (p - 1 + project.images.length) % project.images.length
                    )
                  }
                  className="w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-medium text-white/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  {imgIndex + 1} / {project.images.length}
                </span>

                <button
                  onClick={() =>
                    setImgIndex((p) => (p + 1) % project.images.length)
                  }
                  className="w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail dots */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === imgIndex
                        ? "bg-white w-6"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Project Details ── */}
          <div className="lg:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col overflow-hidden">
            {/* Project number & client */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl md:text-3xl font-black text-purple-400/40">
                {project.id}
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-purple-400/60 bg-purple-400/5 px-3 py-1.5 rounded-full border border-purple-400/10">
                {project.client}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-black text-purple-400 mb-3 leading-tight">
              {project.title}
            </h2>

            {/* Full Description - truncated to avoid scroll */}
            <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-4 lg:line-clamp-5">
              {project.fullDescription}
            </p>

            {/* Technologies */}
            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-2 block">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                    style={{
                      borderColor: `${techColors[tech] || "#666"}25`,
                      backgroundColor: `${techColors[tech] || "#666"}08`,
                      color: techColors[tech] || "#ccc",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: techColors[tech] || "#666" }}
                    />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-3 border-t border-white/5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Visit Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/80 font-bold text-sm hover:bg-white/5 hover:border-white/25 transition-all duration-300"
                >
                  <Code className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ProjectsStack() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const [overlayProject, setOverlayProject] = useState<Project | null>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    const ctx = gsap.context(() => {
      // 1. Header curvature animation
      gsap.fromTo(
        sheetRef.current,
        { borderRadius: "100px 100px 0 0" },
        {
          borderRadius: "60px 60px 0 0",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // 2. Title animation: black → white
      gsap.to(titleRef.current, {
        color: "white",
        webkitTextStroke: "0px white",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // 3. Stacking cards timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          tl.fromTo(
            card,
            { y: "120vh", rotate: index % 2 === 0 ? 2 : -2 },
            { y: 0, rotate: 0, duration: 1, ease: "none" },
            index
          );

          tl.to(
            cards[index - 1],
            {
              scale: 0.9,
              opacity: 0.4,
              duration: 0.5,
            },
            index
          );
        }
      });
      tl.to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative w-full bg-[#f3f3f3]"
        style={{ height: "600vh" }}
      >
        {/* HEADER */}
        <div
          ref={sheetRef}
          className="relative w-full bg-black pt-10 md:pt-14"
        >
          <div className="relative w-full py-10 z-30 text-center">
            <h2
              ref={titleRef}
              className="text-[14vw] font-black tracking-tighter uppercase leading-none select-none"
              style={{
                color: "black",
                WebkitTextStroke: "1px white",
              }}
            >
              PROJECTS
            </h2>
          </div>
        </div>

        {/* STICKY CARDS */}          <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black px-2 sm:px-4">
          <div className="relative w-full max-w-5xl mx-auto h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="absolute w-full flex items-center justify-center"
                style={{ zIndex: index + 10 }}
              >
                <div className="bg-[#050505] border border-white/10 rounded-[20px] sm:rounded-[30px] md:rounded-[45px] p-5 sm:p-6 md:p-10 shadow-2xl w-full">
                  {/* Header Card */}
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 items-start">
                      <span className="text-4xl sm:text-5xl md:text-8xl font-black text-purple-400 leading-none">
                        {project.id}
                      </span>
                      <div className="flex flex-col pt-0 sm:pt-1">
                        <span className="text-[11px] sm:text-[10px] font-bold text-gray-500 tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-0.5 sm:mb-1">
                          CLIENT
                        </span>
                        <span className="text-sm sm:text-sm text-purple-400 font-bold">
                          {project.title}
                        </span>
                        <span className="text-lg sm:text-xl md:text-3xl font-bold text-white">
                          {project.client}
                        </span>
                        <span className="text-sm sm:text-xs text-white/25 mt-0.5 max-w-md leading-relaxed">
                          {project.description}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grid Images */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 h-[180px] sm:h-[260px] md:h-[380px] mb-4 sm:mb-6 md:mb-8">
                    <div className="md:col-span-2 relative rounded-[25px] md:rounded-[35px] overflow-hidden border border-white/5 group/image">
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} main`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                    <div className="hidden md:flex flex-col gap-4">
                      <div className="relative flex-1 rounded-[20px] md:rounded-[25px] overflow-hidden border border-white/5 group/image">
                        <Image
                          src={project.images[1]}
                          alt={`${project.title} detail 1`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                        />
                      </div>
                      <div className="relative flex-1 rounded-[20px] md:rounded-[25px] overflow-hidden border border-white/5 group/image">
                        <Image
                          src={project.images[2]}
                          alt={`${project.title} detail 2`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 sm:gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-[110] inline-flex items-center gap-2 sm:gap-2 px-4 sm:px-5 md:px-7 py-2.5 sm:py-2.5 rounded-full bg-white text-black text-[11px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all duration-300 group"
                      >
                        <ExternalLink className="w-3.5 sm:w-3.5 h-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span className="hidden sm:inline">{t["projects.live"]}</span>
                        <span className="sm:hidden">Live</span>
                      </a>
                    )}
                    <button
                      onClick={() => setOverlayProject(project)}
                      className="relative z-[110] inline-flex items-center gap-2 sm:gap-2 px-4 sm:px-5 md:px-7 py-2.5 sm:py-2.5 rounded-full border border-white/20 text-white/80 text-[11px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-black transition-colors duration-300" />
                      {t["projects.more"]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen Overlay */}
      <AnimatePresence>
        {overlayProject && (
          <ProjectOverlay
            project={overlayProject}
            onClose={() => setOverlayProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

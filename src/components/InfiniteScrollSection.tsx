"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiPython,
  SiVercel,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "Supabase", icon: SiSupabase },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Python", icon: SiPython },
  { name: "Vercel", icon: SiVercel },
];

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

// Shuffle determinista (misma semilla siempre = mismo orden en server y cliente)
const shuffledWebImages = webImages
  .map((img, i) => ({ img, key: (i * 7 + 13) % webImages.length }))
  .sort((a, b) => a.key - b.key)
  .map(({ img }) => img);

export default function InfiniteScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(row1Ref.current, {
        x: "-15%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(row2Ref.current, {
        x: "10%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(row3Ref.current, {
        x: "-20%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="customers"
      ref={containerRef}
      className="relative w-full bg-black py-32 overflow-hidden"
    >
      <div className="relative flex flex-col gap-4 -rotate-[6deg] scale-110 origin-center">

        {/* --- FILA 1: TECH LOGOS ICONS --- */}
        <div ref={row1Ref} className="flex items-center gap-24 whitespace-nowrap px-10">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {techStack.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* --- FILA 2: CARDS CON WEBS REALES --- */}
        <div ref={row2Ref} className="flex gap-3 whitespace-nowrap -ml-[20%]">
          {[...Array(12)].map((_, i) => {
            const img = shuffledWebImages[i % shuffledWebImages.length];
            return (
              <div
                key={i}
                className="relative aspect-[7/5] w-[220px] rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 flex-shrink-0 shadow-lg group"
              >
                <Image
                  src={img}
                  alt={`web preview ${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* --- FILA 3: CARDS CON WEBS REALES (OFFSET) --- */}
        <div ref={row3Ref} className="flex gap-3 whitespace-nowrap -ml-[5%]">
          {[...Array(12)].map((_, i) => {
            const img = shuffledWebImages[(i + 4) % shuffledWebImages.length];
            return (
              <div
                key={i}
                className="relative aspect-[7/5] w-[220px] rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 flex-shrink-0 shadow-lg group"
              >
                <Image
                  src={img}
                  alt={`web preview ${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </section>
  );
}

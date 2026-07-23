"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    company: "Untitled Tech Company (UTC)",
    role: "Full Stack Developer",
    impact: "Key contributor across multiple real client projects — from architecture to deployment.",
    highlights: [
      "Built full-stack web apps using Next.js, React, and Node.js",
      "Integrated Supabase with secure environment variables and RLS policies",
      "Implemented auth flows: login, logout, password recovery with JWT tokens",
      "Developed RESTful APIs for internal tools and external integrations",
      "Owned the complete dev cycle — setup, architecture, coding, testing, deployment",
    ],
  },
];

const skills = [
  { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "JavaScript", "TypeScript", "HTML/CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Postman"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "Supabase"] },
  { category: "AI Tools", items: ["ChatGPT", "GitHub Copilot", "Claude Code", "Prompt Engineering"] },
  { category: "DevOps", items: ["Git", "GitHub", "Vercel", "Postman"] },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const lupaRef = useRef<HTMLDivElement>(null);
  const ajedrezRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Animation refs for icons
  const iconTL = useRef<HTMLDivElement>(null);
  const iconTR = useRef<HTMLDivElement>(null);
  const iconBL = useRef<HTMLDivElement>(null);
  const iconBR = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline with pin: the whole section sticks while content animates
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. Title: purple stroke → solid purple with glow
      tl.to(titleRef.current, {
        color: "#a855f7",
        webkitTextStroke: "0px #a855f7",
        textShadow: "0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(168,85,247,0.3)",
      }, 0);

      // 2. Icons slide in from sides + spin
      tl.from(iconTL.current, { x: -250, y: -50, opacity: 0, duration: 4 }, 0);
      tl.from(iconBL.current, { x: -250, y: 50, opacity: 0, duration: 4 }, 0);
      tl.from(iconTR.current, { x: 250, y: -50, opacity: 0, duration: 4 }, 0);
      tl.from(iconBR.current, { x: 250, y: 50, opacity: 0, duration: 4 }, 0);
      // Lupa y ajedrez también entran desde los lados
      tl.from(lupaRef.current, { x: -250, opacity: 0, duration: 4 }, 0);
      tl.from(ajedrezRef.current, { x: 250, opacity: 0, duration: 4 }, 0);

      gsap.to(iconTL.current, { rotate: 360, duration: 6, repeat: -1, ease: "none" });
      gsap.to(iconBL.current, { rotate: -360, duration: 5, repeat: -1, ease: "none" });
      gsap.to(iconTR.current, { rotate: -360, duration: 7, repeat: -1, ease: "none" });
      gsap.to(iconBR.current, { rotate: 360, duration: 4, repeat: -1, ease: "none" });
      gsap.to(lupaRef.current, { rotate: 360, duration: 8, repeat: -1, ease: "none" });
      gsap.to(ajedrezRef.current, { rotate: -360, duration: 6, repeat: -1, ease: "none" });

      // 3. Experience card content — reveal items one by one
      const items = contentRef.current?.querySelectorAll(".exp-item");
      if (items) {
        tl.fromTo(items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
          0.5
        );
      }

      // 4. Impact — cada hijo anima independientemente
      const impactHeading = impactRef.current?.querySelectorAll(".impact-heading");
      if (impactHeading) {
        tl.fromTo(impactHeading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          1.0
        );
      }

      const impactText = impactRef.current?.querySelectorAll(".impact-text");
      if (impactText) {
        tl.fromTo(impactText,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.6
        );
      }

      const impactBtn = impactRef.current?.querySelectorAll(".impact-btn");
      if (impactBtn) {
        tl.fromTo(impactBtn,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          2.2
        );
      }

      // 5. Skills tags (va DESPUÉS del impact)
      const skillTags = skillsRef.current?.querySelectorAll(".skill-tag");
      if (skillTags) {
        tl.fromTo(skillTags,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, stagger: 0.05, duration: 0.3 },
          2.0
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans py-16 sm:py-20 md:py-24 px-16 sm:px-4 md:px-8"
    >
      {/* ICONOS (decorativos) */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div ref={iconTL} className="absolute top-[8%] sm:top-[10%] left-[3%] sm:left-[5%] w-20 h-20 sm:w-40 sm:h-40 md:w-56 md:h-56">
          <Image src="/images/trebol.png" alt="" fill className="object-contain" />
        </div>
        <div ref={iconTR} className="absolute top-[4%] sm:top-[5%] right-[3%] sm:right-[5%] w-20 h-20 sm:w-40 sm:h-40 md:w-56 md:h-56">
          <Image src="/images/manos.png" alt="" fill className="object-contain" />
        </div>
        <div ref={iconBL} className="absolute bottom-[12%] sm:bottom-[15%] left-[4%] sm:left-[8%] w-16 h-16 sm:w-32 sm:h-32 md:w-44 md:h-44">
          <Image src="/images/escrito.png" alt="" fill className="object-contain" />
        </div>
        <div ref={iconBR} className="absolute bottom-[15%] sm:bottom-[20%] right-[4%] sm:right-[8%] w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48">
          <Image src="/images/billete.png" alt="" fill className="object-contain" />
        </div>
        {/* Lupa y ajedrez — mismo estilo que los iconos de esquina */}
        <div ref={lupaRef} className="absolute top-[35%] sm:top-[38%] left-[3%] sm:left-[5%] w-16 h-16 sm:w-32 sm:h-32 md:w-44 md:h-44">
          <Image src="/images/lupa-Photoroom.png" alt="" fill className="object-contain" />
        </div>
        <div ref={ajedrezRef} className="absolute top-[35%] sm:top-[38%] right-[3%] sm:right-[5%] w-16 h-16 sm:w-32 sm:h-32 md:w-44 md:h-44">
          <Image src="/images/ajedres-Photoroom.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* TITLE — morado con brillo como About Me */}
        <h2
          ref={titleRef}
          className="text-[14vw] sm:text-[12vw] md:text-[9vw] font-[900] tracking-tighter mb-8 sm:mb-12 leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #a855f7",
            textShadow: "0 0 0px transparent",
          }}
        >
          EXPERIENCE
        </h2>

        {/* EXPERIENCE CONTENT — sin contenedor */}
        <div ref={contentRef} className="w-full max-w-3xl">
          {experience.map((exp, i) => (
            <div key={i} className="exp-item">
              {/* Header centrado */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">{exp.company}</h3>
                <p className="text-sm sm:text-sm md:text-base font-bold text-purple-400/80 tracking-widest uppercase mt-1">
                  {exp.role}
                </p>
              </div>

              {/* Impact statement */}
              <p className="text-sm sm:text-sm md:text-base text-gray-400 font-medium mb-4 sm:mb-6 border-l-2 border-purple-500/50 pl-3 sm:pl-4 italic">
                {exp.impact}
              </p>

              {/* Bullet points */}
              <ul className="space-y-2.5">
                {exp.highlights.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-sm md:text-[15px] text-gray-300 font-medium">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-500/60 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* IMPACT SECTION — entre UTC y Tech Stack, sin contenedor */}
        <div ref={impactRef} className="w-full max-w-3xl mt-8 sm:mt-12 impact-item">
            <h4 className="impact-heading text-sm sm:text-sm font-black text-purple-400/80 tracking-widest uppercase text-center mb-3 sm:mb-4">
              Untitled Tech Company (UTC) — Full Stack Developer
            </h4>
            <p className="impact-text text-sm sm:text-sm md:text-[15px] text-gray-300 font-medium leading-relaxed mb-4 sm:mb-6 text-center">
              Directly improved the company&apos;s core web presence by redesigning the corporate website, optimizing performance, and implementing modern UI/UX patterns. Contributed across <span className="text-white font-bold">multiple real client projects</span> — from initial architecture through final deployment — helping UTC deliver high-quality digital products faster with AI-assisted workflows.
            </p>
            <div className="impact-btn flex justify-center">
              <a
                href="https://untitledtechcompany.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-purple-950/40 backdrop-blur-xl border border-purple-500/30 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white shadow-xl transition-all duration-500 hover:scale-105 hover:border-purple-400/60 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                <span className="relative">Visit Site <span className="text-[9px]">→</span></span>
              </a>
            </div>
        </div>

        {/* SKILLS SECTION */}
        <div ref={skillsRef} className="w-full max-w-3xl mt-8">
          <h3 className="text-base sm:text-lg font-black text-white/50 tracking-widest uppercase text-center mb-6 sm:mb-8 select-none">
            Tech Stack
          </h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {skills.map((group) => (
              <div key={group.category} className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-purple-400/60 tracking-[0.2em] uppercase">
                  {group.category}
                </span>
                <div className="flex flex-col gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag text-[13px] font-medium text-white/90"
                    >
                      • {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="mt-8 sm:mt-12 flex gap-6 sm:gap-8 text-sm sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">Languages</span>
            <span className="font-bold text-white/80">Español</span>
            <span className="text-white/30">·</span>
            <span className="font-bold text-white/50">English</span>
          </div>
        </div>
      </div>
    </section>
  );
}

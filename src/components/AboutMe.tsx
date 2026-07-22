"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textContent = `With over five years of experience in design, I specialize in branding, web design, and user experience. I love collaborating with businesses that want to stand out and showcase their best side. Let's create something amazing together!`;

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Refs para los iconos
  const iconTL = useRef<HTMLDivElement>(null);
  const iconTR = useRef<HTMLDivElement>(null);
  const iconBL = useRef<HTMLDivElement>(null);
  const iconBR = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textChars = textContainerRef.current?.querySelectorAll(".text-char");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. Title: Black fill + white outline → Solid white
      tl.to(titleRef.current, {
        color: "white",
        webkitTextStroke: "0px white",
      }, 0);

      // 2. Icons: Enter from the sides (slide only)
      tl.from(iconTL.current, { x: -250, y: -50, opacity: 0, duration: 4 }, 0);
      tl.from(iconBL.current, { x: -250, y: 50, opacity: 0, duration: 4 }, 0);
      tl.from(iconTR.current, { x: 250, y: -50, opacity: 0, duration: 4 }, 0);
      tl.from(iconBR.current, { x: 250, y: 50, opacity: 0, duration: 4 }, 0);

      // Continuous spinning (infinito)
      gsap.to(iconTL.current, { rotate: 360, duration: 6, repeat: -1, ease: "none" });
      gsap.to(iconBL.current, { rotate: -360, duration: 5, repeat: -1, ease: "none" });
      gsap.to(iconTR.current, { rotate: -360, duration: 7, repeat: -1, ease: "none" });
      gsap.to(iconBR.current, { rotate: 360, duration: 4, repeat: -1, ease: "none" });

      // 3. Text: Appears letter by letter
      if (textChars) {
        tl.fromTo(textChars,
          { opacity: 0 },
          { opacity: 1, stagger: 0.01, duration: 0.15 },
          0
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans py-24"
    >
      {/* --- ICONOS 3D --- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div ref={iconTL} className="absolute top-[10%] left-[5%] w-40 h-40 md:w-64 md:h-64">
          <Image src="/images/cerebro.png" alt="3d" fill className="object-contain" />
        </div>
        <div ref={iconTR} className="absolute top-[5%] right-[5%] w-40 h-40 md:w-64 md:h-64">
          <Image src="/images/compu.png" alt="3d" fill className="object-contain" />
        </div>
        <div ref={iconBL} className="absolute bottom-[15%] left-[8%] w-32 h-32 md:w-48 md:h-48">
          <Image src="/images/corazon.png" alt="3d" fill className="object-contain" />
        </div>
        <div ref={iconBR} className="absolute bottom-[20%] right-[8%] w-32 h-32 md:w-56 md:h-56">
          <Image src="/images/reloj.png" alt="3d" fill className="object-contain" />
        </div>
      </div>

      {/* --- CONTENIDO CENTRAL --- */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl px-6">
        <h2
          ref={titleRef}
          className="text-[12vw] md:text-[9vw] font-[900] tracking-tighter mb-8 leading-none select-none"
          style={{
            color: "black",
            WebkitTextStroke: "1px white",
          }}
        >
          ABOUT ME
        </h2>

        <div
          ref={textContainerRef}
          className="max-w-2xl text-[15px] md:text-[19px] font-medium leading-[1.6] tracking-tight text-center select-none"
        >
          {textContent.split("").map((char, index) => (
            <span
              key={index}
              className="text-char inline-block"
              style={{ opacity: 0, color: "white" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <button className="group relative">
            <div className="relative px-12 py-5 rounded-full bg-purple-950/40 backdrop-blur-xl border border-purple-500/30 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 group-hover:border-purple-400/60 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5),0_0_60px_-10px_rgba(168,85,247,0.3),inset_0_0_30px_-10px_rgba(168,85,247,0.15)] active:scale-95 overflow-hidden">
              {/* Brillo animado en hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
              <span className="relative text-[11px] font-[1000] uppercase tracking-[0.2em] text-white flex items-center gap-2">
                Contact Me <span className="text-[8px]">→</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

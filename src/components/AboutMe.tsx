"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textContent = `Full Stack Developer with proven experience building modern web applications from frontend interfaces to backend APIs and databases. Passionate about leveraging AI tools to accelerate development, write cleaner code, and ship faster. I turn complex problems into scalable, user-friendly solutions.`;

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
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans py-16 sm:py-20 md:py-24"
    >
      {/* --- ICONOS 3D (decorativos) --- */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div ref={iconTL} className="absolute top-[8%] sm:top-[10%] left-[3%] sm:left-[5%] w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64">            <Image src="/images/cerebro.png" alt="" fill className="object-contain" />
        </div>
        <div ref={iconTR} className="absolute top-[4%] sm:top-[5%] right-[3%] sm:right-[5%] w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64">            <Image src="/images/compu.png" alt="" fill className="object-contain" />
        </div>
        <div ref={iconBL} className="absolute bottom-[12%] sm:bottom-[15%] left-[4%] sm:left-[8%] w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48">            <Image src="/images/corazon.png" alt="" fill className="object-contain" />
        </div>
        <div ref={iconBR} className="absolute bottom-[15%] sm:bottom-[20%] right-[4%] sm:right-[8%] w-20 h-20 sm:w-32 sm:h-32 md:w-56 md:h-56">            <Image src="/images/reloj.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* --- CONTENIDO CENTRAL --- */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl px-16 sm:px-6">
        <h2
          ref={titleRef}
          className="text-[14vw] sm:text-[12vw] md:text-[9vw] font-[900] tracking-tighter mb-6 sm:mb-8 leading-none select-none"
          style={{
            color: "black",
            WebkitTextStroke: "1px white",
          }}
        >
          ABOUT
        </h2>

        <div
          ref={textContainerRef}
          className="max-w-2xl text-lg sm:text-[15px] md:text-[19px] font-medium leading-[1.5] sm:leading-[1.6] tracking-tight text-center px-4 sm:px-0"
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

      </div>
    </section>
  );
}

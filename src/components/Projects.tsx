"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", client: "Untitled Tech Company (UTC)", images: ["/assets/p1.jpg", "/assets/p2.jpg", "/assets/p3.jpg"] },
  { id: "02", client: "WH MattDress", images: ["/assets/p4.jpg", "/assets/p5.jpg", "/assets/p6.jpg"] },
  { id: "03", client: "Independent", images: ["/assets/p7.jpg", "/assets/p8.jpg", "/assets/p9.jpg"] },
];

export default function ProjectsStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const ctx = gsap.context(() => {
      // 1. Animación de las esquinas del header decorativo (como Services, solo borderRadius)
      gsap.fromTo(sheetRef.current,
        { borderRadius: "100px 100px 0 0" },
        { 
          borderRadius: "60px 60px 0 0",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top 10%",
            scrub: 1,
          }
        }
      );

      // 2. Animación del título PROJECTS (como About Me: borde negro → sólido blanco)
      gsap.to(titleRef.current, {
        color: "white",
        webkitTextStroke: "0px white",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
          end: "top 60%",
          scrub: 1,
        }
      });

      // 3. Timeline para el stacking de cartas
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

          tl.to(cards[index - 1], {
            scale: 0.9,
            opacity: 0.4,
            duration: 0.5
          }, index);
        }
      });
      tl.to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f3f3f3]"
      style={{ height: "600vh" }}
    >
      {/* HEADER DECORATIVO — contenedor APARTE, scrollea normal, tiene la curvatura GSAP */}
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

      {/* STICKY CARTAS — contenedor SEPARADO, no afectado por la curvatura */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">
        <div className="relative w-full max-w-5xl mx-auto px-4 md:px-0 h-full flex items-center justify-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="absolute w-full flex items-center justify-center"
              style={{ zIndex: index + 10 }}
            >
              <div className="bg-[#050505] border border-white/10 rounded-[30px] md:rounded-[45px] p-6 md:p-10 shadow-2xl w-full">
                {/* Header Card */}
                <div className="flex items-start justify-between mb-6 md:mb-10">
                  <div className="flex gap-4 md:gap-8 items-start">
                    <span className="text-5xl md:text-8xl font-black text-white leading-none">{project.id}</span>
                    <div className="flex flex-col pt-1">
                      <span className="text-[10px] font-bold text-gray-500 tracking-[0.4em] uppercase mb-1">CLIENT</span>
                      <span className="text-xl md:text-3xl font-bold text-white">{project.client}</span>
                    </div>
                  </div>
                  <button className="relative z-[110] px-6 py-2 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                    Live Project
                  </button>
                </div>

                {/* Grid Imágenes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-[280px] md:h-[400px]">
                  <div className="md:col-span-2 relative rounded-[25px] md:rounded-[35px] overflow-hidden border border-white/5">
                    <Image src={project.images[0]} alt="p1" fill className="object-cover" />
                  </div>
                  <div className="hidden md:flex flex-col gap-4">
                    <div className="relative flex-1 rounded-[20px] md:rounded-[25px] overflow-hidden border border-white/5">
                      <Image src={project.images[1]} alt="p2" fill className="object-cover" />
                    </div>
                    <div className="relative flex-1 rounded-[20px] md:rounded-[25px] overflow-hidden border border-white/5">
                      <Image src={project.images[2]} alt="p3" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

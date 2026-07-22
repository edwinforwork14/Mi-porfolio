"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    client: "Skyline Studios",
    images: ["/assets/p1.jpg", "/assets/p2.jpg", "/assets/p3.jpg"],
  },
  {
    id: "02",
    client: "Pixel Forge",
    images: ["/assets/p4.jpg", "/assets/p5.jpg", "/assets/p6.jpg"],
  },
  {
    id: "03",
    client: "Nexus Design",
    images: ["/assets/p7.jpg", "/assets/p8.jpg", "/assets/p9.jpg"],
  },
];

export default function ProjectsStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      // Timeline con ScrollTrigger (SIN pin — el sticky lo hace CSS)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          // Primera carta visible desde el inicio
          gsap.set(card, { y: 0 });
        } else {
          // Las demás suben desde abajo y se apilan
          tl.fromTo(
            card,
            { y: "120vh", rotate: index % 2 === 0 ? 3 : -3 },
            { y: index * 40, rotate: 0, duration: 1, ease: "none" },
            index - 1
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // El height del section define cuánto scroll hay disponible
      className="relative w-full bg-black"
      style={{ height: "400vh" }}
    >
      {/* Sticky wrapper: se queda fijo en el top mientras scrolleamos */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* HEADER CON TÍTULO */}
        <div className="relative z-30 pt-10 pb-2">
          <h2 className="text-[10vw] font-black text-white tracking-tighter uppercase text-center leading-none select-none">
            PROJECTS
          </h2>
        </div>

        {/* CONTENEDOR DE CARTAS (Stack Effect) */}
        <div className="relative w-full max-w-6xl mx-auto h-[calc(100vh-120px)] flex items-center justify-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="absolute w-[92%] md:w-full"
              style={{ zIndex: index + 1 }}
            >
              <div className="bg-[#050505] border border-white/20 rounded-[40px] md:rounded-[60px] p-6 md:p-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex gap-6 items-start">
                    <span className="text-5xl md:text-7xl font-black text-white leading-none">
                      {project.id}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">
                        CLIENT
                      </span>
                      <span className="text-xl font-bold text-white">
                        {project.client}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-2 border border-white/30 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                    Live Project
                  </button>
                </div>

                {/* Grid de Imágenes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[400px]">
                  <div className="md:col-span-2 relative rounded-[30px] md:rounded-[45px] overflow-hidden">
                    <Image src={project.images[0]} alt="p1" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="relative flex-1 rounded-[25px] md:rounded-[35px] overflow-hidden">
                      <Image src={project.images[1]} alt="p2" fill className="object-cover" />
                    </div>
                    <div className="relative flex-1 rounded-[25px] md:rounded-[35px] overflow-hidden">
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

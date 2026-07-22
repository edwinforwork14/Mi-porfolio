"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mock de datos
const LOGOS = ["ProtoSphere", "Thelma Watson", "Impact Creative", "SCALER", "PIXEL FORGE", "VIOLETA"];

export default function InfiniteScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fila 1 (Logos) - Movimiento lento a la izquierda
      gsap.to(row1Ref.current, {
        x: "-15%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fila 2 (Cards cuadradas) - Movimiento a la derecha
      gsap.to(row2Ref.current, {
        x: "10%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Fila 3 (Cards cuadradas) - Movimiento a la izquierda
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
      ref={containerRef}
      className="relative w-full bg-black py-32 overflow-hidden"
    >
      {/* 
          CONTENEDOR CON INCLINACIÓN (SKEW) 
          Aplicamos rotate y skew para igualar la perspectiva de la imagen
      */}
      <div className="relative flex flex-col gap-4 -rotate-[6deg] scale-110 origin-center">

        {/* --- FILA 1: LOGOS --- */}
        <div ref={row1Ref} className="flex items-center gap-24 whitespace-nowrap px-10">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {LOGOS.map((logo, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white rounded-full opacity-50" />
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80">
                    {logo}
                  </span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* --- FILA 2: CARDS CUADRADAS SIMÉTRICAS --- */}
        <div ref={row2Ref} className="flex gap-3 whitespace-nowrap -ml-[20%]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-[7/5] w-[220px] rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 flex-shrink-0 shadow-lg"
            >
              {/* Overlay de color degradado similar a la imagen */}
              <div className={`absolute inset-0 opacity-80 bg-gradient-to-br ${
                i % 2 === 0 ? "from-yellow-400/30 via-orange-500/20 to-purple-600/30" : "from-blue-500/30 via-teal-400/20 to-green-500/30"
              }`} />

              {/* Aquí iría tu <Image src={...} /> */}
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {i % 3 === 0 ? "🫧" : i % 3 === 1 ? "🎨" : "🧬"}
              </div>
            </div>
          ))}
        </div>

        {/* --- FILA 3: CARDS CUADRADAS SIMÉTRICAS (OFFSET) --- */}
        <div ref={row3Ref} className="flex gap-3 whitespace-nowrap -ml-[5%]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-[7/5] w-[220px] rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 flex-shrink-0 shadow-lg"
            >
              <div className={`absolute inset-0 opacity-80 bg-gradient-to-tr ${
                i % 2 === 0 ? "from-pink-500/30 via-purple-500/20 to-blue-600/30" : "from-orange-400/30 via-red-500/20 to-yellow-500/30"
              }`} />

              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {i % 2 === 0 ? "✨" : "🔥"}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Viñeta para suavizar los bordes de la sección */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </section>
  );
}

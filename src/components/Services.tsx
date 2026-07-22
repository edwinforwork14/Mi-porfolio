"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "01",
    title: "3D MODELING",
    description: "Creation of detailed objects, characters, or environments tailored to specific client needs. Ideal for games, products, and visualizations.",
  },
  {
    id: "02",
    title: "BRANDING & DESIGN",
    description: "Developing unique visual identities, including logos, color palettes, and typography that represent your brand's essence.",
  },
  {
    id: "03",
    title: "WEB DEVELOPMENT",
    description: "Building responsive, high-performance websites using the latest technologies to ensure a seamless user experience.",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación de la Hoja Blanca Subiendo
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Empieza cuando el borde superior entra por abajo
          end: "top 10%",    // Termina de subir casi arriba
          scrub: 1,
        },
      });

      tl.fromTo(sheetRef.current, 
        { y: 150, borderRadius: "100px 100px 0 0" }, 
        { y: 0, borderRadius: "40px 40px 0 0", ease: "none" }
      );

      // 2. Animación de los Servicios REVELADOS POR SCROLL
      const rows = gsap.utils.toArray(".service-item");
      
      rows.forEach((row: any) => {
        gsap.fromTo(row, 
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: row,
              start: "top 90%", // Empieza a aparecer cuando está cerca del fondo
              end: "top 60%",   // Se completa cuando llega a la mitad
              scrub: 1,         // Esto hace que aparezca lentamente según mueves el dedo/mouse
            }
          }
        );
      });

      // 3. Título SERVICES apareciendo suavemente
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
          end: "top 70%",
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* LA HOJA BLANCA */}
      <div
        ref={sheetRef}
        className="relative w-full bg-[#f3f3f3] text-black min-h-screen px-6 py-20 md:px-16"
      >
        <div className="max-w-6xl mx-auto">
          
          {/* TÍTULO SERVICES */}
          <h2
            ref={titleRef}
            className="text-[12vw] md:text-[8vw] font-[1000] tracking-tighter text-center mb-24 select-none leading-none"
          >
            SERVICES
          </h2>

          {/* LISTA DE SERVICIOS */}
          <div ref={servicesRef} className="flex flex-col">
            {servicesData.map((service, index) => (
              <div 
                key={index} 
                className="service-item border-t border-black/10 py-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 group"
              >
                {/* NUMERACIÓN (01) */}
                <span className="text-6xl md:text-8xl font-black tracking-tighter leading-none opacity-90">
                  {service.id}
                </span>

                {/* TEXTO: Título y Descripción */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-black tracking-widest uppercase">
                    {service.title}
                  </h3>
                  <p className="max-w-xl text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
            {/* Línea final decorativa */}
            <div className="border-t border-black/10 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

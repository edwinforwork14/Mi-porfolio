"use client";

import React, { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  // Mouse position as motion values (normalized from -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth follow
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // Subtle transform ranges
  const translateX = useTransform(springX, [-1, 1], [-15, 15]);
  const translateY = useTransform(springY, [-1, 1], [-15, 15]);
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const rotateY = useTransform(springX, [-1, 1], [-3, 3]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Normalize to -1 to 1
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const resetMouse = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      className="relative min-h-screen w-full bg-black text-[#D1D1D1] overflow-hidden font-sans"
    >
      
      {/* --- 1. NAVBAR (Alineación exacta arriba) --- */}
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-16 py-10">
        <div className="flex gap-20 text-[11px] tracking-[0.3em] font-black uppercase opacity-80">
          <a href="#about" className="hover:text-white transition-all">About</a>
          <a href="#customers" className="hover:text-white transition-all">Customers</a>
        </div>
        <div className="flex gap-20 text-[11px] tracking-[0.3em] font-black uppercase opacity-80">
          <a href="#projects" className="hover:text-white transition-all">Projects</a>
          <a href="#contact" className="hover:text-white transition-all">Contact</a>
        </div>
      </nav>

      {/* --- 2. CONTENEDOR CENTRAL (Texto arriba, Imagen centrada) --- */}
      <div className="relative h-screen w-full flex flex-col items-center justify-start pt-28">
        
        {/* TEXTO GIGANTE: HI, I'M ALEX (Abajo del header) */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[13vw] leading-none font-[1000] text-[#D1D1D1] tracking-tighter select-none z-0"
        >
          HI, I'M EDWIN
        </motion.h1>

        {/* IMAGEN DEL PERSONAJE (Capa superior al texto - sigue el mouse) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div
            style={{
              x: translateX,
              y: translateY,
              rotateX,
              rotateY,
              perspective: "800px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[76.5vh] h-[76.5vh] mt-56 will-change-transform"
          >
            <Image
              src="/models/yo.png"
              alt="Edwin"
              fill
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </div>

        {/* --- 3. ELEMENTOS LATERALES (Posicionados exactamente como la foto) --- */}
        
        {/* Descripción a la izquierda (A media altura) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute left-16 top-[55%] -translate-y-1/2 z-20 max-w-[240px]"
        >
          <p className="text-[12px] font-black leading-[1.6] tracking-widest uppercase">
            FULL STACK DEVELOPER & AI ENGINEER — CRAFTING MODERN WEB APPS WITH CODE AND CREATIVITY
          </p>
        </motion.div>

        {/* Botón a la derecha (A la altura de los ojos/mejilla) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-16 top-[48%] -translate-y-1/2 z-20"
        >
          <button className="group relative">
            {/* Botón morado blur con brillo */}
            <div className="relative px-12 py-5 rounded-full bg-purple-950/40 backdrop-blur-xl border border-purple-500/30 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 group-hover:border-purple-400/60 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5),0_0_60px_-10px_rgba(168,85,247,0.3),inset_0_0_30px_-10px_rgba(168,85,247,0.15)] active:scale-95 overflow-hidden">
              {/* Brillo animado en hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
              <span className="relative text-[11px] font-[1000] uppercase tracking-[0.2em] text-white flex items-center gap-2">
                Contact Me <span className="text-[8px]">→</span>
              </span>
            </div>
          </button>
        </motion.div>

      </div>

      {/* --- EFECTO DE FONDO --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#3B1B7A]/10 blur-[120px] rounded-full z-[-1]" />
    </section>
  );
}

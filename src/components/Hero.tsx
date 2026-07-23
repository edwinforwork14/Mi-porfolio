"use client";

import React, { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang];

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
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 md:px-16 py-6 md:py-10">
        <div className="flex gap-4 sm:gap-10 md:gap-20 text-[9px] sm:text-[11px] tracking-[0.3em] font-black uppercase opacity-80">
          <a href="#about" className="hover:text-white transition-all">{t["nav.about"]}</a>
          <a href="#customers" className="hover:text-purple-400 transition-all">{t["nav.customers"]}</a>
        </div>
        <div className="flex items-center gap-4 sm:gap-10 md:gap-20 text-[9px] sm:text-[11px] tracking-[0.3em] font-black uppercase opacity-80">
          <a href="#projects" className="hover:text-white transition-all hidden sm:inline">{t["nav.projects"]}</a>
          <a href="#contact" className="hover:text-white transition-all hidden sm:inline">{t["nav.contact"]}</a>
          <a href="#projects" className="hover:text-white transition-all sm:hidden">{t["nav.projects"]}</a>
          <a href="#contact" className="hover:text-white transition-all sm:hidden">{t["nav.contact"]}</a>
          <a
            href="/cv/EdwinZuletaCV.pdf"
            download
            className="flex items-center gap-1.5 text-purple-400/70 hover:text-purple-400 transition-all"
          >
            <Download className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>{t["nav.cv"]}</span>
          </a>
        </div>
      </nav>

      {/* --- 2. CONTENEDOR CENTRAL (Texto arriba, Imagen centrada) --- */}
      <div className="relative h-screen w-full flex flex-col items-center justify-start pt-20 sm:pt-28">
        
        {/* TEXTO GIGANTE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(2.3rem,13vw,13vw)] sm:text-[clamp(2.3rem,9vw,11vw)] leading-[1.1] sm:leading-none sm:whitespace-nowrap font-[1000] text-[#D1D1D1] tracking-tighter select-none z-0 text-center px-4"
        >
          <span className="block sm:inline">{t["hero.greeting"]}</span><span className="block sm:inline">{t["hero.name"]}</span>
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
            className="relative w-[50vh] sm:w-[65vh] md:w-[76.5vh] h-[50vh] sm:h-[65vh] md:h-[76.5vh] mt-32 sm:mt-44 md:mt-56 will-change-transform"
          >
            <Image
              src="/models/yo.png"
              alt="Edwin Zuleta — Full Stack Developer & AI Engineer portrait"
              fill
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </div>

        {/* --- 3. ELEMENTOS LATERALES (Posicionados exactamente como la foto) --- */}
        
        {/* Descripción a la izquierda — abajo en mobile, media altura en desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute left-4 sm:left-8 md:left-16 bottom-8 sm:bottom-auto sm:top-[50%] sm:-translate-y-1/2 md:top-[55%] z-20 max-w-[160px] sm:max-w-[200px] md:max-w-[240px]"
        >
          <p className="text-[13px] sm:text-[11px] md:text-[12px] font-black leading-[1.6] tracking-widest uppercase">
            {t["hero.subtitle"]}
          </p>
        </motion.div>

        {/* Texto a la derecha — abajo en mobile, media altura en desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-4 sm:right-8 md:right-16 bottom-8 sm:bottom-auto sm:top-[45%] sm:-translate-y-1/2 md:top-[48%] z-20 max-w-[150px] sm:max-w-[180px] md:max-w-[200px] text-right"
        >
          <p className="text-[13px] sm:text-[10px] md:text-[11px] font-black leading-[1.6] sm:leading-[1.8] tracking-widest uppercase text-purple-400/70">
            {t["hero.techstack"]}
          </p>
          <div className="mt-2 sm:mt-3 md:mt-4 flex justify-end gap-3">
            <a href="mailto:edwinforwork14@gmail.com" className="text-[11px] sm:text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors border border-white/10 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              edwinforwork14@gmail.com
            </a>
          </div>
        </motion.div>

      </div>

      {/* --- EFECTO DE FONDO --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] bg-[#3B1B7A]/10 blur-[80px] sm:blur-[120px] rounded-full z-[-1]" />
    </section>
  );
}

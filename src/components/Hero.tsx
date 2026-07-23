"use client";

import React, { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { lang, toggleLang } = useLanguage();
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
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-16 py-10">
        <div className="flex gap-20 text-[11px] tracking-[0.3em] font-black uppercase opacity-80">
          <a href="#about" className="hover:text-white transition-all">{t["nav.about"]}</a>
          <a href="#customers" className="hover:text-purple-400 transition-all">{t["nav.customers"]}</a>
        </div>
        <div className="flex items-center gap-20 text-[11px] tracking-[0.3em] font-black uppercase opacity-80">
          <a href="#projects" className="hover:text-white transition-all">{t["nav.projects"]}</a>
          <a href="#contact" className="hover:text-white transition-all">{t["nav.contact"]}</a>
          <a
            href="/cv/EdwinZuletaCV.pdf"
            download
            className="flex items-center gap-1.5 text-purple-400/70 hover:text-purple-400 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t["nav.cv"]}</span>
          </a>
        </div>
      </nav>

      {/* --- 2. CONTENEDOR CENTRAL (Texto arriba, Imagen centrada) --- */}
      <div className="relative h-screen w-full flex flex-col items-center justify-start pt-28">
        
        {/* TEXTO GIGANTE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(1.8rem,10vw,11vw)] leading-none font-[1000] text-[#D1D1D1] tracking-tighter select-none z-0"
        >
          {t["hero.greeting"]}
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
            {t["hero.subtitle"]}
          </p>
        </motion.div>

        {/* Texto a la derecha — más info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-16 top-[48%] -translate-y-1/2 z-20 max-w-[200px] text-right"
        >
          <p className="text-[11px] font-black leading-[1.8] tracking-widest uppercase text-purple-400/70">
            {t["hero.techstack"]}
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <a href="mailto:edwinforwork14@gmail.com" className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-1.5">
              edwinforwork14@gmail.com
            </a>
          </div>
        </motion.div>

      </div>

      {/* --- EFECTO DE FONDO --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#3B1B7A]/10 blur-[120px] rounded-full z-[-1]" />

      {/* --- LANGUAGE TOGGLE (bottom-right) --- */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
        onClick={toggleLang}
        className="absolute bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-black tracking-widest uppercase text-white/60 hover:text-white hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 group"
      >
        <Languages className="w-3.5 h-3.5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
        <AnimatePresence mode="wait">
          <motion.span
            key={lang}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {t["lang.switch"]}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </section>
  );
}

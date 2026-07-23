"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function FloatingLanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
      onClick={toggleLang}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[13px] sm:text-[15px] font-black tracking-widest uppercase text-white/60 hover:text-white hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 shadow-lg group"
    >
      <Languages className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-purple-400/70 group-hover:text-purple-400 transition-colors" />
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
  );
}

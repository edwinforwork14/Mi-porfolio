"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = ["E", "Z"];
const slash = "/";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleLoad = () => {
      timerRef.current = setTimeout(() => setIsLoading(false), 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Fondo glow morado */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-purple-600/10 blur-[120px] rounded-full" />

          {/* Línea sutil debajo */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.32, 0, 0.67, 0] }}
            className="absolute bottom-[30%] w-[200px] h-[1px] bg-purple-500/20 origin-center"
          />

          {/* Letras E y Z con slash decorativo */}
          <div className="relative flex items-center gap-2 md:gap-4">
            {letters.map((letter, index) => (
              <React.Fragment key={letter}>
                <motion.span
                  initial={{
                    color: "transparent",
                    textShadow: "0 0 0px transparent",
                  }}
                  animate={{
                    color: "#a855f7",
                    textShadow:
                      "0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.15)",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.5,
                    ease: [0.32, 0, 0.67, 0],
                  }}
                  style={{
                    WebkitTextStroke: "2px rgba(168, 85, 247, 0.6)",
                  }}
                  className="text-[22vw] md:text-[14vw] font-[1000] tracking-tighter leading-none select-none"
                >
                  {letter}
                </motion.span>

                {/* Slash entre E y Z */}
                {index === 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: "backOut" }}
                    className="text-[16vw] md:text-[10vw] font-[100] text-purple-500/30 select-none leading-none"
                  >
                    {slash}
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="relative mt-6 md:mt-8 text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase text-purple-400/40"
          >
            Full Stack Developer
          </motion.p>

          {/* Barra de carga inferior */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.8,
              delay: 0.3,
              ease: [0.32, 0, 0.67, 0],
            }}
            className="absolute bottom-[25%] w-[120px] md:w-[180px] h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/60 to-purple-500/0 origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

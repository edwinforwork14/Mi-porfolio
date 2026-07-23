"use client";

import React from "react";

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Twitter / X", href: "#" },
    { name: "Behance", href: "#" },
    { name: "Artstation", href: "#" },
    { name: "Dribbble", href: "#" },
  ];

  return (
    <footer className="w-full">
      {/* 
          CONTENEDOR NEGRO DEL FOOTER — se conecta directamente con ContactSection
      */}
      <div className="bg-black w-full px-8 md:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          
          {/* LADO IZQUIERDO: LOGO CON STROKE */}
          <div className="flex flex-col">
            <h2 
              className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              }}
            >
              EDWIN <br /> ZULETA
            </h2>
          </div>

          {/* LADO DERECHO: ENLACES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 md:gap-24">
            
            {/* Columna SOCIAL */}
            <div className="flex flex-col gap-6">
              <span className="text-gray-500 font-bold text-xs tracking-[0.3em] uppercase">
                Social
              </span>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-white text-sm hover:text-gray-400 transition-colors duration-300 font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna CONTACT */}
            <div className="flex flex-col gap-6">
              <span className="text-gray-500 font-bold text-xs tracking-[0.3em] uppercase">
                Contact
              </span>
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:edwinforwork14@gmail.com" 
                  className="text-white text-sm hover:underline decoration-gray-500 underline-offset-4"
                >
                  edwinforwork14@gmail.com
                </a>
                <p className="text-white text-sm">
                  +58 412-1475420
                </p>
                <p className="text-white text-sm leading-relaxed max-w-[200px]">
                  Venezuela
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* LÍNEA FINAL / COPYRIGHT */}
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          <p>© 2025 EDWIN ZULETA — FULL STACK DEVELOPER</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

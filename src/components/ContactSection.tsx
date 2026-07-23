"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          text: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        setStatus({
          type: "error",
          text: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        text: "Network error. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full bg-white">
      {/* CONTENIDO BLANCO: Formulario con texto negro */}
      <div className="bg-white relative px-4 sm:px-6 md:px-20 py-16 sm:py-20 md:py-24">
        {/* DECORACIONES */}
        <div className="absolute -left-8 sm:-left-10 bottom-16 sm:bottom-20 w-24 h-24 sm:w-36 sm:h-36 md:w-56 md:h-56 blur-[1px] opacity-70 pointer-events-none">
          <Image src="/images/plateado.png" alt="silver" fill className="object-contain" />
        </div>
        <div className="absolute top-6 sm:top-10 right-6 sm:right-10 md:right-20 w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 opacity-70 pointer-events-none rotate-12">
          <Image src="/images/azul.png" alt="blue" fill className="object-contain" />
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter mb-6 sm:mb-8">
              LET&apos;S <br /> <span className="text-purple-600">GET</span> IN <br /> TOUCH
            </h2>
            <a
              href="mailto:edwinforwork14@gmail.com"
              className="text-base sm:text-xl md:text-2xl font-bold text-purple-600 border-b-2 border-purple-600/30 w-fit hover:opacity-70 transition-opacity"
            >
              edwinforwork14@gmail.com
            </a>
          </div>

          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative border-b border-gray-300 focus-within:border-black transition-colors">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    className="w-full py-4 bg-transparent outline-none text-black placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="relative border-b border-gray-300 focus-within:border-black transition-colors">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    className="w-full py-4 bg-transparent outline-none text-black placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative border-b border-gray-300 focus-within:border-black transition-colors">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full py-4 bg-transparent outline-none text-black placeholder:text-gray-400 font-medium"
                  />
                </div>
                <div className="hidden md:block"></div>
              </div>

              <div className="relative border-b border-gray-300 focus-within:border-black transition-colors">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  className="w-full py-4 bg-transparent outline-none text-black placeholder:text-gray-400 font-medium resize-none"
                />
              </div>

              {status.type && (
                <div
                  className={`text-sm font-medium ${
                    status.type === "success" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status.text}
                </div>
              )}

              <div className="pt-8 flex justify-center md:justify-start">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-20 py-4 border border-black rounded-full text-black font-black tracking-widest hover:bg-black hover:text-white transition-all uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "SENDING..." : "SEND"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* CONTENEDOR NEGRO CON ESQUINAS CURVAS — conecta con el Footer */}
      <div className="bg-black w-full rounded-t-[100px] md:rounded-t-[160px] py-10"></div>
    </section>
  );
}

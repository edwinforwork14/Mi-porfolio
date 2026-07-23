"use client";

import React from "react";

export default function WhiteSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#f3f3f3] flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[12vw] md:text-[8vw] font-[1000] tracking-tighter text-black/10 leading-none select-none">
          LET&apos;S WORK
        </h2>
        <p className="mt-8 text-base md:text-lg text-gray-600 max-w-xl mx-auto font-medium">
          Have a project in mind? Let&apos;s collaborate and create something amazing together.
        </p>
      </div>
    </section>
  );
}

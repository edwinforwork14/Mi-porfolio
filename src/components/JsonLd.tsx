import React from "react";

export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Edwin Zuleta",
    givenName: "Edwin",
    familyName: "Zuleta",
    jobTitle: "Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Engineer specializing in Next.js, React, Node.js, and AI-assisted development. Building modern, high-performance web applications.",
    url: "https://edwinzuleta.dev",
    email: "edwinforwork14@gmail.com",
    telephone: "+58 412-1475420",
    address: {
      "@type": "PostalAddress",
      addressCountry: "VE",
    },
    sameAs: [
      "https://linkedin.com/in/edwinzuleta",
      "https://github.com/edwinzuleta",
    ],
    knowsAbout: [
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "AI Engineering",
      "Web Development",
      "UI/UX Design",
    ],
    image: "https://edwinzuleta.dev/models/yo.png",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Edwin Zuleta Portfolio",
    url: "https://edwinzuleta.dev",
    description:
      "Full Stack Developer & AI Engineer portfolio showcasing modern web applications built with Next.js, React, and AI-assisted development.",
    author: {
      "@type": "Person",
      name: "Edwin Zuleta",
    },
    inLanguage: ["en", "es"],
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio Projects",
    description:
      "A collection of web development projects by Edwin Zuleta, Full Stack Developer & AI Engineer.",
    url: "https://edwinzuleta.dev/#projects",
    mainEntity: [
      {
        "@type": "CreativeWork",
        name: "Corporate Website Redesign",
        description:
          "Complete redesign and development of UTC's corporate website with modern UI/UX patterns and optimized performance.",
        author: { "@type": "Person", name: "Edwin Zuleta" },
        programmingLanguage: ["Next.js", "React", "TypeScript"],
      },
      {
        "@type": "CreativeWork",
        name: "E-commerce Platform",
        description:
          "Full-featured e-commerce platform with custom product configurator and real-time inventory management.",
        author: { "@type": "Person", name: "Edwin Zuleta" },
        programmingLanguage: ["Next.js", "TypeScript", "Supabase"],
      },
      {
        "@type": "CreativeWork",
        name: "AI-Powered SaaS Platform",
        description:
          "SaaS platform leveraging AI/ML capabilities for automated content generation and intelligent data analysis.",
        author: { "@type": "Person", name: "Edwin Zuleta" },
        programmingLanguage: ["Next.js", "React", "Python"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
    </>
  );
}

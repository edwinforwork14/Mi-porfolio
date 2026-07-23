export type Language = "en" | "es";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.customers": "Customers",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cv": "CV",

    // Hero
    "hero.greeting": "HI, I'M ",
    "hero.name": "EDWIN",
    "hero.subtitle":
      "FULL STACK DEVELOPER & AI ENGINEER — CRAFTING MODERN WEB APPS WITH CODE AND CREATIVITY",
    "hero.techstack":
      "Next.js · React · Node.js · TypeScript · Tailwind · PostgreSQL · Supabase · Python",

    // About
    "about.title": "ABOUT",
    "about.text":
      "Full Stack Developer with proven experience building modern web applications from frontend interfaces to backend APIs and databases. Passionate about leveraging AI tools to accelerate development, write cleaner code, and ship faster. I turn complex problems into scalable, user-friendly solutions.",

    // Experience
    "exp.title": "EXPERIENCE",
    "exp.role": "Full Stack Developer",
    "exp.impact":
      "Key contributor across multiple real client projects — from architecture to deployment.",
    "exp.highlight1":
      "Built full-stack web apps using Next.js, React, and Node.js",
    "exp.highlight2":
      "Integrated Supabase with secure environment variables and RLS policies",
    "exp.highlight3":
      "Implemented auth flows: login, logout, password recovery with JWT tokens",
    "exp.highlight4":
      "Developed RESTful APIs for internal tools and external integrations",
    "exp.highlight5":
      "Owned the complete dev cycle — setup, architecture, coding, testing, deployment",
    "exp.impact.heading":
      "Untitled Tech Company (UTC) — Full Stack Developer",
    "exp.impact.text":
      'Directly improved the company&apos;s core web presence by redesigning the corporate website, optimizing performance, and implementing modern UI/UX patterns. Contributed across <strong>multiple real client projects</strong> — from initial architecture through final deployment — helping UTC deliver high-quality digital products faster with AI-assisted workflows.',
    "exp.visit": "Visit Site",
    "exp.skills": "Tech Stack",
    "exp.languages": "Languages",
    "exp.spanish": "Español",
    "exp.english": "English",

    // Services
    "services.title": "SERVICES",
    "services.item1.title": "WEB DEVELOPMENT",
    "services.item1.desc":
      "Full-stack web applications built with Next.js, React, and Node.js. From responsive landing pages to complex internal tools with authentication, databases, and REST APIs.",
    "services.item2.title": "BRANDING & DESIGN",
    "services.item2.desc":
      "Clean, modern visual identities and UI/UX design that communicate your brand's essence. Logos, color systems, typography, and complete design systems.",
    "services.item3.title": "AI-ASSISTED DEV",
    "services.item3.desc":
      "AI-driven development services: prompt engineering, agent automation, and intelligent tooling integration to accelerate delivery and improve code quality.",

    // Projects
    "projects.title": "PROJECTS",
    "projects.client": "CLIENT",
    "projects.live": "Live Project",
    "projects.more": "Más Info",
    "projects.visit": "Visit Live Site",
    "projects.source": "View Source",
    "projects.tech": "Technologies",

    // Contact
    "contact.title1": "LET'S",
    "contact.title2": "GET",
    "contact.title3": "TOUCH",
    "contact.name": "Full Name*",
    "contact.email": "Email*",
    "contact.phone": "Phone",
    "contact.message": "Message",
    "contact.send": "SEND",
    "contact.sending": "SENDING...",
    "contact.success":
      "Message sent successfully! I'll get back to you soon.",
    "contact.error.required": "Please fill in all required fields",
    "contact.error.generic": "Something went wrong. Please try again.",
    "contact.error.network": "Network error. Please try again later.",

    // Footer
    "footer.social": "Social",
    "footer.contact": "Contact",
    "footer.download": "Download CV",
    "footer.copyright": "© 2025 EDWIN ZULETA — FULL STACK DEVELOPER",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // Language toggle
    "lang.switch": "ES",
  },
  es: {
    // Nav
    "nav.about": "Sobre Mí",
    "nav.customers": "Clientes",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cv": "CV",

    // Hero
    "hero.greeting": "HOLA, SOY ",
    "hero.name": "EDWIN",
    "hero.subtitle":
      "DESARROLLADOR FULL STACK & INGENIERO DE IA — CREANDO APPS WEB MODERNAS CON CÓDIGO Y CREATIVIDAD",
    "hero.techstack":
      "Next.js · React · Node.js · TypeScript · Tailwind · PostgreSQL · Supabase · Python",

    // About
    "about.title": "SOBRE MÍ",
    "about.text":
      "Desarrollador Full Stack con experiencia comprobada construyendo aplicaciones web modernas, desde interfaces frontend hasta APIs backend y bases de datos. Apasionado por usar herramientas de IA para acelerar el desarrollo, escribir código más limpio y entregar más rápido. Convierto problemas complejos en soluciones escalables y fáciles de usar.",

    // Experience
    "exp.title": "EXPERIENCIA",
    "exp.role": "Desarrollador Full Stack",
    "exp.impact":
      "Contribuidor clave en múltiples proyectos reales con clientes — desde la arquitectura hasta el despliegue.",
    "exp.highlight1":
      "Construí apps web full stack con Next.js, React y Node.js",
    "exp.highlight2":
      "Integré Supabase con variables de entorno seguras y políticas RLS",
    "exp.highlight3":
      "Implementé flujos de autenticación: login, logout, recuperación de contraseña con JWT",
    "exp.highlight4":
      "Desarrollé APIs REST para herramientas internas e integraciones externas",
    "exp.highlight5":
      "Lideré el ciclo completo de desarrollo — setup, arquitectura, código, tests, despliegue",
    "exp.impact.heading":
      "Untitled Tech Company (UTC) — Desarrollador Full Stack",
    "exp.impact.text":
      'Mejoré directamente la presencia web de la empresa rediseñando el sitio corporativo, optimizando el rendimiento e implementando patrones modernos de UI/UX. Contribuí en <strong>múltiples proyectos reales con clientes</strong> — desde la arquitectura inicial hasta el despliegue final — ayudando a UTC a entregar productos digitales de alta calidad más rápido con flujos de trabajo asistidos por IA.',
    "exp.visit": "Visitar Sitio",
    "exp.skills": "Stack Tecnológico",
    "exp.languages": "Idiomas",
    "exp.spanish": "Español",
    "exp.english": "Inglés",

    // Services
    "services.title": "SERVICIOS",
    "services.item1.title": "DESARROLLO WEB",
    "services.item1.desc":
      "Aplicaciones web full stack construidas con Next.js, React y Node.js. Desde landing pages responsivas hasta herramientas internas complejas con autenticación, bases de datos y APIs REST.",
    "services.item2.title": "BRANDING & DISEÑO",
    "services.item2.desc":
      "Identidades visuales limpias y modernas con diseño UI/UX que comunican la esencia de tu marca. Logos, sistemas de color, tipografía y sistemas de diseño completos.",
    "services.item3.title": "DEV ASISTIDO POR IA",
    "services.item3.desc":
      "Servicios de desarrollo impulsados por IA: ingeniería de prompts, automatización de agentes e integración de herramientas inteligentes para acelerar la entrega y mejorar la calidad del código.",

    // Projects
    "projects.title": "PROYECTOS",
    "projects.client": "CLIENTE",
    "projects.live": "Proyecto Live",
    "projects.more": "Más Info",
    "projects.visit": "Visitar Sitio",
    "projects.source": "Ver Código",
    "projects.tech": "Tecnologías",

    // Contact
    "contact.title1": "PONGÁMONOS",
    "contact.title2": "EN",
    "contact.title3": "CONTACTO",
    "contact.name": "Nombre Completo*",
    "contact.email": "Correo*",
    "contact.phone": "Teléfono",
    "contact.message": "Mensaje",
    "contact.send": "ENVIAR",
    "contact.sending": "ENVIANDO...",
    "contact.success":
      "¡Mensaje enviado con éxito! Te responderé pronto.",
    "contact.error.required":
      "Por favor llena todos los campos requeridos",
    "contact.error.generic":
      "Algo salió mal. Por favor intenta de nuevo.",
    "contact.error.network": "Error de red. Por favor intenta más tarde.",

    // Footer
    "footer.social": "Redes",
    "footer.contact": "Contacto",
    "footer.download": "Descargar CV",
    "footer.copyright": "© 2025 EDWIN ZULETA — FULL STACK DEVELOPER",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",

    // Language toggle
    "lang.switch": "EN",
  },
};

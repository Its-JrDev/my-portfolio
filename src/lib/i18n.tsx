import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  en: {
    // Nav & Menu
    home: "Home",
    projects: "Projects",
    skills_nav: "Skills",
    menu: "Menu",
    status_available: "Available for work",
    navigation: "Navigation",
    connect: "Connect",
    // Hero
    hero_desc: "Specialized in responsive interfaces, high-throughput APIs, and interactive visual architectures built with React, TypeScript, and modern engineering standards.",
    hero_desc_short: "Responsive UIs, fast APIs and interactive visuals with React + TypeScript.",
    view_projects: "Featured Projects",
    get_in_touch: "Get in touch",
    // About
    about_me: "About",
    about_text: "Hi! I'm Jose D. Romero, a developer passionate about building reliable, high-performance web products. Starting from foundational web primitives to complex React and full-stack ecosystems, I specialize in crafting clean architectures, responsive designs, and interactive user interfaces.",
    stats_projects: "Projects Built",
    stats_skills: "Technologies",
    stats_satisfaction: "Dedication",
    about_pillar_frontend_title: "Frontend Architecture",
    about_pillar_frontend_desc: "Modular components, fluid animations, and accessible layouts styled with Tailwind CSS and shadcn/ui.",
    about_pillar_fullstack_title: "Full-Stack & APIs",
    about_pillar_fullstack_desc: "Resilient REST and real-time WebSocket pipelines built with Node.js, Python, and scalable databases.",
    about_pillar_perf_title: "Performance & Craft",
    about_pillar_perf_desc: "Sub-millisecond reactivity, optimized client bundles, and cinematic visual fidelity.",
    // Skills
    skills_title: "Skills",
    skills_desc: "Interactive force physics graph mapping interconnected frontend, backend, and tooling nodes.",
    skills_hint: "Drag nodes to reshape the field • Hover to inspect connections",
    skill_html: "Semantic markup & accessible structure",
    skill_css: "Responsive layouts & modern styling",
    skill_javascript: "Interactive behavior & DOM logic",
    skill_typescript: "Type-safe JavaScript at scale",
    skill_react: "Component-driven UIs with hooks",
    skill_vite: "Fast dev server & build tooling",
    skill_tailwind: "Utility-first styling",
    skill_git: "Version control & collaboration",
    skill_python: "Backend scripting & automation",
    skill_fastapi: "High-performance Python APIs",
    skill_nextjs: "Full-stack React framework",
    skill_shadcn: "Accessible component primitives for React",
    skill_shopify: "Liquid themes & Storefront API",
    skill_github: "CI/CD Workflows, Actions & PRs",
    skill_prisma: "Type-safe database ORM",
    skill_supabase: "Open source Firebase alternative",
    skill_postgresql: "Relational database & advanced queries",
    skill_zod: "TypeScript-first schema validation",
    skill_docker: "Containerized deployments",
    skill_zustand: "Bear necessities for state management",
    skill_turborepo: "High-performance build system",
    skill_r3f: "3D rendering with React Three Fiber",
    // Featured Projects
    featured_title: "Featured Projects",
    featured_desc: "Selected works engineered with performance, high visual fidelity, and clean code.",
    show_project: "View Project",
    view_code: "Code",
    category_frontend: "Frontend",
    category_fullstack: "Full-Stack",
    category_realtime: "Real-Time",
    // Filters & Badges
    spotlight_badge: "FLAGSHIP SPOTLIGHT",
    // Contact
    contact_title: "Get in touch",
    contact_desc: "Have a project in mind or just want to say hi? Reach out through any of these, or email me directly at",
    connect_on: "Let's connect on",
    // Footer
    built_with: "Built with React + shadcn/ui",
  },
  es: {
    // Nav & Menu
    home: "Inicio",
    projects: "Proyectos",
    skills_nav: "Habilidades",
    menu: "Menú",
    status_available: "Disponible para proyectos",
    navigation: "Navegación",
    connect: "Conectar",
    // Hero
    hero_desc: "Especializado en interfaces responsivas, APIs de alto rendimiento y arquitecturas visuales interactivas construidas con React, TypeScript y estándares modernos.",
    hero_desc_short: "Interfaces responsivas, APIs rápidas y visuales interactivos con React + TypeScript.",
    view_projects: "Proyectos Destacados",
    get_in_touch: "Ponte en contacto",
    // About
    about_me: "Sobre Mí",
    about_text: "¡Hola! Soy Jose D. Romero, un desarrollador apasionado por crear productos web confiables y de alto rendimiento. Desde los fundamentos de la web hasta ecosistemas complejos en React y full-stack, me enfoco en diseñar arquitecturas limpias, diseños responsivos e interfaces de usuario interactivas.",
    stats_projects: "Proyectos Realizados",
    stats_skills: "Tecnologías",
    stats_satisfaction: "Dedicación",
    about_pillar_frontend_title: "Arquitectura Frontend",
    about_pillar_frontend_desc: "Componentes modulares, animaciones fluidas y layouts accesibles con Tailwind CSS y shadcn/ui.",
    about_pillar_fullstack_title: "Full-Stack y APIs",
    about_pillar_fullstack_desc: "Pipelines REST y WebSockets en tiempo real con Node.js, Python y bases de datos escalables.",
    about_pillar_perf_title: "Rendimiento y Precisión",
    about_pillar_perf_desc: "Reactividad en submilisegundos, bundles optimizados y fidelidad visual cinematográfica.",
    // Skills
    skills_title: "Habilidades",
    skills_desc: "Grafo interactivo de física de fuerzas que mapea nodos de frontend, backend y herramientas.",
    skills_hint: "Arrastra nodos para deformar el campo • Pasa el cursor para ver dependencias",
    skill_html: "Marcado semántico y estructura accesible",
    skill_css: "Diseño responsivo y estilos modernos",
    skill_javascript: "Lógica de DOM y comportamiento interactivo",
    skill_typescript: "JavaScript tipado y seguro a escala",
    skill_react: "Interfaces basadas en componentes con hooks",
    skill_vite: "Servidor de desarrollo rápido y tooling de build",
    skill_tailwind: "Estilos basados en clases de utilidad",
    skill_git: "Control de versiones y colaboración",
    skill_python: "Scripting de backend y automatización",
    skill_fastapi: "APIs en Python de alto rendimiento",
    skill_nextjs: "Framework React full-stack",
    skill_shadcn: "Primitivas de componentes accesibles para React",
    skill_shopify: "Temas Liquid y Storefront API",
    skill_github: "Flujos CI/CD, Actions y Pull Requests",
    skill_prisma: "ORM tipado y seguro para bases de datos",
    skill_supabase: "Alternativa open source a Firebase",
    skill_postgresql: "Base de datos relacional y consultas avanzadas",
    skill_zod: "Validación de esquemas orientada a TypeScript",
    skill_docker: "Despliegues en contenedores",
    skill_zustand: "Gestión de estado global minimalista",
    skill_turborepo: "Sistema de construcción de alto rendimiento (Monorepos)",
    skill_r3f: "Renderizado 3D interactivo con React Three Fiber",
    // Featured Projects
    featured_title: "Proyectos Destacados",
    featured_desc: "Obras seleccionadas con alto rendimiento, máxima fidelidad visual y código limpio.",
    show_project: "Ver Proyecto",
    view_code: "Código",
    category_frontend: "Frontend",
    category_fullstack: "Full-Stack",
    category_realtime: "Tiempo Real",
    // Filters & Badges
    spotlight_badge: "PROYECTO INSIGNIA",
    // Contact
    contact_title: "Contacto",
    contact_desc: "¿Tienes un proyecto en mente o solo quieres saludar? Contáctame por cualquiera de estos medios, o escríbeme directamente a",
    connect_on: "Conectemos en",
    // Footer
    built_with: "Desarrollado con React + shadcn/ui",
  },
}

type Language = "en" | "es"
export type Translations = typeof translations.en

interface I18nContextType {
  lang: Language
  t: (key: keyof Translations) => string
  setLang: (lang: Language) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split("-")[0]
    if (browserLang === "es") {
      setLang("es")
    }
  }, [])

  const t = (key: keyof Translations) => translations[lang][key] || translations.en[key] || key

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider")
  }
  return context
}

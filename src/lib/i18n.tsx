import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  en: {
    // Nav & Menu
    home: "Home",
    projects: "Featured Projects",
    skills_nav: "Skills",
    menu: "Menu",
    // Hero
    hero_badge: "Riwi's Coder • Web Developer & Software Engineer",
    hero_headline: "Turning ideas into high-impact digital experiences.",
    hero_desc: "Specialized in responsive interfaces, high-throughput APIs, and interactive visual architectures built with React, TypeScript, and modern engineering standards.",
    view_projects: "Featured Projects",
    get_in_touch: "Get in touch",
    scroll_down: "Scroll down",
    // About
    about_me: "About Me",
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
    skills_subtitle: "Skills",
    skills_desc: "Interactive force physics graph mapping interconnected frontend, backend, and tooling nodes.",
    skills_hint: "Drag nodes to reshape the field • Hover to inspect connections",
    // Featured Projects
    featured_kicker: "CURATED WORK",
    featured_title: "Featured Projects",
    featured_desc: "Selected works engineered with performance, high visual fidelity, and clean code.",
    all_projects: "All projects",
    show_project: "Live Demo",
    view_code: "Code",
    category_frontend: "Frontend",
    category_fullstack: "Full-Stack",
    category_realtime: "Real-Time",
    // Work / Portfolio landing
    work_title: "Selected work",
    work_desc: "A curated set of web projects — filter by discipline and open any piece to see it live.",
    filter_by: "Filter by",
    // Projects Page
    projects_title: "Cinematic Project Showcase",
    projects_page_desc: "Explore end-to-end architectures, interactive applications, and modern frontend engines. Media-driven, high fidelity, and zero container clutter.",
    live_demo: "Live demo",
    code: "Source Code",
    // Filters & Badges
    filter_all: "All Works",
    filter_frontend: "Frontend",
    filter_fullstack: "Full-Stack",
    filter_realtime: "Real-Time",
    spotlight_badge: "FLAGSHIP SPOTLIGHT",
    inspect_project: "Inspect Architecture",
    // Contact
    contact_title: "Get in touch",
    contact_desc: "Have a project in mind or just want to say hi? Reach out through any of these, or email me directly at",
    connect_on: "Let's connect on",
    open_to_work: "Available for new opportunities",
    copy_email: "Copy email",
    email_copied: "Email copied to clipboard!",
    quick_chat: "Let's build something exceptional together.",
    // Footer
    built_with: "Built with React + shadcn/ui",
    // Not found
    not_found: "Page not found",
    not_found_desc: "The page you are looking for does not exist or was moved.",
    back_home: "Back home",
  },
  es: {
    // Nav & Menu
    home: "Inicio",
    projects: "Proyectos Destacados",
    skills_nav: "Habilidades",
    menu: "Menú",
    // Hero
    hero_badge: "Riwi's Coder • Desarrollador Web & Ingeniero de Software",
    hero_headline: "Transformando ideas en experiencias digitales de alto impacto.",
    hero_desc: "Especializado en interfaces responsivas, APIs de alto rendimiento y arquitecturas visuales interactivas construidas con React, TypeScript y estándares modernos.",
    view_projects: "Proyectos Destacados",
    get_in_touch: "Ponte en contacto",
    scroll_down: "Desliza abajo",
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
    skills_subtitle: "Habilidades",
    skills_desc: "Grafo interactivo de física de fuerzas que mapea nodos de frontend, backend y herramientas.",
    skills_hint: "Arrastra nodos para deformar el campo • Pasa el cursor para ver dependencias",
    // Featured Projects
    featured_kicker: "TRABAJOS SELECCIONADOS",
    featured_title: "Proyectos Destacados",
    featured_desc: "Obras seleccionadas con alto rendimiento, máxima fidelidad visual y código limpio.",
    all_projects: "Todos los proyectos",
    show_project: "Ver Demo",
    view_code: "Código",
    category_frontend: "Frontend",
    category_fullstack: "Full-Stack",
    category_realtime: "Tiempo Real",
    // Work / Portfolio landing
    work_title: "Trabajo seleccionado",
    work_desc: "Una selección de proyectos web — filtra por disciplina y abre cualquiera para verlo en vivo.",
    filter_by: "Filtrar por",
    // Projects Page
    projects_title: "Showcase Cinematográfico",
    projects_page_desc: "Explora arquitecturas completas, aplicaciones interactivas y motores frontend modernos. Centrado en medios, alta fidelidad y sin sobre-contenerizar.",
    live_demo: "Demo en vivo",
    code: "Código Fuente",
    // Filters & Badges
    filter_all: "Todos",
    filter_frontend: "Frontend",
    filter_fullstack: "Full-Stack",
    filter_realtime: "Tiempo Real",
    spotlight_badge: "PROYECTO INSIGNIA",
    inspect_project: "Inspeccionar Arquitectura",
    // Contact
    contact_title: "Ponte en contacto",
    contact_desc: "¿Tienes un proyecto en mente o solo quieres saludar? Contáctame por cualquiera de estos medios, o escríbeme directamente a",
    connect_on: "Conectemos en",
    open_to_work: "Disponible para nuevas oportunidades",
    copy_email: "Copiar correo",
    email_copied: "¡Correo copiado al portapapeles!",
    quick_chat: "Construyamos algo excepcional juntos.",
    // Footer
    built_with: "Desarrollado con React + shadcn/ui",
    // Not found
    not_found: "Página no encontrada",
    not_found_desc: "La página que buscas no existe o fue movida.",
    back_home: "Volver al inicio",
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

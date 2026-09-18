import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  en: {
    // Nav & Menu
    home: "Home",
    projects: "Projects",
    menu: "Menu",
    // Hero
    hero_desc: "Web developer crafting clean, responsive experiences. Explore my projects to see what I have been building.",
    view_projects: "View projects",
    get_in_touch: "Get in touch",
    // About
    about_me: "About me",
    about_text: "Hi! I'm Jose, a web developer who loves creating websites. I started learning HTML and CSS, and now I'm building cool projects with React and modern tooling. When I'm not coding, I enjoy playing video games and spending time with my pets.",
    stats_projects: "Projects",
    stats_skills: "Skills",
    // Skills
    skills_title: "My stack, mapped",
    skills_subtitle: "Skills",
    skills_desc: "Hover a node to see what I use it for.",
    // Featured
    featured_title: "Featured projects",
    featured_desc: "A few things I have built.",
    all_projects: "All projects",
    // Projects Page
    projects_title: "Projects",
    projects_page_desc: "Here are some of the projects I have worked on. Each one represents a step in my journey as a developer.",
    live_demo: "Live demo",
    code: "Code",
    // Contact
    contact_title: "Get in touch",
    contact_desc: "Have a project in mind or just want to say hi? Reach out through any of these, or email me directly at",
    connect_on: "Let's connect on",
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
    projects: "Proyectos",
    menu: "Menú",
    // Hero
    hero_desc: "Desarrollador web creando experiencias limpias y responsivas. Explora mis proyectos para ver lo que he construido.",
    view_projects: "Ver proyectos",
    get_in_touch: "Contáctame",
    // About
    about_me: "Sobre mí",
    about_text: "¡Hola! Soy Jose, un desarrollador web al que le encanta crear sitios web. Empecé aprendiendo HTML y CSS, y ahora estoy construyendo proyectos geniales con React y herramientas modernas. Cuando no estoy programando, disfruto jugar videojuegos y pasar tiempo con mis mascotas.",
    stats_projects: "Proyectos",
    stats_skills: "Habilidades",
    // Skills
    skills_title: "Mi stack tecnológico",
    skills_subtitle: "Habilidades",
    skills_desc: "Pasa el cursor sobre un nodo para ver para qué lo uso.",
    // Featured
    featured_title: "Proyectos destacados",
    featured_desc: "Algunas cosas que he construido.",
    all_projects: "Todos los proyectos",
    // Projects Page
    projects_title: "Proyectos",
    projects_page_desc: "Aquí hay algunos de los proyectos en los que he trabajado. Cada uno representa un paso en mi viaje como desarrollador.",
    live_demo: "Demo en vivo",
    code: "Código",
    // Contact
    contact_title: "Ponte en contacto",
    contact_desc: "¿Tienes un proyecto en mente o solo quieres saludar? Contáctame por cualquiera de estos medios, o escríbeme directamente a",
    connect_on: "Conectemos en",
    // Footer
    built_with: "Desarrollado con React + shadcn/ui",
    // Not found
    not_found: "Página no encontrada",
    not_found_desc: "La página que buscas no existe o fue movida.",
    back_home: "Volver al inicio",
  }
}

type Language = "en" | "es"
type Translations = typeof translations.en

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

  const t = (key: keyof Translations) => {
    return translations[lang][key] || translations.en[key] || key
  }

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

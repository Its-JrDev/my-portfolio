export const SITE_URL = "https://its-jrdev.github.io/my-portfolio/"

export const AUTHOR_NAME = "Jose D. Romero"
export const AUTHOR_ALIAS = "Its-JrDev"
export const AUTHOR_ROLE = "Riwi's Coder"

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
] as const

export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Its-JrDev",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jose-romero-7b37353b6",
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/1178506619345190996",
  },
] as const

export const SKILLS = [
  {
    id: "html",
    label: "HTML",
    description: "Semantic markup & accessible structure",
  },
  {
    id: "css",
    label: "CSS",
    description: "Responsive layouts & modern styling",
  },
  {
    id: "javascript",
    label: "JavaScript",
    description: "Interactive behavior & DOM logic",
  },
  {
    id: "typescript",
    label: "TypeScript",
    description: "Type-safe JavaScript at scale",
  },
  {
    id: "react",
    label: "React",
    description: "Component-driven UIs with hooks",
  },
  {
    id: "vite",
    label: "Vite",
    description: "Fast dev server & build tooling",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    description: "Utility-first styling",
  },
  {
    id: "git",
    label: "Git",
    description: "Version control & collaboration",
  },
] as const

export const SKILL_EDGES = [
  ["html", "css"],
  ["html", "javascript"],
  ["css", "javascript"],
  ["css", "tailwind"],
  ["javascript", "react"],
  ["javascript", "typescript"],
  ["typescript", "react"],
  ["react", "vite"],
  ["react", "tailwind"],
  ["react", "git"],
  ["vite", "git"],
] as const

export const ABOUT_TEXT =
  "Hi! I'm Jose, a web developer who loves creating websites. I started learning HTML and CSS, and now I'm building cool projects with React and modern tooling. When I'm not coding, I enjoy playing video games and spending time with my pets."
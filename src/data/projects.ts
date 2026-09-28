/**
 * Shape of a project card entry.
 *
 * Rendered by the inner `ProjectCard` in `featured-projects.tsx`. Layout is
 * positional rather than filtered: index 0 renders as the spotlight card, index
 * 1 as the secondary card, and indices 2-4 as the third row.
 */
export interface Project {
  title: string
  headline?: string
  description: string
  tags: string[]
  image?: string
  metrics?: string
  category?: "frontend" | "fullstack" | "realtime"
  deployUrl?: string
  githubUrl?: string
}

/**
 * The five showcase projects.
 *
 * Consumed in two places with different constraints:
 *
 * - `featured-projects.tsx` slices `PROJECTS[0]`, `PROJECTS.slice(1, 2)` and
 *   `PROJECTS.slice(2, 5)`. Index 5 and beyond never render. Adding a sixth
 *   project requires changing that slice.
 * - `about.tsx` reads `PROJECTS.length` for the "Projects Built" counter, so
 *   the count stays derived rather than hardcoded.
 *
 * `image` paths resolve through `import.meta.env.BASE_URL`, so they must stay
 * relative to `public/`.
 */
export const PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    headline: "High-Performance Cyber Experience",
    description:
      "A responsive, cinematic developer portfolio built with React, Vite, Tailwind CSS, and interactive D3 force physics. High visual impact with optimized trust signals.",
    tags: ["React", "TypeScript", "Tailwind CSS", "D3.js"],
    image: "projects/portfolio-cinematic.svg",
    metrics: "100% Responsive • Interactive Physics",
    category: "frontend",
    githubUrl: "https://github.com/Its-JrDev/my-portfolio",
    deployUrl: "https://its-jrdev.github.io/my-portfolio/",
  },
  {
    title: "E-commerce Platform",
    headline: "Full-Stack Distributed Storefront",
    description:
      "A high-throughput e-commerce platform with secure token authentication, catalog search, atomic cart synchronization, and payment pipeline integration.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API"],
    image: "projects/ecommerce-cinematic.svg",
    metrics: "<120ms API Latency • Full Auth Pipeline",
    category: "fullstack",
    githubUrl: "https://github.com/Its-JrDev",
  },
  {
    title: "Chat Application",
    headline: "Real-Time WebSocket Matrix",
    description:
      "Low-latency real-time chat infrastructure powered by WebSockets. Instant telemetry, multi-room channels, active presence, and seamless message synchronization.",
    tags: ["Node.js", "WebSockets", "JavaScript", "Real-Time"],
    image: "projects/chat-cinematic.svg",
    metrics: "Sub-10ms Ping • Instant Multi-room",
    category: "realtime",
    githubUrl: "https://github.com/Its-JrDev",
  },
  {
    title: "Weather App",
    headline: "Atmospheric Radar & Forecast Station",
    description:
      "A real-time meteorological station fetching multi-source weather telemetry with interactive pressure variance graphs and satellite 5-day forecasting.",
    tags: ["JavaScript", "Weather API", "CSS3", "Telemetry"],
    image: "projects/weather-cinematic.svg",
    metrics: "Live Geo-telemetry • 5-Day Radar",
    category: "frontend",
    githubUrl: "https://github.com/Its-JrDev",
  },
  {
    title: "Blog Platform",
    headline: "Modern Architecture Publication Engine",
    description:
      "A developer publishing platform featuring edge aggregation, Markdown & syntax rendering, categorized tech logs, and community interactions.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "projects/blog-cinematic.svg",
    metrics: "Edge Aggregated • Rich Markdown",
    category: "fullstack",
    githubUrl: "https://github.com/Its-JrDev",
  },
]
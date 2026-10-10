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
  /**
   * Production gate for `main`.
   *
   * - `"published"` renders in `FeaturedProjects` and counts in `About`.
   * - `"draft"` (or omitted) stays hidden until the project is real — this is
   *   how placeholders are kept in `dev` without leaking to production.
   *
   * To publish a placeholder, flip it to `"published"`.
   */
  status?: "published" | "draft"
}

/**
 * The showcase projects.
 *
 * Only `status: "published"` entries render (see `VISIBLE_PROJECTS` below).
 * Today that is just the Restaurant Management System — the real, configured
 * project. The rest are placeholders kept as `"draft"` so `dev` retains them
 * without leaking to `main` / production.
 *
 * Consumed in two places with different constraints:
 *
 * - `featured-projects.tsx` slices `VISIBLE_PROJECTS[0]`, `VISIBLE_PROJECTS.slice(1, 2)` and
 *   `VISIBLE_PROJECTS.slice(2, 5)`. Index 5 and beyond never render. Adding a sixth
 *   published project requires changing that slice.
 * - `about.tsx` reads `VISIBLE_PROJECTS.length` for the "Projects Built" counter, so
 *   the count stays derived rather than hardcoded.
 *
 * `image` paths resolve through `import.meta.env.BASE_URL`, so they must stay
 * relative to `public/`.
 */
export const PROJECTS: Project[] = [
  {
    title: "Restaurant Management System",
    headline: "Full-Stack Point of Sale & Operations",
    description:
      "A comprehensive restaurant management platform featuring order tracking, inventory management, interactive POS dashboard, and real-time operations synchronization.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    image: "projects/restaurant-management.webp",
    metrics: "Real-time POS • Dynamic Inventory",
    category: "fullstack",
    githubUrl: "https://github.com/Its-JrDev/restaurant-management-system",
    deployUrl: "https://restaurant-management-system-demo.vercel.app/",
    status: "published",
  },
  {
    title: "Mocking by Jay",
    headline: "Independent Rap Label",
    description:
      "A high-impact landing page for an independent rap label featuring roster discovery, studio session booking, and a bold editorial aesthetic.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image: "projects/mocking-jay.webp",
    metrics: "Scroll Reveals • Booking Modal",
    category: "frontend",
    githubUrl: "https://github.com/Its-JrDev/mocking-jay",
    deployUrl: "https://mocking-jay-three.vercel.app/",
    status: "published",
  },
  {
    title: "AlegrIA",
    headline: "Barrio Abajo Cultural AI",
    description:
      "An interactive project celebrating the cultural heritage of Barrio Abajo, integrating artificial intelligence with local traditions.",
    tags: ["React", "JavaScript", "Vite", "AI"],
    image: "projects/alegria.webp",
    metrics: "Cultural Heritage • Interactive",
    category: "frontend",
    deployUrl: "https://alegria-barrio-abajo.nicolasguarinruni.workers.dev/",
    status: "published",
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
    status: "draft",
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
    status: "draft",
  },
]

/**
 * Production-visible projects: everything not explicitly marked as draft.
 * `featured-projects.tsx` and `about.tsx` must consume this, never `PROJECTS`
 * directly, so placeholders never reach `main`.
 */
export const VISIBLE_PROJECTS: Project[] = PROJECTS.filter(
  (project) => project.status !== "draft",
)
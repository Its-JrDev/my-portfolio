import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react"

/**
 * Deployed origin. Must stay in sync with `base` in `vite.config.ts`, which is
 * also `/my-portfolio/`. Used by `seo.tsx` for canonical and Open Graph URLs.
 */
export const SITE_URL = "https://its-jrdev.github.io/my-portfolio/"

/** Display name, used in the hero headline and the footer copyright. */
export const AUTHOR_NAME = "Jose D. Romero"

/** Short handle, used as the header wordmark and the Open Graph site name. */
export const AUTHOR_ALIAS = "Its-JrDev"

/**
 * Rendered directly as the hero badge, bypassing i18n.
 */
export const AUTHOR_ROLE = "Riwi's Coder"

/**
 * Nav contract between the header and the sections.
 *
 * `label` is an i18n key rather than display text: `site-header.tsx` maps each
 * one through `navLabel()`, since "Featured Projects" has to resolve to
 * `t("projects")` and not to a literal lookup.
 *
 * `#hero` has no matching element in the DOM. The header special-cases it and
 * scrolls to `top: 0` instead of querying.
 */
export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Featured Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const

/**
 * External profile links. Consumed by `contact.tsx` and `site-footer.tsx`,
 * which render them as three cards and as three footer icons respectively.
 */
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

/**
 * Icon component per `SOCIALS[].label`. Typed as a `Record` over the label
 * union, so adding a social without a matching icon fails to compile.
 *
 * Keys are looked up as `SOCIAL_ICONS[social.label]` with no cast, because
 * `social` is already narrowed to the `SOCIALS` tuple.
 */
export const SOCIAL_ICONS: Record<
  (typeof SOCIALS)[number]["label"],
  typeof IconBrandGithub
> = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  Discord: IconBrandDiscord,
}

/**
 * Graph nodes for `skill-graph.tsx`. `id` is the join key against
 * `SKILL_EDGES`; degree in that edge list drives each node's rendered diameter.
 *
 * `SKILLS.length` also feeds the "Technologies" counter in `about.tsx`, so the
 * count is derived rather than hardcoded.
 */
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
  {
    id: "python",
    label: "Python",
    description: "Backend scripting & automation",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    description: "High-performance Python APIs",
  },
  {
    id: "nextjs",
    label: "Next.js",
    description: "Full-stack React framework",
  },
  {
    id: "shadcn",
    label: "shadcn/ui",
    description: "Accessible component primitives for React",
  },
  {
    id: "shopify",
    label: "Shopify",
    description: "Liquid themes & Storefront API",
  },
] as const

/**
 * Force-simulation edges, as `[fromId, toId]` pairs. 20 edges over 13 nodes.
 *
 * An edge naming an `id` absent from `SKILLS` does not throw: `forceLink`
 * resolves it to `undefined` and the edge simply does not render.
 */
export const SKILL_EDGES = [
  ["html", "css"],
  ["html", "javascript"],
  ["html", "shopify"],
  ["css", "javascript"],
  ["css", "tailwind"],
  ["css", "shopify"],
  ["javascript", "react"],
  ["javascript", "typescript"],
  ["javascript", "shopify"],
  ["typescript", "react"],
  ["typescript", "nextjs"],
  ["react", "vite"],
  ["react", "tailwind"],
  ["react", "git"],
  ["react", "nextjs"],
  ["react", "shadcn"],
  ["tailwind", "shadcn"],
  ["vite", "git"],
  ["python", "fastapi"],
  ["python", "git"],
] as const

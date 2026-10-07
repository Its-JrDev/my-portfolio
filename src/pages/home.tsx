/**
 * The single page. Composition order is fixed and drives both the visual flow
 * and the nav sequence in `NAV_ITEMS`.
 *
 * Only the hero lacks a section `id`, so the header special-cases `#hero` by
 * scrolling to `top: 0`.
 *
 * `Seo` receives a Spanish-only title and description that do not change with
 * the active language.
 */
import { Seo } from "@/components/seo"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { FeaturedProjects } from "@/components/featured-projects"
import { Contact } from "@/components/contact"

export function HomePage() {
  return (
    <>
      <Seo
        title="Jose D. Romero — Portfolio"
        description="Portfolio de Jose D. Romero (Its-JrDev), desarrollador web. Proyectos destacados, habilidades y contacto."
      />

      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </>
  )
}

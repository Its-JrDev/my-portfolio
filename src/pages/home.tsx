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

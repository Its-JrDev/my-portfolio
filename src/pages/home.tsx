import { Link } from "react-router-dom"
import { IconArrowRight } from "@tabler/icons-react"

import { Seo } from "@/components/seo"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { ProjectCard } from "@/components/project-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"

export function HomePage() {
  const { t } = useTranslation()
  const featured = PROJECTS.slice(0, 3)

  return (
    <>
      <Seo
        title="Jose D. Romero — Portfolio"
        description="Portfolio de Jose D. Romero (Its-JrDev), desarrollador web. Proyectos, habilidades y contacto."
      />
      <Hero />
      <About />
      <section className="border-t">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
          <BlurFade>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t("featured_title")}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {t("featured_desc")}
                </p>
              </div>
              <Link to="/projects" className={buttonVariants({ variant: "ghost" })}>
                {t("all_projects")}
                <IconArrowRight />
              </Link>
            </div>
          </BlurFade>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <BlurFade key={project.title} delay={i * 0.1} className="h-full">
                <ProjectCard project={project} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  )
}
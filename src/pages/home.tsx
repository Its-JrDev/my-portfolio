import { Link } from "react-router-dom"
import { IconArrowRight } from "@tabler/icons-react"

import { Seo } from "@/components/seo"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { CinematicProjectCard } from "@/components/cinematic-project-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function HomePage() {
  const { t } = useTranslation()
  const spotlightProject = PROJECTS[0]
  const secondaryFeatured = PROJECTS.slice(1, 3)

  return (
    <>
      <Seo
        title="Jose D. Romero — Portfolio"
        description="Portfolio de Jose D. Romero (Its-JrDev), desarrollador web. Proyectos, habilidades y contacto."
      />

      {/* 1. Hero: Kept with its clean, praised proportions */}
      <Hero />

      {/* 2. About & Skills: Expanded x2 to max-w-7xl */}
      <About />

      {/* 3. Featured Showcase: Sober Bento grid with media focus */}
      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <BlurFade>
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border/40 pb-6">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t("featured_title")}
                </h2>
                <p className="mt-2 text-muted-foreground max-w-2xl">
                  {t("featured_desc")}
                </p>
              </div>

              <Link
                to="/projects"
                className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
              >
                <span>{t("all_projects")}</span>
                <IconArrowRight className="size-4" />
              </Link>
            </div>
          </BlurFade>

          {/* Featured Bento: Flagship Spotlight */}
          <div className="mt-8">
            <BlurFade delay={0.1}>
              <CinematicProjectCard project={spotlightProject} layout="spotlight" priority />
            </BlurFade>
          </div>

          {/* Secondary Featured Projects: Balanced 2-Column Bento */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {secondaryFeatured.map((project, i) => (
              <BlurFade key={project.title} delay={0.15 + i * 0.1} className="h-full">
                <CinematicProjectCard project={project} layout="wide" />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact: Restored original sober layout in max-w-7xl */}
      <Contact />
    </>
  )
}
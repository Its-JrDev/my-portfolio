import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  IconArrowRight,
  IconCode,
  IconCpu,
  IconFlame,
  IconSparkles,
} from "@tabler/icons-react"

import { Seo } from "@/components/seo"
import { CinematicProjectCard } from "@/components/cinematic-project-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { buttonVariants } from "@/components/ui/button"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type CategoryFilter = "all" | "frontend" | "fullstack" | "realtime"

export function ProjectsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all")

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "all") return true
    return p.category === activeCategory
  })

  // Spotlight the first project when viewing all
  const spotlight = activeCategory === "all" ? filteredProjects[0] : null
  const gallery = activeCategory === "all" ? filteredProjects.slice(1) : filteredProjects

  const FILTERS: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
    { id: "all", label: t("filter_all"), icon: IconFlame },
    { id: "frontend", label: t("filter_frontend"), icon: IconSparkles },
    { id: "fullstack", label: t("filter_fullstack"), icon: IconCpu },
    { id: "realtime", label: t("filter_realtime"), icon: IconCode },
  ]

  return (
    <>
      <Seo
        title={`${t("projects_title")} | Jose D. Romero`}
        description="Showcase de proyectos de Jose D. Romero — arquitecturas full-stack, interfaces interactivas y aplicaciones modernas."
        path="/projects"
      />

      {/* Header with Widescreen max-w-7xl */}
      <section className="border-b border-border/40 py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <BlurFade>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                  {t("projects_title")}
                </h1>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  {t("projects_page_desc")}
                </p>
              </div>

              {/* Dynamic Project Count Badge */}
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" />
                <span>
                  {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
                </span>
              </div>
            </div>

            {/* Category Filter Pills (Sober, clean) */}
            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/40">
              {FILTERS.map((f) => {
                const Icon = f.icon
                const isActive = activeCategory === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveCategory(f.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40"
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{f.label}</span>
                  </button>
                )
              })}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Projects Showcase Bento Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          {/* Flagship Spotlight if in All mode */}
          {spotlight && (
            <div className="mb-8">
              <BlurFade>
                <CinematicProjectCard project={spotlight} layout="spotlight" priority />
              </BlurFade>
            </div>
          )}

          {/* Widescreen 2-Column Bento Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((project, i) => (
              <BlurFade
                key={project.title}
                delay={(i % 2) * 0.08}
                className="h-full"
              >
                <CinematicProjectCard project={project} layout="wide" />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Callout Section (Clean section, not a card) */}
      <section className="border-t border-border/40 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 text-center">
          <BlurFade>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("quick_chat")}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {t("contact_desc")}{" "}
              <a
                href="mailto:jromero810@outlook.com"
                className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors"
              >
                jromero810@outlook.com
              </a>
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  navigate("/")
                  setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }, 80)
                }}
                className={cn(buttonVariants({ size: "default" }), "gap-2")}
              >
                {t("get_in_touch")}
                <IconArrowRight className="size-4" />
              </button>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  )
}
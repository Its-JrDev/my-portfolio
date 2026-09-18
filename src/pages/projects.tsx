import { Seo } from "@/components/seo"
import { ProjectCard } from "@/components/project-card"
import { BlurFade } from "@/components/ui/blur-fade"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"

export function ProjectsPage() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={`${t("projects")} | Jose D. Romero`}
        description="Proyectos de Jose D. Romero — desarrollo web con HTML, CSS, JavaScript, React y más."
        path="/projects"
      />
      <section className="border-b">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <BlurFade>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("projects_title")}
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {t("projects_page_desc")}
            </p>
          </BlurFade>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6 md:py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <BlurFade key={project.title} delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
/**
 * Showcase section: a positional bento grid of up to five project cards.
 *
 * Layout is driven by array index, not by the `featured` or `category` fields:
 *
 * - `PROJECTS[0]` → spotlight card, `lg:col-span-8`, 21/9 media, badge
 * - `PROJECTS.slice(1, 2)` → secondary card, `lg:col-span-4`
 * - `PROJECTS.slice(2, 5)` → three equal cards, `lg:col-span-4` each
 *
 * Index 5 and beyond never render. Adding a sixth project requires changing
 * that slice.
 *
 * The only section carrying `scroll-mt-16`, which offsets the fixed `h-16`
 * header when navigating to `#projects`. `#about`, `#skills` and `#contact`
 * are missing it, so their headings sit behind the header.
 *
 * Images resolve through `import.meta.env.BASE_URL` to survive the GitHub
 * Pages subpath. Without `image`, a hardcoded `Preview unavailable` renders.
 *
 * `ProjectCard` is file-local and not exported.
 */
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PROJECTS, type Project } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const base = import.meta.env.BASE_URL

export function FeaturedProjects() {
  const { t } = useTranslation()

  const flagship = PROJECTS[0]
  const secondary = PROJECTS.slice(1, 2)[0]
  const tertiary = PROJECTS.slice(2, 5)

  return (
    <section id="projects" className="scroll-mt-16 border-t border-border/40 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Header */}
        <BlurFade>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {t("featured_title")}
            </h2>
            <p className="max-w-2xl text-muted-foreground text-base sm:text-lg">
              {t("featured_desc")}
            </p>
          </div>
        </BlurFade>

        {/* Adaptive Bento Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Row 1: Flagship (Full 2 cols on md, 8 cols on lg) */}
          {flagship && (
            <BlurFade delay={0.05} className="md:col-span-2 lg:col-span-8 flex">
              <ProjectCard project={flagship} isSpotlight />
            </BlurFade>
          )}

          {secondary && (
            <BlurFade delay={0.1} className="md:col-span-1 lg:col-span-4 flex">
              <ProjectCard project={secondary} />
            </BlurFade>
          )}

          {/* Row 2 & 3: 3 balanced cards (1 col each on md, 4 cols on lg) */}
          {tertiary.map((project, i) => (
            <BlurFade key={project.title} delay={0.15 + i * 0.05} className="md:col-span-1 lg:col-span-4 flex">
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  isSpotlight = false,
}: {
  project: Project
  isSpotlight?: boolean
}) {
  const { t } = useTranslation()
  const imageSrc = project.image ? `${base}${project.image}` : undefined

  return (
    <Card
      className={cn(
        "group relative flex flex-col w-full h-full overflow-hidden rounded-2xl border border-border/70",
        "bg-card/40 backdrop-blur-md transition-all duration-300",
        "hover:border-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
      )}
    >
      {/* Media container */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted/40",
          isSpotlight ? "aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8]" : "aspect-[16/10]"
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${project.title} preview`}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
            Preview unavailable
          </div>
        )}

        {/* Ambient media gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />

        {/* Top badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          {isSpotlight ? (
            <Badge className="bg-primary/90 text-primary-foreground text-[10px] tracking-wider uppercase backdrop-blur-sm">
              {t("spotlight_badge")}
            </Badge>
          ) : (
            <div />
          )}

          {project.category && (
            <Badge
              variant="outline"
              className="border-border/80 bg-background/80 text-foreground/90 backdrop-blur-sm text-[11px] capitalize"
            >
              {project.category === "frontend"
                ? t("category_frontend")
                : project.category === "fullstack"
                  ? t("category_fullstack")
                  : t("category_realtime")}
            </Badge>
          )}
        </div>
      </div>

      {/* Content body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between gap-4">
        <div>
          {/* Metrics telemetry tag */}
          {project.metrics && (
            <div className="mb-2 flex items-center gap-1.5 text-xs text-primary font-medium">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Project Title */}
          <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Headline / Description */}
          {project.headline && (
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {project.headline}
            </p>
          )}

          <p className="mt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons adhering to shadcn UI */}
        <div className="pt-3 border-t border-border/40 flex items-center gap-3">
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5 text-xs font-medium")}
            >
              <span>{t("show_project")}</span>
              <IconExternalLink className="size-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: project.deployUrl ? "outline" : "default",
                }),
                "gap-1.5 text-xs font-medium"
              )}
            >
              <IconBrandGithub className="size-3.5" />
              <span>{t("view_code")}</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

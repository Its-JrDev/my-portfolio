/**
 * Showcase section: a positional bento grid of up to five visible project cards.
 *
 * Only `VISIBLE_PROJECTS` (status !== "draft") render, so placeholders kept in
 * `PROJECTS` never leak to `main` / production. Layout is driven by array index:
 *
 * - `VISIBLE[0]` → spotlight card, `lg:col-span-8`, 21/9 media, badge
 * - `VISIBLE.slice(1, 2)` → secondary card, `lg:col-span-4`
 * - `VISIBLE.slice(2, 5)` → three equal cards, `lg:col-span-4` each
 *
 * With a single visible project (current production state), the spotlight
 * expands to full width instead of leaving an empty side column.
 *
 * Index 5 and beyond never render. Publishing a sixth project requires changing
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
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VISIBLE_PROJECTS, type Project } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const base = import.meta.env.BASE_URL

export function FeaturedProjects() {
  const { t } = useTranslation()

  const flagship = VISIBLE_PROJECTS[0]
  const secondary = VISIBLE_PROJECTS.slice(1, 2)[0]
  const tertiary = VISIBLE_PROJECTS.slice(2, 5)
  const isSingle = VISIBLE_PROJECTS.length === 1

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

        {/* Adaptive Bento Grid — single published project spans full width */}
        {isSingle && flagship ? (
          <div className="mt-10 mx-auto w-full max-w-4xl">
            <BlurFade delay={0.05} className="flex">
              <ProjectCard project={flagship} isSpotlight />
            </BlurFade>
          </div>
        ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Main Card + Bottom Cards) */}
          <div className="md:col-span-2 lg:col-span-8 flex flex-col gap-6">
            {flagship && (
              <BlurFade delay={0.05} className="flex">
                <ProjectCard project={flagship} isSpotlight />
              </BlurFade>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tertiary[1] && (
                <BlurFade delay={0.05} className="flex h-full">
                  <ProjectCard project={tertiary[1]} />
                </BlurFade>
              )}
              {tertiary[2] && (
                <BlurFade delay={0.05} className="flex h-full">
                  <ProjectCard project={tertiary[2]} />
                </BlurFade>
              )}
            </div>
          </div>

          {/* Right Column (Side Cards) */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col md:grid md:grid-cols-2 lg:flex gap-6">
            {secondary && (
              <BlurFade delay={0.05} className="flex">
                <ProjectCard project={secondary} />
              </BlurFade>
            )}
            {tertiary[0] && (
              <BlurFade delay={0.05} className="flex">
                <ProjectCard project={tertiary[0]} />
              </BlurFade>
            )}
          </div>
        </div>
        )}
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
      variant="interactive"
      className="group relative flex flex-col w-full h-full overflow-hidden py-0"
    >
      {/* Media container */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted/40",
          isSpotlight ? "aspect-auto" : "aspect-[16/10]"
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${project.title} preview`}
            loading="lazy"
            className={cn(
              "transition-transform duration-700 ease-out scale-110 group-hover:scale-[1.15] group-active:scale-[1.15]",
              isSpotlight ? "w-full h-auto object-center" : "size-full object-cover object-top"
            )}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
            Preview unavailable
          </div>
        )}
      </div>

      {/* Content body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between gap-4">
        {/* Project Title */}
        <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary group-active:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-border/40 flex items-center gap-2">
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5 text-xs font-medium active:scale-[0.98]")}
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
                "gap-1.5 text-xs font-medium active:scale-[0.98]"
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

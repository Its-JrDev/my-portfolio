import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { type Project } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const base = import.meta.env.BASE_URL

interface CinematicProjectCardProps {
  project: Project
  priority?: boolean
  layout?: "compact" | "wide" | "spotlight"
}

export function CinematicProjectCard({
  project,
  priority = false,
  layout = "wide",
}: CinematicProjectCardProps) {
  const { t } = useTranslation()
  const imageSrc = project.image ? `${base}${project.image}` : undefined

  if (layout === "spotlight") {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-card/40 transition-colors duration-200 hover:border-[#ff6a00]">
        <div className="grid lg:grid-cols-12 gap-0 items-center">
          {/* Media Canvas (7 cols) - The clean visual core */}
          <div className="relative lg:col-span-7 overflow-hidden border-b lg:border-b-0 lg:border-r border-border/40">
            <AspectRatio ratio={16 / 9} className="w-full">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt={`${project.title} screenshot`}
                  loading={priority ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted/30">
                  <span className="text-muted-foreground font-mono text-xs">Preview</span>
                </div>
              )}
            </AspectRatio>
          </div>

          {/* Details & Links (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-normal text-xs py-0.5 px-2 bg-muted/60 text-muted-foreground border border-border/40"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {(project.deployUrl || project.githubUrl) && (
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-border/40">
                {project.deployUrl && (
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ size: "sm" })}
                  >
                    {t("live_demo")}
                    <IconExternalLink className="size-3.5 ml-1.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    <IconBrandGithub className="size-3.5 mr-1.5" />
                    {t("code")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Wide Bento Card (Sober, clean, media-focused)
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card/40 transition-colors duration-200 hover:border-[#ff6a00]">
      {/* Media Canvas */}
      <div className="relative overflow-hidden border-b border-border/40">
        <AspectRatio ratio={16 / 9} className="w-full">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={`${project.title} screenshot`}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/30">
              <span className="text-muted-foreground font-mono text-xs">Preview</span>
            </div>
          )}
        </AspectRatio>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-normal text-xs py-0.5 px-2 bg-muted/60 text-muted-foreground border border-border/40"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {(project.deployUrl || project.githubUrl) && (
          <div className="mt-6 flex items-center gap-2 pt-4 border-t border-border/40">
            {project.deployUrl && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "sm" }), "text-xs")}
              >
                {t("live_demo")}
                <IconExternalLink className="size-3.5 ml-1.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-xs")}
              >
                <IconBrandGithub className="size-3.5 mr-1.5" />
                {t("code")}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { IconBrandGithub, IconExternalLink, IconFileCode } from "@tabler/icons-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type Project } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"

const base = import.meta.env.BASE_URL

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const imageSrc = project.image ? `${base}${project.image}` : undefined

  return (
    <Card className="h-full overflow-hidden">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IconFileCode className="size-9 text-muted-foreground/60" />
          </div>
        )}
      </AspectRatio>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardContent>
      {project.deployUrl || project.githubUrl ? (
        <CardFooter className="flex-wrap gap-2">
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              {t("live_demo")}
              <IconExternalLink />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {t("code")}
              <IconBrandGithub />
            </a>
          )}
        </CardFooter>
      ) : null}
    </Card>
  )
}
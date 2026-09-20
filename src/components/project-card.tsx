import { CinematicProjectCard } from "./cinematic-project-card"
import { type Project } from "@/data/projects"

export function ProjectCard({
  project,
  priority = false,
  layout = "wide",
}: {
  project: Project
  priority?: boolean
  layout?: "compact" | "wide" | "spotlight"
}) {
  return <CinematicProjectCard project={project} priority={priority} layout={layout} />
}
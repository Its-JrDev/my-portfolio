/**
 * Skills section: a full-viewport (`min-h-svh`) force-physics graph.
 *
 * `SkillGraph` needs a container with resolved height. The wrapper carries
 * `flex-1 min-h-0` because `min-h-0` is what allows a flex child to shrink
 * below its content size — without it the graph would not constrain to the
 * section.
 *
 * The radial orange glow is an inline `style` object rather than a CSS class,
 * so it is not part of the `@layer components` rules in `index.css`.
 */
import { BlurFade } from "@/components/ui/blur-fade"
import { SkillGraph } from "@/components/ui/skill-graph"
import { useTranslation } from "@/lib/i18n"

export function Skills() {
  const { t } = useTranslation()

  return (
    <section
      id="skills"
      className="scroll-mt-16 relative h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] border-t border-border/40 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle radial glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,106,0,0.08) 0%, rgba(255,138,61,0.02) 45%, transparent 75%)",
        }}
      />

      <div className="relative flex flex-1 flex-col h-full mx-auto w-full max-w-7xl px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3 md:pt-6 md:pb-4 min-h-0 justify-between">
        {/* Section header: clean big title, no artificial kickers */}
        <div className="shrink-0 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <BlurFade>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t("skills_title")}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground text-sm sm:text-base">
              {t("skills_desc")}
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>{t("skills_hint")}</span>
            </div>
          </BlurFade>
        </div>

        {/* Graph — aligns with page X limits (max-w-7xl), tight vertical spacing, invisible container */}
        <BlurFade delay={0.15} className="mt-1 sm:mt-2 flex flex-1 min-h-0 w-full">
          <div className="w-full flex-1 flex flex-col justify-center min-h-0">
            <SkillGraph />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

import { BlurFade } from "@/components/ui/blur-fade"
import { SkillGraph } from "@/components/ui/skill-graph"
import { useTranslation } from "@/lib/i18n"

export function Skills() {
  const { t } = useTranslation()

  return (
    <section
      id="skills"
      className="relative min-h-svh border-t border-border/40 flex flex-col justify-between overflow-hidden"
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

      <div className="relative flex flex-1 flex-col mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        {/* Section header: clean big title, no artificial kickers */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <BlurFade>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {t("skills_title")}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg">
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

        {/* Graph — takes full prominence across remaining height */}
        <BlurFade delay={0.15} className="mt-8 flex flex-1 min-h-0">
          <div className="w-full flex-1 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-4 sm:p-6 shadow-2xl shadow-black/20 flex flex-col justify-center">
            <SkillGraph />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

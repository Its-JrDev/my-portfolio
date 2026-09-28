import { IconCode, IconLayersLinked, IconRocket } from "@tabler/icons-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { SKILLS } from "@/lib/site"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"

export function About() {
  const { t } = useTranslation()

  const STATS = [
    { label: t("stats_projects"), value: PROJECTS.length },
    { label: t("stats_skills"), value: SKILLS.length },
    { label: t("stats_satisfaction"), value: 100, suffix: "%" },
  ]

  const PILLARS = [
    {
      icon: IconCode,
      title: t("about_pillar_frontend_title"),
      description: t("about_pillar_frontend_desc"),
    },
    {
      icon: IconLayersLinked,
      title: t("about_pillar_fullstack_title"),
      description: t("about_pillar_fullstack_desc"),
    },
    {
      icon: IconRocket,
      title: t("about_pillar_perf_title"),
      description: t("about_pillar_perf_desc"),
    },
  ]

  return (
    <section id="about" className="border-t border-border/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Top Header & Bio Story */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Bio Section */}
          <div className="lg:col-span-7">
            <BlurFade>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {t("about_me")}
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
                {t("about_text")}
              </p>
            </BlurFade>
          </div>

          {/* Right Stats Strip */}
          <div className="lg:col-span-5">
            <BlurFade delay={0.1}>
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-md p-6 text-center shadow-lg shadow-black/5">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center">
                    <div className="flex items-baseline font-heading text-3xl font-bold text-foreground sm:text-4xl">
                      <NumberTicker value={stat.value} />
                      {stat.suffix && <span className="text-primary ml-0.5">{stat.suffix}</span>}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Core Pillars — clean, without icon packaging */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <BlurFade key={pillar.title} delay={0.15 + i * 0.08}>
                <div className="h-full rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors">
                  <Icon className="size-6 text-primary mb-3 stroke-[1.75]" />
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
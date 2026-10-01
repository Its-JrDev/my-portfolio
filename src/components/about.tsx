import { IconCode, IconLayersLinked, IconRocket } from "@tabler/icons-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { SKILLS } from "@/lib/site"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"

export function About() {
  const { t } = useTranslation()

  const STATS = [
    {
      label: t("stats_projects"),
      value: PROJECTS.length,
    },
    {
      label: t("stats_skills"),
      value: SKILLS.length,
    },
    {
      label: t("stats_satisfaction"),
      value: 100,
      suffix: "%",
    },
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

          {/* Right Stats Strip — Monumental Typographic with Interactive Accent & Border */}
          <div className="lg:col-span-5 self-center lg:self-end">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {STATS.map((stat, i) => (
                <BlurFade key={stat.label} delay={0.1 + i * 0.08}>
                  <div className="group flex flex-col border-l border-border/40 pl-4 sm:pl-6 py-2 transition-colors hover:border-primary/60">
                    <div className="flex items-baseline font-heading">
                      <NumberTicker
                        value={stat.value}
                        className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground"
                      />
                      {stat.suffix && (
                        <span className="ml-0.5 font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="mt-2.5 h-px w-6 bg-primary/40 transition-all duration-300 group-hover:w-10 group-hover:bg-primary/80" />
                    <p className="mt-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>

        {/* Core Pillars — clean cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <BlurFade key={pillar.title} delay={0.15 + i * 0.08}>
                <div className="h-full rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5 group">
                  <Icon className="size-6 text-primary mb-3 stroke-[1.75] transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
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
/**
 * Bio section: intro paragraph, three live counters and three discipline
 * pillars.
 *
 * The counters are derived rather than hardcoded — `PROJECTS.length` and
 * `SKILLS.length` come from the data modules, so they cannot drift out of
 * sync with the content. The third counter is a literal `100` with a `%`
 * suffix.
 *
 * Layout is a `lg:grid-cols-12` split: bio at `col-span-7`, stats at
 * `col-span-5`. Pillars sit in a separate `md:grid-cols-3` row below.
 *
 * `ABOUT_TEXT` from `lib/site.ts` is not imported here; the paragraph comes
 * from `t("about_text")` instead, and the two strings differ.
 */
import { IconCode, IconLayersLinked, IconRocket } from "@tabler/icons-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { SKILLS } from "@/lib/site"
import { PROJECTS } from "@/data/projects"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"

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
    <section id="about" className="scroll-mt-16 border-t border-border/40 py-20 md:py-28">
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

          {/* Right Stats Strip — uncontainerized, open layout */}
          <div className="lg:col-span-5 lg:pt-3">
            <BlurFade delay={0.1}>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 divide-x divide-border/30 text-center sm:text-left">
                {STATS.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex flex-col justify-center",
                      idx > 0 && "pl-4 sm:pl-6"
                    )}
                  >
                    <div className="flex items-baseline font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                      <NumberTicker value={stat.value} />
                      {stat.suffix && <span className="text-primary ml-0.5">{stat.suffix}</span>}
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
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
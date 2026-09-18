import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { SKILLS } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"
import { Skills } from "./skills"

export function About() {
  const { t } = useTranslation()
  const STATS = [
    { label: t("stats_projects"), value: 6 },
    { label: t("stats_skills"), value: SKILLS.length },
  ]
  return (
    <section id="about" className="border-t">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <BlurFade>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("about_me")}
              </h2>
              <p className="mt-4 text-muted-foreground">{t("about_text")}</p>
            </BlurFade>

            <BlurFade delay={0.1}>
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border bg-muted/40 p-6 text-center">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <NumberTicker
                      value={stat.value}
                      className="font-heading text-3xl font-semibold text-foreground sm:text-4xl"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
          <Skills />
        </div>
      </div>
    </section>
  )
}
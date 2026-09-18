import { BlurFade } from "@/components/ui/blur-fade"
import { SkillGraph } from "@/components/ui/skill-graph"
import { useTranslation } from "@/lib/i18n"

export function Skills() {
  const { t } = useTranslation()
  return (
    <BlurFade delay={0.15} className="lg:col-span-3">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{t("skills_subtitle")}</p>
        <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight">
          {t("skills_title")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("skills_desc")}
        </p>
        <div className="mt-6">
          <SkillGraph />
        </div>
      </div>
    </BlurFade>
  )
}

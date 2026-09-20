import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react"

import { BlurFade } from "@/components/ui/blur-fade"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SOCIALS } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

const SOCIAL_ICONS = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  Discord: IconBrandDiscord,
} as const

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="border-t border-border/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <BlurFade>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("contact_title")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("contact_desc")}{" "}
            <a
              href="mailto:jromero810@outlook.com"
              className="text-primary hover:underline hover:text-primary/80 font-medium transition-colors"
            >
              jromero810@outlook.com
            </a>
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {SOCIALS.map((social) => {
              const Icon =
                SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full border border-border/80 ring-0 hover:ring-0 group-hover:ring-0 transition-colors duration-200 group-hover:border-[#ff6a00]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" />
                        {social.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        {t("connect_on")} {social.label}.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              )
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
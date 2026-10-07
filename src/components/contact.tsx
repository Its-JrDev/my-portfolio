/**
 * Closing section: heading with a `mailto:` link, then a three-column grid of
 * social cards.
 *
 * Each card is an `<a>` wrapping a `Card`, highlighted on hover via
 * `group-hover:border-[#ff6a00]`. The accent is a literal, not the `--primary`
 * token.
 *
 * The email address is hardcoded in both the `href` and the link text.
 */
import { BlurFade } from "@/components/ui/blur-fade"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SOCIALS, SOCIAL_ICONS } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <BlurFade>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("contact_title")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("contact_desc")}{" "}
            <a
              href="mailto:jromero810@outlook.com"
              className="text-primary hover:underline hover:text-primary/80 active:underline active:text-primary/80 font-medium transition-colors"
            >
              jromero810@outlook.com
            </a>
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.label]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card variant="interactive" className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 group-hover:text-primary group-active:text-primary transition-colors">
                        <Icon className="size-4 text-primary transition-transform duration-300 group-hover:scale-110 group-active:scale-110" />
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
/**
 * Footer: copyright, social icons, tech line.
 *
 * Icons come from the shared `SOCIAL_ICONS` map in `lib/site.ts`, keyed by
 * `SOCIALS[].label`.
 */
import { SOCIALS, SOCIAL_ICONS, AUTHOR_NAME } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-6">
        <p>
          © {new Date().getFullYear()} {AUTHOR_NAME}
        </p>
        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => {
            const Icon = SOCIAL_ICONS[social.label]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            )
          })}
        </div>
        <p>{t("built_with")}</p>
      </div>
    </footer>
  )
}
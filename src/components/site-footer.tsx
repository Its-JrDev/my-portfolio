import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react"

import { SOCIALS, AUTHOR_NAME } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

const SOCIAL_ICONS = {
  GitHub: IconBrandGithub,
  LinkedIn: IconBrandLinkedin,
  Discord: IconBrandDiscord,
} as const

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row md:px-6">
        <p>
          © {new Date().getFullYear()} {AUTHOR_NAME}
        </p>
        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => {
            const Icon =
              SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
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
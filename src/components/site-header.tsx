import { useEffect, useState } from "react"
import { IconMenu } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { NAV_ITEMS, AUTHOR_ALIAS, SOCIALS, SOCIAL_ICONS } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

function navLabel(
  label: string,
  t: (key: "home" | "projects" | "skills_nav" | "contact_title" | "about_me") => string
) {
  switch (label) {
    case "Home":
      return t("home")
    case "About":
      return t("about_me")
    case "Skills":
      return t("skills_nav")
    case "Featured Projects":
    case "Projects":
      return t("projects")
    case "Contact":
      return t("contact_title")
    default:
      return label
  }
}

function LangSwitcher() {
  const { lang, setLang } = useTranslation()

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className="flex items-center rounded-lg border border-border/60 p-0.5"
    >
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground active:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState<string>("#hero")
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onSpy = () => {
      const pos = window.scrollY + 160
      let current = "#hero"
      for (const item of NAV_ITEMS) {
        if (item.href === "#hero") continue
        const el = document.querySelector(item.href)
        if (el && (el as HTMLElement).offsetTop <= pos) {
          current = item.href
        }
      }
      setActiveHref(current)
    }
    window.addEventListener("scroll", onSpy, { passive: true })
    onSpy()
    return () => window.removeEventListener("scroll", onSpy)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setActiveHref(href)
    if (href === "#hero" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      history.pushState(null, "", window.location.pathname)
    } else {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        history.pushState(null, "", href)
      }
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm"
          : "border-b-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-heading text-lg font-bold tracking-tight text-foreground hover:text-primary active:text-primary transition-colors"
        >
          {AUTHOR_ALIAS}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={buttonVariants({ variant: "ghost" })}
            >
              {navLabel(item.label, t as never)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground md:hidden"
                />
              }
            >
              <IconMenu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="border-border/60 pb-[env(safe-area-inset-bottom)]">
              <SheetHeader className="gap-1.5 pb-2 pr-12">
                <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
                <p className="font-heading text-lg font-bold tracking-tight text-foreground">
                  {AUTHOR_ALIAS}
                </p>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-2 shrink-0 rounded-full bg-primary animate-pulse" />
                  {t("status_available")}
                </p>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const active = activeHref === item.href
                  return (
                    <SheetClose
                      key={item.label}
                      render={
                        <a
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={(e) => {
                            setOpen(false)
                            handleNavClick(e, item.href)
                          }}
                          className={cn(
                            "flex min-h-10 items-center gap-3 px-1 text-base font-normal transition-colors",
                            active
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground active:text-foreground"
                          )}
                        />
                      }
                    >
                      <span className="flex-1">{navLabel(item.label, t as never)}</span>
                      <span
                        className={cn(
                          "size-1.5 rounded-full bg-primary transition-opacity",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </SheetClose>
                  )
                })}
              </nav>
              <SheetFooter className="gap-2 border-t border-border/40 px-4 py-2">
                <div className="flex items-center justify-center gap-1">
                  {SOCIALS.map((social) => {
                    const Icon = SOCIAL_ICONS[social.label]
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent active:text-primary"
                      >
                        <Icon className="size-4" />
                      </a>
                    )
                  })}
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

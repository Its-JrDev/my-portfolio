import { useEffect, useState } from "react"
import { IconMenu } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { NAV_ITEMS, AUTHOR_ALIAS } from "@/lib/site"
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
              : "text-muted-foreground hover:text-foreground"
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
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
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
          className="font-heading text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {AUTHOR_ALIAS}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(buttonVariants({ variant: "ghost" }), "text-sm font-medium")}
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
                  className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                />
              }
            >
              <IconMenu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{t("menu")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 mt-4" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <SheetClose
                    key={item.label}
                    render={
                      <a
                        href={item.href}
                        onClick={(e) => {
                          setOpen(false)
                          handleNavClick(e, item.href)
                        }}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "justify-start text-base"
                        )}
                      />
                    }
                  >
                    {navLabel(item.label, t as never)}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

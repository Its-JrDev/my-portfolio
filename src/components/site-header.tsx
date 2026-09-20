import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
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

const base = import.meta.env.BASE_URL

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-lg font-semibold"
        >
          <img src={`${base}cyber-icon.svg`} alt="" className="size-6" />
          {AUTHOR_ALIAS}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                isActive(item.to) && "bg-muted"
              )}
            >
              {item.label === "Home" ? t("home") : t("projects")}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
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
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <SheetClose
                    key={item.to}
                    render={
                      <Link
                        to={item.to}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "justify-start",
                          isActive(item.to) && "bg-muted"
                        )}
                      />
                    }
                  >
                    {item.label === "Home" ? t("home") : t("projects")}
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
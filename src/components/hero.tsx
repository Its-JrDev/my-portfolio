/**
 * Opening section. `min-h-[calc(100svh-4rem)]` subtracts the fixed header so
 * the hero fills exactly the remaining viewport.
 *
 * Two columns on `md` and above, stacked below. The right column holds the
 * Cyber Paladin SVG; the left holds the badge, animated headline, description
 * and two CTA buttons that scroll to `#projects` and `#contact`.
 *
 * `HeroBackground` stacks seven layers inside an `absolute -inset-y-16`
 * container: three blurred radial "clouds", a conic sheen, a pulsing halo, the
 * `TechNebulaCanvas` particle field, a vignette and a bottom fade. Paint order
 * is DOM order, so the canvas sits above the clouds and below the vignette.
 * All atmosphere layers use `mix-blend-mode: screen`, `will-change: transform`
 * and a `translate3d(0,0,0)` promotion.
 *
 * The section has no `id`. `NAV_ITEMS` points at `#hero`, so the header
 * intercepts that href and scrolls to `top: 0` rather than querying the DOM.
 *
 * The `AUTHOR_ROLE` badge and the `scroll` string in `ScrollCue` are hardcoded;
 * `hero_badge` and `scroll_down` exist in the dictionaries but are unused.
 */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TextAnimate } from "@/components/ui/text-animate"
import { TechNebulaCanvas } from "@/components/ui/tech-nebula"
import { AUTHOR_NAME, AUTHOR_ROLE } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

const base = import.meta.env.BASE_URL

function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-y-16 inset-x-0 overflow-hidden"
    >
      <div className="absolute inset-0 tech-cloud-a" />
      <div className="absolute inset-0 tech-cloud-b" />
      <div className="absolute inset-0 tech-cloud-c" />
      <div className="absolute inset-0 tech-sheen" />
      <div className="absolute inset-0 tech-halo" />
      <TechNebulaCanvas
        color="#ff6a00"
        accent="#ffd9a8"
        density={1.6}
        linkDistance={160}
        opacity={0.6}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 hero-vignette" />
      <div className="absolute inset-x-0 bottom-0 h-36 hero-fade" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />
    </div>
  )
}

function ScrollCue() {
  return (
    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce opacity-60 pointer-events-none">
      <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase">scroll</span>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-muted-foreground sm:w-4 sm:h-4">
        <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export function Hero() {
  const { t } = useTranslation()

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-svh flex flex-col justify-between pt-18 sm:pt-24 md:pt-24 lg:pt-16 pb-12 sm:pb-14 md:pb-14 overflow-hidden">
      <HeroBackground />

      {/* Main content */}
      <div className="relative flex flex-1 min-h-0 items-center w-full">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Text block */}
          <div className="flex flex-col justify-center gap-[clamp(0.85rem,2.8svh,2.25rem)] items-center text-center lg:items-start lg:text-left md:flex-1 min-w-0">
            <Badge variant="outline" className="text-xs tracking-widest uppercase">
              {AUTHOR_ROLE}
            </Badge>

            {/* Cyber Paladin — under Badge and above Jose D. Romero */}
            <div className="relative w-full max-w-64 sm:max-w-80 md:max-w-96 h-[28svh] min-h-[140px] max-h-[240px] sm:h-[34svh] sm:max-h-[280px] md:h-[38svh] md:max-h-[340px] flex items-center justify-center shrink-0 lg:hidden">
              <img
                src={`${base}cyber-paladin.svg`}
                alt="Cyber paladin illustration"
                className="size-full object-contain drop-shadow-2xl select-none"
              />
            </div>

            <TextAnimate
              as="h1"
              by="word"
              animation="blurInUp"
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight"
            >
              {AUTHOR_NAME}
            </TextAnimate>
            <p className="md:max-w-xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              <span className="sm:hidden">{t("hero_desc_short")}</span>
              <span className="hidden sm:inline">{t("hero_desc")}</span>
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start">
              <Button size="lg" className="w-full sm:w-auto h-10 px-6 text-sm [@media(min-height:700px)]:h-11 sm:h-11 md:h-12 md:px-8 md:text-base font-medium" onClick={scrollToProjects}>
                {t("view_projects")}
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-10 px-6 text-sm [@media(min-height:700px)]:h-11 sm:h-11 md:h-12 md:px-8 md:text-base font-medium" onClick={scrollToContact}>
                {t("get_in_touch")}
              </Button>
            </div>
          </div>

          {/* Desktop Art Box (>= lg) */}
          <div className="hidden lg:flex relative lg:flex-none lg:w-[26rem] xl:w-[28rem] lg:h-auto lg:shrink-0 items-center justify-center">
            <img
              src={`${base}cyber-paladin.svg`}
              alt="Cyber paladin illustration"
              className="w-full max-h-[58vh] xl:max-h-[62vh] object-contain drop-shadow-2xl select-none"
            />
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
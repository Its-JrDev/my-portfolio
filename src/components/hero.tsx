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
    <section className="relative h-svh min-h-svh max-h-svh flex flex-col justify-between pt-16 pb-12 sm:pb-14 overflow-hidden">
      <HeroBackground />

      {/* Main content — vertically centered and balanced, using full tablet Y expanse */}
      <div className="relative flex flex-1 min-h-0 items-center justify-center w-full">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:items-center md:gap-10 lg:gap-16">

          {/* Text block — prominent, balanced, and responsive */}
          <div className="max-w-xl lg:max-w-2xl text-center md:text-left flex-1 min-w-0">
            <Badge variant="outline" className="text-xs tracking-widest uppercase">
              {AUTHOR_ROLE}
            </Badge>

            {/* Cyber Paladin — on mobile, positioned directly below the badge tag and above H1 */}
            <div className="my-2.5 sm:my-3.5 flex justify-center md:hidden">
              <img
                src={`${base}cyber-paladin.svg`}
                alt="Cyber paladin illustration"
                className="w-44 sm:w-56 max-h-[22vh] sm:max-h-[26vh] object-contain drop-shadow-2xl select-none"
              />
            </div>

            <TextAnimate
              as="h1"
              by="word"
              animation="blurInUp"
              className="mt-2.5 sm:mt-3 md:mt-5 lg:mt-6 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight"
            >
              {AUTHOR_NAME}
            </TextAnimate>
            <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 max-w-lg md:max-w-xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
              {t("hero_desc")}
            </p>
            <div className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start">
              <Button size="lg" className="h-10 sm:h-11 md:h-12 lg:h-13 px-5 sm:px-7 md:px-8 text-xs sm:text-sm md:text-base font-medium" onClick={scrollToProjects}>
                {t("view_projects")}
              </Button>
              <Button variant="outline" size="lg" className="h-10 sm:h-11 md:h-12 lg:h-13 px-5 sm:px-7 md:px-8 text-xs sm:text-sm md:text-base font-medium" onClick={scrollToContact}>
                {t("get_in_touch")}
              </Button>
            </div>
          </div>

          {/* Cyber Paladin — tablet and desktop side column taking full advantage of Y viewport */}
          <div className="shrink-0 hidden md:flex items-center justify-center">
            <img
              src={`${base}cyber-paladin.svg`}
              alt="Cyber paladin illustration"
              className="w-72 md:w-80 lg:w-[26rem] xl:w-[28rem] md:max-h-[50vh] lg:max-h-[58vh] xl:max-h-[62vh] object-contain drop-shadow-2xl select-none"
            />
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
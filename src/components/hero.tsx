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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-40 pointer-events-none">
      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">scroll</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
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
    <section className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-center overflow-hidden">
      <HeroBackground />

      {/* Main content — vertically centered and balanced */}
      <div className="relative flex flex-1 items-center py-12 md:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row md:gap-14 lg:gap-20">

          {/* Text block — prominent and well-proportioned */}
          <div className="max-w-2xl text-center md:text-left">
            <Badge variant="outline" className="text-xs tracking-widest uppercase">
              {AUTHOR_ROLE}
            </Badge>
            <TextAnimate
              as="h1"
              by="word"
              animation="blurInUp"
              className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            >
              {AUTHOR_NAME}
            </TextAnimate>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              {t("hero_desc")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Button size="lg" className="h-12 px-8 text-base font-medium" onClick={scrollToProjects}>
                {t("view_projects")}
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium" onClick={scrollToContact}>
                {t("get_in_touch")}
              </Button>
            </div>
          </div>

          {/* Cyber Paladin — nicely balanced size, not oversized */}
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={`${base}cyber-paladin.svg`}
              alt="Cyber paladin illustration"
              className="w-56 sm:w-72 md:w-80 lg:w-[24rem] xl:w-[27rem] max-h-[46vh] object-contain drop-shadow-2xl select-none"
            />
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
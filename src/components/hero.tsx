import { Link } from "react-router-dom"
import { IconArrowRight } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { TextAnimate } from "@/components/ui/text-animate"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Floating3DParticles } from "@/components/ui/floating-3d-particles"
import { GlyphMatrix } from "@/components/ui/glyph-matrix"
import { HexagonPattern } from "@/components/ui/hexagon-pattern"
import { LightRays } from "@/components/ui/light-rays"
import { Meteors } from "@/components/ui/meteors"
import { NoiseTexture } from "@/components/ui/noise-texture"
import { StardustCanvas } from "@/components/ui/stardust"
import { TechNebulaCanvas } from "@/components/ui/tech-nebula"
import { Ripple } from "@/components/ui/ripple"
import { WarpBackground } from "@/components/ui/warp-background"
import { StripedPattern } from "@/components/magicui/striped-pattern"
import { HERO_BG } from "@/lib/hero-background"
import { AUTHOR_NAME, AUTHOR_ROLE } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

const base = import.meta.env.BASE_URL

function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {HERO_BG === "aurora" && (
        <>
          <div className="absolute -left-16 -top-24 size-96 rounded-full bg-[#ff6a00]/25 blur-[100px]" />
          <div className="absolute -right-20 top-10 size-[28rem] rounded-full bg-[#ff8a3d]/20 blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-[#c2410c]/25 blur-[100px]" />
          <div className="absolute left-1/4 top-1/3 size-64 rounded-full bg-[#ffd9a8]/10 blur-[120px]" />
          <NoiseTexture className="opacity-40 dark:opacity-50" />
        </>
      )}
      {HERO_BG === "rays" && (
        <LightRays
          color="rgba(255, 106, 0, 0.35)"
          count={9}
          blur={40}
          speed={16}
          length="75vh"
        />
      )}
      {HERO_BG === "dots" && (
        <DotPattern
          width={24}
          height={24}
          cr={1.3}
          glow
          className="text-[#ff6a00]/50 [mask-image:radial-gradient(600px_circle_at_center,black,transparent)]"
        />
      )}
      {HERO_BG === "particles" && (
        <Floating3DParticles
          color="#ff6a00"
          quantity={300}
          size={3}
          opacity={0.45}
          depth={0.55}
        />
      )}
      {HERO_BG === "meteors" && <Meteors number={26} color="#ff9a5c" />}
      {HERO_BG === "ripple" && (
        <Ripple
          mainCircleSize={260}
          numCircles={10}
          color="#ff6a00"
          className="[mask-image:radial-gradient(700px_circle_at_center,black,transparent)]"
        />
      )}
      {HERO_BG === "glyphs" && (
        <div className="absolute inset-0 opacity-50 [mask-image:radial-gradient(700px_circle_at_center,black,transparent)]">
          <GlyphMatrix
            glyphs="01"
            color="#ff6a00"
            cellSize={22}
            mutationRate={0.05}
            interval={70}
            fadeBottom={0.4}
          />
        </div>
      )}
      {HERO_BG === "hexagons" && (
        <HexagonPattern
          radius={56}
          gap={16}
          className="fill-transparent stroke-[#ff6a00]/25 [mask-image:radial-gradient(700px_circle_at_center,black,transparent)]"
        />
      )}
      {HERO_BG === "stripes" && (
        <StripedPattern
          direction="left"
          width={32}
          height={32}
          className="opacity-70 text-[#ff6a00]/25 [mask-image:radial-gradient(700px_circle_at_center,black,transparent)]"
        />
      )}
      {HERO_BG === "warp" && (
        <WarpBackground
          className="size-full rounded-none border-0 p-0 opacity-70"
          gridColor="rgba(255,106,0,0.16)"
          beamColor="#ff8a3d"
          beamsPerSide={4}
          beamDuration={4}
        >
          <span className="sr-only" />
        </WarpBackground>
      )}
      {HERO_BG === "nebula" && (
        <>
          <div className="absolute inset-0 animate-[nebula-drift_30s_ease-in-out_infinite_alternate] bg-[radial-gradient(40%_50%_at_20%_30%,rgba(255,106,0,0.28),transparent_70%),radial-gradient(35%_45%_at_80%_25%,rgba(255,138,61,0.22),transparent_70%),radial-gradient(45%_50%_at_60%_80%,rgba(194,65,12,0.25),transparent_70%)]" />
          <svg className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <pattern
                id="nebula-stars"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="14" r="1" fill="rgba(255,217,168,0.7)" />
                <circle cx="42" cy="6" r="1.4" fill="rgba(255,217,168,0.8)" />
                <circle cx="70" cy="32" r="0.9" fill="rgba(255,217,168,0.6)" />
                <circle cx="24" cy="48" r="1.1" fill="rgba(255,217,168,0.7)" />
                <circle cx="58" cy="66" r="1.3" fill="rgba(255,217,168,0.8)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nebula-stars)" />
          </svg>
          <NoiseTexture className="opacity-40 dark:opacity-50" />
        </>
      )}
      {HERO_BG === "gas" && (
        <>
          <div className="absolute inset-0 gas-cloud-primary" />
          <div className="absolute inset-0 gas-cloud-secondary" />
          <div className="absolute inset-0 gas-cloud-overlay" />
        </>
      )}
      {HERO_BG === "stardust" && (
        <>
          <div className="absolute inset-0 plasma-core" />
          <div className="absolute inset-0 plasma-nebula" />
          <div className="absolute inset-0 tech-stardust" />
        </>
      )}
      {HERO_BG === "clouds" && (
        <>
          <div className="absolute inset-0 hero-cloud-a" />
          <div className="absolute inset-0 hero-cloud-b" />
          <div className="absolute inset-0 hero-cloud-c" />
          <div className="absolute inset-0">
            <div className="hero-filament f1" />
            <div className="hero-filament f2" />
          </div>
          <StardustCanvas color="#ffd9a8" density={0.9} />
          <div className="absolute inset-0 hero-vignette" />
          <div className="absolute inset-x-0 bottom-0 h-48 hero-fade" />
        </>
      )}
      {HERO_BG === "technebula" && (
        <>
          <div className="absolute inset-0 tech-cloud-a" />
          <div className="absolute inset-0 tech-cloud-b" />
          <div className="absolute inset-0 tech-cloud-c" />
          <div className="absolute inset-0 tech-sheen" />
          <div className="absolute inset-0 tech-halo" />
          <TechNebulaCanvas
            color="#ff6a00"
            accent="#ffd9a8"
            density={1.8}
            linkDistance={160}
            opacity={0.6}
          />
          <div className="absolute inset-0 hero-vignette" />
          <div className="absolute inset-x-0 bottom-0 h-48 hero-fade" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  )
}

export function Hero() {
  const { t } = useTranslation()

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-16 md:flex-row md:justify-between md:px-6 md:py-24">
        <div className="max-w-2xl text-center md:text-left">
          <Badge variant="outline">{AUTHOR_ROLE}</Badge>
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {AUTHOR_NAME}
          </TextAnimate>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {t("hero_desc")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link to="/projects" className={buttonVariants({ size: "lg" })}>
              {t("view_projects")}
              <IconArrowRight />
            </Link>
            <Button variant="outline" size="lg" onClick={scrollToContact}>
              {t("get_in_touch")}
            </Button>
          </div>
        </div>
        <img
          src={`${base}cyber-paladin.svg`}
          alt="Cyber paladin illustration"
          className="w-56 sm:w-72 lg:w-80"
        />
      </div>
    </section>
  )
}
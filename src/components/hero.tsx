import { Link } from "react-router-dom"
import { IconArrowRight } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { TextAnimate } from "@/components/ui/text-animate"
import { TechNebulaCanvas } from "@/components/ui/tech-nebula"
import { AUTHOR_NAME, AUTHOR_ROLE } from "@/lib/site"
import { useTranslation } from "@/lib/i18n"

const base = import.meta.env.BASE_URL

function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
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
          className="w-48 sm:w-72 lg:w-80"
        />
      </div>
    </section>
  )
}
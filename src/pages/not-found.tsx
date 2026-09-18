import { Link } from "react-router-dom"
import { IconArrowLeft } from "@tabler/icons-react"

import { Seo } from "@/components/seo"
import { SparklesText } from "@/components/ui/sparkles-text"
import { buttonVariants } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"

const base = import.meta.env.BASE_URL

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={`${t("not_found")} | Jose D. Romero`}
        description={t("not_found_desc")}
      />
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 px-4 py-24 text-center md:px-6">
        <SparklesText sparklesCount={8}>404</SparklesText>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {t("not_found")}
        </h1>
        <p className="max-w-md text-muted-foreground">
          {t("not_found_desc")}
        </p>
        <Link to="/" className={buttonVariants()}>
          <IconArrowLeft />
          {t("back_home")}
        </Link>
        <img
          src={`${base}cyber-paladin.svg`}
          alt=""
          className="mt-4 w-48 opacity-80"
        />
      </section>
    </>
  )
}
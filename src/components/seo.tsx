import { SITE_URL, AUTHOR_ALIAS } from "@/lib/site"

interface SeoProps {
  title: string
  description: string
  path?: string
}

export function Seo({ title, description, path = "/" }: SeoProps) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}#${path}`
  const image = `${SITE_URL}og-image.png`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={AUTHOR_ALIAS} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
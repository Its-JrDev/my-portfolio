/**
 * Document head metadata: title, description, canonical, Open Graph and Twitter
 * Card tags. Emits no visual output; React 19 hoists it into `<head>`.
 *
 * Canonical and `og:url` both resolve to `SITE_URL`, the deployed root.
 *
 * The image is `public/og-image.png`. `og-image.svg` is the source it was
 * exported from.
 */
import { SITE_URL, AUTHOR_ALIAS } from "@/lib/site"

interface SeoProps {
  title: string
  description: string
}

export function Seo({ title, description }: SeoProps) {
  const image = `${SITE_URL}og-image.png`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={AUTHOR_ALIAS} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
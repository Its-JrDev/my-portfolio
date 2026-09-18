export type HeroBackground =
  | "aurora"
  | "rays"
  | "dots"
  | "particles"
  | "meteors"
  | "ripple"
  | "glyphs"
  | "hexagons"
  | "stripes"
  | "warp"
  | "nebula"
  | "gas"
  | "stardust"
  | "clouds"
  | "technebula"

/**
 * Fondo del hero — cambia este valor para probar las variantes:
 *
 *  - "aurora"     → blobs naranjas difuminados + grano de película
 *  - "rays"       → rayos de luz naranja animados
 *  - "dots"       → patrón de puntos con glow naranja
 *  - "particles"  → campo de partículas flotantes 3D naranjas
 *  - "meteors"    → estrellas fugaces naranjas
 *  - "ripple"     → ondas/ripples concéntricas naranjas
 *  - "glyphs"     → matrix de glifos "01" naranja (cyber)
 *  - "hexagons"   → panal de hexágonos naranja sutil
 *  - "stripes"    → rayado diagonal naranja sutil
 *  - "warp"       → túnel de rejilla 3D con haces de luz naranja
 *  - "nebula"     → nebulosa ámbar propia con estrellas
 *  - "gas"        → nubes de gas orgánicas (blur + deriva + rotación)
 *  - "stardust"   → núcleo de plasma + polvo de estrellas nítido
 *  - "clouds"     → nubes + filamentos + stardust canvas + viñeta + fade
 *  - "technebula" → nebulosa tech moderna: nubes intensas + sheen cónico + beams + red de constelación (recomendado)
 */
export const HERO_BG: HeroBackground = "technebula"
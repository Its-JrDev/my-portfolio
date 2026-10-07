import type { MotionValue } from "motion/react"
import { useScroll, useSpring, useTransform } from "motion/react"

/**
 * Scroll range, in pixels, over which the header background fades in.
 *
 * 0 at the top of the document, 1 once the user has scrolled 40px. The mapping
 * is linear on purpose: `useSpring` supplies the entire easing characteristic,
 * and adding a curve to the mapping as well compounds the delay.
 */
const FADE_START = 0
const FADE_END = 40

/**
 * Spring parameters for the header background.
 *
 * `stiffness` 180 with `damping` 27 and `mass` 1 gives a damping ratio of
 * 1.006 — marginally above critical, so there is no overshoot. Natural period
 * is 468ms.
 *
 * Measured opacity response from a step input:
 *
 * | 100ms | 200ms | 300ms | 400ms | 500ms | 600ms |
 * |-------|-------|-------|-------|-------|-------|
 * | 0.39  | 0.75  | 0.91  | 0.97  | 0.99  | 1.00  |
 *
 * To retune, keep `damping` near `2 * sqrt(stiffness * mass)` or the spring
 * starts oscillating past full opacity. Raising `stiffness` settles faster.
 */
const SPRING = { stiffness: 180, damping: 27, mass: 1 }

/**
 * Scroll-linked opacity for the header background layer.
 *
 * Returns a `MotionValue<number>` between 0 and 1. The value is bound to
 * `style.opacity` in `site-header.tsx`, which mutates the DOM through motion's
 * frame loop — no React re-render occurs on any scroll frame.
 *
 * The chain is `window.scrollY` → linear map to `[0, 1]` → spring → consumer.
 *
 * Design notes:
 *
 * - The target saturates at 40px, so the spring's job is purely the visual
 *   settle, not tracking scroll position. A trackpad flick past 40px still
 *   takes roughly 450ms to become fully opaque.
 * - `useSpring` initialises from the source's current value, so a mid-page
 *   reload with restored scroll position does not animate the header in.
 * - `prefers-reduced-motion` is not honoured here.
 */
export function useHeaderScroll(): MotionValue<number> {
  const { scrollY } = useScroll()
  const target = useTransform(scrollY, [FADE_START, FADE_END], [0, 1])

  return useSpring(target, SPRING)
}

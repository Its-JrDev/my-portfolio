import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const MAX_DPR = 2

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const expanded =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h
  const n = parseInt(expanded, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

interface TechNebulaProps extends React.HTMLAttributes<HTMLCanvasElement> {
  color?: string
  accent?: string
  density?: number
  linkDistance?: number
  opacity?: number
}

export function TechNebulaCanvas({
  color = "#ff8a3d",
  accent = "#ffd9a8",
  density = 1,
  linkDistance = 150,
  opacity = 0.45,
  className,
  ...props
}: TechNebulaProps) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const [r1, g1, b1] = hexToRgb(color)
    const [r2, g2, b2] = hexToRgb(accent)

    let width = 0
    let height = 0
    let raf = 0
    let paused = false
    let running = false

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    type Node = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      tw: number
      ph: number
      core: boolean
    }
    let nodes: Node[] = []

    const spawn = () => {
      const viewportScale =
        typeof window !== "undefined" && window.innerWidth < 640 ? 0.5 : 1
      const count = Math.max(
        40,
        Math.floor(((width * height) / 7000) * density * viewportScale)
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 0.7 + Math.random() * 2.1,
        tw: 0.8 + Math.random() * 3.2,
        ph: Math.random() * Math.PI * 2,
        core: Math.random() < 0.35,
      }))
    }

    const resize = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, MAX_DPR))
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
      if (reducedMotion && !running) {
        running = true
        draw(0)
        running = false
      }
    }

    const draw = (t: number) => {
      if (paused || document.hidden) {
        raf = requestAnimationFrame(draw)
        return
      }
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -10) n.x = width + 10
        if (n.x > width + 10) n.x = -10
        if (n.y < -10) n.y = height + 10
        if (n.y > height + 10) n.y = -10
      }

      const d2 = linkDistance * linkDistance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < d2) {
            const alpha = (1 - dist2 / d2) * 0.17 * opacity
            ctx.strokeStyle = `rgba(${r1}, ${g1}, ${b1}, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        const twinkle = 0.6 + 0.4 * Math.sin(time * n.tw + n.ph)

        if (n.core) {
          const a = (0.45 + 0.55 * twinkle) * opacity
          ctx.globalAlpha = a
          ctx.fillStyle = `rgba(${r1}, ${g1}, ${b1}, 1)`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = `rgba(${r2}, ${g2}, ${b2}, 1)`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 0.5, 0, Math.PI * 2)
          ctx.fill()
        } else {
          const a = (0.18 + 0.32 * twinkle) * opacity
          ctx.globalAlpha = a
          ctx.fillStyle = `rgba(${r2}, ${g2}, ${b2}, 1)`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    if (!reducedMotion) {
      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            paused = !entry.isIntersecting
          })
        : null
    if (io) io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io?.disconnect()
    }
  }, [color, accent, density, linkDistance, opacity])

  return (
    <canvas
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 size-full opacity-70",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}
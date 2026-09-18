import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface StardustCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  color?: string
  density?: number
}

export function StardustCanvas({
  color = "#ffffff",
  density = 1,
  className,
  ...props
}: StardustCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0

    type Star = {
      x: number
      y: number
      r: number
      baseAlpha: number
      phase: number
      speed: number
      drift: number
    }
    let stars: Star[] = []

    const spawn = () => {
      const count = Math.max(
        40,
        Math.floor(((width * height) / 9000) * density)
      )
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.2,
        baseAlpha: 0.15 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.6,
        drift: 0.02 + Math.random() * 0.06,
      }))
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000
      for (const s of stars) {
        s.y -= s.drift
        if (s.y < -2) {
          s.y = height + 2
          s.x = Math.random() * width
        }
        const a =
          s.baseAlpha * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase))
        ctx.globalAlpha = a
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [color, density])

  return (
    <canvas
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      aria-hidden="true"
      {...props}
    />
  )
}
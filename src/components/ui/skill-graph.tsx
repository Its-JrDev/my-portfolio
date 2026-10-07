/**
 * Interactive force-physics graph of the skill set, used by the Skills
 * section. Hand-written rather than registry-generated.
 *
 * Renders to DOM and SVG, not canvas: nodes are absolutely positioned `div`
 * elements and edges are `<line>` elements in a full-bleed SVG beneath them.
 *
 * d3-force without d3-selection. The simulation is created once and held in a
 * ref; its `tick` handler mutates `node.ref.style.transform` and
 * `edge.ref.setAttribute(...)` directly, so the layout runs with zero React
 * re-renders per frame.
 *
 * Forces: `forceLink` (distance 160, strength 0.6), `forceManyBody`
 * (strength -260), `forceCenter`, `forceCollide` (radius scaled by graph
 * degree, strength 0.9) and weak `forceX` / `forceY` pull at 0.07. Simulation
 * starts at `alpha` 1, decays with `alphaMin` 0.01 and `velocityDecay` 0.9.
 *
 * Drag uses Pointer Events with `setPointerCapture`, writing `node.fx` /
 * `node.fy`. Dragging raises `alphaTarget` to 0.3 so the field stays live
 * under the pointer, and drops it to `REST_ALPHA_TARGET` (0.0001 — not 0, so
 * the layout micro-settles) on release. Positions are clamped to
 * `clamp(width * 0.1, 24, 60)` every tick.
 *
 * Node diameter comes from graph degree (28 / 32 / 36 px). `ResizeObserver`
 * rescales, guarded by `appliedSizeRef` so sub-pixel changes do not reheat
 * the simulation. Hover dims non-adjacent nodes and shows a tooltip that
 * flips placement past the vertical midpoint.
 *
 * Not implemented: zoom, pan, and `prefers-reduced-motion` handling.
 */
import { useEffect, useRef, useState } from "react"
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationNodeDatum,
} from "d3-force"

import { SKILL_EDGES, SKILLS } from "@/lib/site"
import { useTranslation, type Translations } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const WIDTH_RATIO = 640
const HEIGHT_RATIO = 400
const REST_ALPHA_TARGET = 0.0001
const DRAG_ALPHA_TARGET = 0.3

type GraphNode = SimulationNodeDatum & {
  id: (typeof SKILLS)[number]["id"]
  label: string
  description: string
  ref: HTMLDivElement | null
}

type GraphLink = {
  source: GraphNode | string
  target: GraphNode | string
  fromId: string
  toId: string
  ref: SVGLineElement | null
}

const NODES: GraphNode[] = SKILLS.map((skill) => ({
  ...skill,
  x: 0,
  y: 0,
  ref: null,
}))

const EDGES: GraphLink[] = SKILL_EDGES.map(([from, to]) => ({
  source: from,
  target: to,
  fromId: from,
  toId: to,
  ref: null,
}))

const NEIGHBORS = (() => {
  const map = new Map<string, Set<string>>()
  for (const edge of EDGES) {
    if (!map.has(edge.fromId)) map.set(edge.fromId, new Set())
    if (!map.has(edge.toId)) map.set(edge.toId, new Set())
    map.get(edge.fromId)!.add(edge.toId)
    map.get(edge.toId)!.add(edge.fromId)
  }
  return map
})()

/** Degree (number of edges) per node id */
const DEGREE = new Map<string, number>(
  NODES.map((n) => [n.id, NEIGHBORS.get(n.id)?.size ?? 0])
)

/** Map degree → node visual size in px (size-7=28, size-8=32, size-9=36) */
function nodeSize(id: string): number {
  const deg = DEGREE.get(id) ?? 1
  if (deg >= 5) return 36  // size-9
  if (deg >= 3) return 32  // size-8
  return 28                // size-7
}

/** Inner dot inset relative to container */
function dotInset(id: string): string {
  const deg = DEGREE.get(id) ?? 1
  if (deg >= 3) return "6px"
  return "5px"
}

/** Halo outset — proportional to node size */
function haloInset(id: string): string {
  const deg = DEGREE.get(id) ?? 1
  if (deg >= 5) return "-10px"
  if (deg >= 3) return "-8px"
  return "-6px"
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

/** Container-side horizontal clamp margin — aligns nodes cleanly within page grid */
function xMargin(width: number): number {
  return clamp(width * 0.035, 24, 44)
}

/** Container-side vertical clamp margin — snug fit */
function yMargin(height: number): number {
  return clamp(height * 0.045, 14, 26)
}

/** Scale factor for node sizes on small containers */
function nodeScale(width: number): number {
  return width < 480 ? 0.85 : 1
}

export function SkillGraph() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  const sizeRef = useRef<{ width: number; height: number } | null>(null)
  const startedOnce = useRef(false)
  const dragRef = useRef<{ node: GraphNode; pointerId: number } | null>(null)
  const simRef = useRef<Simulation<GraphNode, undefined> | null>(null)
  const appliedSizeRef = useRef<{ width: number; height: number } | null>(null)

  useEffect(() => {
    sizeRef.current = size
  }, [size])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) {
        setSize({ width: Math.round(width), height: Math.round(height) })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!size) return
    const { width, height } = size
    const cx = width / 2
    const cy = height / 2
    const linkDistance = clamp(Math.min(width, height) * 0.32, width < 480 ? 70 : 90, 160)
    const scale = nodeScale(width)

    const applySize = (sim: Simulation<GraphNode, undefined>) => {
      sim
        .force(
          "link",
          forceLink<GraphNode, GraphLink>(EDGES)
            .id((d) => d.id)
            .distance(linkDistance)
            .strength(0.6)
        )
        .force("center", forceCenter(cx, cy))
        .force("x", forceX<GraphNode>(cx).strength(0.07))
        .force("y", forceY<GraphNode>(cy).strength(0.07))
        .alpha(0.5)
        .restart()
    }

    if (simRef.current) {
      if (
        (appliedSizeRef.current?.width ?? 0) === Math.round(width) &&
        (appliedSizeRef.current?.height ?? 0) === Math.round(height)
      ) {
        return
      }
      appliedSizeRef.current = { width: Math.round(width), height: Math.round(height) }
      applySize(simRef.current)
      return
    }

    appliedSizeRef.current = { width: Math.round(width), height: Math.round(height) }

    for (const node of NODES) {
      node.x = cx + (Math.random() - 0.5) * width * 0.5
      node.y = cy + (Math.random() - 0.5) * height * 0.5
      node.vx = 0
      node.vy = 0
      node.fx = undefined
      node.fy = undefined
    }

    const sim = forceSimulation<GraphNode>(NODES)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(EDGES)
          .id((d) => d.id)
          .distance(linkDistance)
          .strength(0.6)
      )
      .force("charge", forceManyBody<GraphNode>().strength(-260))
      .force("center", forceCenter(cx, cy))
      .force("collide", forceCollide<GraphNode>().radius((d) => (nodeSize(d.id) * scale) / 2 + 18).strength(0.9))
      .force("x", forceX<GraphNode>(cx).strength(0.07))
      .force("y", forceY<GraphNode>(cy).strength(0.07))
      .alpha(1)
      .alphaMin(0.01)
      .alphaTarget(0)
      .velocityDecay(0.9)
      .on("tick", () => {
        if (!startedOnce.current) {
          startedOnce.current = true
          setStarted(true)
        }
        const w = sizeRef.current?.width ?? WIDTH_RATIO
        const h = sizeRef.current?.height ?? HEIGHT_RATIO
        const xMarg = xMargin(w)
        const yMarg = yMargin(h)
        for (const node of NODES) {
          if (typeof node.x === "number") {
            node.x = clamp(node.x, xMarg, w - xMarg)
          }
          if (typeof node.y === "number") {
            node.y = clamp(node.y, yMarg, h - yMarg)
          }

          if (
            node.ref &&
            typeof node.x === "number" &&
            typeof node.y === "number"
          ) {
            node.ref.style.transform = `translate(${node.x}px, ${node.y}px)`
          }
        }
        for (const edge of EDGES) {
          if (!edge.ref) continue
          const source = edge.source as GraphNode
          const target = edge.target as GraphNode
          if (typeof source.x === "number" && typeof source.y === "number") {
            edge.ref.setAttribute("x1", String(source.x))
            edge.ref.setAttribute("y1", String(source.y))
          }
          if (typeof target.x === "number" && typeof target.y === "number") {
            edge.ref.setAttribute("x2", String(target.x))
            edge.ref.setAttribute("y2", String(target.y))
          }
        }
      })

    simRef.current = sim
    return () => {
      sim.stop()
      simRef.current = null
    }
  }, [size])

  const startDrag = (event: React.PointerEvent<HTMLDivElement>, node: GraphNode) => {
    event.stopPropagation()
    dragRef.current = { node, pointerId: event.pointerId }
    event.currentTarget.setPointerCapture(event.pointerId)
    setHovered(node.id)
    simRef.current?.alphaTarget(DRAG_ALPHA_TARGET).restart()
  }

  const moveDrag = (event: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag || event.pointerId !== drag.pointerId) return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const w = sizeRef.current?.width ?? WIDTH_RATIO
    const h = sizeRef.current?.height ?? HEIGHT_RATIO
    const xMarg = xMargin(w)
    const yMarg = yMargin(h)
    drag.node.fx = clamp(event.clientX - rect.left, xMarg, w - xMarg)
    drag.node.fy = clamp(event.clientY - rect.top, yMarg, h - yMarg)
  }

  const endDrag = (event: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag || event.pointerId !== drag.pointerId) return
    drag.node.fx = undefined
    drag.node.fy = undefined
    dragRef.current = null
    simRef.current?.alphaTarget(REST_ALPHA_TARGET).restart()
  }

  const hoveredNeighbors = hovered ? NEIGHBORS.get(hovered) : undefined

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-0 select-none"
    >
      {/* Lines under nodes */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {EDGES.map((edge) => {
          const connected =
            hovered !== null &&
            (edge.fromId === hovered || edge.toId === hovered)
          return (
            <line
              key={`${edge.fromId}-${edge.toId}`}
              ref={(el) => {
                edge.ref = el
              }}
              x1={0}
              y1={0}
              x2={0}
              y2={0}
              stroke="currentColor"
              strokeWidth={connected ? 2.2 : 1.25}
              strokeLinecap="round"
              style={{ opacity: started ? 1 : 0 }}
              className={cn(
                hovered
                  ? connected
                    ? "text-primary/80"
                    : "text-muted-foreground/15"
                  : "text-muted-foreground/40"
              )}
            />
          )
        })}
      </svg>

      {/* Nodes above lines */}
      {NODES.map((node) => {
        const isDim =
          hovered !== null &&
          hovered !== node.id &&
          !hoveredNeighbors?.has(node.id)
        const vis = nodeSize(node.id) * nodeScale(size?.width ?? 0)
        const hit = Math.max(44, vis)
        const w = size?.width ?? WIDTH_RATIO
        const tipBelow = (node.y ?? 0) < (size?.height ?? HEIGHT_RATIO) / 2
        const xPos =
          (node.x ?? 0) < 130
            ? "left"
            : (node.x ?? 0) > w - 130
              ? "right"
              : "center"
        const localizedDesc = t(`skill_${node.id}` as keyof Translations) || node.description
        return (
          <div
            key={node.id}
            ref={(el) => {
              node.ref = el
            }}
            onPointerDown={(event) => startDrag(event, node)}
            onPointerMove={moveDrag}
            onPointerUp={(event) => {
              endDrag(event)
              const rect = event.currentTarget.getBoundingClientRect()
              const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
              if (!inside) {
                setHovered((h) => (h === node.id ? null : h))
              }
            }}
            onPointerLeave={() => {
              if (dragRef.current) return
              setHovered((h) => (h === node.id ? null : h))
            }}
            onPointerEnter={() => {
              if (dragRef.current && dragRef.current.node.id !== node.id) return
              setHovered(node.id)
            }}
            style={{ left: 0, top: 0, opacity: started ? 1 : 0 }}
            className={cn(
              "absolute touch-none cursor-grab transition-opacity duration-300 active:cursor-grabbing z-10",
              hovered === node.id && "z-50"
            )}
          >
            <div
              className="relative grid -translate-x-1/2 -translate-y-1/2 place-items-center"
              style={{ width: hit, height: hit }}
            >
              <div
                className="relative"
                style={{ width: vis, height: vis }}
              >
              {/* Halo mayor (outer boundary, expands and contracts to its limit) */}
              <div
                className={cn(
                  "absolute rounded-full border border-primary/40 bg-primary/10 transition-opacity duration-300 ease-out",
                  hovered === node.id ? "opacity-100 animate-halo-breathe" : "opacity-0"
                )}
                style={{
                  inset: haloInset(node.id),
                }}
              />
              {/* Halo intermedio (middle halo, expands and contracts to its limit with original opacity) */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300",
                  hovered === node.id ? "opacity-100 animate-halo-breathe" : "opacity-0"
                )}
                style={{
                  backgroundColor: "color-mix(in oklab, var(--primary) 15%, transparent)",
                }}
              />
              {/* Dot — solid, no transparency */}
              <div
                className="absolute rounded-full transition-all duration-300"
                style={{
                  inset: dotInset(node.id),
                  backgroundColor: isDim
                    ? "var(--muted)"
                    : hovered === node.id
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                  boxShadow: hovered === node.id
                    ? "0 0 18px color-mix(in oklab, var(--primary) 60%, transparent)"
                    : "none",
                }}
              />
              {/* Label */}
              <div
                className="absolute top-full left-1/2 mt-1.5 -translate-x-1/2 uppercase whitespace-nowrap transition-all duration-300"
                style={{
                  fontSize: hovered === node.id ? "13px" : "10px",
                  fontWeight: hovered === node.id ? 600 : 500,
                  letterSpacing: hovered === node.id ? "0.025em" : "0.1em",
                  color: hovered === node.id ? "var(--foreground)" : "var(--muted-foreground)",
                  opacity: isDim ? 0.4 : 1,
                }}
              >
                {node.label}
              </div>
              {/* Tooltip */}
              <div
                className={cn(
                  "pointer-events-none absolute z-50 transition-all duration-200 ease-out",
                  tipBelow ? "top-full mt-6" : "bottom-full mb-2",
                  xPos === "center" && "left-1/2 -translate-x-1/2",
                  xPos === "left" && "left-0 -translate-x-3",
                  xPos === "right" && "right-0 translate-x-3"
                )}
                style={{
                  opacity: hovered === node.id ? 1 : 0,
                  scale: hovered === node.id ? "100%" : "90%",
                }}
              >
                <span className="block rounded-md border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md whitespace-nowrap">
                  {localizedDesc}
                </span>
                <span
                  className={cn(
                    "absolute size-2 rotate-45 border-border bg-popover",
                    tipBelow
                      ? "-top-1 border-l border-t"
                      : "top-full -mt-1 border-r border-b",
                    xPos === "center" && "left-1/2 -translate-x-1/2",
                    xPos === "left" && "left-[18px] -translate-x-1/2",
                    xPos === "right" && "right-[18px] translate-x-1/2"
                  )}
                />
              </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

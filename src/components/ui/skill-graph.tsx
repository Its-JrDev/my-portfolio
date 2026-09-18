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
import { cn } from "@/lib/utils"

const WIDTH_RATIO = 460
const HEIGHT_RATIO = 340
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

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export function SkillGraph() {
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
    const linkDistance = clamp(Math.min(width, height) * 0.26, 70, 120)

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
      .force("collide", forceCollide<GraphNode>().radius(32).strength(0.9))
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
        
        for (const node of NODES) {
          const margin = 60
          if (typeof node.x === "number") {
            node.x = clamp(node.x, margin, w - margin)
          }
          if (typeof node.y === "number") {
            node.y = clamp(node.y, margin, h - margin)
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
    const margin = 60
    drag.node.fx = clamp(event.clientX - rect.left, margin, w - margin)
    drag.node.fy = clamp(event.clientY - rect.top, margin, h - margin)
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
      className="relative aspect-[460/340] w-full select-none"
    >
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

      {NODES.map((node) => {
        const isDim =
          hovered !== null &&
          hovered !== node.id &&
          !hoveredNeighbors?.has(node.id)
        return (
            <div
            key={node.id}
            ref={(el) => {
              node.ref = el
            }}
            onPointerDown={(event) => startDrag(event, node)}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerLeave={(event) => {
              endDrag(event)
              setHovered((h) => (h === node.id ? null : h))
            }}
            onPointerEnter={() => setHovered(node.id)}
            style={{ left: 0, top: 0, opacity: started ? 1 : 0 }}
            className={cn(
              "absolute cursor-grab transition-opacity duration-300 active:cursor-grabbing z-10",
              hovered === node.id && "z-50"
            )}
          >
            <div className="relative size-7 -translate-x-1/2 -translate-y-1/2">
              <div
                className="absolute -inset-2 rounded-full border border-primary/40 bg-primary/10 transition-all duration-300 ease-out"
                style={{
                  opacity: hovered === node.id ? 1 : 0,
                  scale: hovered === node.id ? "100%" : "75%",
                }}
              />
              <div
                className="absolute inset-0 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: hovered === node.id
                    ? "color-mix(in oklab, var(--primary) 15%, transparent)"
                    : "transparent",
                }}
              />
              <div
                className="absolute inset-[5px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isDim
                    ? "var(--muted)"
                    : hovered === node.id
                      ? "var(--primary)"
                      : "color-mix(in oklab, var(--muted-foreground) 80%, transparent)",
                  boxShadow: hovered === node.id
                    ? "0 0 18px color-mix(in oklab, var(--primary) 60%, transparent)"
                    : "none",
                }}
              />
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
              <div
                className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transition-all duration-200 ease-out"
                style={{
                  opacity: hovered === node.id ? 1 : 0,
                  scale: hovered === node.id ? "100%" : "90%",
                }}
              >
                <span className="block rounded-md border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md whitespace-nowrap">
                  {node.description}
                </span>
                <span className="absolute top-full left-1/2 -mt-1 size-2 -translate-x-1/2 rotate-45 border-r border-b border-border bg-popover" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

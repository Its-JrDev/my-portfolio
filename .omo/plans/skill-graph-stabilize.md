# Stabilize Skill Graph (zoom/pan off, no clipped tooltips)

Plan state: approved by user conversation (user: "mejor dejalo sin poder acer zoomin y zoomut... los tooltips se cortan").

## GOAL

Make the SkillGraph in `src/components/ui/skill-graph.tsx` a static, non-zoomable, non-pannable visualization. Nodes stay generously inside their bounds, and tooltips are never visually cut off by the container.

## TODOs

- [x] 1. Remove zoom and pan from SkillGraph: delete the wheel zoom listener and the panning pointer handlers (onWheel effect, onPointerDown/Move/Up that mutate `view`), and remove the now-unused `view`/`viewRef` state so the graph renders at a fixed scale/position - expect a static graph with no zoom or pan interaction
- [x] 2. Remove `overflow-hidden` from the SkillGraph container div so hover tooltips float outside the container without being clipped - expect tooltips fully visible at edges
- [x] 3. Set node bounds margin to 60px in both the simulation tick clamp and the drag (moveDrag) clamp inside skill-graph.tsx - expect nodes never touch or cross the container edges
- [x] 4. Stop the ResizeObserver "reheat" loop in skill-graph.tsx: the `[size]` effect must only call `applySize(...)` (which does `.alpha(0.5).restart()`) when the observed width or height actually differs from what the simulation already runs at - expect the simulation cools to a full stop and never restarts on no-op resizes
- [x] 5. Restore node hover feedback (orange halo + glow + tooltip + label grow) that the user reports as lost ("se perdio el hover naranja con halo espectacular del nodo", "tampoco veo el tooltip") by driving the hover visuals from the React `hovered` state instead of CSS `group-hover:` - expect halo/tooltip to appear within ~300ms deterministically on hover

## Acceptance Criteria

- The graph has no zoom in/out behavior (wheel does nothing on the graph).
- The graph has no pan behavior (drag on background does not move the graph).
- Nodes can still be dragged individually but stay at least 60px from every edge.
- Tooltips rendering beyond the container bounds are fully visible (not cut).
- `npm run build` passes (tsc + vite).

## Evidence

- Build output: `npm run build` exit 0.
- Manual QA: run `npm run dev`, open the skills section, wheel over the graph (no zoom), drag background (no pan), drag a node to an edge (stops at margin), hover edge nodes (tooltip fully visible).

## Final Verification Wave

- [x] F1. Reviewer confirms no zoom/pan code remains, margins are 60, overflow-hidden is gone, and build passes.
- [x] F2. Reviewer confirms the d3 simulation reaches a full stop (no perpetual drift) on a settled page - build passes
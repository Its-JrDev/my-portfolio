# skill-graph-drag-animation - Work Plan

## TL;DR (For humans)
<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->
<!-- Plain English for a non-engineer: NO file paths, NO todo numbers, NO wave/agent/tool names. -->

**What you'll get:** El skill graph vuelve a tener animación: los nodos vuelan a sus posiciones al cargar, el halo del hover aparece con una transición suave, y — lo más importante — **puedes arrastrar los nodos con el mouse**.

**Why this approach:** Los dos problemas (drag roto + sin animación) tienen la MISMA causa raíz: una línea que apagaba la simulación al instante. Arreglarla restaura ambas cosas. Las transiciones del hover se restauran porque en tu navegador real funcionan perfectamente (el lag anterior era un artefacto de navegadores headless de prueba, no del tuyo).

**What it will NOT do:** No vuelve el zoom/pan (se quitó a propósito), no cambia cómo se detiene la simulación, y no toca ningún otro componente.

**Effort:** Quick
**Risk:** Low - un solo archivo, 3 cambios puntuales, verificación en navegador real
**Decisions to sanity-check:** alphaMin baja a 0.01 (la sim se detiene ~1-2s después de asentarse); transiciones CSS restauradas (funcionan en navegador real)

Your next move: ejecutar el plan con `/start-work`. Full execution detail follows below.

---

> TL;DR (machine): Quick effort, Low risk — fix sim alpha config (remove `.alpha(0)`, alphaMin 0.5→0.01) to restore drag + initial animation, restore 5 hover transition classes.

## Scope
### Must have
- Drag de nodos funcional: al arrastrar un nodo, sigue el pointer y los links se actualizan en vivo.
- Animación inicial: los nodos vuelan desde posiciones aleatorias a sus posiciones force-directed al cargar.
- Animación de hover: halo, glow, fill, label y tooltip con transiciones suaves (~200-300ms).
- La simulación se detiene sola al asentarse (sin reheat loop).
- `npm run build` pasa.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- NO re-agregar zoom/pan (removidos en el plan anterior).
- NO cambiar la lógica del reheat guard (`appliedSizeRef`).
- NO tocar otros componentes/archivos.
- NO añadir dependencias.
- NO cambiar el layout, colores, o contenido del graph.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: none (no test framework in repo; verification via build + browser QA) 
- Evidence: .omo/evidence/task-<N>-skill-graph-drag-animation.<ext> (attemptDir = currentAttemptDir from 'omo ulw-loop status --json', .omo/evidence/ulw/<session>/<goalId>/a<attempt>; outside ulw-loop use .omo/evidence/)

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.
- Wave 1: Todos 1 y 2 en paralelo (líneas distintas del mismo archivo, sin conflicto).

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Fix sim alpha config | — | — | 2 |
| 2. Restore hover transitions | — | — | 1 |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [x] 1. Fix sim alpha config in skill-graph.tsx: remove `.alpha(0)` and change `.alphaMin(0.5)` to `.alphaMin(0.01)` so the sim animates on load and keeps ticking during drag
  What to do / Must NOT do: In `src/components/ui/skill-graph.tsx`, in the `forceSimulation` chain (~lines 154-157): delete the `.alpha(0)` line and change `.alphaMin(0.5)` to `.alphaMin(0.01)`. Keep `.alpha(1)`, `.alphaTarget(0)`, `.velocityDecay(0.9)`, and the tick handler untouched. Do NOT touch the reheat guard (`appliedSizeRef`), drag handlers, or anything else.
  Parallelization: Wave 1 | Blocked by: — | Blocks: —
  References (executor has NO interview context - be exhaustive): src/components/ui/skill-graph.tsx:154-157 (sim chain), :206-233 (drag handlers that depend on alpha), :118-128 (reheat guard — do not touch)
  Acceptance criteria (agent-executable): `npm run build` exits 0; grep confirms `.alpha(0)` gone and `.alphaMin(0.01)` present; browser QA: drag a node → it follows the pointer and links update live; on load, nodes animate from random positions to settled layout.
  QA scenarios (name the exact tool + invocation): happy — `npm run build`; browser via playwright-core script (headed DISPLAY=:1, launch args `--no-sandbox --disable-gpu --disable-dev-shm-usage`): hover a node, `mouse.down()`, `mouse.move()` in steps, assert node transform changes each step and links' x1/y1/x2/y2 update; failure — assert sim stops after settle (transforms stable over 2s without input). Evidence .omo/evidence/task-1-skill-graph-drag-animation.md
  Commit: Y | fix(skill-graph): restore drag and initial animation by fixing sim alpha config

- [x] 2. Restore the 5 hover transition classes in skill-graph.tsx: ring, glow, fill, label, tooltip
  What to do / Must NOT do: In `src/components/ui/skill-graph.tsx`, add back the transition classes to the 5 hover elements: ring div (~line 300) `transition-all duration-300 ease-out`; glow div (~line 307) `transition-colors duration-300`; fill div (~line 315) `transition-all duration-300`; label div (~line 328) `transition-all duration-300`; tooltip div (~line 340) `transition-all duration-200 ease-out`. Keep the inline `style` props (opacity/scale/backgroundColor/boxShadow) exactly as they are. Do NOT add transitions to the node wrapper div (keep `transition-opacity duration-300` only) and do NOT change any other class or style.
  Parallelization: Wave 1 | Blocked by: — | Blocks: —
  References (executor has NO interview context - be exhaustive): src/components/ui/skill-graph.tsx:298-350 (the 5 hover divs; ring ~300, glow ~307, fill ~315, label ~328, tooltip ~340)
  Acceptance criteria (agent-executable): `npm run build` exits 0; browser QA: hover a node → halo fades/scales in smoothly over ~300ms (not instant), unhover → fades out; tooltip fades in over ~200ms.
  QA scenarios (name the exact tool + invocation): happy — `npm run build`; browser via playwright-core script (headed DISPLAY=:1): hover node, sample computed opacity/scale at ~150ms intervals, assert intermediate values exist between 0 and 1 (proves transition runs, not instant); failure — assert no stuck "running" animations after unhover (getAnimations() empty). Evidence .omo/evidence/task-2-skill-graph-drag-animation.md
  Commit: Y | feat(skill-graph): restore smooth hover transitions

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
- [ ] F2. Code quality review
- [ ] F3. Real manual QA
- [ ] F4. Scope fidelity

## Commit strategy
- One commit per todo (2 commits total), conventional commits, Spanish/English summary per repo style (repo uses English commit messages).
- Commit after each todo passes its acceptance criteria.

## Success criteria
- `npm run build` exits 0.
- Drag: node follows pointer live; links update; node stays within 60px margins.
- Initial animation: nodes fly to positions on load.
- Hover: halo/glow/fill/label/tooltip transition smoothly (~200-300ms).
- Sim stops after settle (no reheat loop).
- F1-F4 all APPROVE.

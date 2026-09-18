---
slug: skill-graph-drag-animation
status: drafting
intent: clear
review_required: false
pending-action: write .omo/plans/skill-graph-drag-animation.md
approach: Fix sim alpha config (remove .alpha(0), lower alphaMin to 0.01) to restore drag + initial animation, and restore the 5 hover transition classes for hover animation.
---

# Draft: skill-graph-drag-animation

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
<!-- id | outcome (one line) | status: active|deferred | evidence path -->
| skill-graph.tsx | sim alpha config + hover transitions fixed in one file | active | src/components/ui/skill-graph.tsx |

## Open assumptions (announced defaults)
<!-- Record any default you adopt instead of asking, so the user can veto it at the gate. -->
<!-- assumption | adopted default | rationale | reversible? -->
| alphaMin 0.01 | sim stops ~1-2s after settle (alpha decays below 0.01) | drag alphaTarget 0.3 must stay above alphaMin to keep ticking | yes (tune later) |
| CSS transitions work in real browser | restore the 5 hover transition classes | verified in headed mode (debug29: transitions complete ~400ms); stall was a headless frame-throttling artifact | yes |

## Findings (cited - path:lines)
- `.alpha(0)` at src/components/ui/skill-graph.tsx:157 kills the sim instantly: alpha starts at 0, so forces apply with zero movement and no initial layout animation.
- `alphaMin(0.5)` at :155 stops the sim as soon as alpha < 0.5. `startDrag` (:206-211) sets `alphaTarget(0.3).restart()`; first tick computes alpha ≈ 0.007 < 0.5 → sim stops after ONE tick.
- `moveDrag` (:213-224) sets `node.fx`/`node.fy` but with the sim stopped no ticks run → `node.ref.style.transform` never updates → node does not move visually (drag broken).
- `endDrag` (:226-233) clears fx/fy and sets `alphaTarget(0.0001)` — also below alphaMin, so no reheat.
- The 5 hover transition classes were removed in the previous plan (skill-graph-stabilize) to fix a lag that was actually a headless frame-throttling artifact; in a real browser transitions complete fine (debug29: ~400ms).
- Reheat guard (`appliedSizeRef`, :118-128) already prevents ResizeObserver reheats — `.alpha(0)` is redundant for that purpose.

## Decisions (with rationale)
1. Remove `.alpha(0)` (:157) → sim starts at alpha(1) and animates nodes to force-directed positions (initial animation restored).
2. Change `alphaMin(0.5)` → `alphaMin(0.01)` (:155) → drag alphaTarget (0.3) stays above alphaMin so the sim keeps ticking during drag; sim still cools to a full stop after settle.
3. Restore the 5 hover transition classes (ring, glow, fill, label, tooltip) → smooth hover animation in real browsers.

## Scope IN
- Fix sim alpha config in src/components/ui/skill-graph.tsx (remove `.alpha(0)`, alphaMin 0.5 → 0.01).
- Restore the 5 hover transition classes.
- Verify: build passes, drag works, hover animates, sim stops after settle.

## Scope OUT (Must NOT have)
- Do NOT re-add zoom/pan (removed in previous plan).
- Do NOT change the reheat guard (`appliedSizeRef` logic stays).
- Do NOT touch other components or files.
- Do NOT add dependencies.

## Open questions
- None — intent CLEAR, all forks resolved by evidence.

## Approval gate
status: approved
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->

# AI Generated Dashboard

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiGeneratedDashboard`  
**Component type:** React page  
**Status:** Draft  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The AI-generated workspace. Scenarios, impact, and map overlays compose into a single governed output the operator can shape, approve, and submit.

AIGeneratedDashboard is a page-level pattern that renders the AI’s response to a strategic prompt as a multi-zone living dashboard rather than a single chat message. The starter scenario — Cardiology Expansion Q2 — demonstrates how the AI proposes a Boston cluster re-alignment, surfaces concurrent scenarios (Immunology Launch Readiness, Newark Territory Health Review), shows impact and risk telemetry, and overlays the proposal on a territory map. Every zone carries accountability: confidence, impact, agent attribution, rationale, sources, and an explicit Draft / Submit governance handoff. The component is designed to inhabit the right pane of AICommandCenterSplitView and also to stand alone as a saved artifact.

**Export:** `AIGeneratedDashboard`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/pages/ai-generated-dashboard/AIGeneratedDashboard.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-generated-dashboard/ai-generated-dashboard.md` | This mirror spec |
| `components/ai/pages/ai-generated-dashboard/ai-generated-dashboard.agent.json` | Agent manifest |
| `components/ai/pages/ai-generated-dashboard/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | Adaptive · AI Led |
| AI behavior | Analyze · Generate · Simulate · Monitor · Compare · Recommend · Evaluate · Learn · Escalate |
| Accountability | Confidence · Impact · Sources · Rationale · Assumptions · Audit trail · Owner · Approval · Output ownership |

## When to use

- A user prompt warrants a multi-zone living output rather than a single chat message
- AI is proposing a strategic action with concurrent scenarios, impact, and governance
- The operator needs to compare options, see telemetry, and submit / escalate from one surface
- Output ownership needs explicit Draft → Submit handoff with audit trail
- Map / territory overlays are part of the AI’s rationale

## When not to use

- Short conversational responses or simple Q&A
- Single-table or single-chart outputs (use the specific table / scenario placeholder)
- Outputs without governance requirements
- Mobile-only viewports where multi-zone layout would degrade the narrative
- When a user just wants to chat with the agent without producing an artifact

## Anatomy

1. **Output header** _(Unique)_ — Title, status badge, output-type badge, Confidence %, Impact %, Draft Mode toggle, and Submit split-button.
2. **Current Focus module** _(Unique)_ — Quote-style prompt restatement on AI brand surface, with a “Why this matters” body and View Rationale link.
3. **Intelligence Evolution** _(Unique)_ — Three trend metrics (Scenario Accuracy, Drift, Confidence Trend) showing how the model is learning over time.
4. **Agent Analysis module** _(Shared)_ — AIMessageHeader attribution + AI summary + Optimization Drivers (weighted bars) + rationale / sources strip.
5. **Scenario cards** _(Unique)_ — Two concurrent scenarios (Immunology Launch Readiness 45%, Newark Territory Health Review 35%) with badges, metric chips, health bar, owner and timestamp.
6. **Impact & RiPulseLine grid** _(Unique)_ — Impact Snapshot, Variance Control, Risk Avoidance, Confidence Trend, System RiPulseLine Coherence, and Escalation Thresholds.
7. **Contextual Prompts** _(Shared)_ — Agent attribution + four AIButton chip (variant="secondary") prompt suggestions + a Talk control. Refines or extends the dashboard in-place.
8. **Map / visual output** _(Unique)_ — Header pill, SVG territory canvas, overlay chips (Density Map, Territory Zones), region labels, pins, legends, and status footer.
9. **Governance footer** _(Shared)_ — Owner, audit trail, escalation link, and rollback control. Anchored across Draft, Needs Approval, and Submitted states.
10. **Rationale entry points** _(Shared)_ — Inline “View rationale” and “View sources” links throughout. Each opens AIRationalePanel with assumption disclosure.
11. **Embedded variant chrome** _(Unique)_ — When variant=”embedded”, header is suppressed and the dashboard sits inside the split-view right pane chrome which already supplies title and actions.
12. **Reduced-motion respect** _(Shared)_ — All staged-reveal animations disabled via data-gd-anim selector when prefers-reduced-motion is set.

## State variations

- **Empty** _(status=draft mode=draft)_ — No prompt yet — dashboard frame and zone placeholders only.
- **Generating** _(status=generating)_ — AI is building the dashboard — zones reveal sequentially with skeleton bars and a generation banner.
- **Ready** _(status=active)_ — All zones populated with the Cardiology Expansion Q2 scenario. Confidence 92.4%, Impact +12.2%.
- **Updating** _(status=updating)_ — Follow-up prompt triggers a soft refresh — metric values and map regions update in place with a subtle pulse.
- **Draft mode** _(mode=draft)_ — Draft Mode toggle on. Submit button labelled “Review before submit”. Editable affordances visible.
- **Submitted** _(status=submitted)_ — Output is locked. Status badge shows Submitted, governance footer shows audit trail entry.
- **Needs approval** _(status=needsApproval)_ — Approval gate active — escalation banner, owner avatar, approve / decline controls. Submit replaced with “Request approval”.
- **Critical scenario** _(criticalMode=true)_ — High-risk scenario detected — signal-orange highlights on impact tiles and escalation thresholds.
- **Map-focused** _(mapFocused=true)_ — Map module expands to full width; other modules condense to a side rail summary.
- **Mobile stacked** _(viewport<760px)_ — All zones collapse to a single-column scroll with the map module preserving aspect ratio.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `“Cardiology Expansion Q2”` | Dashboard title shown in the header. |
| `status` | `"draft" \| "active" \| "generating" \| "updating" \| "needsApproval" \| "submitted" \| "published" \| "error"` | `"active"` | Lifecycle status of the generated dashboard. Drives status badge and governance affordances. |
| `outputType` | `string` | `"Alignment Map"` | Output-type label shown next to the title (e.g. Alignment Map, Scenario Plan). |
| `confidence` | `number` | `92.4` | Confidence percentage displayed in the header trust pair. |
| `impactScore` | `number` | `12.2` | Impact percentage displayed in the header trust pair. |
| `mode` | `"draft" \| "live"` | `"draft"` | Draft Mode toggle state. In draft, Submit becomes “Review before submit”. |
| `variant` | `"standalone" \| "embedded"` | `"standalone"` | “embedded” suppresses chrome for use inside the split-view right pane. |
| `showHeader` | `boolean` | `true` | Whether to render the dashboard header. Set false when embedded. |
| `criticalMode` | `boolean` | `false` | Surfaces signal-orange highlights on impact tiles and escalation thresholds. |
| `mapFocused` | `boolean` | `false` | Expands the map module to full width and condenses other modules to a side rail. |
| `onSubmit` | `() => void` | `undefined` | Fires when the Submit button is pressed. |
| `onToggleDraft` | `() => void` | `undefined` | Fires when the Draft Mode toggle is flipped. |
| `onViewRationale` | `() => void` | `undefined` | Fires when any “View rationale” link is activated. |
| `onViewSources` | `() => void` | `undefined` | Fires when any “View sources” link is activated. |
| `onPromptSelect` | `(prompt: string) => void` | `undefined` | Fires when a contextual prompt chip is selected. |

## Tokens

### Header
| Token | Value | Usage |
| --- | --- | --- |
| `header.bg` | `#FFFFFF` | Output header surface. |
| `header.status.active` | `#27AE60` | Status dot when status=active. |
| `header.confidence` | `AI.color.action.primary` | Confidence value text and accent. |

### AI focus surface
| Token | Value | Usage |
| --- | --- | --- |
| `focus.surface` | `AI.color.brandSurface` | Current Focus module fill. |
| `focus.border` | `AI.color.brand` | Current Focus left accent and link colour. |
| `focus.text` | `AI.color.brandStrong` | Current Focus heading. |

### Scenario cards
| Token | Value | Usage |
| --- | --- | --- |
| `scenario.card.bg` | `#FFFFFF` | Scenario card surface. |
| `scenario.health.ok` | `#27AE60` | Health bar fill when scenario is on track. |
| `scenario.health.risk` | `AI.color.signal.default` | Health bar fill when scenario is at risk. |

### Map
| Token | Value | Usage |
| --- | --- | --- |
| `map.terrain` | `linear-gradient(...)` | Map canvas background. |
| `map.pin.hotspot` | `AI.color.signal.default` | Hotspot / high-pressure pin colour. |
| `map.pin.stable` | `#27A6A4` | Stable region pin colour. |

### Status badges
| Token | Value | Usage |
| --- | --- | --- |
| `status.draft` | `AI.color.brandSurface` | Draft mode badge fill. |
| `status.approval` | `AI.color.signal.subtle` | Needs-approval badge fill. |
| `status.submitted` | `var(--ai-status-success-bg)` | Submitted badge fill. |

## Flows

### Prompt to dashboard
A strategic prompt generates a full multi-zone dashboard.
- User submits a strategic prompt in AICommandCenterSplitView
- AI Command Center routes to dashboard output type
- AIGeneratedDashboard renders status=generating with staged reveal
- Zones populate sequentially — header, focus, scenarios, impact, map

### Refinement
Operator refines the dashboard in-place via contextual prompts.
- User selects a Contextual Prompt chip
- Parent split view re-sends prompt to agent
- Dashboard transitions to status=updating
- Metric tiles soft-pulse; map regions update in place

### Governance handoff
Draft is reviewed, submitted, and recorded in the audit trail.
- Operator reviews Draft
- Flips Draft Mode off
- Submit opens approval modal
- Status transitions to submitted; audit trail entry written

### Escalation
Risk threshold triggers critical mode and human escalation.
- Risk threshold crossed on a scenario
- criticalMode=true surfaces signal-orange highlights
- Operator clicks Escalate
- Handoff to human owner via AIHandoffChip

### Map-focused review
Operator zooms into the territory map for spatial review.
- Operator activates Map-focused view
- Map module expands to full width
- Side rail summarises other zones
- Operator returns to balanced layout when done

## Canonical implementation

```tsx
import { AIGeneratedDashboard } from '@/components/ai/pages/ai-generated-dashboard/AIGeneratedDashboard';

// Standalone usage — full Cardiology Expansion Q2 starter scenario
<AIGeneratedDashboard />

// Embedded inside AICommandCenterSplitView right pane
<AIGeneratedDashboard variant="embedded" showHeader={false} />

// Custom prompt scenario
<AIGeneratedDashboard
  title="Immunology Launch Readiness"
  status="active"
  confidence={88.1}
  impactScore={9.4}
  mode="draft"
  onSubmit={() => console.log('submit')}
  onPromptSelect={(p) => console.log('refine with', p)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-generated-dashboard.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-generated-dashboard/ai-generated-dashboard.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

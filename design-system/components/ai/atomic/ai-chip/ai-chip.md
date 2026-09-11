# AI Chip

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiChip`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The single pill atom for the AI system. `kind` selects memory context, task-brief status, outcome status, or an agent handoff — all sharing radius, sizing, and caption typography.

AIChip consolidates four formerly separate chip atoms (memory, brief, status, handoff) into one component discriminated on a `kind` prop. Each kind preserves its own sub-taxonomy: memory `variant`, brief `status`, status `tone`, handoff `direction`. Output is pixel-identical to the former atoms — this is purely an API consolidation so the shared pill conventions live in one place.

**Export:** `AIChip`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/chip/AIChip.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-chip/ai-chip.md` | This mirror spec |
| `components/ai/atomic/ai-chip/ai-chip.agent.json` | Agent manifest |
| `components/ai/atomic/ai-chip/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Confirm · Execute |
| Accountability | Approval · Audit trail |

## Anatomy

1. **kind prop** _(Unique)_ — Discriminant: memory | brief | status | handoff | tag. Selects the sub-taxonomy and palette.
2. **Indicator** _(Unique)_ — Per-kind leading glyph — memory icon, status dot, tone glyph, or from/to handoff icons.
3. **Label text** _(Unique)_ — Caller-supplied string(s). Handoff uses fromLabel + toLabel around an arrow.
4. **Pill shell** _(Shared)_ — Full-radius border shared across all kinds; tokens vary per kind/variant.

## State variations

- **Brief** _(kind=brief)_ — Task-brief status pill. status: default | ready | missing | edited | waiting-approval | running.
- **Status** _(kind=status)_ — Outcome status pill. tone: success | warning | critical | neutral | info. Supports onDark.
- **Memory** _(kind=memory)_ — Memory-context pill. variant: using-memory | previous-context | memory-available | memory-ignored | memory-removed.
- **Handoff** _(kind=handoff)_ — Directional ownership pill. direction: agent-to-agent | agent-to-human | human-to-agent | system-to-agent | failed.
- **Tag — Semantic states** _(kind=tag)_ — AI-branded DS Tag. Neutral is re-skinned on the AI brand ramp; info/error/success/warning keep the DS semantic hues so meaning is consistent across systems.
- **Tag — Sizes** _(tagSize)_ — Normal 40/16, Small 32/14, X-Small 24/12 (height/font). Icon box scales 16 / 14 / 12.
- **Tag — Interaction states** _(interaction)_ — Default, Hover, Focus, Active, Active Hover, Active Focus. Active = filled fill, inverse label, close suppressed.
- **Tag — Active (filled)** _(interaction=active)_ — Selected/active treatment across every semantic state — filled fill, inverse label, dismiss suppressed.
- **Tag — Dismissible** _([dismissible])_ — Trailing zs-icon-close dismiss button — aria-label "Remove {label} tag". Suppressed when active or disabled.
- **Tag — Left icon** _([leftIcon])_ — Leading zs-icon-globe-fill; icon colour tracks the state (white when active, muted when disabled).
- **Tag — Left icon — sizes** _(leftIcon+size)_ — Leading globe scaled across Normal / Small / X-Small so the icon box tracks the type ramp.
- **Tag — Disabled** _(state=disabled)_ — Muted border, fill, and label; non-interactive and non-dismissible. Shown at Normal and Small.
- **Tag — Filter group** _(pattern)_ — Common filter-bar composition: an active filter alongside inactive, archived, and deleted dismissible tags.
- **Tag — Rounded — semantic** _(shape=rounded)_ — Full-pill radius across every semantic state.
- **Tag — Rounded — sizes** _(rounded+size)_ — Full-pill radius across Normal / Small / X-Small.
- **Tag — Rounded — active & dismissible** _(rounded+state)_ — Rounded pills covering non-dismissable, dismissible, and active/selected treatments.
- **Tag — Rounded — with icons** _(pill + icons)_ — Rounded pills with the leading globe and dismiss close, across sizes and states.
- **Tag — Custom data color** _(dataColor)_ — Custom data-viz colour (parity with the DS data-color tag). Tinted fill, coloured border/label, filled-circle dismiss. Overrides the semantic state palette.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `kind` | `"memory" \| "brief" \| "status" \| "handoff" \| "tag"` | `—` | Discriminant selecting the chip sub-taxonomy. Determines which other props apply. |
| `size` | `"sm" \| "md"` | `"md"` | Shared — controls padding and font size across all kinds. |
| `label` | `string` | `—` | memory / brief / status — the pill text. (handoff uses fromLabel + toLabel instead.) |
| `variant` | `MemoryVariant` | `—` | kind="memory" — using-memory \| previous-context \| memory-available \| memory-ignored \| memory-removed. |
| `status` | `BriefChipStatus` | `"default"` | kind="brief" — default \| ready \| missing \| edited \| waiting-approval \| running. |
| `noDot` | `boolean` | `false` | kind="brief" — hides the status dot (role/label chips). |
| `icon` | `string \| ReactNode` | `—` | kind="brief" — replaces the dot with a glyph. Strings treated as zs-icon-* class names. |
| `accentColor` | `string` | `—` | kind="brief" — overrides the derived dot / text accent color. |
| `accentBg` | `string` | `—` | kind="brief" — overrides the derived chip background fill. |
| `tone` | `AIStatusPillTone` | `"neutral"` | kind="status" — success \| warning \| critical \| neutral \| info. |
| `showIndicator` | `boolean` | `true` | kind="status" — toggles the leading glyph. |
| `onDark` | `boolean` | `false` | kind="status" — switches to the dark-surface tone palette. |
| `direction` | `HandoffDirection` | `—` | kind="handoff" — agent-to-agent \| agent-to-human \| human-to-agent \| system-to-agent \| failed. |
| `fromLabel` | `string` | `—` | kind="handoff" — name of the source party. |
| `toLabel` | `string` | `—` | kind="handoff" — name of the target party. |
| `state` | `TagChipState` | `"neutral"` | kind="tag" — neutral \| info \| error \| success \| warning \| disabled. Neutral uses the AI brand ramp; semantics match the DS Tag. |
| `tagSize` | `"normal" \| "small" \| "x-small"` | `"normal"` | kind="tag" — 40/16, 32/14, 24/12 (height/font). Icon box scales 16/14/12. |
| `interaction` | `TagChipInteraction` | `"default"` | kind="tag" — default \| hover \| focus \| active \| active-hover \| active-focus. Active = filled, inverse label, close suppressed. |
| `dismissible` | `boolean` | `true` | kind="tag" — shows the trailing zs-icon-close dismiss button (suppressed when active/disabled). |
| `leftIcon` | `boolean` | `false` | kind="tag" — leading zs-icon-globe-fill; icon colour tracks the state (white when active, muted when disabled). |
| `shape` | `"flat" \| "rounded"` | `"flat"` | kind="tag" — flat = soft AI corners (6px); rounded = full pill. |
| `dataColor` | `string` | `—` | kind="tag" — custom data-viz colour (border + label + filled-circle dismiss). Overrides the semantic state palette; renders as a rounded pill. |
| `dataTint` | `string` | `dataColor @ 10%` | kind="tag" — background tint paired with dataColor. Defaults to the data colour at ~10% alpha. |

## Tokens

### Brief Chip
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brandSurface` | `#F5F6FF` | Pill background |
| `AI.color.brandBorder` | `#BECAFE` | Pill border |
| `AI.color.brandStrong` | `#1F2A66` | Label text |
| `AI.color.brand` | `#4D60E6` | Running dot color |
| `AI.color.signal.default` | `#EC7200` | Edited dot color |

### Status / Memory / Handoff
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.status.*` | `success / warning / critical / neutral / info tones` | Status-pill tone fill + border + label per tone |
| `AI.color.status.onDark.*` | `dark-surface tone palette` | Status-pill palette when onDark is set for dark backgrounds |
| `AI.color.brandSubtle` | `#D2DBFF` | Memory-context pill background + directional handoff surface |
| `AI.color.status.error` | `#C0392B` | Failed handoff + memory-removed accent |

### Tag — Neutral (AI brand)
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brandSurface` | `#F5F6FF` | Neutral resting background |
| `AI.color.brandSubtle` | `#D2DBFF` | Neutral hover background |
| `AI.color.border.default` | `#4D60E6` | Neutral border + leading-icon colour |
| `AI.color.border.strong` | `#4D60E6` | Neutral hover border |
| `AI.color.action.primary` | `#4D60E6` | Neutral active (filled) fill |
| `AI.color.action.primaryActive` | `#1F2A66` | Neutral active-hover fill |
| `AI.color.text.primary` | `#1F2A66` | Neutral label ink |

### Tag — Semantic (DS-consistent)
| Token | Value | Usage |
| --- | --- | --- |
| `zs.tag.info` | `#1B24AA` | Info border / active fill |
| `zs.tag.error` | `#B21111` | Error border / active fill |
| `zs.tag.success` | `#0A6E5E` | Success border / active fill |
| `zs.tag.warning` | `#8A640C` | Warning border / active fill |
| `zs.tag.disabled.border` | `#DEDCDE` | Disabled border |
| `zs.tag.disabled.bg` | `#F4F3F3` | Disabled fill |
| `zs.tag.disabled.text` | `#716E79` | Disabled label + icon |

### Tag — Structure
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.border.focus` | `#4D60E6` | Focus ring (close button + active-focus) |
| `AI.color.text.onAction` | `#FFFFFF` | Active (filled) label + icon |
| `dismiss.icon` | `zs-icon-close (currentColor)` | Trailing dismiss button — colour tracks the state |
| `leftIcon.glyph` | `zs-icon-globe-fill (currentColor)` | Leading icon — colour tracks the state (white when active, muted when disabled) |
| `radius.flat` | `6px` | Flat corner radius (AI soft) |
| `AI.radius.full` | `100px` | Rounded (pill) radius |

### Tag — Data color (example series)
| Token | Value | Usage |
| --- | --- | --- |
| `DATAVIZ.7` | `#686EFF` | Iris — border / label / dismiss fill |
| `DATAVIZ.5` | `#ED39DB` | Magenta — border / label / dismiss fill |
| `DATAVIZ.4` | `#2DA40C` | Green — border / label / dismiss fill |
| `DATAVIZ.1` | `#DB6C03` | Amber — border / label / dismiss fill |
| `DATAVIZ.2` | `#3287C4` | Blue — border / label / dismiss fill |
| `dataTint` | `color @ ~10%` | Tinted pill background (per data colour) |

## Flows

### Status dot pulse
Running state
- status="running" detected
- CSS keyframe animation injected via <style> tag
- Dot pulses at 1.4s ease-in-out
- prefers-reduced-motion disables animation

## Canonical implementation

```tsx
import { AIChip } from '@/components/ai/atomic/chip/AIChip';

{/* kind="brief" — task-brief status pill (noDot / icon / accent* supported) */}
<AIChip kind="brief" status="ready"   label="Q3 Pipeline Brief" />
<AIChip kind="brief" status="running" label="Executing…" />
<AIChip kind="brief" status="default" label="Strategy brief" noDot />

{/* kind="status" — outcome status pill (onDark for dark surfaces) */}
<AIChip kind="status" tone="success"  label="On track" />
<AIChip kind="status" tone="critical" label="Needs review" onDark />

{/* kind="memory" — memory-context pill */}
<AIChip kind="memory" variant="using-memory"   label="Q3 strategy brief" />
<AIChip kind="memory" variant="memory-removed" label="Deprecated brief" />

{/* kind="handoff" — directional ownership pill */}
<AIChip kind="handoff" direction="agent-to-human" fromLabel="Research Agent" toLabel="Sarah K." />
<AIChip kind="handoff" direction="failed"         fromLabel="Planner Agent" toLabel="Executor Agent" />

{/* kind="tag" — AI-branded DS Tag (state / tagSize / interaction / dismissible / leftIcon / shape) */}
<AIChip kind="tag" label="Neutral" state="neutral" dismissible={false} />
<AIChip kind="tag" label="Info" state="info" leftIcon />
<AIChip kind="tag" label="Selected" state="success" interaction="active" />
<AIChip kind="tag" label="Pill" state="neutral" shape="rounded" leftIcon dismissible />
<AIChip kind="tag" label="Iris" dataColor="#686EFF" dataTint="#EDEEFF" />
```

## Agent rules

1. Read this mirror spec and `ai-chip.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-chip/ai-chip.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

# Agentic Prompt — AI Stepper

# AI Stepper — Agentic Prompt

_Hand-off prompt for an agent that **can** fetch `github.com/zsainc/9904PD0068_zds-ai-mirror`. For an agent that can't, use the **Copy Component** action instead — it inlines every dependency file._

---

## Hard rules — read before generating any code

1. **Do NOT invent atoms.** Fetch every atom this component imports from the canonical mirror (read order below). Use each one verbatim. If a render comes back wrong, you almost certainly fabricated one instead of fetching it.
2. **AI Avatar = three ZSAI blue circles + white cross-star.** Fixed fills `#A6B4FC` / `#4D60E6` / `#1F2A66`, white star. **No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.**
3. **Tokens come from `ai-tokens.ts` and `ai-typography.ts`** — use `AI.color.brand`, `var(--ai-card-bg)`, `AI_TYPOGRAPHY['@zsai-section-subtitle']`, etc. Never hardcode brand hex.
4. **Icons** come from `lucide-react` for non-ZAIDYN glyphs and from the ZAIDYN icon font (`<i class="zs-icon zs-icon-{name}" />` inside `.zs-master-style`) when a ZAIDYN equivalent exists. Do not invent icon names.
5. **Toolbar buttons inside `AIInputCard` are `AIDialogButton` instances** — 34px pill/circle, transparent fill, subtle border. Not raw `<button>` elements.
6. **Quick chips are `AIChipQuick`** — pill, periwinkle border, brand-blue label. Not generic neutral buttons.
7. **File layout matters.** Keep the relative imports the source files use.

---

## Component metadata

- **Display name:** AI Stepper
- **Component id:** `zds-ai-stepper`
- **Category:** organisms
- **Status:** Beta
- **File path:** `src/app/components/ai/organisms/zds-ai-stepper/AIStepper.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/zsainc/9904PD0068_zds-ai-mirror`
- **File path:** `src/app/components/ai/organisms/zds-ai-stepper/AIStepper.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (ZAIDYN first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@zs-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Stepper
_zds-ai-stepper_

> ZDS Compact Stepper, AI surface theme — brand-gradient milestones, brand tracks, glowing current step.

## Metadata
- **Category:** organisms
- **Status:** Beta
- **Source path:** `src/app/components/ai/organisms/zds-ai-stepper/AIStepper.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Navigation · Progress
- **Tier 3 · Accountability:** Custom element
- **Metrics:** 6 states · 5 shared · ~5KB context · 0 behaviors

## Overview

AIStepper is the AI-surface sibling of the standard ZDS Compact Stepper (src/stepper/, ported in phaseH → CompactStepper). It preserves the stepper contract — evenly-distributed steps, half-tracks that fill up to and including the current step, icon/number milestones, and italic status badges — while replacing the ZDS neutral/green token layer with the AI system. Completed and current-complete steps fill with AI.gradient.action.full (brand gradient) under a white glyph and a brand drop shadow; the current step is a white number circle with a 2px AI.color.brand (#4D60E6) ring and the same soft glow, its number in AI.color.text.primary (#1F2A66); steps after the current one are muted (soft-brand #BECAFE ring or a filled soft-brand dot, brand-subtle track, disabled text). Connector tracks are rounded and painted AI brand for done segments over AI.color.brandSubtle (#D2DBFF) for pending ones. Status badges keep the ZDS semantic meaning but recolor to the AI status set (success / warning / error) with the AI brand for info / current. Orientation switches horizontal ↔ vertical; the small size drops milestones to 28px / labels to 14px. Style-driven and stateless — the app owns step transitions. Glyphs render through the zsIcons font (zs-icon-*); the root carries zs-master-style so the icon-font glyph rules resolve.

## When to use
- AI approval / review workflows on an AI surface (submission → review rounds → approved)
- Multi-step AI agent flows that need progress + status matching the AI look
- A stepper that must sit visually beside the AI Card, AI Tab, and AI Dialog
- Linear sequential progress with a status badge per step

## When not to use
- You need the neutral product stepper — use the standard `zds-stepper`
- Branching (non-linear) flows — a stepper implies a single linear path
- Clickable step navigation without a defined spec — this is style-only, no built-in behavior

## Anatomy
1. **Stepper** _(Shared)_ — Flex container distributing steps evenly (horizontal) or stacking them (vertical). Carries zs-master-style + ai-stepper.
2. **Step** _(Shared)_ — One milestone + track segment + details block; aria-current="step" on the active step.
3. **Milestone** _(Unique)_ — Circle: brand-gradient fill + white glyph (complete), white + 2px brand ring + glow (current), or soft-brand ring / dot (pending).
4. **Track** _(Shared)_ — Rounded connector — AI brand #4D60E6 for done segments, AI.color.brandSubtle #D2DBFF after the current step.
5. **Label** _(Shared)_ — AI.color.text.primary #1F2A66, Bold on the current step, muted (#716e79) after it.
6. **Badge** _(Shared)_ — Italic status pill on a soft tint — AI status set (success/warning/error) + brand for info/current.

## State variations
- **Inline Compact (neutral)** _(layout="inline" size="small" tone="neutral")_ — Small inline pill stepper in the ZDS neutral tone — grey filled disc and neutral pill outline instead of the brand accent.
- **Horizontal** _(orientation="horizontal")_ — 5-step approval flow — 3 complete (brand gradient), current (Round 3, brand ring + glow), pending Final.
- **Horizontal Compact** _(size="small")_ — Small size — 28px milestones, 14px labels.
- **Vertical** _(orientation="vertical")_ — Vertical rail — brand tracks run top-to-bottom.
- **Vertical Compact** _(orientation="vertical" size="small")_ — Small vertical rail.
- **Stepper Modes** _(pending dot)_ — Pending steps as filled soft-brand dots instead of numbers.
- **Compact Modes** _(small · pending dot)_ — Small size with soft-brand dot pending steps.
- **Inline labels** _(layout="inline")_ — Label rides inside the stepper beside the number; active step wrapped in a rounded brand pill (Countries → Sites → PI).
- **Inline Compact** _(layout="inline" size="small")_ — Small inline pill stepper.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `AIStepDef[]` | `required` | Steps — { label, sub?, badge?, mode, icon?, num?, dot? }. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout axis. |
| `size` | `'normal' \| 'small'` | `'normal'` | normal = 40px milestone / 16px label; small = 28px / 14px. |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | stacked = label beneath each milestone; inline = label beside the number, active step wrapped in a rounded pill (horizontal only). |
| `tone` | `'brand' \| 'neutral'` | `'brand'` | Inline-layout color tone. brand = AI accent; neutral = ZDS neutral greys. |
| `mode (step)` | `'complete' \| 'current-complete' \| 'current' \| 'pending'` | `—` | Per-step state — drives the milestone + track fill. |
| `badge (step)` | `{ text, tone }` | `—` | Italic status pill; tone = success \| info \| warning \| error \| neutral \| disabled. |
| `dot (step)` | `boolean` | `false` | Render a pending step as a filled soft-brand dot instead of a number. |

## Tokens

### AI milestone & track
| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `linear-gradient(135deg,#657CEC,#4D60E6)` | Completed / current-complete milestone fill |
| `AI.shadow.action.default` | `rgba(77,96,230,0.18)` | Brand glow under filled + current milestones |
| `AI.color.brand` | `#4D60E6` | Done track + current milestone ring |
| `AI.color.brandSubtle` | `#D2DBFF` | Pending / after-current track + current badge fill |
| `AI.color.brandBorder` | `#BECAFE` | Pending milestone ring + pending dot fill |

### AI text & badges
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.text.primary` | `#1F2A66` | Default label + current number |
| `AI.color.text.secondary` | `#3544A4` | Current (neutral) badge text |
| `AI.color.status.success` | `#0A6E5E` | Approved badge |
| `AI.color.status.warning` | `#8A640C` | Warning badge |
| `AI.color.status.error` | `#C0392B` | Danger badge |
| `ZDS.textDisabled` | `#716e79` | Muted label + pending number |

## Flows

### Render an AI approval stepper
Style-only — the app owns step transitions.
- Import { AIStepper } from ai/organisms/zds-ai-stepper/AIStepper
- Build a steps array — mark completed steps complete, the active step current, the rest pending
- Add a badge per step for the approval status (Approved / Current Step / Pending Approval)
- Pick orientation + size; on step change, swap each step's mode in app state

## Code example
```tsx
import { AIStepper, type AIStepDef } from 'ai/organisms/zds-ai-stepper/AIStepper';

const steps: AIStepDef[] = [
  { label: 'Draft Created', sub: 'Sept 6, 2020', mode: 'complete', icon: 'doc' },
  { label: 'Round 1', badge: { text: 'Approved', tone: 'success' }, mode: 'complete', icon: 'check-circle-fill' },
  { label: 'Round 2', badge: { text: 'Approved', tone: 'success' }, mode: 'complete', icon: 'check-circle-fill' },
  { label: 'Round 3', badge: { text: 'Current Step', tone: 'neutral' }, mode: 'current', num: 3 },
  { label: 'Final',   badge: { text: 'Pending Approval', tone: 'disabled' }, mode: 'pending', num: 4 },
];

// Inline Compact (neutral) — pill stepper in the ZDS neutral tone
const inlineSteps: AIStepDef[] = [
  { label: 'Countries', mode: 'current', num: 1 },
  { label: 'Sites',     mode: 'pending', num: 2 },
  { label: 'PI',        mode: 'pending', num: 3 },
];
<AIStepper steps={inlineSteps} layout="inline" size="small" tone="neutral" />

// Horizontal (default)
<AIStepper steps={steps} />

// Vertical, small
<AIStepper steps={steps} orientation="vertical" size="small" />

// "Modes" — pending steps as filled soft-brand dots
<AIStepper steps={steps.map((s, i) => i > 2 ? { ...s, dot: true } : s)} />

// ── Milestone treatment (the AI signature) ────────────────────────────
// complete / current-complete → AI.gradient.action.full fill + white glyph +
//   box-shadow 0 2px 8px AI.shadow.action.default
// current → white circle, 2px AI.color.brand ring, same glow, number in
//   AI.color.text.primary
// pending → white circle, 2px AI.color.brandBorder ring, number #716e79
//   (or a filled soft-brand dot when dot=true)
// tracks → AI.color.brand (done) over AI.color.brandSubtle (pending), rounded
```

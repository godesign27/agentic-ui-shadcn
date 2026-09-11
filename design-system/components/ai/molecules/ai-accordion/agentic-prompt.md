# Agentic Prompt — AI Accordion

# AI Accordion — Agentic Prompt

_Hand-off prompt for an agent that **can** fetch `github.com/upstream AI component source`. For an agent that can't, use the **Copy Component** action instead — it inlines every dependency file._

---

## Hard rules — read before generating any code

1. **Do NOT invent atoms.** Fetch every atom this component imports from the canonical mirror (read order below). Use each one verbatim. If a render comes back wrong, you almost certainly fabricated one instead of fetching it.
2. **AI Avatar = three AI_RAMP blue circles + white cross-star.** Fixed fills `#A6B4FC` / `#4D60E6` / `#1F2A66`, white star. **No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.**
3. **Tokens come from `ai-tokens.ts` and `ai-typography.ts`** — use `AI.color.brand`, `var(--ai-card-bg)`, `AI_TYPOGRAPHY['@ai-section-subtitle']`, etc. Never hardcode brand hex.
4. **Icons** come from `lucide-react` for non-Guild glyphs and from the Guild icon font (`<i class="zs-icon zs-icon-{name}" />` inside `.zs-master-style`) when a Guild equivalent exists. Do not invent icon names.
5. **Toolbar buttons inside `AIInputCard` are `AIDialogButton` instances** — 34px pill/circle, transparent fill, subtle border. Not raw `<button>` elements.
6. **Quick chips are `AIChipQuick`** — pill, periwinkle border, brand-blue label. Not generic neutral buttons.
7. **File layout matters.** Keep the relative imports the source files use.

---

## Component metadata

- **Display name:** AI Accordion
- **Component id:** `ai-accordion`
- **Category:** molecules
- **Status:** Beta
- **File path:** `ai/molecules/ai-accordion/AIAccordion.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `ai/molecules/ai-accordion/AIAccordion.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Accordion
_ai-accordion_

> A reusable AI-styled accordion — rounded AI card surface, brand chevron, optional icon / subtitle / status chip — for progressively disclosing generated content.

## Metadata
- **Category:** molecules
- **Status:** Beta
- **Source path:** `ai/molecules/ai-accordion/AIAccordion.tsx`
- **Tier 1 · Experience Mode:** AI Assisted · Adaptive
- **Tier 2 · AI Behavior:** Summarize · Explain · Organize
- **Tier 3 · Accountability:** Progressive disclosure · Status · Grouping
- **Metrics:** 6 states · 2 shared · ~4KB context · 3 behaviors

## Overview

AIAccordion is the standalone, reusable disclosure used across AI surfaces — a rounded AI card whose header collapses/expands a body panel. It shares the AI Card Brief's look (20px corners, `--ai-card-bg` surface, `--ai-card-border`, raised header when open, `#4D60E6` chevron) so a brief reads as "AI card + AI accordion," but the disclosure behavior lives here and is reusable anywhere.

Each item takes an optional leading icon/avatar slot, a title + optional subtitle, an optional trailing `AIChip` status, and a body slot. Pass `items` for a stacked set of independent disclosures, or a single `title` + `children`.

DO NOT confuse with the standard `ds-accordion` — that is the neutral DS accordion (square corners, teal caret). This is the AI-styled sibling.

## When to use
- Generated content should be progressively disclosed on an AI surface
- Several related sections need independent expand/collapse
- You want disclosure that visually matches the AI Card Brief
- A header needs an optional status chip, icon, or subtitle

## When not to use
- You need the neutral product accordion — use `ds-accordion`
- The content is a full task brief with actions — use `ai-card-brief`
- Only a list of findings — use `ai-insight-list`
- A single always-visible block — no disclosure needed

## Anatomy
1. **Container** _(Shared)_ — Rounded AI card — `--ai-card-bg` surface, `--ai-card-border`, `AI.radius.lg` (20px), clipped.
2. **Header** _(Unique)_ — Clickable row (`role="button"`, tabIndex 0). Raised bg + bottom border when open.
3. **Icon slot** _(Shared)_ — Optional leading icon / AIAvatar.
4. **Title** _(Unique)_ — Primary label in `@ai-section-subtitle`, optional subtitle in `@ai-agent-name`.
5. **Status chip** _(Shared)_ — Optional trailing `AIChip kind="brief"` when `status` is set.
6. **Chevron** _(Unique)_ — lucide `ChevronDown`, `AI.color.brand`, rotates -180deg when open.
7. **Body** _(Unique)_ — Disclosure panel (`@ai-body`) revealed when expanded.

## State variations
- **Collapsed** _(default)_ — Header only; body hidden. Chevron points down.
- **Expanded** _(defaultExpanded)_ — Body revealed; raised header + brand chevron rotated.
- **With status** _(status)_ — Trailing AIChip in the header signals brief state.
- **Stacked** _(items={[…]})_ — Multiple independent disclosures, small gap between each.
- **Stacked · single-open** _(singleOpen)_ — Radio-style group — opening one item collapses the others.
- **Caret left** _(caret="left")_ — Chevron leads the header instead of trailing it.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `required*` | Header title (single-item mode). *Not needed when `items` is provided. |
| `subtitle` | `string` | `—` | Optional secondary line under the title. |
| `icon` | `ReactNode` | `—` | Optional leading icon / avatar slot. |
| `status` | `BriefChipStatus` | `—` | Renders a trailing `AIChip kind="brief"` when set. |
| `defaultExpanded` | `boolean` | `false` | Start expanded. |
| `children` | `ReactNode` | `required*` | Disclosure body (single-item mode). |
| `items` | `AIAccordionItemProps[]` | `—` | Stacked mode — one independent disclosure per item. |
| `caret` | `"left" \| "right"` | `"right"` | Chevron side. |
| `radius` | `keyof typeof AI.radius` | `"lg"` | Container corner radius token. |
| `singleOpen` | `boolean` | `false` | Stacked mode only — radio-style, one item open at a time. |

## Tokens

### Surface & border
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg` | `AI card surface` | Accordion container fill. |
| `--ai-card-bg-raised` | `Raised surface` | Header fill when expanded. |
| `--ai-card-border` | `AI card border` | Container + open-header divider. |

### Radius & accent
| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.lg` | `20px` | Container corner radius. |
| `AI.color.brand` | `#4D60E6` | Chevron color. |
| `AI.color.border.focus` | `#4D60E6` | Focus ring color. |

### Typography & text
| Token | Value | Usage |
| --- | --- | --- |
| `@ai-section-subtitle` | `Title` | Header title. |
| `@ai-agent-name` | `Subtitle` | Header subtitle. |
| `@ai-body` | `Body` | Disclosure panel text. |
| `--ai-ds-text` | `Primary` | Title + body text. |
| `--ai-ds-helper` | `Helper` | Subtitle text. |

## Flows

### Progressive disclosure of a generated section
Collapse long generated content behind a header so the user reveals it on demand.
- Parent supplies a `title` (+ optional `subtitle` / `status`) and the body as `children`
- The accordion renders collapsed with a brand chevron pointing down
- User clicks (or Tab + Enter/Space) the header — chevron rotates and the body reveals
- For multiple sections, pass `items` so each disclosure toggles independently

## Code example
```tsx
import { AIAccordion } from 'ai/molecules/ai-accordion/AIAccordion';

// Single disclosure
<AIAccordion title="Territory analysis" subtitle="Research Agent" status="ready">
  Coverage gaps are concentrated in the Northeast, driven by two rep
  departures in Q1. Reassigning 3 zips to the Boston pod closes ~60%.
</AIAccordion>

// Stacked — radio-style single-open, chevron on the left
<AIAccordion
  singleOpen
  caret="left"
  items={[
    { title: 'Goal', defaultExpanded: true, children: 'Analyze territory coverage.' },
    { title: 'Constraints', children: 'Keep ratio under 1:35 · No cross-region moves.' },
    { title: 'Expected output', children: 'Ranked list of zip reassignments.' },
  ]}
/>
```

# Agentic Prompt — AI Tab

# AI Tab — Agentic Prompt

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

- **Display name:** AI Tab
- **Component id:** `ai-tab`
- **Category:** organisms
- **Status:** Beta
- **File path:** `src/app/components/ai/organisms/ai-tab/AITab.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `src/app/components/ai/organisms/ai-tab/AITab.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Tab
_ai-tab_

> DS Tab, AI surface theme — brand-gradient active bar, rounded AI surfaces.

## Metadata
- **Category:** organisms
- **Status:** Beta
- **Source path:** `src/app/components/ai/organisms/ai-tab/AITab.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Navigation · Selection
- **Tier 3 · Accountability:** Custom element
- **Metrics:** 6 states · 5 shared · ~5KB context · 5 behaviors

## Overview

AITab is the AI-surface sibling of the standard DS Tab (src/tab/). It preserves the tab contract — role="tablist"/"tab"/"tabpanel", one active tab, roving tabindex (only the active tab is tabbable), Arrow/Home/End keys on the correct axis — while replacing the DS neutral/teal token layer with the AI system. Active tabs read in AI brand #4D60E6 SemiBold; Solid marks them with a 3px brand-gradient bottom bar, Outline fills the tab with --ai-card-bg and joins it to a rounded content container, and Vertical uses a 3px gradient left stroke over a brand-subtle fill. (The AI-native fully-rounded segmented treatment now lives in DS AI Segmented Control.) Icons render through the icon font catalog, tinted to the AI brand. Disabled tabs are muted and skipped by keyboard navigation. Controlled (`value`/`onChange`) or uncontrolled (`defaultValue`).

## When to use
- Switching between generated sections (Summary / Insights / Sources) on an AI surface
- An AI workspace panel that needs Solid, Outline, or Vertical tabs matching the AI look
- Tabs with joined content panels on an AI surface
- Tabs that must sit visually beside the AI Card, AI Accordion, and AI Dialog

## When not to use
- You need the neutral product tabs — use the standard `ds-tab`
- Only two mutually-exclusive options with no panels — consider a toggle/segmented control
- Primary page navigation — use a nav pattern, not tabs

## Anatomy
1. **Tablist** _(Unique)_ — role="tablist" with aria-orientation.
2. **Tab** _(Shared)_ — role="tab", aria-selected; roving tabindex (0 active, -1 others); disabled tabs skipped.
3. **Icon slot** _(Shared)_ — icon font glyph (zs-icon-*), tinted to AI brand #4D60E6.
4. **Label** _(Shared)_ — @ai-body / body-small — Regular default, SemiBold active.
5. **Active mark (AI accent line)** _(Unique)_ — A 3px absolutely-positioned <span> painted with AI.gradient.action.full inside a position:relative tab. Solid: pinned to the tab bottom (left:0; right:0; bottom:-1; height:3). Vertical: pinned to the tab left, inset 8px top/bottom (left:0; top:8; bottom:8; width:3). Both use borderRadius:3. Outline: brand gradient wash on the tab. Exact JSX is in the Code tab.
6. **Panel** _(Shared)_ — role="tabpanel" — --ai-card-bg on --ai-card-border, AI.radius rounded, active tab only.

## State variations
- **Solid** _(variant="solid")_ — Underline-bar style. Active = brand #4D60E6 SemiBold + 3px gradient bar; hover lifts a soft brand-border bar.
- **Solid With Icons** _(leftIcon/rightIcon)_ — Solid tabs carrying icon-font glyphs tinted to the AI brand.
- **Solid With Content** _(withPanel)_ — Solid tab bar over a rounded AI content panel; switching tabs swaps the panel.
- **Outline** _(variant="outline")_ — Bordered-box style. The active tab fills --ai-card-bg and merges into the rounded content container below.
- **Vertical** _(variant="vertical")_ — 200px column; active = brand SemiBold on a brand-subtle fill with a 3px gradient left stroke. Last tab disabled.
- **Six states** _(Default → Disabled)_ — All six per-tab states on the Solid style: Default (helper text), Hover (primary text + brand-border bar), Pressed (deep brand #1F2A66 bar), Active (brand #4D60E6 SemiBold + gradient bar), Focus (2px #4D60E6 ring) and Disabled (muted, not focusable).

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AITabItem[]` | `required` | Tabs — { label, leftIcon?, rightIcon?, content?, disabled? }. |
| `variant` | `'solid' \| 'outline' \| 'vertical'` | `'solid'` | Visual style. |
| `withPanel` | `boolean` | `false` | Show the joined content panel (Solid). Outline always shows it. |
| `value` | `number` | `—` | Controlled active index. |
| `defaultValue` | `number` | `0` | Uncontrolled initial active index. |
| `onChange` | `(index: number) => void` | `—` | Fires when the active tab changes. |
| `radius` | `keyof typeof AI.radius` | `'md'` | Corner radius token for Outline / panel surfaces. |

## Tokens

### AI brand accent
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#4D60E6` | Active label + icon tint |
| `AI.gradient.action.full` | `linear-gradient(135deg,#657CEC,#4D60E6)` | Accent line — top bar (Solid) & left stroke (Vertical), 3px. JSX in Code tab. |
| `AI.color.brandSubtle` | `#D2DBFF` | Vertical active tab fill |
| `AI.color.brandBorder` | `#BECAFE` | Solid hover bar |
| `AI.color.border.focus` | `#4D60E6` | Focus ring (2px offset) |

### AI surfaces, text & shape
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg` | `AI card surface` | Active tab / content panel fill |
| `--ai-card-bg-raised` | `Raised surface` | Hover fill |
| `--ai-card-border` | `AI card border` | Tab + panel borders |
| `--ai-ds-text` | `Primary text` | Default / hover label + panel body |
| `--ai-ds-helper` | `Helper text` | Inactive / disabled label |
| `AI.radius.md` | `16px` | Panel & Outline corners |

## Flows

### Switch between generated sections
Tab through the assistant's output sections on an AI surface.
- Import { AITab } from ai/organisms/ai-tab/AITab
- Pass items with a label (+ optional content / icons) per section
- Pick a variant (solid / outline / vertical) and set withPanel for a joined panel
- Click or Arrow/Home/End to move selection; the active panel swaps and disabled tabs are skipped

## Code example
```tsx
import { AITab } from 'ai/organisms/ai-tab/AITab';

// Solid tabs joined to a rounded AI content panel
<AITab
  variant="solid"
  withPanel
  items={[
    { label: 'Summary',  content: 'Concise recap of the run.' },
    { label: 'Insights', content: 'Ranked observations with impact.' },
    { label: 'Sources',  content: 'Datasets and documents used.' },
  ]}
/>

// Controlled selection
const [tab, setTab] = React.useState(0);
<AITab variant="solid" value={tab} onChange={setTab}
  items={[{ label: 'Summary' }, { label: 'Insights' }, { label: 'Sources' }]} />

// Vertical, with a disabled tab and brand-tinted icons
<AITab variant="vertical" items={[
  { label: 'Overview',  leftIcon: 'link' },
  { label: 'Territory' },
  { label: 'Settings',  disabled: true },
]} />

// ── The AI accent line (active indicator) ─────────────────────────────
// A 3px absolutely-positioned <span> painted with the brand gradient.
// The tab button is position:relative; the span is its only child mark.
const BAR = 3;
const ACCENT = 'linear-gradient(135deg,#657CEC 0%,#4D60E6 100%)'; // AI.gradient.action.full

// TOP accent (Solid) — full-width bar pinned to the bottom edge of the tab,
// sitting on top of the tablist's 1px bottom border (bottom:-1):
<button style={{ position: 'relative' /* + tab styles */ }}>
  {label}
  <span style={{
    position: 'absolute', left: 0, right: 0, bottom: -1,
    height: BAR, borderRadius: BAR,
    background: isActive ? ACCENT : 'transparent',
  }} />
</button>

// LEFT accent (Vertical) — full-height stroke pinned to the left edge,
// inset 8px top & bottom so it reads as a rounded tick:
<button style={{ position: 'relative' /* + tab styles */ }}>
  <span style={{
    position: 'absolute', left: 0, top: 8, bottom: 8,
    width: BAR, borderRadius: BAR,
    background: isActive ? ACCENT : 'transparent',
  }} />
  {label}
</button>
```

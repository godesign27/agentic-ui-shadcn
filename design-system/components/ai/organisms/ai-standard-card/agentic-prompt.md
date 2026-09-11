# Agentic Prompt — AI Card

# AI Card — Agentic Prompt

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

- **Display name:** AI Card
- **Component id:** `ai-standard-card`
- **Category:** organisms
- **Status:** Stable
- **File path:** `src/app/components/ds/ai-standard-card.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `src/app/components/ds/ai-standard-card.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Card
_ai-standard-card_

> DS Card, AI surface theme — foundational neutral gray, rounded 16px corners.

## Metadata
- **Category:** organisms
- **Status:** Stable
- **Source path:** `src/app/components/ds/ai-standard-card.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Container · Surface
- **Tier 3 · Accountability:** Custom element
- **Metrics:** 18 states · 6 shared · ~4KB context · 5 behaviors

## Overview

Themed wrapper over the real DSCard (ds/ds-card.tsx). DSCard is driven entirely by CSS custom properties; AICard scopes it inside a container that overrides those variables — radius → AI.radius.md (16px), border → var(--border) #B2B0B6 (neutral, same as DS Card) or #BECAFE (brand, via borderTone="brand"), footer → #FAFAFA (the same gray as the standard card footer, var(--surface-color-1)), body → #FFFFFF, elevation → soft neutral drop shadow. Header tones (headerTone): body (white, default), neutral (#FAFAFA), brand (var(--color-ai-brand-surface)), tan (var(--color-ai-companion-paper)); surface tones (surfaceTone): plain, brand-gradient (var(--gradient-ai-surface-subtle)), tan. All applied via scoped data-* !important rules (DSCard paints header/section backgrounds inline, so they must be overridden). The shell also composes the header (headerTitle + trailing headerActions) and offers accordion behaviour (collapsible + defaultExpanded via a chevron AIButton). overflow:hidden clips the full-bleed header/footer to the 16px radius. The AI accent (AI.color.action.primary #4D60E6, focus #A6B4FC) is kept for the active/focus states. No fork of the standard component; the structure, slots, and behavior are identical.

## When to use
- AI dashboards, insight tiles, and settings panels that sit on AI surfaces
- Grouping related content with the foundational neutral gray boundary
- borderTone="brand" + headerTone="neutral" to emphasize an AI-generated card

## When not to use
- Don't use on a standard (non-AI) surface — use <DSCard> instead
- Don't fork ds-card.tsx to restyle — theme via the CSS-variable scope
- Don't skip header text or aria-label when the card is a distinct landmark

## Anatomy
1. **Host** _(Unique)_ — AICard — inline-flex surface with AI CSS-variable scope.
2. **Header** _(Shared)_ — <header> — ~56px band; headerTone: body (white), neutral (#FAFAFA), brand (var(--color-ai-brand-surface)), tan (var(--color-ai-companion-paper)). Composes headerTitle + trailing headerActions/chevron.
3. **Body** _(Unique)_ — <section> — surfaceTone: plain white (#FFFFFF), brand-gradient (var(--gradient-ai-surface-subtle)), or tan; 16px padding, required region.
4. **Footer** _(Shared)_ — <footer> — gray fill (#FAFAFA), same as the standard card footer.
5. **Border** _(Shared)_ — 1px stroke — neutral var(--border) #B2B0B6 (same as DS Card) or brand blue #BECAFE (borderTone); 16px rounded corners. Shell only = no border.
6. **Elevation** _(Shared)_ — Soft neutral drop shadow, resting → hover.
7. **Action footer** _(Shared)_ — Footer button bar — AIButton atoms (primary Download, secondary Preview, trailing overflow) on the gray footer band.
8. **Header action** _(Shared)_ — Trailing header affordance — an info icon (Header with icon) or a primary Edit AIButton (Action header, no footer).

## State variations
- **Light** _(mode=light)_ — White body, neutral-gray header/footer, gray border, soft shadow.
- **Dark** _(mode=dark)_ — Extra-bold dark surface (#1A1628) with inverse text.
- **Active** _([active])_ — Selected — border moves to AI.color.action.primary (#4D60E6).
- **Interactive** _(interactive)_ — Focusable surface — role="button"; AI focus ring (#4D60E6).
- **Header only** _(hasFooter=false)_ — Card without footer band.
- **No header** _(hasHeader=false)_ — Provide aria-label for the landmark.
- **Brand border** _(borderTone="brand")_ — AI brand-blue resting border (#BECAFE) with the default white header/body/footer.
- **Brand dark** _(mode="dark" borderTone="brand")_ — Dark card on the AI brand-blue ramp — body var(--ai-ramp-90) #3544A4, header/footer var(--ai-ramp-80) #4D60E6, brand border (#BECAFE), inverse text.
- **Brand + gray header** _(borderTone="brand" headerTone="neutral")_ — AI brand-blue border (#BECAFE) with a neutral-gray header (#FAFAFA).
- **Brand header** _(headerTone="brand")_ — Brand-tinted header — var(--color-ai-brand-surface).
- **Tan header** _(headerTone="tan")_ — Warm companion header — var(--color-ai-companion-paper).
- **Brand gradient** _(surfaceTone="brand-gradient")_ — AI-led body surface — var(--gradient-ai-surface-subtle).
- **Header actions** _(headerActions)_ — Actions (e.g. AIButtons) pinned to the header trailing edge.
- **Collapsible** _(collapsible)_ — Accordion behaviour — chevron toggles the body/footer.
- **Action footer** _(footer=actions)_ — Footer as a button bar — primary Download, secondary Preview, trailing overflow (AIButton atoms).
- **Header with icon** _(header=icon)_ — Header title with a trailing info icon, plus the action-footer button bar.
- **Action header** _(header=action)_ — Header title with a trailing primary Edit button and no footer band.
- **Shell only** _(hasHeader=false hasFooter=false)_ — Body-only shell — no header, no footer, and no border (provide aria-label).

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'light' \| 'dark'` | `'light'` | Surface treatment; forwarded to DSCard. |
| `interactive` | `boolean` | `false` | Focusable surface; role="button" + AI focus ring. |
| `hasHeader` | `boolean` | `false` | Whether to render the <header> region. |
| `hasFooter` | `boolean` | `false` | Whether to render the <footer> region. |
| `header` | `ReactNode` | `—` | Header slot content. |
| `body` | `ReactNode` | `—` | Body slot content (required). |
| `footer` | `ReactNode` | `—` | Footer slot content. |
| `active` | `boolean` | `false` | [active] = selected card border (AI.color.action.primary). |
| `disabled` | `boolean` | `false` | Muted surface; pointer-events none. |
| `borderTone` | `'neutral' \| 'brand'` | `'neutral'` | Resting border: neutral var(--border) #B2B0B6 (same as DS Card) or AI brand blue (#BECAFE). |
| `headerTone` | `'body' \| 'neutral' \| 'brand' \| 'tan'` | `'body'` | Header fill: white (body), neutral gray (#FAFAFA), brand (var(--color-ai-brand-surface)), or tan (var(--color-ai-companion-paper)). |
| `surfaceTone` | `'plain' \| 'brand-gradient' \| 'tan'` | `'plain'` | Body surface fill: plain white, brand gradient (var(--gradient-ai-surface-subtle)), or tan. |
| `headerTitle` | `ReactNode` | `—` | Composed-header title (left). Falls back to `header` when omitted. |
| `headerActions` | `ReactNode` | `—` | Actions pinned to the header trailing edge (e.g. AIButtons). |
| `collapsible` | `boolean` | `false` | Accordion behaviour with a chevron toggle in the header. |
| `defaultExpanded` | `boolean` | `true` | Initial expanded state for a collapsible card. |
| `fullWidth` | `boolean` | `false` | Stretch the card to fill its container width. |

## Tokens

### Foundational neutral gray
| Token | Value | Usage |
| --- | --- | --- |
| `--radius` | `AI.radius.md (16px)` | Corner radius — matches other AI components |
| `--border (neutral)` | `var(--border) #B2B0B6` | Resting stroke + header/footer divider — same neutral as the standard DS Card (default) |
| `--border (brand)` | `#BECAFE` | Resting stroke — AI.color.brandBorder (borderTone="brand") |
| `--background` | `#FFFFFF` | Body surface |
| `--surface-color-1` | `#FAFAFA` | Footer / hover fill — same gray as the standard card footer |
| `header background` | `#FFFFFF / #FAFAFA` | White by default; gray via headerTone="neutral" (scoped !important) |

### Header & surface tones (globals.css vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--color-ai-brand-surface` | `#F5F6FF` | headerTone="brand" — brand-tinted header fill |
| `--color-ai-companion-paper` | `#F6F2EB` | headerTone="tan" / surfaceTone="tan" — warm companion fill |
| `--gradient-ai-surface-subtle` | `linear-gradient(135deg, #F5F6FF, #D2DBFF, #F5F6FF)` | surfaceTone="brand-gradient" — AI-led body surface |

### AI accent (active / focus)
| Token | Value | Usage |
| --- | --- | --- |
| `--primary` | `AI.color.action.primary #4D60E6` | [active] border |
| `--teal-00` | `AI.color.surface.default #F5F6FF` | [active] background |
| `--focus-outline-color` | `AI.color.border.focus #4D60E6` | Focus ring |

### Elevation
| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-flat-right-angle-2` | `0 1px 3px rgba(16,24,40,0.10)` | Resting shadow |
| `--shadow-flat-right-angle-4` | `0 4px 8px rgba(16,24,40,0.08)` | Hover shadow |

## Flows

### Render an AI-themed content card
Standard DS card structure with the AI surface theme.
- Import { AICard } from components/ds/ai-standard-card
- Provide header / body / footer slots (body required)
- Set hasHeader / hasFooter to toggle the optional bands
- Provide heading or aria-label so the card is a distinct landmark

## Code example
```tsx
import { AICard } from './components/ds/ai-standard-card';

<AICard
  hasHeader
  hasFooter
  header={<span>Card title</span>}
  body="Group related content with optional header, body, and footer slots."
  footer={<span>Footer content</span>}
/>

// Brand-blue border + neutral-gray header variant:
<AICard
  borderTone="brand"     // #A6B4FC AI brand blue @ 30 (default 'neutral' = #E5E7EB)
  headerTone="neutral"   // #FAFAFA gray header (default 'body' = white)
  hasHeader hasFooter
  header={<span>Card title</span>}
  body="Group related content…"
  footer={<span>Footer content</span>}
/>

// Header + surface tones (all colors from globals.css design-system vars):
<AICard
  headerTone="tan"                 // 'body' | 'neutral' | 'brand' | 'tan'
  surfaceTone="brand-gradient"     // 'plain' | 'brand-gradient' | 'tan'
  hasHeader header={<span>Trust summary</span>}
  body="AI-led content on a brand surface."
/>

// Composed header with trailing actions + accordion:
<AICard
  collapsible                      // chevron toggles body/footer
  defaultExpanded
  fullWidth
  headerTone="neutral"
  headerTitle={<span>Task brief</span>}
  headerActions={<AIButton variant="ghost" size="sm" label="Edit" />}
  hasFooter
  body="…"
  footer={<AIButton variant="primary" size="sm" label="Run" />}
/>

// AICard forwards all DSCardProps to the real DSCard, applying the AI
// surface theme via CSS-variable overrides — neutral gray by default (border
// #E5E7EB, footer #FAFAFA, 16px radius). Header/surface tones and the collapse
// chevron route through globals.css vars. For the un-themed card use <DSCard>.
```

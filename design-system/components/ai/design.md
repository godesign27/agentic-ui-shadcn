---
version: stable
name: Guild-AI-design-system
description: The AI brand design system — rounded corners, AI_RAMP blue/purple gradients, a warm Tan companion neutral, and an orange escalation signal, built on a calm neutral foundation. On AI-native surfaces this is the brand layer — always choose AI-brand tokens over standard DS chrome styles. Normative values live in components/ai/tokens/; UI references AI.* / CSS vars, never raw hex. Typography is Open Sans only.

# Every value below is the CURRENT resolved value from
# components/ai/tokens/ai-tokens.ts (+ tokens/css/ai-surface.css, global.css).
# In React/TSX prefer AI.* / AI_TYPOGRAPHY; in CSS prefer var(--color-ai-*) or
# var(--ai-*) from the surface theme. Never hard-code the hex shown here.

# ── Token catalog ──────────────────────────────────────────────────────────
# The AI layer is a three-tier model: Tier 1 raw palette → Tier 2 semantic (AI.*)
# → Tier 3 CSS vars (--color-ai-*). Component code references Tier 2 / Tier 3 only,
# NEVER Tier 1. Neutral non-branded tokens (background, text, border, focus, surface
# ramp) are the "AI Foundations" the brand layer sits on.

colors:

  # ── AI Foundations — neutral base (not brand; the canvas the AI layer sits on) ──
  background: "#FFFFFF"          # var(--background) — AI panels/drawers stay white
  foreground: "#2F2C3C"          # var(--foreground)
  card: "#FFFFFF"                # var(--card)
  popover: "#FFFFFF"             # var(--popover)
  # Text
  text: "#2F2C3C"               # var(--text-color)
  headline: "#1A1628"           # var(--headline-text-color)
  medium-text: "#454250"        # var(--medium-text-color)
  helper-text: "#5B5864"        # var(--helper-text-color)
  caption-text: "#716E79"       # var(--caption-text-color)
  disabled-text: "#716E79"      # var(--disabled-text-color)
  inverse-text: "#FAFAFA"       # var(--inverse-text-color)
  # Neutrals & UI
  muted: "#F4F3F3"              # var(--muted)
  border: "#B2B0B6"             # var(--border)
  border-light: "#E4E3E6"       # var(--border-light-color)
  input: "#F4F3F3"              # var(--input)
  ring: "#027AFF"               # var(--ring)
  focus-outline: "#027AFF"      # var(--focus-outline-color)
  selected: "#027AFF"           # var(--selected-color)
  # Surface ramp (light → dark; the dark steps power AI inverse/nav surfaces)
  surface-1: "#FAFAFA"         # var(--surface-color-1)
  surface-2: "#F4F3F3"         # var(--surface-color-2)
  surface-3: "#716E79"         # var(--surface-color-3)
  surface-4: "#454250"         # var(--surface-color-4)
  surface-5: "#1A1628"         # var(--surface-color-5) — nav / inverse

  # ── AI Tier 1 — raw palettes (never used directly in component code) ──────
  # AI_RAMP — brand indigo; primary accent at step 80.
  ai-ramp-00: "#F5F6FF"  # var(--ai-ramp-00) — lightest brand tint
  ai-ramp-10: "#E0E7FF"  # var(--ai-ramp-10) — brand subtle surface
  ai-ramp-20: "#D2DBFF"  # var(--ai-ramp-20)
  ai-ramp-30: "#BECAFE"  # var(--ai-ramp-30)
  ai-ramp-40: "#A6B4FC"  # var(--ai-ramp-40)
  ai-ramp-50: "#90A3F9"  # var(--ai-ramp-50)
  ai-ramp-60: "#7F95F2"  # var(--ai-ramp-60)
  ai-ramp-70: "#657CEC"  # var(--ai-ramp-70)
  ai-ramp-80: "#4D60E6"  # var(--ai-ramp-80) — primary brand accent
  ai-ramp-90: "#3544A4"  # var(--ai-ramp-90)
  ai-ramp-100: "#1F2A66" # var(--ai-ramp-100) — darkest brand ink
  # Signal Orange — signal / attention / escalation (10% role)
  signal-orange-80: "#A54F00"  # var(--signal-orange-80) — signal default (AA)
  signal-orange-60: "#EC7200"  # var(--signal-orange-60) — signal accent
  signal-orange-10: "#FFF1D6"  # var(--signal-orange-10) — signal tinted bg
  # AI_RAMP Tan — companion warm neutral (30% role)
  ai-ramp-tan-00: "#F6F2EB"  # var(--ai-ramp-tan-00) — warmest paper surface
  ai-ramp-tan-10: "#ECE6DD"  # var(--ai-ramp-tan-10) — companion card bg
  ai-ramp-tan-20: "#F1E4D0"  # var(--ai-ramp-tan-20) — companion highlight
  ai-ramp-tan-30: "#E8D6BF"  # var(--ai-ramp-tan-30) — companion border
  ai-ramp-tan-100: "#3C2A1D" # var(--ai-ramp-tan-100) — companion ink
  # Guild status anchors (semantic only; not in the 60-30-10 mix)
  zs-red-60: "#C0392B"    # error fill default (AI.color.status.error)
  zs-red-70: "#A5322A"    # error hover / pressed
  zs-green-80: "#0A6E5E"  # success fill (AA 6.16:1)
  zs-amber-80: "#8A640C"  # warning fill (AA 5.37:1)

  # ── AI Tier 2 — semantic aliases (AI.* → --color-ai-*) ───────────────────
  ai-action-primary: "#4D60E6"        # var(--color-ai-action-primary) — filled button / active chip
  ai-action-primary-hover: "#3544A4"  # var(--color-ai-action-primary-hover)
  ai-action-primary-active: "#1F2A66" # var(--color-ai-action-primary-active)
  ai-surface-default: "#F5F6FF"       # var(--color-ai-surface-default) — panel bg
  ai-surface-subtle: "#D2DBFF"        # var(--color-ai-surface-subtle) — card bg / insight fill
  ai-surface-emphasis: "#BECAFE"      # var(--color-ai-surface-emphasis) — badge fill / table header
  ai-border-default: "#4D60E6"        # var(--color-ai-border-default) — AA on white
  ai-border-strong: "#3544A4"         # var(--color-ai-border-strong)
  ai-border-focus: "#4D60E6"          # var(--color-ai-border-focus)
  ai-border-subtle: "#7F95F2"         # var(--color-ai-border-subtle) — non-text only (2.81:1)
  ai-text-primary: "#1F2A66"          # var(--color-ai-text-primary)
  ai-text-secondary: "#3544A4"        # var(--color-ai-text-secondary)
  ai-text-on-action: "#FFFFFF"        # var(--color-ai-text-on-action)
  ai-brand: "#4D60E6"                 # var(--color-ai-brand)
  ai-brand-subtle: "#D2DBFF"          # var(--color-ai-brand-subtle)
  ai-brand-surface: "#F5F6FF"         # var(--color-ai-brand-surface)
  ai-brand-border: "#BECAFE"          # var(--color-ai-brand-border)
  ai-brand-strong: "#3544A4"          # var(--color-ai-brand-strong)
  ai-brand-ink: "#1F2A66"             # var(--color-ai-brand-ink)
  ai-decorative-wash: "#A6B4FC"       # var(--color-ai-decorative-wash) — decoration only
  ai-decorative-wash-strong: "#7F95F2" # var(--color-ai-decorative-wash-strong) — decoration only
  ai-signal-default: "#A54F00"        # var(--color-ai-signal-default) — AA 5.64:1
  ai-signal-hover: "#663000"          # var(--color-ai-signal-hover)
  ai-signal-strong: "#481A00"         # var(--color-ai-signal-strong)
  ai-signal-subtle: "#FFF1D6"         # var(--color-ai-signal-subtle)
  ai-signal-surface: "#FEFBF4"        # var(--color-ai-signal-surface)
  ai-status-error: "#C0392B"          # var(--color-ai-status-error)
  ai-status-error-hover: "#A5322A"    # var(--color-ai-status-error-hover)
  ai-status-success: "#0A6E5E"        # var(--color-ai-status-success)
  ai-status-warning: "#8A640C"        # var(--color-ai-status-warning)
  ai-companion-paper: "#F6F2EB"       # var(--color-ai-companion-paper) — Tan, accent only
  ai-companion-surface: "#ECE6DD"     # var(--color-ai-companion-surface)
  ai-companion-highlight: "#F1E4D0"   # var(--color-ai-companion-highlight)
  ai-companion-border: "#E8D6BF"      # var(--color-ai-companion-border)
  ai-companion-ink: "#3C2A1D"         # var(--color-ai-companion-ink)

gradients:
  # Gradients are a primary expression of the AI brand (AI.gradient.* → --gradient-ai-*).
  ai-action-full: "linear-gradient(135deg, #657CEC 0%, #4D60E6 100%)"                 # var(--gradient-ai-action-full)
  ai-action-secondary: "linear-gradient(135deg, #7F95F2 0%, #657CEC 50%, #4D60E6 100%)" # var(--gradient-ai-action-secondary)
  ai-surface-idle: "linear-gradient(to bottom, #F3FCFE, #F9FAFB, #FFFFFF)"            # var(--gradient-ai-surface-idle)
  ai-surface-active: "linear-gradient(to bottom, #FFFFFF 0%, #F5FBFC 55%, #EDF8FA 100%)" # var(--gradient-ai-surface-active)
  ai-surface-subtle: "linear-gradient(135deg, #F5F6FF 0%, #D2DBFF 50%, #F5F6FF 100%)"  # var(--gradient-ai-surface-subtle)
  ai-surface-neutral: "linear-gradient(135deg, #F4F3F3 0%, #E8E7EA 100%)"             # var(--gradient-ai-surface-neutral)

elevation:
  # Foundation shadows (neutral lift) — shared product chrome
  sm: "0 0 1px rgba(0,0,0,.04), 0 0 2px rgba(26,22,40,.12), 0 2px 4px rgba(26,22,40,.12)"   # var(--elevation-sm)
  lg: "0 0 1px rgba(0,0,0,.04), 0 2px 6px rgba(26,22,40,.12), 0 10px 20px rgba(26,22,40,.18)" # var(--elevation-lg)
  # AI layer (AI.shadow.* → --elevation-ai-*) — brand-tinted lift
  ai-action-default: "rgba(77, 96, 230, 0.18)"   # var(--elevation-ai-action-default)
  ai-action-emphasis: "rgba(77, 96, 230, 0.24)"  # var(--elevation-ai-action-emphasis)
  ai-input-default: "0 0 0 1.5px rgba(26,22,40,0.18), 0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.05)"  # var(--elevation-ai-input-default)
  ai-input-focus: "0 0 0 2px rgba(77,96,230,0.35), 0 12px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)"    # var(--elevation-ai-input-focus)
  ai-field-default: "0 0 0 1px #BECAFE"                       # var(--elevation-ai-field-default)
  ai-field-focus: "0 0 0 1px #FFFFFF, 0 0 0 3px #3544A4"      # var(--elevation-ai-field-focus)
  ai-field-warning: "0 0 0 1px #8A640C"                       # var(--elevation-ai-field-warning)
  ai-field-error: "0 0 0 1px #C0392B"                         # var(--elevation-ai-field-error)
  ai-card-default: "0 1px 4px 0 rgba(77, 96, 230, 0.10)"      # var(--elevation-ai-card-default)
  ai-card-raised: "0 4px 16px 0 rgba(77, 96, 230, 0.14)"      # var(--elevation-ai-card-raised)

dataviz:
  # Categorical chart series (DATAVIZ). Chart / tile use only — never interactive UI.
  cat-1: "#DB6C03"
  cat-2: "#3287C4"
  cat-3: "#8D38FC"
  cat-4: "#2DA40C"
  cat-5: "#ED39DB"
  cat-6: "#764204"
  cat-7: "#686EFF"
  cat-8: "#566C32"
  cat-9: "#BC5422"
  cat-10: "#299C91"
  cat-11: "#FD595F"
  cat-12: "#795106"

typography:
  # Open Sans only, across all weights (var(--font-weight-*)).
  h1:    { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 48px, fontWeight: 500, lineHeight: 1.5 } # var(--text-2xl)
  h2:    { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 32px, fontWeight: 500, lineHeight: 1.5 } # var(--text-xl)
  h3:    { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 24px, fontWeight: 500, lineHeight: 1.5 } # var(--text-lg)
  h4:    { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 16px, fontWeight: 500, lineHeight: 1.5 } # var(--text-base)
  body:  { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 16px, fontWeight: 400, lineHeight: 1.5 } # var(--text-base)
  body-compact: { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  button: { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 14px, fontWeight: 600, lineHeight: 1.0 }
  table-header: { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 14px, fontWeight: 700, lineHeight: 1.33 }
  metric: { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 22px, fontWeight: 600, lineHeight: 1.2 }
  caption: { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 12px, fontWeight: 500, lineHeight: 1.33 } # 12px floor
  eyebrow: { fontFamily: "Open Sans, system-ui, sans-serif", fontSize: 12px, fontWeight: 600, lineHeight: 1.33, letterSpacing: 0.4em, textTransform: uppercase }

rounded:
  # AI is ALWAYS rounded. Every AI surface, card, panel, and control resolves to
  # AI.radius.* / var(--radius-ai-*). Never use square corners on AI surfaces.
  ai-xs:     6px    # var(--radius-ai-xs)
  ai-sm:     12px   # var(--radius-ai-sm)
  ai-md:     16px   # var(--radius-ai-md)
  ai-lg:     20px   # var(--radius-ai-lg)
  ai-full:   100px  # var(--radius-ai-full)

spacing:
  # Prefer tokens/spacing.md; recommended 4px-rhythm ladder below.
  xxs: 4px
  xs:  8px
  sm:  12px
  md:  16px
  lg:  24px
  xl:  32px
  xxl: 48px
  section: 64px

components:
  button:
    background: "{gradients.ai-action-full}"
    textColor: "{colors.ai-text-on-action}"
    typography: "{typography.button}"
    rounded: "{rounded.ai-md}"
    elevation: "{elevation.ai-action-default}"
  input:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.ai-border-default}"
    rounded: "{rounded.ai-lg}"
    elevation: "{elevation.ai-input-default}"
  card:
    backgroundColor: "{colors.background}"
    accent: "{colors.ai-companion-highlight}"
    rounded: "{rounded.ai-md}"
    elevation: "{elevation.ai-card-default}"
  toolbar:
    backgroundColor: "{colors.background}"
    inverseBackground: "{colors.surface-5}"
    dividerColor: "{colors.border}"
    rounded: "{rounded.ai-md}"
    elevation: "{elevation.ai-card-default}"
  sidebar:
    backgroundColor: "{colors.surface-5}"
    textColor: "{colors.inverse-text}"
    accent: "{colors.ai-brand}"
---

# Guild Agentic AI Design System — design.md

**Audience:** AI agents generating or modifying **AI-native** Guild product UI.

**Authority:** Agent context layer — not a second source of truth. Normative values live in
`components/ai/tokens/`, per-component `*.md` / `*.agent.json`, co-located TSX, and
`{slug}.preview.html`. If anything disagrees with those sources (or `src/` for standard
product UI), follow those sources.

**Strategy companion:** [`design-intent.md`](../../design-intent.md) — maturity spectrum,
pattern catalog, governance (L3), and brand dimensions.

**Standard DS chrome:** For tables, fields, nav shells, and non-AI product UI, read
[`../design.md`](../design.md). Compose AI surfaces **on** standard layout where appropriate.

**Index:** [`llms.txt`](llms.txt) · Registry: [`registry.v1.2.json`](registry.v1.2.json).

---

## Overview

Guild AI is a **calm, governed enterprise AI design system.** On AI-native surfaces there
is one brand — the **AI brand** — expressed as **rounded corners** (`var(--radius-ai-*)` /
`AI.radius.*`), **AI_RAMP blue/purple gradients**, a warm **Tan companion** neutral, and a
single **orange escalation signal**, all sitting on a quiet neutral foundation (white
canvases, default ink, subtle borders). Rounded-and-gradient reads as "the AI at work" —
considered, trustworthy, and distinctly branded.

> **On AI-native UI, always choose AI-brand tokens** over standard DS teal / square-corner
> chrome. Standard product UI remains the product shell for non-AI chrome — see
> [`../design.md`](../design.md). For AI surfaces, see
> [AI vs standard DS chrome](#ai-vs-standard-ds-chrome).

**Source of truth for values:** [`tokens/ai-tokens.ts`](tokens/ai-tokens.ts),
[`tokens/ai-typography.ts`](tokens/ai-typography.ts), and CSS under [`tokens/css/`](tokens/css/)
(`ai-surface.css`, `ai-component-tokens.css`, `global.css`). Components reference `AI.*` or
`var(--…)` — never raw hex. Hex values in this document are *current* resolved values for
reference only.

Density is moderate and information-forward — this is enterprise software, not a marketing
site — but AI surfaces deliberately slow down: more radius, more air, a gradient wash, and
visible reasoning. Elevation is expressed with **shadows, not borders**, and AI lift is
brand-tinted so depth reads as "AI presence" rather than generic depth.

**Key Characteristics:**
- One brand: the AI brand (`var(--color-ai-action-primary)` #4D60E6) on neutral foundations.
- **AI is always rounded** — every AI surface and control uses `var(--radius-ai-*)`.
- Open Sans only, weights 300 / 400 / 500 / 600 / 700, with a hard **12px floor**.
- Elevation is shadow-based; AI elevation is brand-tinted (`rgba(77,96,230,…)`).
- The AI layer follows a fixed **60-30-10** palette rhythm: AI_RAMP brand 60% · Tan companion
  30% · orange signal 10%.
- **AI panels and drawers stay white** — Tan is an accent for smaller moments (card/section
  headers, chips), never a panel fill.
- The AI brand can be applied as a **gradient background** on hero / AI-native / feature
  moments where it makes sense.
- Three-tier token model: raw ramp → semantic → component. Component code references the
  semantic (Tier 2) tokens only, never the raw ramp.

## Design Principles

The AI brand is governed by a small set of principles. When a visual choice is ambiguous,
resolve it in favor of these.

- **Clarity.** Prioritize legibility, contrast, and hierarchy over decoration. Clear labels,
  predictable structure, visible affordances.
- **Consistency.** Reuse the same tokens, spacing rhythm, and component patterns everywhere —
  never a one-off value where a token exists.
- **Predictability.** The same element behaves the same way in every context, so both people
  and AI agents can rely on it.
- **Reusability.** Compose from the documented tokens and components; define a thing once and
  reuse it rather than re-styling.
- **Accessibility is non-negotiable.** Every surface meets the baseline in
  [Accessibility](#accessibility) — it is a requirement, not a polish step.
- **Constraint-driven.** The token system is deliberately limited. Working within it (no
  freeform hex, no off-scale type, no arbitrary spacing) is what keeps products coherent.
- **Tokens are the source of truth.** Every AI visual decision flows from
  `components/ai/tokens/` (`AI.*` / CSS vars); do not invent hex, radii, or type sizes.

## AI vs standard DS chrome

Standard product UI (teal primary, product tables/fields/nav) remains the **product shell**.
**AI-native surfaces** must not borrow DS brand chrome for identity.

| On AI-native surfaces, do not use | Use instead |
|---|---|
| DS teal primary / interactive primary | `AI.color.action.primary` / `var(--color-ai-action-primary)` #4D60E6 |
| DS teal accents as AI identity | AI brand + signal tokens (`var(--color-ai-signal-*)` for escalation only) |
| Square corners on AI cards/controls | `AI.radius.*` / `var(--radius-ai-*)` — AI is always rounded |
| Plain DS tabs as AI identity | `ai-tab` / AI-styled tabs with `var(--color-ai-*)` |
| DS link ramp as AI text identity | `var(--color-ai-text-secondary)`, `var(--color-ai-brand)` |

Neutral foundation tokens (white canvas, text ramp, border, focus `#027AFF`, surface ramp,
spacing, type scale, data-viz) are the **shared base** the AI brand sits on — keep them.
When embedding AI in product chrome, compose AI groups **on** standard layout
([`../design.md`](../design.md)).

## Colors

> **Source of truth:** [`tokens/ai-tokens.ts`](tokens/ai-tokens.ts) + [`tokens/css/`](tokens/css/).
> In TSX use `AI.color.*` / `AI.gradient.*` / `AI.shadow.*` / `AI.radius.*`. In CSS use
> `var(--color-ai-*)` (global handoff) or `var(--ai-*)` (surface theme). Never hard-code hex.

### AI Brand & Accent
- **AI Action Blue** (`var(--color-ai-action-primary)` — #4D60E6): The single brand color.
  Powers AI actions, gradients, active states, and identity marks. Hover
  `var(--color-ai-action-primary-hover)` (#3544A4), active
  `var(--color-ai-action-primary-active)` (#1F2A66).
- **AI Brand family** (`var(--color-ai-brand)` — #4D60E6 → `-subtle` #D2DBFF →
  `-surface` #F5F6FF → `-border` #BECAFE → `-strong` #3544A4 → `-ink` #1F2A66): the full
  brand ramp for tinted fills, borders, and emphasis.
- **Orange Signal** (`var(--color-ai-signal-default)` — #A54F00): the escalation / attention
  color (the 10% role). Reserved for genuine hand-off / approval moments — never decorative.

### Surface
- **AI surface** (`var(--color-ai-surface-default)` — #F5F6FF): the pale blue wash behind AI
  content; deepens through `-subtle` (#D2DBFF) → `-emphasis` (#BECAFE).
- **AI companion (Tan)** (`var(--color-ai-companion-paper)` — #F6F2EB → `-highlight` #F1E4D0):
  a warm neutral **accent** — card/section headers, chips, small companion moments. **Never a
  panel or drawer background.**
- **Inverse / nav surface** (`var(--surface-color-5)` — #1A1628): the dark surface for
  navigation, sidebars, and inverse toolbars. Text on it is `var(--inverse-text-color)`
  (#FAFAFA).

### Text
- **AI text** (`var(--color-ai-text-primary)` — #1F2A66 / `-secondary` #3544A4 / `-on-action`
  #FFFFFF): the AI layer's text ramp for headings, labels, and text on filled actions.
- **Foundation text** (`var(--text-color)` / `var(--foreground)` — #2F2C3C): default body
  ink; `var(--headline-text-color)` (#1A1628) for headings; `var(--medium-text-color)`
  (#454250) and `var(--helper-text-color)` (#5B5864) for secondary/supporting copy;
  `var(--caption-text-color)` / `var(--disabled-text-color)` (#716E79) for captions/disabled;
  `var(--inverse-text-color)` (#FAFAFA) on dark surfaces.

### Status
AI status lives at `var(--color-ai-status-*)`:

| Status | Token | Value |
|---|---|---|
| **Error** | `var(--color-ai-status-error)` / `-hover` | #C0392B / #A5322A |
| **Success** | `var(--color-ai-status-success)` | #0A6E5E (AA 6.16:1) |
| **Warning** | `var(--color-ai-status-warning)` | #8A640C (AA 5.37:1) |

Status field rings use `var(--elevation-ai-field-warning)` / `-error`.

### AI Foundations (neutral base)
Non-branded tokens the AI layer builds on — keep these; they are not deprecated.
- **Canvas:** `var(--background)` / `var(--card)` / `var(--popover)` (#FFFFFF) — AI panels
  and drawers stay white.
- **Borders:** `var(--border)` (#B2B0B6) for control/container edges;
  `var(--border-light-color)` (#E4E3E6) for quiet dividers and card edges.
- **Inputs:** `var(--input)` (#F4F3F3) fill on white.
- **Focus/selection:** `var(--focus-outline-color)` / `var(--ring)` / `var(--selected-color)`
  (#027AFF).
- **Surface ramp:** `var(--surface-color-1…5)` (#FAFAFA → #1A1628) — the light steps are
  quiet fills; the dark steps power AI inverse/nav surfaces.

### Brand Gradient
**Gradients are a primary expression of the AI brand.** Apply the action/brand gradients as
a **background** on AI-native surfaces, heroes, launch moments, and feature framing where it
makes sense.
- **Action** (`var(--gradient-ai-action-full)` — `linear-gradient(135deg,#657CEC,#4D60E6)`):
  AI buttons and identity moments.
- **Surface washes** (`var(--gradient-ai-surface-idle)` / `-active` / `-subtle`): soft
  vertical/diagonal washes behind AI content.

## Typography

### Font Family
- **All text**: `"Open Sans", system-ui, sans-serif` — use `AI_TYPOGRAPHY` /
  [`tokens/ai-typography.ts`](tokens/ai-typography.ts) and `@ai-*` spreads. Weights:
  300 / 400 / 500 / 600 / 700. **No other font family is permitted for body/UI text.**
- **Icons**: Guild `zs-icon-*` catalog (see [`../atoms/icons.md`](../atoms/icons.md)).
  Icon glyphs are exempt from the 12px text floor.

### Hierarchy

Type scale tokens: `var(--text-xs)` 12 · `var(--text-base)` 16 · `var(--text-lg)` 24 ·
`var(--text-xl)` 32 · `var(--text-2xl)` 48. The AI type scale mirrors these as
`var(--ai-ramp-font-size-12 … --ai-ramp-font-size-64)` for CSS-driven AI surfaces.

| Token / role | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `h1` (`--text-2xl`) | 48px | 500 | 1.5 | Page title |
| `h2` (`--text-xl`) | 32px | 500 | 1.5 | Section header |
| `h3` (`--text-lg`) | 24px | 500 | 1.5 | Subsection header |
| `h4` / `label` / `button` (`--text-base`) | 16px | 500 | 1.5 | Minor header, control labels |
| Body | 16px | 400 | 1.5 | Long-form reading, chat/message body |
| Body compact | 14px | 400 | 1.5 | Workhorse: cards, lists, table cells |
| Component button label | 14px | 600 | 1.0 | Buttons inside dense surfaces |
| Table header | 14px | 700 | 1.33 | Column headers · uppercase |
| Metric value | 22px | 600 | 1.2 | KPI / stat tiles |
| Meta / caption / helper | 12px | 500 | 1.33 | Metadata, captions, helper text |
| Eyebrow / overline | 12px | 600 | 1.33 | Uppercase · 0.4em tracking |

### Principles
- **12px is a hard floor.** Never 10px or 11px, anywhere. Never odd tiers (13/15px) — snap to
  **12 / 14 / 16 / 24 / 32 / 48**.
- **Structural vs component text.** Page titles, section headers, and standalone prose use the
  fixed element scale and do **not** shrink because they sit near a dense panel. Text *inside*
  a card, table, chip, or field uses the compact scale (14px workhorse, 16px long-form, 12px
  metadata).
- **Weight compensates for size.** Anything below 14px uses Medium (500) minimum; component
  headings step up to Bold (700); eyebrows/overlines are Semibold (600).
- **Line height is context-specific.** 1.5 default for structural text; 1.33 minimum inside
  space-constrained components; single-line control tokens use 1.0.

### Note on Font Substitutes
Open Sans is the only UI face. If a face fails to load, fall back to `system-ui` then
generic `sans-serif`; do **not** introduce a third family. Prefer `AI_TYPOGRAPHY['@ai-*']`
spreads — no raw `fontSize` / `fontWeight` in component code.

## Layout

### Spacing System
- **Base unit:** 4px / 8px rhythm (see [`tokens/spacing.md`](tokens/spacing.md)). Prefer
  documented multiples only — never arbitrary gaps (`13px`, etc.).
- **Tokens (recommended ladder):** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}`
  12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}`
  48px · `{spacing.section}` 64px.
- **Card padding:** AI cards lean to the higher end (20–24px) for a calmer feel.
- **Rhythm rule:** round pixel line-heights and vertical gaps to the nearest **4px**.

### Grid & Container
- Enterprise app layout: a persistent dark sidebar/nav (`var(--surface-color-5)`), a top
  region, and a fluid content area. Content is information-forward and multi-column where the
  data warrants it.
- AI surfaces widen the gutters and add radius for a slower, more deliberate cadence.

### Whitespace Philosophy
AI surfaces are calm and spacious: more padding, more radius, and a gradient or Tan-accented
header to signal "the AI is doing considered work here."

## Elevation & Depth

Elevation is expressed with **shadows, not borders.** Lift cards, panels, popovers, inputs,
and raised surfaces with the shadow tokens below; AI lift is brand-tinted so depth reads as
AI presence.

| Level | Token | Value / Treatment | Use |
|---|---|---|---|
| Flat | — | no shadow | Body sections, full-bleed nav, inline content |
| Small | `var(--elevation-sm)` | `0 0 1px rgba(0,0,0,.04), 0 0 2px rgba(26,22,40,.12), 0 2px 4px rgba(26,22,40,.12)` | Raised tiles (foundation) |
| Large | `var(--elevation-lg)` | `0 0 1px rgba(0,0,0,.04), 0 2px 6px rgba(26,22,40,.12), 0 10px 20px rgba(26,22,40,.18)` | Modals, popovers, menus |
| AI card | `var(--elevation-ai-card-default)` / `-raised` | `0 1px 4px rgba(77,96,230,.10)` / `0 4px 16px rgba(77,96,230,.14)` | AI cards |
| AI input | `var(--elevation-ai-input-default)` / `-focus` | brand-tinted ring + soft ambient shadow | AI chat / field inputs |
| AI action | `var(--elevation-ai-action-default)` / `-emphasis` | `rgba(77,96,230,.18)` / `.24` | AI buttons |

**Shadow philosophy.** Soft ambient shadows (`--elevation-sm/-lg`) belong to floating
surfaces (cards, modals, menus). The AI layer re-tints its shadows toward the brand blue
(`rgba(77,96,230,…)`) so an AI element lifts with a faint blue glow rather than neutral gray —
a quiet, consistent "AI is here" cue. **Prefer shadow over border for lift.**

### Decorative Depth
- **AI gradient washes** (`AI.gradient.surface.*` / `var(--gradient-ai-surface-*)`) supply
  atmosphere on AI surfaces — the only decorative backgrounds in the system.
- **Surface-color change** (light card on white, dark sidebar) creates hierarchy without extra
  chrome.
- **Reduced motion:** all AI motion respects `@media (prefers-reduced-motion: reduce)` and
  `AI.motion.*` timings in [`tokens/motion.md`](tokens/motion.md).

## Shapes

**AI is always rounded.** Reading a rounded corner is part of the AI brand signal.

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `var(--radius-ai-xs)` | 6px | AI insight-card accents |
| `var(--radius-ai-sm)` | 12px | AI badges, loader pills |
| `var(--radius-ai-md)` | 16px | AI buttons, chips, chat input |
| `var(--radius-ai-lg)` | 20px | AI panels, empty-state input |
| `var(--radius-ai-full)` | 100px | AI pill chips |

> **AI components always use corner radius — never square corners.** Every AI surface, card,
> panel, and control resolves to `AI.radius.*` / `var(--radius-ai-*)`. Do not use square DS
> chrome corners on AI-native UI.

### Geometry
- AI controls carry the rounded scale; the larger the surface, the larger the radius (chip →
  `ai-sm/md`, panel → `ai-lg`, pill → `ai-full`).

## Motion

Motion on the AI layer is purposeful and restrained — it guides attention (a result arriving,
a panel opening, a state changing), never decorates. Keep it subtle and functional.

| Type | Duration | Curve | Use |
|---|---|---|---|
| **Fast** | 150–250 ms | ease-out | Micro-interactions — hover, focus, press, chip toggles |
| **Medium** | 300–400 ms | ease-in-out | Modal / drawer / panel transitions |
| **Slow** | 600 ms+ | linear | Background fades, ambient AI "thinking" states |

- **Reduced motion is honored.** Never override or defeat `prefers-reduced-motion`. Prefer
  `AI.motion.icon.*` timings from [`tokens/ai-tokens.ts`](tokens/ai-tokens.ts).
- **No autoplay without controls**, and never rely on motion alone to convey meaning — pair it
  with a color/text/state change that survives reduced-motion.

> Prefer documented `AI.motion.*` values over inventing durations. See [`tokens/motion.md`](tokens/motion.md).

## Components

> Every component resolves entirely to tokens — AI brand tokens on the neutral foundation.

### Buttons

**`button`** — The AI action. Background `var(--gradient-ai-action-full)` (blue/purple
gradient), text `var(--color-ai-text-on-action)`, `{typography.button}` (14 / 600),
`var(--radius-ai-md)` (16px), lifted with `var(--elevation-ai-action-default)` (blue-tinted).
The gradient + radius is the AI action signal. Focus draws `var(--focus-outline-color)`.

### Inputs & Forms

**`input`** — The AI chat / field input. White background, `var(--radius-ai-lg)` (20px),
lifted with `var(--elevation-ai-input-default)` (a soft brand-tinted ring). Focus swaps to
`var(--elevation-ai-input-focus)`; validation uses `var(--elevation-ai-field-warning/-error)`.

### Cards & Containers

**`card`** — White background, `var(--radius-ai-md)` (16px), `var(--elevation-ai-card-default)`
(blue-tinted). Its **header** may use the Tan companion accent
(`var(--color-ai-companion-highlight)`) — one of the sanctioned "smaller moments" for Tan. The
card body **stays white**.

### Navigation

**`sidebar` / nav** — Background `var(--surface-color-5)` (#1A1628), text
`var(--inverse-text-color)`, accent `var(--color-ai-brand)`. The system's primary dark
surface. `var(--navigation-background-color)` mirrors it.

**`toolbar`** — Horizontal or vertical strip of icon-link actions with optional labels (none /
below / right), dividers, and a light or dark (inverse) theme. Light: background
`var(--background)`, divider `var(--border)`; dark: background `var(--surface-color-5)`,
divider `var(--medium-text-color)`. Lifted with `var(--elevation-ai-card-default)`. Each item
resolves its own live state (default / hover / pressed / selected / focused / disabled) —
selected & hover use `var(--color-ai-action-primary)` fill; focus draws an inset
`var(--focus-outline-color)` ring. Labels are Open Sans 12 / Bold.

### AI feedback & content

**AI insight / badge / loader** — Rounded surfaces (`var(--radius-ai-sm)`), keyed to the AI
surface wash (`var(--color-ai-surface-default)`) and brand text (`var(--color-ai-text-primary)`).
A `.dark` scope overrides these for dark backgrounds (translucent fills, lightened brand text
such as `#9AABFF`) via the `--ai-insight-*` / `--ai-badge-*` / `--ai-picker-*` component vars.

**Escalation / signal** — When AI hands off to a human or requests approval, use the orange
signal: `var(--color-ai-signal-default)` (#A54F00) text over `var(--color-ai-signal-subtle)`
(#FFF1D6) background. Authoritative without alarm — and strictly ≤10% of the surface.

## Do's and Don'ts

### Do
- Reference `AI.*` or CSS vars (`var(--color-ai-action-primary)` / `var(--ai-action-primary)`),
  never raw hex.
- Use AI-brand tokens for every AI-branded moment; when a DS chrome token and an AI token
  both exist for the same AI purpose, choose the AI one.
- Keep **AI panels and drawers white**.
- Use the Tan companion only for **smaller moments** — card headers, section headers, chips.
- Apply the AI brand as a **gradient background** on hero / AI-native / feature moments where
  it makes sense.
- Always give AI components an `AI.radius.*` / `var(--radius-ai-*)` corner radius.
- Express elevation with **shadows** (`AI.shadow.*`), tinting AI lift toward brand blue.
- Hold the AI layer to the **60-30-10** ratio; visually verify before every screen review.
- Keep type on Open Sans and respect the **12px floor** and the documented size ladder.
- Open `{slug}.preview.html` when validating states.

### Don't
- Don't use **standard DS teal / square chrome** as AI identity on AI-native surfaces.
- Don't render **square corners on AI** components — AI is always rounded.
- Don't hard-code hex.
- Don't fill AI **drawer or panel backgrounds with Tan** — those surfaces stay white.
- Don't use raw Tier-1 ramp values (`AI_RAMP[80]`, `--ai-ramp-80`) in component code — use Tier-2
  `AI.*` / `--color-ai-*`.
- Don't apply the AI orange **signal** to backgrounds, data fills, or informational states —
  only to actionable escalation moments, and never above 10%. Orange is **not** semantic
  warning (warning = Dark Yellow / `AI.color.status.warning` #8A640C).
- Don't introduce a font family other than Open Sans, and never go below 12px.
- Don't lean on borders where a shadow conveys the lift.
- Don't invent components — check [`llms.txt`](llms.txt) first.

## Accessibility

Every generated surface meets **WCAG 2.2 AA** as a baseline — this is a requirement, not a
finishing touch. The token system is built to make compliance the default path.

### Color & contrast
- **Body/UI text ≥ 4.5:1**, large text (≥24px, or ≥19px bold) **≥ 3:1**, and non-text UI
  (icons, control borders, focus rings) **≥ 3:1** against their background.
- The AA-safe tokens are called out in the catalog — e.g. `var(--color-ai-signal-default)`
  (#A54F00, 5.64:1), `var(--color-ai-status-success)` (#0A6E5E, 6.16:1),
  `var(--color-ai-status-warning)` (#8A640C, 5.37:1). Low-emphasis tokens such as
  `var(--color-ai-border-subtle)` (#7F95F2, 2.81:1) are **non-text only** — never body text.
- Never signal state with color alone; pair it with text, an icon, or shape.

### Keyboard & focus
- All interactive elements are reachable and operable by keyboard in a logical tab order.
- Focus is **always visible** — draw it with `var(--focus-outline-color)` / `var(--ring)`
  (#027AFF) as a ≥2px outline. Do not remove outlines without an equivalent visible
  replacement.

### Screen readers & semantics
- Use semantic HTML first (`<button>`, `<nav>`, `<label>`, headings in order); add ARIA roles
  and labels only to fill gaps.
- Give dynamic AI output (streaming responses, status changes) an appropriate live region so
  it is announced.
- Every image/icon carries meaningful `alt` (or is marked decorative).

### Forms
- Every field has a programmatically associated `<label>`; error messages are linked to their
  input and not conveyed by color alone; required fields and help text are explicit. Validation
  rings use `var(--elevation-ai-field-warning)` / `-error`.

### Motion
- Respect `prefers-reduced-motion`; keep essential motion only. See [Motion](#motion) and
  [`tokens/motion.md`](tokens/motion.md).

## Responsive Behavior

- **Layout:** desktop dashboard shell (persistent dark sidebar / `AILedNavigation` + fluid
  content). On narrow viewports collapse to icon rail, drawer, or stacked command-center
  patterns — follow the page/pattern specs.
- **Toolbars:** horizontal and vertical orientations; pick what matches the surface
  (`ai-toolbar`).
- **Touch targets:** comfortable hit areas (~44–56px where icons are primary affordances).
- **Spacing:** tighten the 4px-rhythm ladder one step at smaller breakpoints rather than
  inventing off-grid values.
- **Type:** structural headings may step down one tier on small screens but never below the
  12px floor.
- **Trust signals:** do not hide rationale / sources / approval on small screens — move
  secondary metadata into disclosures.

## Voice & Tone

Copy is part of the design. Keep it short, plain, and actionable — conversational but
professional. Use **sentence case** for buttons, labels, and headings. Avoid jargon except in
explicitly developer-facing UI. For AI surfaces specifically, be transparent about what the AI
is doing and calm when asking for a decision.

| Context | Tone | Example |
|---|---|---|
| **Success** | Encouraging | "Done — your changes are saved." |
| **Error** | Calm, helpful | "We couldn't save that. Try again." |
| **Empty state** | Empathetic | "Nothing here yet — let's add something." |
| **Loading** | Reassuring | "Working on it…" |
| **Confirmation** | Clear, direct | "Delete this item? This can't be undone." |
| **AI escalation** | Authoritative, not alarming | "This needs your approval before I continue." |

## Iteration Guide

1. Change ONE token or component at a time; reference `AI.*` or `var(--color-ai-*)` /
   `var(--radius-ai-*)`.
2. Use AI-brand tokens on AI surfaces; do not reach for DS teal identity tokens.
3. Never inline hex — the token is the contract.
4. AI stays rounded (`AI.radius.*`) — never square.
5. Express lift with shadows, not borders; tint AI lift toward `rgba(77,96,230,…)`.
6. Hold the 60-30-10 ratio and keep panels/drawers white — Tan only on card/section headers
   and chips.
7. Reserve the orange signal for genuine escalation/approval moments (≤10%).
8. Keep all text on Open Sans; snap sizes to the documented ladder and weights
   300/400/500/600/700.
9. Read [`design-intent.md`](../../design-intent.md) for maturity mode + L3 governance before
   inventing a new AI workflow.

## Known Gaps

- **Spacing ladder** is documented in [`tokens/spacing.md`](tokens/spacing.md); prefer that
  over inventing values.
- **Component tokens (Tier 3)** are defined per-component in specs rather than centrally;
  this document names the mapping pattern (semantic → component slot).
- **Dark-mode coverage** is scoped (`data-theme` / `.dark` surfaces for insight/badge/picker);
  not every component is exhaustively dark-tokenized.
- **Tier-1 ramps** (`AI_RAMP`, `SIGNAL_ORANGE`, `COMPANION_TAN`, …) are never for component code — use
  Tier-2 `AI.*` only.
- **Data-viz palettes** are chart/tile only — never interactive UI, brand, or status.

## Token Quick Reference

Flat, copy-paste index of every published token. Reference the **CSS variable** in code; the
value shown is the current resolved value only. Never hard-code the hex.

### AI Foundations — neutral base

| CSS Variable | Value | Usage |
|---|---|---|
| `--background` | #FFFFFF | Page / canvas / AI panel background |
| `--foreground` | #2F2C3C | Default body text |
| `--card` | #FFFFFF | Card surface |
| `--popover` | #FFFFFF | Popover / menu surface |
| `--text-color` | #2F2C3C | Body text |
| `--headline-text-color` | #1A1628 | Headings |
| `--medium-text-color` | #454250 | Secondary copy |
| `--helper-text-color` | #5B5864 | Supporting copy |
| `--caption-text-color` | #716E79 | Captions |
| `--disabled-text-color` | #716E79 | Disabled text |
| `--inverse-text-color` | #FAFAFA | Text on dark surfaces |
| `--muted` | #F4F3F3 | Quiet fill |
| `--border` | #B2B0B6 | Control / container border |
| `--border-light-color` | #E4E3E6 | Quiet divider / card edge |
| `--input` | #F4F3F3 | Input fill |
| `--focus-outline-color` | #027AFF | Focus outline |
| `--ring` | #027AFF | Focus ring |
| `--selected-color` | #027AFF | Selection |

### AI Foundations — surface ramp & elevation

| CSS Variable | Value | Usage |
|---|---|---|
| `--surface-color-1` | #FAFAFA | Lightest raised surface |
| `--surface-color-2` | #F4F3F3 | Subtle fill |
| `--surface-color-3` | #716E79 | Mid neutral |
| `--surface-color-4` | #454250 | Dark chrome |
| `--surface-color-5` | #1A1628 | Nav / sidebar / inverse |
| `--elevation-sm` | `0 0 1px rgba(0,0,0,.04), 0 0 2px rgba(26,22,40,.12), 0 2px 4px rgba(26,22,40,.12)` | Raised tiles |
| `--elevation-lg` | `0 0 1px rgba(0,0,0,.04), 0 2px 6px rgba(26,22,40,.12), 0 10px 20px rgba(26,22,40,.18)` | Modals, popovers, menus |

### AI Tier 1 — raw palettes (never referenced in component code)

| CSS Variable | Value | Usage |
|---|---|---|
| `--ai-ramp-00` | #F5F6FF | Lightest brand tint |
| `--ai-ramp-10` | #E0E7FF | Brand subtle surface |
| `--ai-ramp-20` | #D2DBFF | — |
| `--ai-ramp-30` | #BECAFE | — |
| `--ai-ramp-40` | #A6B4FC | — |
| `--ai-ramp-50` | #90A3F9 | — |
| `--ai-ramp-60` | #7F95F2 | — |
| `--ai-ramp-70` | #657CEC | — |
| `--ai-ramp-80` | #4D60E6 | Primary brand accent |
| `--ai-ramp-90` | #3544A4 | — |
| `--ai-ramp-100` | #1F2A66 | Darkest brand ink |
| `--signal-orange-80` | #A54F00 | Signal default (AA) |
| `--signal-orange-60` | #EC7200 | Signal accent |
| `--signal-orange-10` | #FFF1D6 | Signal tinted bg |
| `--ai-ramp-tan-00` | #F6F2EB | Warmest paper surface |
| `--ai-ramp-tan-10` | #ECE6DD | Companion card bg |
| `--ai-ramp-tan-20` | #F1E4D0 | Companion highlight |
| `--ai-ramp-tan-30` | #E8D6BF | Companion border |
| `--ai-ramp-tan-100` | #3C2A1D | Companion ink |
| `SIGNAL_RED[60]` | #C0392B | Error fill (status only, no CSS var at Tier 1) |
| `SIGNAL_RED[70]` | #A5322A | Error hover / pressed |
| `SIGNAL_GREEN[80]` | #0A6E5E | Success fill (AA 6.16:1) |
| `SIGNAL_AMBER[80]` | #8A640C | Warning fill (AA 5.37:1) |

### AI Tier 2 — semantic color aliases (`--color-ai-*`)

| CSS Variable | Value | Usage |
|---|---|---|
| `--color-ai-action-primary` | #4D60E6 | Filled button / active chip |
| `--color-ai-action-primary-hover` | #3544A4 | Button hover |
| `--color-ai-action-primary-active` | #1F2A66 | Button pressed |
| `--color-ai-surface-default` | #F5F6FF | Panel background |
| `--color-ai-surface-subtle` | #D2DBFF | Card bg / insight fill |
| `--color-ai-surface-emphasis` | #BECAFE | Badge fill / table header |
| `--color-ai-border-default` | #4D60E6 | Default stroke (AA on white) |
| `--color-ai-border-strong` | #3544A4 | Deeper stroke |
| `--color-ai-border-focus` | #4D60E6 | Focus ring |
| `--color-ai-border-subtle` | #7F95F2 | Low-emphasis rule — non-text only |
| `--color-ai-text-primary` | #1F2A66 | Heading / label on light surface |
| `--color-ai-text-secondary` | #3544A4 | Sub-label / badge label |
| `--color-ai-text-on-action` | #FFFFFF | On filled button / gradient |
| `--color-ai-brand` | #4D60E6 | Primary brand accent |
| `--color-ai-brand-subtle` | #D2DBFF | Tinted bg for brand elements |
| `--color-ai-brand-surface` | #F5F6FF | Lightest brand tint |
| `--color-ai-brand-border` | #BECAFE | Brand-tinted border |
| `--color-ai-brand-strong` | #3544A4 | Deep brand for emphasis |
| `--color-ai-brand-ink` | #1F2A66 | Darkest brand ink |
| `--color-ai-decorative-wash` | #A6B4FC | Ornament stop — decoration only |
| `--color-ai-decorative-wash-strong` | #7F95F2 | Deeper ornament stop — decoration only |
| `--color-ai-signal-default` | #A54F00 | Signal fill (AA 5.64:1) |
| `--color-ai-signal-hover` | #663000 | Signal hover |
| `--color-ai-signal-strong` | #481A00 | Signal emphasis / high-stakes |
| `--color-ai-signal-subtle` | #FFF1D6 | Signal tinted bg |
| `--color-ai-signal-surface` | #FEFBF4 | Lightest signal tint |
| `--color-ai-status-error` | #C0392B | Error / destructive fill |
| `--color-ai-status-error-hover` | #A5322A | Error hover / pressed |
| `--color-ai-status-success` | #0A6E5E | Success fill (AA 6.16:1) |
| `--color-ai-status-warning` | #8A640C | Warning fill (AA 5.37:1) |
| `--color-ai-companion-paper` | #F6F2EB | Warmest paper surface (Tan, accent only) |
| `--color-ai-companion-surface` | #ECE6DD | Companion card bg |
| `--color-ai-companion-highlight` | #F1E4D0 | Companion highlight / selection |
| `--color-ai-companion-border` | #E8D6BF | Companion border |
| `--color-ai-companion-ink` | #3C2A1D | Companion text / dark ink |

### AI — gradients (`--gradient-ai-*`)

| CSS Variable | Value | Usage |
|---|---|---|
| `--gradient-ai-action-full` | `linear-gradient(135deg, #657CEC 0%, #4D60E6 100%)` | Filled button gradient |
| `--gradient-ai-action-secondary` | `linear-gradient(135deg, #7F95F2 0%, #657CEC 50%, #4D60E6 100%)` | Secondary action gradient |
| `--gradient-ai-surface-idle` | `linear-gradient(to bottom, #F3FCFE, #F9FAFB, #FFFFFF)` | Empty-state page bg |
| `--gradient-ai-surface-active` | `linear-gradient(to bottom, #FFFFFF 0%, #F5FBFC 55%, #EDF8FA 100%)` | Conversation page bg |
| `--gradient-ai-surface-subtle` | `linear-gradient(135deg, #F5F6FF 0%, #D2DBFF 50%, #F5F6FF 100%)` | Insight card fill |
| `--gradient-ai-surface-neutral` | `linear-gradient(135deg, #F4F3F3 0%, #E8E7EA 100%)` | Theme-agnostic panel |

### AI — elevation (`--elevation-ai-*`) & radius (`--radius-ai-*`)

| CSS Variable | Value | Usage |
|---|---|---|
| `--elevation-ai-action-default` | `rgba(77,96,230,0.18)` | Default action shadow color |
| `--elevation-ai-action-emphasis` | `rgba(77,96,230,0.24)` | Hover emphasis shadow color |
| `--elevation-ai-input-default` | `0 0 0 1.5px rgba(26,22,40,0.18), 0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.05)` | Input card resting |
| `--elevation-ai-input-focus` | `0 0 0 2px rgba(77,96,230,0.35), 0 12px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.08)` | Input card focus |
| `--elevation-ai-field-default` | `0 0 0 1px #BECAFE` | Resting form-field ring |
| `--elevation-ai-field-focus` | `0 0 0 1px #FFFFFF, 0 0 0 3px #3544A4` | Focused form-field ring |
| `--elevation-ai-field-warning` | `0 0 0 1px #8A640C` | Warning field ring |
| `--elevation-ai-field-error` | `0 0 0 1px #C0392B` | Invalid field ring |
| `--elevation-ai-card-default` | `0 1px 4px 0 rgba(77,96,230,0.10)` | Resting card |
| `--elevation-ai-card-raised` | `0 4px 16px 0 rgba(77,96,230,0.14)` | Raised / hovered card |
| `--radius-ai-xs` | 6px | Insight card accents |
| `--radius-ai-sm` | 12px | Badges, loader pills |
| `--radius-ai-md` | 16px | Buttons, chips, chat input |
| `--radius-ai-lg` | 20px | Panels, empty-state input |
| `--radius-ai-full` | 100px | Pill chips |

### AI — type scale & weights

Open Sans only. The `--ai-ramp-font-size-*` tokens drive CSS-styled AI surfaces; the element
scale (`--text-*`) covers structural HTML. Snap to the ladder — never invent an off-scale
size, and never go below the **12px floor**.

| CSS Variable | Value | Element scale | Use |
|---|---|---|---|
| `--ai-ramp-font-size-12` | 12px | `--text-xs` | Meta / caption / helper (floor) |
| `--ai-ramp-font-size-14` | 14px | — | Compact body · button label · table header |
| `--ai-ramp-font-size-15` | 15px | — | Dense body (AI reading surfaces) |
| `--ai-ramp-font-size-16` | 16px | `--text-base` | Body · control label · minor header |
| `--ai-ramp-font-size-20` | 20px | — | Lead-in / large label |
| `--ai-ramp-font-size-22` | 22px | — | Metric / KPI value |
| `--ai-ramp-font-size-24` | 24px | `--text-lg` | Subsection header (h3) |
| `--ai-ramp-font-size-26` | 26px | — | Large subsection / AI panel title |
| `--ai-ramp-font-size-32` | 32px | `--text-xl` | Section header (h2) |
| `--ai-ramp-font-size-34` | 34px | — | Emphasis heading |
| `--ai-ramp-font-size-48` | 48px | `--text-2xl` | Page title (h1) |
| `--ai-ramp-font-size-64` | 64px | — | Hero / display |

| Weight token | Value | Use |
|---|---|---|
| `--font-weight-light` | 300 | Large display only — never below 16px |
| `--font-weight-regular` | 400 | Body copy |
| (base medium) | 500 | Structural h1–h4 / labels / buttons |
| `--font-weight-semi-bold` | 600 | Component button labels · eyebrows / overlines |
| `--font-weight-bold` | 700 | Component headings · table headers |

> Font family for **all** text is `"Open Sans", system-ui, sans-serif`. Prefer
> `AI_TYPOGRAPHY['@ai-*']` spreads from [`tokens/ai-typography.ts`](tokens/ai-typography.ts).
> Do not introduce any other family.

### Data visualization (chart / tile use only)

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `DATAVIZ[1]` | #DB6C03 | | `DATAVIZ[7]` | #686EFF |
| `DATAVIZ[2]` | #3287C4 | | `DATAVIZ[8]` | #566C32 |
| `DATAVIZ[3]` | #8D38FC | | `DATAVIZ[9]` | #BC5422 |
| `DATAVIZ[4]` | #2DA40C | | `DATAVIZ[10]` | #299C91 |
| `DATAVIZ[5]` | #ED39DB | | `DATAVIZ[11]` | #FD595F |
| `DATAVIZ[6]` | #764204 | | `DATAVIZ[12]` | #795106 |

> Use data-viz colors sequentially for chart series only — never for interactive UI states,
> brand, or status.

---

## Agent workflow (required)

### Core rule

Use the existing Guild Agentic AI Design System first. Do not invent components, colors,
radii, shadows, spacing, or interaction patterns when `components/ai/` already has one.

When creating product UI:

1. Reuse existing AI Library components ([`llms.txt`](llms.txt)).
2. Reuse standard Guild components only for non-AI chrome ([`../design.md`](../design.md)).
3. Compose atoms → molecules → organisms → patterns → pages.
4. Create custom UI only when no existing component meets the need — document why.
5. Open `{slug}.preview.html` when validating states.

### Source of truth order

| Priority | Path | Purpose |
|----------|------|---------|
| 1 | [`design.md`](design.md) | This file — visual + composition rules |
| 2 | [`../../design-intent.md`](../../design-intent.md) | Strategy, maturity, L3 governance |
| 3 | [`llms.txt`](llms.txt) | Component index |
| 4 | [`tokens/ai-tokens.ts`](tokens/ai-tokens.ts) + [`ai-typography.ts`](tokens/ai-typography.ts) | Programmatic tokens |
| 5 | [`tokens/*.md`](tokens/) | Token narrative |
| 6 | `<tier>/<slug>/<slug>.md` + `.agent.json` + TSX + `.preview.html` | Module contracts |
| 7 | [`../design.md`](../design.md) | Standard DS when embedding in product chrome |

### Experience modes

Declared in `*.agent.json` `experienceModes`. See also [`design-intent.md`](../../design-intent.md).

| Mode | Intent | Typical modules |
|------|--------|-----------------|
| **AI Assisted** | AI inside a user workflow; user stays in control | `pages/ai-assisted-side-drawer` |
| **Adaptive** | User and AI co-shape output | `pages/ai-command-center-split-view`, `organisms/ai-suggestion-compare` |
| **AI Led** | AI monitors / orchestrates; human governs | `patterns/ai-generated-dashboard`, `patterns/ai-list-landing`, `patterns/ai-agent-task-tracker` |

### Accountability & trust

Use risk-appropriate signals (sources, freshness, rationale, confidence/risk, approval,
audit/process trace, undo, feedback). Do not expose hidden chain-of-thought. Do not
fabricate sources, confidence, or audit history.

L3 mechanisms (traceability, explainability, reversibility, escalation) are mandatory per
[`design-intent.md`](../../design-intent.md) §7.

### Component reuse priority

1. Existing page (`pages/`)
2. Existing pattern (`patterns/` — cards, task tracker, list landing, dashboard)
3. Existing organism / molecule / atomic
4. Existing standard Guild module — only for non-AI chrome
5. New composition of existing parts
6. New custom component only if necessary

### Folder map

```
components/ai/
  foundations/  # FND
  atomic/       # ATM
  molecules/    # MOL
  organisms/    # ORG
  patterns/     # PT — card & composite patterns
  pages/        # PG — full-page layouts
  data-viz/     # DV
  tokens/       # TK
```

### Density

Basic → Simple → Rich → Robust. Do not use Robust for simple UI unless governance requires it.

### Icon treatment (60-30-10)

| Treatment | Usage |
|-----------|-------|
| `neutral` (60%) | Timestamps, metadata, utility |
| `semantic` (30%) | Status-driven color from `tone` |
| `ai` (10%) | Agent output / AI identity |
| `orange-signal` | Escalation, pending, stale only |
| `tan-container` | Companion / memory contexts |

### Data viz containers

Containers define the shell; chart renderers fill a placeholder only. Do not let Highcharts
(or similar) own the AI card, panel, trust footer, or actions. Prefer
`patterns/ai-card-metric`, `patterns/ai-card-analysis`, and data-viz modules under
`data-viz/`.

### Screen generation checklist

1. User goal → experience mode → behavior → risk level
2. Select page/pattern → organisms → molecules → atoms
3. Select density + trust signals
4. Verify tokens, a11y, no fabricated data, no CoT leak
5. Cite paths used in the agent output

### Forbidden

- Invent hex, radii, spacing, or components
- Use teal as AI identity; use orange as decoration or semantic warning
- Square corners on AI surfaces
- Duplicate components under new names
- Generic “header + body + action” for every card — read each pattern’s anatomy
- Orange gradient on `AIAvatar` rings
- Chart renderer owning the AI shell
- Screenshots / Figma over code/docs when both exist

### Required agent output

Report: goal, experience mode, components reused (paths), any new components + why, tokens
used, a11y, trust signals, responsive notes, open questions.

### Related files

| File | Role |
|------|------|
| [`../../design-intent.md`](../../design-intent.md) | Strategy & brand reference |
| [`llms.txt`](llms.txt) | AI component index |
| [`tokens/agentic-prompt.md`](tokens/agentic-prompt.md) | Token-layer agent briefing |
| [`../design.md`](../design.md) | Standard DS (separate token set) |
| [`../agent-instructions.md`](../agent-instructions.md) | Navigation and reading order |
| [`../../AGENT_INSTRUCTIONS.md`](../../AGENT_INSTRUCTIONS.md) | Global agent rules |


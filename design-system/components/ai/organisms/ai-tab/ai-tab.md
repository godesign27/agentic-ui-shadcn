# AI Tab

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Guild Design System — AI  
**Tier:** organisms  
**Repo module:** `aiTab`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

DS Tab, AI surface theme — brand-gradient active bar, rounded AI surfaces.

AITab is the AI-surface sibling of the standard DS Tab (src/tab/). It preserves the tab contract — role="tablist"/"tab"/"tabpanel", one active tab, roving tabindex (only the active tab is tabbable), Arrow/Home/End keys on the correct axis — while replacing the DS neutral/teal token layer with the AI system. Active tabs read in AI brand #4D60E6 SemiBold; Solid marks them with a 3px brand-gradient bottom bar, Outline fills the tab with --ai-card-bg and joins it to a rounded content container, and Vertical uses a 3px gradient left stroke over a brand-subtle fill. (The AI-native fully-rounded segmented treatment now lives in DS AI Segmented Control.) Icons render through the icon font catalog, tinted to the AI brand. Disabled tabs are muted and skipped by keyboard navigation. Controlled (`value`/`onChange`) or uncontrolled (`defaultValue`).

**Export:** `AITab`

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

## Agent rules

1. Read this mirror spec and `ai-tab.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/organisms/ai-tab/ai-tab.agent.json`.

# AI Checkbox

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic  
**Repo module:** `zdsAiCheckbox`  
**Component type:** React atomi  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

The ZDS Checkbox in AI clothing — same accessible control, AI brand indigo selection, focus ring, and label styling for AI surfaces.

AICheckbox is the AI-styled selection control for AI cards, drawers, and settings rows. It does NOT reimplement the checkbox — it wraps the standard `ZdsCheckbox` (the shared ZDS atom, mirror `src/checkbox/`) and re-anchors the ZDS selection / focus / text CSS variables to their AI equivalents inside a scoped wrapper. That means the checked fill and border become AI brand indigo (#4D60E6) instead of ZDS teal, the focus ring uses `AI.color.border.focus`, the label uses `--ai-zds-text`, and the box corners are softened to match the AI card family — while every accessibility guarantee, the indeterminate dash, error mode, sizing, and disabled state are inherited from ZDS unchanged.

**Export:** `AICheckbox`

Because it re-skins via CSS variables rather than forking, it stays in lockstep with the base atom: fixes to `ZdsCheckbox` flow through automatically.

## When to use

- A binary opt-in / selection on an AI surface (card, drawer, settings row)
- Multi-select lists where several items can be chosen
- A parent "select all" with an indeterminate mixed state
- You want the ZDS checkbox behavior but AI brand styling

## When not to use

- A single on/off mode switch — use `ai-toggle` instead
- Mutually exclusive choice — use a radio group
- The neutral product surface — use the standard `zds-checkbox`
- A momentary action — use a button

## Anatomy

1. **Scope wrapper** _(Unique)_ — Span that re-anchors ZDS selection/focus/text CSS vars to AI values.
2. **Box** _(Shared)_ — ZdsCheckbox box — AI brand fill when checked, softened 4px corners.
3. **Check / dash** _(Shared)_ — Inherited ZDS checkmark, or the indeterminate dash.
4. **Focus ring** _(Unique)_ — AI focus ring (`AI.color.border.focus`) on :focus-visible.
5. **Label** _(Shared)_ — Optional label in `--ai-zds-text`; clicking it toggles the box.

## State variations

- **Unchecked** _(default)_ — Neutral border, white fill.
- **Checked** _(checked)_ — AI brand indigo fill + white check.
- **Indeterminate** _(indeterminate)_ — Mixed state for a parent "select all" row.
- **Error** _(mode="error")_ — Error border/fill for required unchecked consent.
- **Disabled** _(disabled)_ — Non-interactive, dimmed.
- **No label** _(label omitted)_ — Bare box for dense grids / table headers.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Controlled checked state. |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | `—` | Fires on toggle (inherited from ZdsCheckbox). |
| `label` | `ReactNode` | `—` | Optional label; clicking it toggles the box. |
| `indeterminate` | `boolean` | `false` | Mixed state (dash) for a parent "select all". |
| `mode` | `"default" \| "error"` | `"default"` | Error mode restyles the border/fill red. |
| `size` | `"14px" \| "16px" \| "18px" \| "20px"` | `"16px"` | Box dimension (inherited). |
| `disabled` | `boolean` | `false` | Non-interactive, dimmed. |

## Tokens

### AI re-skin (overrides ZDS vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-selection-primary-default` | `AI.color.brand → #4D60E6` | Checked fill + border. |
| `--zs-border-primary-hover` | `AI.color.action.primary → #4D60E6` | Hover border. |
| `--zs-background-primary-subtle` | `AI.color.surface.default → #F5F6FF` | Checked-hover surface. |
| `--zs-border-focus` | `AI.color.border.focus → #4D60E6` | Focus ring. |
| `--zs-text-default` | `var(--ai-zds-text)` | Label text. |

### Inherited from ZdsCheckbox
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-border-neutral-functional` | `#5b5864` | Unchecked border. |
| `--zs-selection-error-default` | `#b21111` | Error border / fill. |
| `--zs-icon-neutral-inverse` | `#ffffff` | Checkmark / dash color. |
| `box radius` | `4px` | Softened from ZDS 2px to match AI cards. |

## Flows

### Opt-in on an AI surface
Let a user consent to or select an AI behavior with a control that matches the AI look.
- Render `<AICheckbox label="…" checked={value} onChange={…} />`
- The box shows AI brand indigo when checked, with the inherited ZDS checkmark
- For a parent "select all", pass `indeterminate` to show the mixed dash
- For required consent left unchecked, pass `mode="error"` to flag it

## Agent rules

1. Read this mirror spec and `zds-ai-checkbox.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/atomic/zds-ai-checkbox/zds-ai-checkbox.agent.json`.

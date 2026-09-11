# AI Radio

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Guild Design System — AI  
**Tier:** atomic  
**Repo module:** `aiRadio`  
**Component type:** React atomi  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

The DS Radio in AI clothing — same accessible exclusive-choice control, AI brand indigo selection, focus ring, and label styling for AI surfaces.

AIRadio is the AI-styled control for mutually-exclusive choices on AI cards, drawers, and settings rows — pick one of several agent modes, risk postures, or output formats. It does NOT reimplement the control — it wraps the standard `DSRadio` (mirror `src/radio/`) and re-anchors the DS selection / focus / text CSS variables to their AI equivalents inside a scoped wrapper. The checked border and center dot become AI brand indigo (#4D60E6) instead of DS teal, the focus ring uses `AI.color.border.focus`, and the label uses `--ai-ds-text` — while every accessibility guarantee, error mode, sizing, disabled state, and native `name`/`value` grouping are inherited from DS unchanged.

**Export:** `AIRadio`

This mirrors the AICheckbox re-skin exactly: it re-skins via CSS variables rather than forking, so fixes to `DSRadio` flow through automatically.

## When to use

- One choice must be selected from a small, mutually-exclusive set
- Picking an agent mode, risk posture, or output format on an AI surface
- All options should be visible at once (2–5 choices)
- You want the DS radio behavior but AI brand styling

## When not to use

- Multiple selections are allowed — use `ai-checkbox`
- A binary on/off — use `ai-toggle`
- Many options (6+) — use a select / dropdown
- The neutral product surface — use the standard DS radio

## Anatomy

1. **Scope wrapper** _(Unique)_ — Span that re-anchors DS selection/focus/text CSS vars to AI values.
2. **Circle** _(Shared)_ — DSRadio circle — AI brand border when checked.
3. **Center dot** _(Shared)_ — Filled AI brand indigo dot (half size) when selected.
4. **Focus ring** _(Unique)_ — AI focus ring (`AI.color.border.focus`) on :focus-visible.
5. **Label** _(Shared)_ — Optional label in `--ai-ds-text`; clicking it selects the option.

## State variations

- **Group (default)** _(radiogroup)_ — Exclusive choice — selecting one clears the others.
- **Selected** _(checked)_ — AI brand indigo border + center dot.
- **Unselected** _(default)_ — Neutral border, empty circle.
- **Error** _(mode="error")_ — Error border for a required unselected group.
- **Disabled** _(disabled)_ — Non-interactive, dimmed.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Controlled selected state. |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | `—` | Fires on select (inherited from DSRadio). |
| `name` | `string` | `—` | Native group name — radios sharing a name are mutually exclusive. |
| `value` | `string` | `—` | Native value for the option. |
| `label` | `ReactNode` | `—` | Optional label; clicking it selects the option. |
| `mode` | `"default" \| "error"` | `"default"` | Error mode restyles the border red. |
| `size` | `"14px" \| "16px" \| "18px" \| "20px"` | `"16px"` | Circle dimension (inherited). |
| `disabled` | `boolean` | `false` | Non-interactive, dimmed. |

## Tokens

### AI re-skin (overrides DS vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-selection-primary-default` | `AI.color.brand → #4D60E6` | Checked border + center dot. |
| `--zs-border-primary-hover` | `AI.color.action.primary → #4D60E6` | Hover border. |
| `--zs-background-primary-subtle` | `AI.color.surface.default → #F5F6FF` | Checked-hover surface. |
| `--zs-border-focus` | `AI.color.border.focus → #4D60E6` | Focus ring. |
| `--zs-text-default` | `var(--ai-ds-text)` | Label text. |

### Inherited from DSRadio
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-border-neutral-functional` | `#5b5864` | Unchecked border. |
| `--zs-selection-error-default` | `#b21111` | Error border. |
| `--zs-icon-neutral-disabled` | `#b2b0b6` | Disabled center dot. |
| `shape` | `border-radius 50%` | Circular (no override needed). |

## Flows

### Exclusive choice on an AI surface
Let a user pick one agent mode / risk posture with a control that matches the AI look.
- Render an `AIRadio` per option, all sharing one `name`
- Track the selected `value` in state; set `checked={value === opt}`
- The selected radio shows an AI brand indigo border + center dot
- For a required group left unselected, pass `mode="error"` to flag it

## Agent rules

1. Read this mirror spec and `ai-radio.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/atomic/ai-radio/ai-radio.agent.json`.

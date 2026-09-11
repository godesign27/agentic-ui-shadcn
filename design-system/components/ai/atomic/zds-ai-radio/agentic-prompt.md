# Agentic Prompt — AI Radio

# AI Radio — Agentic Prompt

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

- **Display name:** AI Radio
- **Component id:** `zds-ai-radio`
- **Category:** atomic
- **Status:** Beta
- **File path:** `ai/atomic/radio/AIRadio.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/zsainc/9904PD0068_zds-ai-mirror`
- **File path:** `ai/atomic/radio/AIRadio.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (ZAIDYN first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@zs-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Radio
_zds-ai-radio_

> The ZDS Radio in AI clothing — same accessible exclusive-choice control, AI brand indigo selection, focus ring, and label styling for AI surfaces.

## Metadata
- **Category:** atomic
- **Status:** Beta
- **Source path:** `ai/atomic/radio/AIRadio.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Configure · Choose
- **Tier 3 · Accountability:** Exclusive choice · Selection · Mode
- **Metrics:** 5 states · 1 shared · ~2KB context · 1 behaviors

## Overview

AIRadio is the AI-styled control for mutually-exclusive choices on AI cards, drawers, and settings rows — pick one of several agent modes, risk postures, or output formats. It does NOT reimplement the control — it wraps the standard `ZdsRadio` (mirror `src/radio/`) and re-anchors the ZDS selection / focus / text CSS variables to their AI equivalents inside a scoped wrapper. The checked border and center dot become AI brand indigo (#4D60E6) instead of ZDS teal, the focus ring uses `AI.color.border.focus`, and the label uses `--ai-zds-text` — while every accessibility guarantee, error mode, sizing, disabled state, and native `name`/`value` grouping are inherited from ZDS unchanged.

This mirrors the AICheckbox re-skin exactly: it re-skins via CSS variables rather than forking, so fixes to `ZdsRadio` flow through automatically.

## When to use
- One choice must be selected from a small, mutually-exclusive set
- Picking an agent mode, risk posture, or output format on an AI surface
- All options should be visible at once (2–5 choices)
- You want the ZDS radio behavior but AI brand styling

## When not to use
- Multiple selections are allowed — use `zds-ai-checkbox`
- A binary on/off — use `ai-toggle`
- Many options (6+) — use a select / dropdown
- The neutral product surface — use the standard ZDS radio

## Anatomy
1. **Scope wrapper** _(Unique)_ — Span that re-anchors ZDS selection/focus/text CSS vars to AI values.
2. **Circle** _(Shared)_ — ZdsRadio circle — AI brand border when checked.
3. **Center dot** _(Shared)_ — Filled AI brand indigo dot (half size) when selected.
4. **Focus ring** _(Unique)_ — AI focus ring (`AI.color.border.focus`) on :focus-visible.
5. **Label** _(Shared)_ — Optional label in `--ai-zds-text`; clicking it selects the option.

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
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | `—` | Fires on select (inherited from ZdsRadio). |
| `name` | `string` | `—` | Native group name — radios sharing a name are mutually exclusive. |
| `value` | `string` | `—` | Native value for the option. |
| `label` | `ReactNode` | `—` | Optional label; clicking it selects the option. |
| `mode` | `"default" \| "error"` | `"default"` | Error mode restyles the border red. |
| `size` | `"14px" \| "16px" \| "18px" \| "20px"` | `"16px"` | Circle dimension (inherited). |
| `disabled` | `boolean` | `false` | Non-interactive, dimmed. |

## Tokens

### AI re-skin (overrides ZDS vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-selection-primary-default` | `AI.color.brand → #4D60E6` | Checked border + center dot. |
| `--zs-border-primary-hover` | `AI.color.action.primary → #4D60E6` | Hover border. |
| `--zs-background-primary-subtle` | `AI.color.surface.default → #F5F6FF` | Checked-hover surface. |
| `--zs-border-focus` | `AI.color.border.focus → #4D60E6` | Focus ring. |
| `--zs-text-default` | `var(--ai-zds-text)` | Label text. |

### Inherited from ZdsRadio
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

## Code example
```tsx
import { AIRadio } from 'ai/atomic/radio/AIRadio';

function RiskPosture() {
  const [value, setValue] = useState('Balanced');
  return (
    <div role="radiogroup">
      {['Conservative', 'Balanced', 'Aggressive'].map((opt) => (
        <AIRadio
          key={opt}
          name="risk-posture"
          value={opt}
          label={opt}
          checked={value === opt}
          onChange={() => setValue(opt)}
        />
      ))}
    </div>
  );
}
```

# AI Action Field

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiInputField`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The text-entry atom for AI surfaces. Mirrors ZDS Field’s scope (label · input · helper) but restyled onto the ZAIDYN brand surface — rounded outline, brand-blue border, and a soft blue-halo focus.

AIInputField is the AI-surface counterpart to the standard ZDS Field atom (src/field/). It keeps the same scope — a label, a single-line input, and a helper/validation slot with default/warning/error modes — but swaps ZDS Field’s square bottom-underline for the AI brand surface: a fully-rounded outline (AI.radius.md = 16px), a brand-blue border (AI.color.border.default), the composite AI input shadow at rest (AI.shadow.input.default), and a blue-halo focus shadow (AI.shadow.input.focus). Unlike the ZDS documentation primitive whose value is a static span, this atom wraps a REAL <input>, so it is directly usable inside an app.

**Export:** `AIInputField`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/input-field/AIInputField.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-input-field/ai-input-field.md` | This mirror spec |
| `components/ai/atomic/ai-input-field/ai-input-field.agent.json` | Agent manifest |
| `components/ai/atomic/ai-input-field/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Compose |
| Accountability | Data entry |

## Anatomy

1. **label** _(Shared)_ — Field label above the input — brand-ink primary text.
2. **input** _(Unique)_ — The real <input> — rounded brand-blue outline + composite AI shadow.
3. **mode** _(Unique)_ — Validation role: default | warning | error. Recolors border + helper.
4. **helper** _(Shared)_ — Helper / validation text below the input.

## State variations

- **Placeholder** _(empty)_ — Empty field awaiting input.
- **Filled** _(value)_ — Field with an entered value.
- **Focused** _(state=focused)_ — Blue-halo focus shadow + brand border.
- **Error** _(mode=error)_ — Validation failure — red border + message.
- **Warning** _(mode=warning)_ — Caution — amber border + message.
- **Disabled** _(disabled)_ — Non-editable, reduced contrast.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `'Label'` | Field label rendered above the input. |
| `value` | `string` | `—` | Controlled input value. |
| `placeholder` | `string` | `'Placeholder text…'` | Placeholder shown when empty. |
| `helper` | `string` | `'Helper text'` | Helper / validation text below the input. |
| `size` | `'normal' \| 'small'` | `'normal'` | normal = 48px h / 15px; small = 40px h / 13px. |
| `mode` | `'default' \| 'warning' \| 'error'` | `'default'` | Validation role — recolors border + helper. |
| `state` | `'default' \| 'focused'` | `—` | Force the focused visual (docs/preview). When omitted, focus is live. |
| `disabled` | `boolean` | `false` | Non-editable, reduced contrast. |
| `onChange` | `(next: string) => void` | `—` | Change handler receiving the new value. |
| `width` | `number \| string` | `280` | Field width. |

## Tokens

### Surface & outline
| Token | Value | Usage |
| --- | --- | --- |
| `AI.radius.md` | `16px` | Input corner radius |
| `AI.color.border.default` | `#4D60E6` | Rest border (brand blue) |
| `AI.color.border.focus` | `#4D60E6` | Focus border |
| `AI.color.text.primary` | `#1F2A66` | Label + input text |

### Shadow & validation
| Token | Value | Usage |
| --- | --- | --- |
| `AI.shadow.input.default` | `composite` | Rest input shadow |
| `AI.shadow.input.focus` | `composite` | Focus blue-halo shadow |
| `AI.color.status.error` | `#C0392B` | Error border + helper |
| `AI.color.status.warning` | `#8A640C` | Warning border + helper |

## Canonical implementation

```tsx
import { AIInputField } from '@/components/ai/atomic/input-field/AIInputField';

{/* Basic — controlled */}
<AIInputField
  label="Objective"
  value={value}
  onChange={setValue}
  placeholder="Placeholder text…"
  helper="Helper text"
/>

{/* Validation */}
<AIInputField label="Objective" mode="error" helper="This field is required." />

{/* Small size */}
<AIInputField label="Tag" size="small" helper="" />
```

## Agent rules

1. Read this mirror spec and `ai-input-field.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-input-field/ai-input-field.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

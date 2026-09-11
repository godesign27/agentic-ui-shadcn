# AI Picker Trigger

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiPickerTrigger`  
**Component type:** React atomic  
**Status:** Draft  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The styled field that signals an AI-enhanced date/time picker — brand-tinted border, 12px radius, and an AI badge at higher densities.

The AI Picker Trigger is the visual shell used in place of the standard ZDS picker trigger when AI is present. It renders the label, the current value (or placeholder), a trailing type icon, and — at rich/robust density — an AI badge on the label row. It holds no suggestion logic, calendar, or popover; those belong to the ai-picker group that composes this atom. Colors use the library ZSAI indigo ramp (AI.color.*), mapping the spec's blue tokens to brand.

**Export:** `AIPickerTrigger`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/ai-picker-trigger/AIPickerTrigger.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-picker-trigger/ai-picker-trigger.md` | This mirror spec |
| `components/ai/atomic/ai-picker-trigger/ai-picker-trigger.agent.json` | Agent manifest |
| `components/ai/atomic/ai-picker-trigger/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Select · Input |
| Accountability | Owner |

## Anatomy

1. **Label** _(Unique)_ — Field label rendered in brand ink (AI.color.text.primary).
2. **AI badge** _(Shared)_ — Sparkle + label pill, shown only at rich/robust density and never when disabled.
3. **Value** _(Unique)_ — Selected value or muted placeholder text.
4. **Icon** _(Shared)_ — Trailing type icon (calendar, calendar-range, or clock); brand-colored at rich/robust.
5. **Error text** _(Shared)_ — Message shown below the field in the error state.

## State variations

- **Default** _(default)_ — Rest state — brand-tinted border, brand-ink label.
- **Focused** _(focused)_ — Open/active — focus border + subtle brand focus ring.
- **Selected** _(selected)_ — A value has been chosen — displayed in neutral ink.
- **Disabled** _(disabled)_ — Muted border and text — AI badge suppressed.
- **Error** _(error)_ — Error border with a message below the field.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `—` | Field label |
| `value` | `string` | `—` | Current formatted value |
| `placeholder` | `string` | `"Select…"` | Shown when no value |
| `icon` | `"calendar" \| "calendar-range" \| "clock"` | `—` | Trailing type icon |
| `density` | `"basic" \| "simple" \| "rich" \| "robust"` | `—` | AI badge shows at rich/robust |
| `state` | `"default" \| "focused" \| "selected" \| "disabled" \| "error"` | `"default"` | Visual state |
| `aiLabel` | `string` | `"AI"` | AI badge label |
| `errorMessage` | `string` | `—` | Message below field in error state |
| `onClick` | `() => void` | `—` | Opens popover (wired by the group) |

## Tokens

### Picker Trigger
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brandBorder` | `#BECAFE` | Rest border |
| `AI.color.border.focus` | `#657CEC` | Focus border |
| `AI.color.text.primary` | `#1F2A66` | Label ink |
| `AI.color.brand` | `#4D60E6` | Icon + badge at rich/robust |
| `AI.color.brandSurface` | `#F5F6FF` | AI badge bg + focus ring |

## Canonical implementation

```tsx
import { AIPickerTrigger } from '@/components/ai/atomic/ai-picker-trigger/AIPickerTrigger';

<AIPickerTrigger label="Start date" value="14 Mar 2026" icon="calendar" density="rich" state="selected" />
<AIPickerTrigger label="Start date" value="" icon="calendar" density="rich" state="error" errorMessage="Please select a date" />
```

## Agent rules

1. Read this mirror spec and `ai-picker-trigger.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-picker-trigger/ai-picker-trigger.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

# AI Time Picker

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiTimePicker`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The ZDS Time Picker on the AI surface — AI Action Field trigger, brand-indigo slots, and a gradient-filled selected time. Menu sits flush to the field.

The AI Time Picker mirrors the ZDS Time Picker (src/timePicker/) 1:1 in structure and behavior — an Action-Field trigger opening a scrollable listbox of time slots with a clock icon affordance — but is restyled onto the ZAIDYN AI brand. The trigger carries the AI Action Field treatment: rounded ai.radius.md outline, brand-blue border, AI input shadow, and a blue focus halo. The menu sits FLUSH against the field (the ZDS Time Picker signature): the field keeps its top corners rounded when open while the menu carries the bottom radius, so the two read as one continuous brand surface. Items adopt the ZSAI indigo ramp — hover uses the brand-subtle tint, the selected slot fills with the action gradient — and the custom scrollbar is brand-tinted. It reads its palette from the AI.* tokens (mirrored to the --color-ai-* / --gradient-ai-* CSS variables): rendered on a surface carrying the AI data-theme, it stays aligned with the rest of the AI system, so applying the AI theme to a ZDS time picker yields this look. Only the palette and radii differ from ZDS; the anatomy, states, and keyboard model are identical.

**Export:** `AITimePicker`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/molecules/time-picker/AITimePicker.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-time-picker/ai-time-picker.md` | This mirror spec |
| `components/ai/molecules/ai-time-picker/ai-time-picker.agent.json` | Agent manifest |
| `components/ai/molecules/ai-time-picker/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Select · Input |
| Accountability | Owner |

## When to use

- AI-surface form field that needs a single time value
- Any picker that should read as AI-enhanced and match the AI Action Field

## When not to use

- On a standard ZDS surface — use the ZDS Time Picker instead
- Don't detach the menu from the field or drop the flush treatment

## Anatomy

1. **Trigger** _(Shared)_ — AI Action Field row — role="combobox", aria-haspopup="listbox".
2. **Icon** _(Shared)_ — Leading RiTimeLine clock icon in AI.color.brand, aria-hidden.
3. **Menu** _(Unique)_ — Flush listbox card — brand surface, ai.radius.md bottom corners, AI input shadow.
4. **Options** _(Shared)_ — role="option" slots — default, hover, selected, focused.
5. **Scrollbar** _(Shared)_ — Brand-tinted 12px custom rail; native scrollbar hidden.

## State variations

- **Trigger (AI Action Field)** _(combobox)_ — Field states: placeholder / selected / focused / disabled.
- **Menu item** _(role=option)_ — Slot states. Default · Hover (brand-subtle tint) · Selected (action gradient) · Focused (brand focus ring).
- **Scrollbar** _(custom rail)_ — Brand-tinted 12px rail. Default thumb (brand-border) · Hover thumb (brand).
- **Open** _(open=true)_ — Listbox visible, flush to the field (no gap); selected slot fills with the action gradient.
- **Surface — soft** _(surface='soft')_ — Default. Brand-tinted surface with a gradient-filled selected slot.
- **Surface — flat AI blue** _(surface='flat-blue')_ — Same brand surface; the selected slot fills with a FLAT AI blue (no gradient).
- **Surface — flat neutral** _(surface='flat-neutral')_ — Warm neutral gray surface matching the AI cards / accordions.
- **Surface — flat tan** _(surface='flat-tan')_ — Warm companion tan surface (ZSAI Tan ramp) for the 10% accent role.
- **Small** _(size=Small)_ — 42px field / 20px icon / 30px items / 14px text.
- **X-Small** _(size=X-Small)_ — 38px field / 18px icon / 28px items / 12px text.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `'Pick a time'` | Field label (above the field). |
| `selected` | `string` | `—` | Selected time slot (e.g. "10:30 am"). |
| `placeholder` | `string` | `'Select time'` | Italic placeholder when no value. |
| `slots` | `string[]` | `30-min slots` | Time options rendered in the menu. |
| `size` | `'Normal' \| 'Small' \| 'X-Small'` | `'Normal'` | Field / item size tier. |
| `surface` | `'soft' \| 'flat-blue' \| 'flat-neutral' \| 'flat-tan'` | `'soft'` | Menu-surface treatment: soft gradient, flat AI blue, flat neutral gray, or flat tan. |
| `disabled` | `boolean` | `false` | Disables the trigger and menu. |
| `open` | `boolean` | `—` | Force the menu open (docs/preview); omit for live toggle. |
| `width` | `number \| string` | `332` | Shared field + menu width. |

## Tokens

### Item selection & focus
| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `indigo 135°` | Selected slot fill |
| `AI.color.brandSubtle` | `#D2DBFF` | Hover slot tint |
| `AI.color.brandStrong` | `#1F2A66` | Hover slot text |
| `AI.color.text.onAction` | `#FFFFFF` | Selected slot text |
| `AI.color.border.focus` | `#4D60E6` | Field + item focus ring |

### Surfaces, borders & scrollbar
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.border.default` | `#4D60E6` | Field border |
| `AI.color.brandSurface` | `#F5F6FF` | Menu surface + scroll track |
| `AI.color.brandBorder` | `#BECAFE` | Menu border + scroll thumb (rest) |
| `AI.color.brand` | `#4D60E6` | Clock icon + scroll thumb (hover) |
| `AI.color.text.primary` | `#1F2A66` | Label + value + slot ink |
| `AI.radius.md` | `16px` | Field + menu radius |
| `AI.shadow.input.default` | `composite` | Field + menu elevation |

## Flows

### Pick a time
Trigger opens the flush menu; selecting a slot closes it and updates the field.
- Click the AI Action Field trigger (or press Enter/Space) to open the menu
- Scroll to the desired slot — the selected slot scrolls into view on open
- Click a slot — the value fills the trigger and the menu closes
- Click outside to dismiss without changing the value

## Canonical implementation

```tsx
import { AITimePicker } from '@/components/ai/molecules/time-picker/AITimePicker';

// Live trigger + flush menu
<AITimePicker label="Pick a time" placeholder="Select time" />

// Controlled-open for docs / layout
<AITimePicker label="Pick a time" selected="10:30 am" open />

// Disabled
<AITimePicker label="Pick a time" selected="10:30 am" disabled />
```

## Agent rules

1. Read this mirror spec and `ai-time-picker.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-time-picker/ai-time-picker.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

# AI Date Picker

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiDatePicker`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The DS Date Picker on the AI surface — AI Action Field trigger, brand-indigo day grid, and a gradient-filled selected date.

The AI Date Picker mirrors the DS Date Picker (src/datePicker/) 1:1 in structure and behavior — an Action-Field trigger opening a popover calendar with month/year navigation, a day grid, a today ring, and a today link — but is restyled onto the Guild AI brand. The trigger is the AI Action Field atom (AIInputField, asTrigger) so it stays consistent with every AI form control: rounded ai.radius.md outline, brand-blue border, AI input shadow, and a blue focus halo. The calendar adopts the AI_RAMP indigo ramp: the selected day fills with the action gradient, today carries a brand ring, range preview uses the brand-subtle tint, and the panel sits on a brand-tinted card at ai.radius.lg. Only the palette and radii differ from DS; the anatomy, states, and keyboard model are identical.

**Export:** `AIDatePicker`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/molecules/date-picker/AIDatePicker.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-date-picker/ai-date-picker.md` | This mirror spec |
| `components/ai/molecules/ai-date-picker/ai-date-picker.agent.json` | Agent manifest |
| `components/ai/molecules/ai-date-picker/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Select · Input |
| Accountability | Owner |

## When to use

- AI-surface form field that needs a single calendar date
- Any picker that should read as AI-enhanced and match the AI Action Field

## When not to use

- On a standard DS surface — use the DS Date Picker instead
- Don't drop the today ring or the AI Action Field trigger

## Anatomy

1. **Trigger** _(Shared)_ — AI Action Field (AIInputField, asTrigger) — role="button", aria-haspopup="dialog".
2. **Icon** _(Shared)_ — Trailing RiCalendarLine icon in AI.color.brand.
3. **Panel** _(Unique)_ — Brand-tinted popover card — ai.radius.lg, AI input shadow.
4. **Header** _(Shared)_ — Nav arrows + month/year selectors — aria-label Prev/Next month.
5. **Grid** _(Shared)_ — Day cells — role="grid" / gridcell, aria-selected.
6. **Footer** _(Shared)_ — Today link in AI.color.brand.

## State variations

- **Trigger (AI Action Field)** _(asTrigger)_ — Field states: placeholder / selected / focused / disabled.
- **Date cell — Today = False** _(rounded)_ — Standard day cell. Default · Hover · Pressed · Selected · Selected Hover · Disabled · Focused.
- **Date cell — Today = True** _(circle)_ — Today's date carries a circular brand ring on non-filled states; fills stay rounded.
- **Date cell — inactive / highlight** _(grid states)_ — Out-of-month days and range-preview highlight (brand-subtle tint).
- **Nav arrows — Back** _(brand ellipse)_ — Default · Hover · Pressed · Disabled · Focused.
- **Nav arrows — Forward** _(brand ellipse)_ — Default · Hover · Pressed · Disabled · Focused.
- **Month / Year selector** _(caret-down)_ — Header dropdown trigger. Default · Hover · Disabled · Focus ring.
- **Today link** _(footer)_ — Footer text link. Default · Hover · Pressed · Disabled · Focus ring.
- **Calendar — open** _(assembled panel)_ — Full popover: header nav, weekday row, brand day grid with today ring, and footer link.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `'Due date'` | Field label. |
| `value` | `string` | `—` | Selected date (formatted). |
| `placeholder` | `string` | `'MM/DD/YYYY'` | Trigger placeholder when no value. |
| `helper` | `string` | `—` | Helper / validation text below the field. |
| `size` | `'normal' \| 'small'` | `'normal'` | Action Field height tier. |
| `mode` | `'default' \| 'warning' \| 'error'` | `'default'` | Validation mode on the trigger. |
| `disabled` | `boolean` | `false` | Disables the trigger and panel. |
| `open` | `boolean` | `—` | Force the calendar open (docs/preview); omit for live toggle. |
| `width` | `number \| string` | `288` | Overall control width. |

## Tokens

### Cell selection & focus
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.action.primary` | `#4D60E6` | Selected day fill (with action gradient) |
| `AI.color.action.primaryHover` | `#3544A4` | Selected-hover day fill |
| `AI.color.action.primaryActive` | `#1F2A66` | Pressed day fill |
| `AI.color.brand` | `#4D60E6` | Today ring + nav-arrow stroke/icon |
| `AI.color.brandSubtle` | `#D2DBFF` | Range highlight tint |
| `AI.color.border.focus` | `#4D60E6` | Focus ring on cells / arrows |
| `AI.color.text.onAction` | `#FFFFFF` | Text on filled day cells |

### Surfaces & borders
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.text.primary` | `#1F2A66` | Day / label ink |
| `AI.color.text.secondary` | `#3544A4` | Weekday header + inactive/disabled |
| `AI.color.brandBorder` | `#BECAFE` | Calendar panel + divider border |
| `AI.color.border.default` | `#4D60E6` | Hover cell border |
| `AI.radius.lg` | `20px` | Calendar panel radius |
| `AI.radius.md` | `16px` | Action Field trigger radius |
| `AI.shadow.input.default` | `composite` | Panel + field elevation |

## Flows

### Pick a date
Trigger opens the popover; selecting a day closes it and updates the field.
- Click the AI Action Field trigger (or press Enter/Space) to open the calendar
- Navigate months with the nav arrows or month/year selectors
- Click a day — the value fills the trigger and the popover closes
- Use the Today link to jump to the current date

## Canonical implementation

```tsx
import { AIDatePicker } from '@/components/ai/molecules/date-picker/AIDatePicker';

// Trigger uses the AI Action Field atom (AIInputField, asTrigger)
<AIDatePicker label="Due date" placeholder="MM/DD/YYYY" />

// Controlled-open for docs / layout
<AIDatePicker label="Due date" value="14 Mar 2026" open />

// Disabled
<AIDatePicker label="Due date" value="14 Mar 2026" disabled />
```

## Agent rules

1. Read this mirror spec and `ai-date-picker.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-date-picker/ai-date-picker.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

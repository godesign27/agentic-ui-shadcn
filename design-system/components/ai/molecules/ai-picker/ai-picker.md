# AI Picker

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiPicker`  
**Component type:** React molecule  
**Status:** Draft  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

AI suggests a date or time from data; the human reviews and decides. Never auto-applies. Scales from a passive chip to a full governance panel by density.

The AI Picker wraps the ai-picker-trigger atom with an AI suggestion layer and a calendar/time popover. It consolidates four picker types (date, month, month-range, time) and four density variants that progressively add AI signals, rationale, and governance controls. Core principle: AI suggests, human decides — the suggestion is always shown for review and never auto-applied. The date type reuses ZdsDatePickerInline; month, month-range, and time use brand-styled inline panels.

**Export:** `AIPicker`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/molecules/ai-picker/AIPicker.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-picker/ai-picker.md` | This mirror spec |
| `components/ai/molecules/ai-picker/ai-picker.agent.json` | Agent manifest |
| `components/ai/molecules/ai-picker/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest · Select · Approve |
| Accountability | Rationale · Audit trail · Confidence |

## Anatomy

1. **Trigger** _(Shared)_ — The ai-picker-trigger atom — label, value, icon, AI badge.
2. **Suggestion layer** _(Unique)_ — Chip (simple), panel (rich), or governance panel (robust) shown below the trigger.
3. **Confidence badge** _(Shared)_ — AIConfidenceRiskBadge — rendered at rich/robust when confidence is provided.
4. **Accept / Reject** _(Unique)_ — Explicit actions — onAccept never fires automatically.
5. **Popover** _(Unique)_ — Calendar/month/time panel opened from the trigger; selected fill uses AI.color.brand.

## State variations

- **Basic** _(basic)_ — Trigger only — AI surface skin, no suggestion layer.
- **Simple** _(simple)_ — Passive suggestion chip with an Apply link.
- **Rich** _(rich)_ — Suggestion panel with rationale, confidence, Accept / Dismiss.
- **Robust** _(robust)_ — Governance panel — source, Why this?, audit trail, Accept / Reject / Customize.
- **Month** _(month)_ — Month picker type — 3×4 month grid popover.
- **Month range** _(month-range)_ — Month-range type — dual-panel grid with range highlight.
- **Time** _(time)_ — Time picker type — hour / minute / AM-PM selector.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `type` | `"date" \| "month" \| "month-range" \| "time"` | `—` | Picker sub-type; sets icon and popover |
| `density` | `"basic" \| "simple" \| "rich" \| "robust"` | `—` | Progressive AI signal density |
| `label` | `string` | `—` | Field label |
| `value` | `string` | `""` | Current formatted value |
| `suggestion` | `AISuggestion` | `—` | AI suggestion; absent = trigger only |
| `onAccept` | `(value) => void` | `—` | Explicit accept — never auto-fired |
| `onReject` | `() => void` | `—` | Reject / dismiss the suggestion |
| `onCustomize` | `() => void` | `—` | Robust — open manual customization |
| `onChange` | `(value) => void` | `—` | Fired on popover selection |
| `disabled` | `boolean` | `false` | Suppresses all AI signals |
| `state` | `"default" \| "error"` | `"default"` | Field state |
| `errorMessage` | `string` | `—` | Message shown in error state |

## Tokens

### AI Picker
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brandSurface` | `#F5F6FF` | Suggestion panel bg |
| `AI.color.brandBorder` | `#BECAFE` | Trigger + panel border |
| `AI.color.brand` | `#4D60E6` | Selected day/month fill, sparkle |
| `AI.color.action.primary` | `#4D60E6` | Accept button fill |
| `AI.color.surface.subtle` | `#D2DBFF` | Month-range in-range highlight |

## Canonical implementation

```tsx
import { AIPicker } from '@/components/ai/molecules/ai-picker/AIPicker';

<AIPicker
  type="date"
  density="robust"
  label="Start date"
  placeholder="Select a date"
  suggestion={{
    value: '14 Mar 2026',
    rationale: 'Aligns with the campaign kickoff and avoids the holiday freeze.',
    source: 'Campaign calendar',
    confidence: 'medium',
    auditTrailUrl: '/audit/123',
  }}
  onAccept={(v) => console.log('accepted', v)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-picker.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-picker/ai-picker.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

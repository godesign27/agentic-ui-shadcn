# AI Toggle

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiToggle`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Track + thumb switch with high-contrast OFF state. White thumb passes 3:1 contrast against both ON and OFF tracks.

AIToggle is the canonical binary switch for AI surfaces. The ON state uses the AI brand color (#4D60E6); the OFF state uses a deliberately darker slate (#8D8A93) than ZDS border so the white thumb stays visible — meeting WCAG 1.4.11 (3:1 minimum) for non-text UI components. Pairs a label with the switch via labelPlacement (start/end/none), supports sm/md sizes, and exposes role="switch" + aria-checked.

**Export:** `AIToggle`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/toggle/AIToggle.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-toggle/ai-toggle.md` | This mirror spec |
| `components/ai/atomic/ai-toggle/ai-toggle.agent.json` | Agent manifest |
| `components/ai/atomic/ai-toggle/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Configure · Toggle |
| Accountability | User control · Accessibility |

## Anatomy

1. **Label** _(Optional)_ — Plain text or ReactNode shown beside the track. labelPlacement="start" (default) reads left-to-right.
2. **Track** _(Unique)_ — Pill-shaped container; ON uses AI brand blue, OFF uses #8D8A93 slate so the white thumb has 3:1 contrast.
3. **Border** _(Shared)_ — Track border. ON matches track; OFF uses #6F6C77 so the track edge stays visible against the surface.
4. **Thumb** _(Unique)_ — White disc with a soft shadow. Travels from sz.pad to (trackW − thumb − sz.pad) on toggle, 160ms ease-out.
5. **Focus ring** _(Shared)_ — 2px brand-blue ring at 25% alpha + 1px solid on :focus-visible only.

## State variations

- **Off** _(checked=false)_ — Slate track + white thumb left. Hover deepens the track to #76737E.
- **On** _(checked=true)_ — AI brand blue track + white thumb right. Hover deepens to action.primaryActive.
- **Disabled (off)** _(disabled)_ — Track desaturates to #D9D8DB; cursor reverts. Pointer + click are suppressed.
- **Disabled (on)** _(disabled + checked)_ — Track stays AI brand but at 55% opacity; signals "locked on" state.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `—` | Current on/off state. |
| `onChange` | `(next: boolean) => void` | `—` | Fires with the next state on click or Space/Enter. |
| `label` | `ReactNode` | `—` | Adjacent label. Omit for icon-only / wrapped usage; provide aria-label instead. |
| `labelPlacement` | `"start" \| "end" \| "none"` | `"start"` | Label before, after, or hidden. |
| `size` | `"sm" \| "md"` | `"md"` | sm = 32×18 track + 12px thumb; md = 38×22 track + 16px thumb. |
| `disabled` | `boolean` | `false` | Suppresses interaction + desaturates the track. |
| `aria-label` | `string` | `—` | Required when label is omitted. |
| `id` | `string` | `—` | When provided, ties the label to the switch via htmlFor. |

## Tokens

### Track
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.brand` | `#4D60E6` | ON track fill |
| `OFF_TRACK_BG` | `#8D8A93` | OFF track fill — 3:1 against white thumb |
| `OFF_TRACK_BORDER` | `#6F6C77` | OFF track border |
| `AI.color.action.primaryActive` | `AI brand active` | ON hover/active |

### Thumb
| Token | Value | Usage |
| --- | --- | --- |
| `thumb.bg` | `#FFFFFF` | Always white |
| `thumb.shadow` | `0 1px 2px rgba(15,17,38,0.28)` | Soft drop + half-pixel ink halo for edge crispness |

## Canonical implementation

```tsx
import { AIToggle } from '@/components/ai/atomic/toggle/AIToggle';

const [explain, setExplain] = React.useState(false);

<AIToggle checked={explain} onChange={setExplain} label="Explainability" />

<AIToggle checked={true}  onChange={() => {}} label="Audit mode" labelPlacement="end" />
<AIToggle checked={false} onChange={() => {}} disabled label="Autopilot" />
```

## Agent rules

1. Read this mirror spec and `ai-toggle.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-toggle/ai-toggle.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

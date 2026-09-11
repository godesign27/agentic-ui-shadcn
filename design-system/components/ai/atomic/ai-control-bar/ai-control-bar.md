# AI Control Bar

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiControlBar`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

State-aware execution control bar for AI workstreams. Surfaces contextually appropriate pause, resume, redirect, and cancel actions as the workflow progresses.

**Export:** `AIControlBar`

The AI Control Bar gives users runtime governance over an executing AI task. It surfaces contextually appropriate actions — pause, resume, redirect, cancel confirm — based on the current execution state. Designed to sit inline above or below an AI output surface. The "redirect-available" state surfaces an orange signal button to alert the user of an actionable reroute option.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/control-bar/AIControlBar.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-control-bar/ai-control-bar.md` | This mirror spec |
| `components/ai/atomic/ai-control-bar/ai-control-bar.agent.json` | Agent manifest |
| `components/ai/atomic/ai-control-bar/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led |
| AI behavior | Pause · Redirect · Confirm |
| Accountability | Rollback · Escalation · Approval |

## When to use

- See bundle overview

## Anatomy

1. **Container shell** _(Shared)_ — Horizontal flex bar with brandSurface bg and brandBorder border.
2. **Primary action** _(Unique)_ — State-appropriate primary button (Pause / Resume / Continue).
3. **Signal action** _(Unique)_ — Orange signal button shown only in redirect-available state.
4. **Ghost action** _(Shared)_ — Secondary ghost button (Cancel / Keep running).
5. **Status message** _(Unique)_ — Text-only message for cancel-confirm and saved-progress states.

## State variations

- **Running** _(running)_ — Task executing — Pause + Cancel available.
- **Paused** _(paused)_ — Task paused — Resume + Cancel available.
- **Redirect Available** _(redirect-available)_ — Reroute option surfaced — Redirect (signal) + Continue + Cancel.
- **Cancel Confirm** _(cancel-confirm)_ — Confirmation dialog inline — Yes cancel / Keep running.
- **Saved Progress** _(saved-progress)_ — Progress checkpoint saved — checkmark + text message.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `ControlBarState` | `—` | running \| paused \| redirect-available \| cancel-confirm \| saved-progress |
| `onPause` | `() => void` | `undefined` | Called when Pause button is clicked |
| `onResume` | `() => void` | `undefined` | Called when Resume or Keep running is clicked |
| `onCancel` | `() => void` | `undefined` | Called when Cancel button is clicked |
| `onRedirect` | `() => void` | `undefined` | Called when Redirect button is clicked |
| `onCancelConfirm` | `() => void` | `undefined` | Called when Yes cancel is confirmed |
| `label` | `string` | `undefined` | Optional context label shown left of buttons |

## Tokens

### Control Bar
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.surface.default` | `#F5F6FF` | Bar background |
| `AI.color.border.default` | `#D2D6FF` | Bar border |
| `AI.color.brand` | `#5A6DFF` | Primary button bg |
| `AI.color.signal.surface` | `#FEFBF4` | Redirect button bg |
| `AI.color.signal.default` | `#EC7200` | Redirect button border/text |

## Flows

### Cancel flow
User initiates task cancel
- User clicks Cancel
- Parent sets state="cancel-confirm"
- Inline confirmation renders
- User clicks Yes cancel → onCancelConfirm fires
- Or clicks Keep running → onResume fires, state returns to running

## JavaScript / React API

```tsx
import { AIControlBar } from '@/components/ai/atomic/control-bar/AIControlBar';

<AIControlBar
  state="running"
  onPause={() => setState('paused')}
  onCancel={() => setState('cancel-confirm')}
/>
<AIControlBar state="redirect-available" onRedirect={handleRedirect} />
```

## Agent rules

1. Read this mirror spec and `ai-control-bar.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-control-bar/ai-control-bar.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order
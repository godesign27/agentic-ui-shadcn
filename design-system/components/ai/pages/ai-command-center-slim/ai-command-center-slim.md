# AI Command Center — Slim

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiCommandCenterSlim`  
**Component type:** React page  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Compact single-line AI prompt bar for lightweight contexts. Adapts between idle and active modes without a full command center footprint.

AICommandCenterSlim is a minimal single-row variant of the AI Command Center. The input lives in a pill-shaped bar — everything in one row. The right action button shows a microphone by default (talk-first); when the user types, the mic transitions to an ArrowUp send button with the AI gradient fill. No quick chips, no placeholder copy, no subtext. Intended for surfaces where the AI bar needs to coexist with other content rather than owning the full page.

**Export:** `AICommandCenterSlim`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/pages/ai-command-center-slim/AICommandCenterSlim.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-command-center-slim/ai-command-center-slim.md` | This mirror spec |
| `components/ai/pages/ai-command-center-slim/ai-command-center-slim.agent.json` | Agent manifest |
| `components/ai/pages/ai-command-center-slim/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Suggest · Generate |
| Accountability | Confidence |

## When to use

- Use when the AI bar shares space with other content on the page
- Use for lightweight voice-or-text entry points that don't require a full command center

## When not to use

- Do not use when quick-action chips are needed — use AICommandCenter instead
- Do not use when multi-line input is expected

## Anatomy

1. **Background surface** _(Shared)_ — Gradient crossfade via AI_THEME — same idle/active tokens as the full command center.
2. **Greeting + avatar** _(Shared)_ — AIAvatar3D + "{greeting}, Theo!" heading. Hidden once conversation begins.
3. **Slim pill bar** _(Unique)_ — White 56px pill. Single-line <input>. Border transitions neutral → focus-blue → filled-indigo.
4. **Mic → Send button** _(Unique)_ — 40px circle. Shows Mic icon when input empty. On first keystroke transitions to ArrowUp with AI gradient fill.

## State variations

- **Idle — mic** _(Default)_ — Empty input. Mic icon. Neutral gray circle. Full greeting visible.
- **Typing — send** _(Filled)_ — Input has text. Mic swaps to ArrowUp. Circle fills with AI.gradient.action.full. Border turns AI primary.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"gray" \| "aqua"?` | `"gray"` | Surface gradient theme. |

## Tokens

### Pill bar
| Token | Value | Usage |
| --- | --- | --- |
| `border.color.default` | `rgba(26,22,40,0.18)` | Neutral idle border |
| `border.color.focus` | `rgba(77, 96, 230,0.45)` | Focus ring |
| `border.color.filled` | `#4D60E6` | When input has text |
| `shadow.default` | `0 2px 8px rgba(0,0,0,0.06)` | Resting elevation |
| `shadow.focus` | `0 0 0 2px rgba(77, 96, 230,0.35)` | Focus elevation |
| `border.radius` | `999px` | Full pill |

### Send button
| Token | Value | Usage |
| --- | --- | --- |
| `bg.empty` | `rgba(0,0,0,0.06)` | Mic state |
| `bg.filled` | `linear-gradient(135deg,#657CEC,#4D60E6)` | Send state — AI gradient |
| `color.icon` | `#FFFFFF` | Arrow icon on filled state |
| `shadow` | `rgba(77, 96, 230,0.24)` | Filled send shadow |
| `size` | `40px` | Circle diameter |

## Flows

### Mic → Send transition
The right action button reacts to input state in real time.
- User opens the bar — Mic icon is visible with neutral bg
- User types first character — filled = inputValue.trim().length > 0
- Button bg transitions to AI.gradient.action.full with box-shadow
- Mic icon swaps to ArrowUp via conditional render
- User presses Enter or clicks — onSend() fires, input clears, mic returns

## Canonical implementation

```tsx
import { AICommandCenterSlim } from '@zs/ai/pages/ai-command-center-slim/AICommandCenterSlim';

// Idle — mic visible
<AICommandCenterSlim />

// With variant prop (same as AICommandCenter)
<AICommandCenterSlim variant="aqua" />
```

## Agent rules

1. Read this mirror spec and `ai-command-center-slim.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-command-center-slim/ai-command-center-slim.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

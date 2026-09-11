# AI Card Agent

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardAgent`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Named agent entry-point — voice-first introduction with chat fallback.

AICardAgent is the canonical introduction surface for a named agent in a product. Idle state shows the agent identity (icon + role chip + name + first-person description) and a short capabilities list. Two affordances live at the bottom: Talk (full-width, primary) flips the card to a voice-briefing overlay with a pulsing waveform and a typewriter-streamed message; Chat (square, secondary) opens the AI Assisted Side Panel with a brief inline toast.

**Export:** `AICardAgent`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-agent/AICardAgent.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-agent/ai-card-agent.md` | This mirror spec |
| `components/ai/organisms/ai-card-agent/ai-card-agent.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-agent/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · AI Assisted |
| AI behavior | Introduce · Engage · Hand off |
| Accountability | Personality · Voice · Trust |

## Anatomy

1. **RiFontSize2 icon** _(Unique)_ — 48×48 rounded square. Background tinted with the agent accent; foreground is a lucide icon that encodes the agent's domain.
2. **Role chip** _(Shared)_ — Compact pill in the top-right — short positioning label (e.g. "Primary Partner", "Risk Control").
3. **Name** _(Unique)_ — Agent name as the card heading (@zsai-h3).
4. **Description** _(Unique)_ — First-person blurb. The leading word is rendered in the agent accent + 600 weight to anchor the personality.
5. **Capabilities** _(Unique)_ — Up to 3 use-case bullets under a CAPABILITIES eyebrow. Bullet dots use the agent accent.
6. **Talk button** _(Shared)_ — Full-width primary action. Mic icon + label. Flips the card to the talking overlay on click.
7. **Chat button** _(Shared)_ — 48×48 square secondary. Message icon. Opens the AI Assisted Side Panel and shows an inline toast for 3s.
8. **Talking overlay** _(Unique)_ — Soft gradient background + agent-tinted radial glow, "Agent Briefing" pill, pulsing waveform, typewriter-streamed script, dark round RiCloseLine to dismiss.

## State variations

- **Idle** _(state="idle")_ — Default state. Shows identity, capabilities, and the two action buttons.
- **Talking** _(state="talking")_ — Triggered by the Talk button. Gradient overlay with waveform + typewriter script. Close RiCloseLine returns to idle.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `config` | `AgentCardConfig` | `required` | Agent identity + content. See AGENT_CONFIGS for canonical presets. |
| `forceState` | `"idle" \| "talking"` | `undefined` | Locks the card to a render state — used for static previews. |

## Tokens

### Agent accents
| Token | Value | Usage |
| --- | --- | --- |
| `agent.accent.brand` | `#4D60E6` | Territory Health Analyst — ZSAI brand blue |
| `agent.accent.violet` | `#8B5CF6` | Scenario Strategist — exploration tone |
| `agent.accent.amber` | `#F59E0B` | Impact & Risk Assessor — caution / audit tone |

### Surfaces
| Token | Value | Usage |
| --- | --- | --- |
| `card.surface` | `var(--ai-card-bg)` | Idle card background |
| `card.border` | `var(--ai-card-border)` | Idle card border |
| `talk.button.fill` | `#111827` | Talk button (primary action) + close |

## Flows

### Talk to the agent
User taps Talk; card flips to the briefing overlay and the script types in.
- User clicks Talk
- Idle card fades + scales down
- Talking overlay fades + scales up
- Waveform pulses, typewriter streams the script
- User clicks Close — overlay dismisses, card returns to idle

### Chat with the agent
User taps Chat; AI Assisted Side Panel opens.
- User clicks the square Chat button
- Chat button flashes in the agent accent
- Inline toast appears: "Opening AI Assisted Panel for {name}…"
- Parent opens the AI Assisted Side Panel
- Toast self-dismisses after 3s

## Canonical implementation

```tsx
import { AICardAgent, AGENT_CONFIGS } from '@/components/ai/organisms/ai-card-agent/AICardAgent';

// Use a preset config…
<AICardAgent config={AGENT_CONFIGS[0]} />

// …or pass your own:
<AICardAgent
  config={{
    role: 'Primary Partner',
    name: 'Territory Health Analyst',
    description: "I look beneath the surface of the data to find the human rhythm of your territories.",
    capabilities: [
      "When the balance feels 'off'",
      'Validating the human impact of a move',
      'Finding the narrative in the metrics',
    ],
    icon:       <RiPulseLine size={22} />,
    accent:     '#4D60E6',
    accentBg:   '#EEF0FF',
    talkScript: "I've been looking over the latest alignment health data…",
  }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-agent.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-agent/ai-card-agent.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

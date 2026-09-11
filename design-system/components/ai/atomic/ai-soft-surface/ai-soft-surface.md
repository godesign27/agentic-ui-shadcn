# AI Soft Surface

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiSoftSurface`  
**Component type:** React control  
**Status:** Beta  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

Visual surface primitive that signals "AI companion context" — never a content component.

**Export:** `AISoftSurface`

AISoftSurface is a non-content background canvas used to signal that the surface is AI-led or in companion mode. Six tones — dialog (the canonical AI Command Center dialog wash — soft aqua top, teal-bottom and grey companion blobs), ai (blue-purple identity), tan (companion warmth + a hint of Signal orange), neutral (low emphasis), mixed (BRAND blue→violet→tan diagonal), and ambient (white base with three slowly animated blurred orbs: blue, purple, and teal). dialog is the default; ambient is the canonical animated surface for home-style AI landings.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/soft-surface/AISoftSurface.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-soft-surface/ai-soft-surface.md` | This mirror spec |
| `components/ai/atomic/ai-soft-surface/ai-soft-surface.agent.json` | Agent manifest |
| `components/ai/atomic/ai-soft-surface/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Set context |
| Accountability | Calm presence |

## When to use

- See bundle overview

## Anatomy

1. **Base gradient** _(Unique)_ — Single linear-gradient tinted to the selected tone.
2. **Accent glow** _(Unique)_ — Optional radial-gradient overlay at expressive intensity.
3. **Container** _(Shared)_ — Border-radius + optional soft elevation shadow.

## State variations

- **Dialog (default)** _(tone="dialog")_ — Exact match for the AI Command Center Dialog idle wash — soft aqua top + grey companion blobs + teal bottom-right. Static.
- **AI · subtle** _(tone="ai" intensity="subtle")_ — Soft brand-blue wash for AI-led canvases.
- **Tan · medium** _(tone="tan" intensity="medium")_ — Warm companion backdrop with a hint of Signal orange.
- **Mixed · medium** _(tone="mixed" intensity="medium")_ — BRAND blue → violet → tan diagonal.
- **Neutral · subtle** _(tone="neutral" intensity="subtle")_ — Low-emphasis section background.
- **Ambient · orbs** _(tone="ambient")_ — White base + three slow-animated blurred orbs (blue / purple / teal) over multiply blend. Dark mode shifts to deep navy / purple / deep teal over screen blend.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `"ai" \| "tan" \| "neutral" \| "mixed"` | `"ai"` | Tonal family. tan=companion, ai=intelligence identity. |
| `intensity` | `"subtle" \| "medium" \| "expressive"` | `"subtle"` | How loud the gradient is. expressive adds a radial accent glow. |
| `radius` | `CSS borderRadius` | `AI.radius.lg` | Container corner radius. |
| `elevation` | `"flat" \| "soft"` | `"flat"` | Optional soft shadow for raised cards. |
| `style` | `React.CSSProperties` | `undefined` | Inline overrides — use for padding, min-height, etc. |

## Tokens

### AI tones
| Token | Value | Usage |
| --- | --- | --- |
| `ai.tone.ai.start` | `BRAND[00] #F5F6FF` | AI gradient start |
| `ai.tone.ai.end` | `BRAND[10] #EEF0FF` | AI gradient end |

### Tan tones
| Token | Value | Usage |
| --- | --- | --- |
| `ai.tone.tan.start` | `COMPANION[00] #F6F2EB` | Tan companion start |
| `ai.tone.tan.end` | `COMPANION[20] #F1E4D0` | Tan companion end |

### Ambient orbs (light)
| Token | Value | Usage |
| --- | --- | --- |
| `ambient.base` | `#FFFFFF` | Flat surface base |
| `ambient.orb.blue` | `rgba(96,165,250,0.55)` | Top-left orb · multiply blend |
| `ambient.orb.purple` | `rgba(192,132,252,0.55)` | Top-right orb · multiply blend |
| `ambient.orb.teal` | `rgba(20,184,166,0.55)` | Bottom-left orb · multiply blend (teal) |

### Ambient orbs (dark)
| Token | Value | Usage |
| --- | --- | --- |
| `ambient.dark.orb.blue` | `rgba(30,58,138,0.35)` | Top-left orb · screen blend |
| `ambient.dark.orb.purple` | `rgba(88,28,135,0.35)` | Top-right orb · screen blend |
| `ambient.dark.orb.teal` | `rgba(19,78,74,0.35)` | Bottom-left orb · screen blend |

## JavaScript / React API

```tsx
import { AISoftSurface } from '@/components/ai/atomic/soft-surface/AISoftSurface';

<AISoftSurface tone="mixed" intensity="medium" radius={24}>
  <div style={{ padding: 32 }}>
    {/* page content */}
  </div>
</AISoftSurface>
```

## Agent rules

1. Read this mirror spec and `ai-soft-surface.agent.json` before implementing.
2. Do not hardcode colors — use documented AI/standard tokens.
3. Copy canonical implementation from the external package when synced.

Full agent contract: `components/ai/atomic/ai-soft-surface/ai-soft-surface.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order
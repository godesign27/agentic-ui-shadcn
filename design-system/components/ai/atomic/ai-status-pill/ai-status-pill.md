# AI Status Pill

**Version:** 1.1  
**Last Updated:** 2026-07-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)
**Repo module:** `aiStatusPill`  
**Component type:** React atom  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  


## Purpose

Tone-aware status pill for any card or row that needs a quick "is this OK?" read.

Tone-driven pill with a leading icon (check for success, alert triangle for warning / critical, dot for neutral / info) and a label. Five tones map to the metric-card accent system so the pill, the card dot, and the bottom rail share one color story.

**Export:** `AIStatusPill`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/status-pill/AIStatusPill.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-status-pill/ai-status-pill.md` | This mirror spec |
| `components/ai/atomic/ai-status-pill/ai-status-pill.agent.json` | Agent manifest |
| `components/ai/atomic/ai-status-pill/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Monitor · Evaluate · Warn |
| Accountability | Approval |

## Anatomy

1. **Pill surface** _(Shared)_ — Tone-tinted bg + matching border. Pill radius.
2. **Leading icon** _(Unique)_ — Inline SVG — check / alert triangle / dot. Color inherits from text.
3. **Label** _(Unique)_ — Bold tone-colored label text.

## State variations

- **Success** _(tone="success")_ — Green — `On track`, healthy metrics
- **Warning** _(tone="warning")_ — Amber — `Below target`, `Needs review`
- **Critical** _(tone="critical")_ — Red — urgent intervention required
- **Neutral** _(tone="neutral")_ — Gray — informational, no status judgement
- **Info** _(tone="info")_ — Brand blue — AI-flagged context

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `required` | Pill label. |
| `tone` | `"success" \| "warning" \| "critical" \| "neutral" \| "info"` | `"neutral"` | Color + leading icon. |
| `size` | `"sm" \| "md"` | `"md"` | Pill size. |

## Canonical implementation

```tsx
// AI Status Pill (ai-status-pill)
// Source: ai/atomic/status-pill/AIStatusPill.tsx
// Exported from the ZAIDYN AI Design System on 2026-07-02

import { AIStatusPill } from 'ai/atomic/status-pill/AIStatusPill';

<AIStatusPill label="On track"     tone="success" />
<AIStatusPill label="Below target" tone="warning" />
<AIStatusPill label="Needs review" tone="warning" />
<AIStatusPill label="Critical"     tone="critical" />
```

## Agent rules

1. Read this mirror spec and `ai-status-pill.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.
4. Copy canonical implementation from the external package when synced; use the block above as reference.

Full agent contract: `components/ai/atomic/ai-status-pill/ai-status-pill.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/agent-instructions.md` — agent reading order

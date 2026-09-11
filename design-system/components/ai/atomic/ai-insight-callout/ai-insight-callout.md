# AI Insight Callout

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiInsightCallout`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The "what does this mean?" callout. AI text that earns trust by being clearly attributed as AI-generated.

Pale brand-blue card surface (`var(--ai-brand-surface)` + brand border) with a leading sparkle glyph, an `AI INSIGHT` eyebrow, and an italic body quote (rendered as a `<blockquote>` for screen-reader accuracy). Four tones (brand / warning / critical / success) follow the metric-card accent system so the callout can mirror the surrounding card status.

**Export:** `AIInsightCallout`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/insight-callout/AIInsightCallout.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-insight-callout/ai-insight-callout.md` | This mirror spec |
| `components/ai/atomic/ai-insight-callout/ai-insight-callout.agent.json` | Agent manifest |
| `components/ai/atomic/ai-insight-callout/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Explain · Suggest |
| Accountability | Rationale |

## Anatomy

1. **Surface** _(Unique)_ — Tone-tinted card with matching border. Brand radius.
2. **Sparkle** _(Unique)_ — Inline SVG sparkle + secondary star — AI presence signal.
3. **Eyebrow** _(Shared)_ — `@zsai-micro-eyebrow` typography in tone color.
4. **Body quote** _(Unique)_ — Italic blockquote, quoted text, 12.5px / 1.55. Tone-neutral text color so the quote stays readable on any tone surface.

## State variations

- **Brand** _(tone="brand")_ — Default — AI-attributed interpretation
- **Warning** _(tone="warning")_ — Amber tone — caution / review insight
- **Critical** _(tone="critical")_ — Red tone — urgent insight
- **Success** _(tone="success")_ — Green tone — positive insight

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `body` | `string` | `required` | Body text rendered as an italic blockquote. |
| `eyebrow` | `string` | `"AI INSIGHT"` | Label above the body. Override for non-AI insights. |
| `tone` | `"brand" \| "warning" \| "critical" \| "success"` | `"brand"` | Surface + eyebrow color. |

## Canonical implementation

```tsx
import { AIInsightCallout } from 'ai/atomic/insight-callout/AIInsightCallout';

<AIInsightCallout body="Newark pressure increased after the recent zip moves. Review adjacent zip options before Q3 planning locks." />
```

## Agent rules

1. Read this mirror spec and `ai-insight-callout.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-insight-callout/ai-insight-callout.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

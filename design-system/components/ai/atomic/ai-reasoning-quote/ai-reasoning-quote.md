# AI Reasoning Quote

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiReasoningQuote`  
**Component type:** React atomic  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

A short, italic blockquote with a tinted left rule — the agent speaking in its own voice without breaking the surrounding chrome.

AIReasoningQuote is the canonical way to surface an agent's first-person reasoning inside drawers, detail panels, reasoning cards, and inspector views. The eyebrow names the section ("REASONING SUMMARY", "RATIONALE", "SUMMARY"), and the blockquote renders the agent's short, italicized statement against a brand-tinted left rule. Three tones — `ai` (brand blue), `warning` (ZS orange for risk/guardrail contexts), and `neutral` — keep the atom usable across the AI brand without breaking color discipline.

**Export:** `AIReasoningQuote`

This atom never exposes hidden chain-of-thought. Content must be safe, short, and user-facing — paraphrased reasoning the agent is willing to put its name to.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/atomic/reasoning-quote/AIReasoningQuote.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-reasoning-quote/ai-reasoning-quote.md` | This mirror spec |
| `components/ai/atomic/ai-reasoning-quote/ai-reasoning-quote.agent.json` | Agent manifest |
| `components/ai/atomic/ai-reasoning-quote/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Explain · Summarize · Rationalize |
| Accountability | Transparency · Accountability · Safe explanation |

## Anatomy

1. **Eyebrow glyph** _(Shared)_ — Small leading icon — defaults to the AI brand glyph. Decorative; the eyebrow text carries the meaning.
2. **Eyebrow label** _(Unique)_ — Uppercase section label — defaults to "REASONING SUMMARY". Pass null/"" to hide.
3. **Left rule** _(Unique)_ — Tone-tinted vertical rule that anchors the quote and makes it scannable from a distance.
4. **Quote body** _(Unique)_ — Italic, brand-ink text. Slightly larger than body-small for readability.
5. **Attribution** _(Optional)_ — Caption under the quote — agent name, timestamp, or source. Renders non-italic.

## State variations

- **AI tone (default)** _(tone="ai")_ — Brand-blue left rule + ZSAI eyebrow tint. Used for agent reasoning + capability rationales.
- **Warning tone** _(tone="warning")_ — ZS orange left rule + orange eyebrow. Reserved for risk guardrails and autonomy boundaries.
- **Neutral tone** _(tone="neutral")_ — Helper-grey left rule. For muted secondary contexts.
- **With attribution** _(attribution)_ — Caption under the quote: "— Smart Assist · 2m ago".
- **No eyebrow** _(eyebrow={null})_ — Pure blockquote without the section header — for tight inline contexts.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `quote` | `ReactNode` | `—` | The italicized body content. |
| `eyebrow` | `string \| null` | `"REASONING SUMMARY"` | Section header. Pass null/"" to hide. |
| `eyebrowIcon` | `string` | `"zs-icon-ai-assist"` | ZAIDYN icon class for the eyebrow glyph. |
| `tone` | `"ai" \| "warning" \| "neutral"` | `"ai"` | Drives the left rule color and eyebrow tint. |
| `size` | `"sm" \| "md"` | `"md"` | Body font size — sm=13px, md=14px. |
| `attribution` | `ReactNode` | `—` | Optional caption under the quote. |
| `addQuotes` | `boolean` | `false` | Wraps the quote in curly quotation marks. |
| `id` | `string` | `—` | When provided, ties the eyebrow to the blockquote via aria-labelledby. |

## Tokens

### Tone
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.border.subtle` | `ZSAI[60] #7F95F2` | AI tone left rule |
| `AI.color.text.secondary` | `ZSAI[90] #3544A4` | AI tone eyebrow text |
| `ZS_ORANGE[40]` | `#F4B583` | Warning tone left rule |
| `ZS_ORANGE[80]` | `#A14A00` | Warning tone eyebrow text |

## Canonical implementation

```tsx
import { AIReasoningQuote } from '@/components/ai/atomic/reasoning-quote/AIReasoningQuote';

<AIReasoningQuote
  quote='"I identify spatial inefficiencies by clustering HCP locations against zip code centroids."'
/>

<AIReasoningQuote
  eyebrow="RATIONALE"
  tone="warning"
  quote="I halt outreach before risk compounds — the cost of a wrong send outweighs a missed touchpoint."
  attribution="— Smart Assist · 2m ago"
/>
```

## Agent rules

1. Read this mirror spec and `ai-reasoning-quote.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-reasoning-quote/ai-reasoning-quote.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

# Agentic Prompt — AI Reasoning Quote

You are implementing the **AI Reasoning Quote** (`ai-reasoning-quote`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Reasoning Quote (`ai-reasoning-quote`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> A short, italic blockquote with a tinted left rule — the agent speaking in its own voice without breaking the surrounding chrome.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-reasoning-quote/ai-reasoning-quote.agent.json`
4. `components/ai/atomic/ai-reasoning-quote/ai-reasoning-quote.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIReasoningQuote` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `quote` (`ReactNode`) default ``—`` — The italicized body content.
- `eyebrow` (`string \) default `null`` — `"REASONING SUMMARY"`
- `eyebrowIcon` (`string`) default ``"zs-icon-ai-assist"`` — Guild icon class for the eyebrow glyph.
- `tone` (`"ai" \) default `"warning" \` — "neutral"`
- `size` (`"sm" \) default `"md"`` — `"md"`
- `attribution` (`ReactNode`) default ``—`` — Optional caption under the quote.
- `addQuotes` (`boolean`) default ``false`` — Wraps the quote in curly quotation marks.
- `id` (`string`) default ``—`` — When provided, ties the eyebrow to the blockquote via aria-labelledby.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

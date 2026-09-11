# Agentic Prompt — AI Accent Line

You are implementing the **AI Accent Line** (`ai-accent-line`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Accent Line (`ai-accent-line`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Seven pluggable accent treatments for insight cards — from gradient ribbons to glowing rules — switchable at the AIAnalysisMessage level via a built-in style picker.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-accent-line/ai-accent-line.agent.json`
4. `components/ai/atomic/ai-accent-line/ai-accent-line.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIAccentLine` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `color` (`string`) default ``required`` — Accent element fill color — typically the insight type's labelColor.
- `style` (`AccentLineStyle`) default ``"gradient"`` — One of: gradient \

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

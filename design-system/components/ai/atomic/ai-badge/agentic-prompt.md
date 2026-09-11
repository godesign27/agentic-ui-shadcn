# Agentic Prompt — AI Badge

You are implementing the **AI Badge** (`ai-badge`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Badge (`ai-badge`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The compact label atom for AI status and metrics. Extends the ZDS Badge with a soft emphasis and a data-viz color mode so metric-delta highlights (e.g. "+23% engagement") stay on-system.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-badge/ai-badge.agent.json`
4. `components/ai/atomic/ai-badge/ai-badge.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIBadge` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `children` (`React.ReactNode`) default ``—`` — Badge label — a short status word or a metric like "+23%".
- `variant` (`'neutral' \) default `'info' \` — 'success' \
- `emphasis` (`'bold' \) default `'soft'`` — `'bold'`
- `size` (`'default' \) default `'small'`` — `'default'`
- `series` (`1–12`) default ``1`` — Data-viz series index (only used when variant="dataviz"), mapped to @zs-data-color-*.
- `appearance` (`'text' \) default `'counter' \` — 'dot' \
- `maxCount` (`number`) default ``99`` — Cap for numeric counter / inline appearances — values above render as "{maxCount}+" (e.g. 99+).
- `queue` (`'queued' \) default `'running' \` — 'blocked' \
- `count` (`number`) default ``—`` — Optional count pill shown next to a queue badge (e.g. number of running / pending tasks).

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

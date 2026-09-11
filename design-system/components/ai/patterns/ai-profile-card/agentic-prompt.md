# Agentic Prompt — AI Profile Card

You are implementing the **AI Profile Card** (`ai-profile-card`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Profile Card (`ai-profile-card`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Entity profile · 4 densities · 3 themes · chat + drawer contexts

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-profile-card/ai-profile-card.agent.json`
4. `components/ai/organisms/ai-profile-card/ai-profile-card.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIProfileCard` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`'basic' \) default `'simple' \` — 'rich' \
- `theme` (`'light' \) default `'dark-gradient' \` — 'tan'`
- `context` (`'chat' \) default `'side-drawer'`` — `'side-drawer'`
- `name` (`string`) default ``—`` — Entity full name.
- `specialty` (`string`) default ``—`` — Entity specialty or job title.
- `organization` (`string`) default ``—`` — Entity organization or affiliation.
- `avatarUrl` (`string`) default ``undefined`` — Optional avatar image URL. Falls back to initials.
- `decile` (`number`) default ``undefined`` — AI-computed decile rank (1–10). Simple+ only.
- `role` (`string`) default ``undefined`` — KOL role or attribute label. Simple+ only.
- `stats` (`{ totalVisits, trxLast90d, trxDelta?, lastVisit }`) default ``undefined`` — Stat row data. Simple+ only.
- `sentiment` (`'positive' \) default `'negative' \` — 'neutral'`
- `confidence` (`'high' \) default `'medium' \` — 'low'`
- `insight` (`{ summary, source, onDismiss? }`) default ``undefined`` — Brief AI insight. Rich density only.
- `recommendation` (`{ rationale, source, whyThisUrl?, actions, onDismiss? }`) default ``undefined`` — Full AI recommendation panel. Robust density only.
- `disabled` (`boolean`) default ``false`` — Suppresses all AI signals while keeping the identity shell.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

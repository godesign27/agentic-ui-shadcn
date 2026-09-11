# Agentic Prompt — AI Response Footer

You are implementing the **AI Response Footer** (`ai-response-footer`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Response Footer (`ai-response-footer`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> Closes the loop after every AI output. Sources ground the claim, freshness signals trust, feedback improves the model — all without competing with the response itself.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-response-footer/ai-response-footer.agent.json`
4. `components/ai/molecules/ai-response-footer/ai-response-footer.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIResponseFooter` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `sources` (`AISource[]`) default ``[]`` — Data source chip objects — label, freshness, type, href
- `maxVisibleSources` (`number`) default ``3`` — Max chips shown before "+N more" overflow
- `attribution` (`string`) default ``undefined`` — Attribution text e.g. "Guild Analytics"
- `updatedAt` (`string`) default ``undefined`` — Freshness label e.g. "just now" or "12 min ago"
- `freshnessLabel` (`string`) default ``undefined`` — Overrides computed freshness text entirely
- `showDivider` (`boolean`) default ``true`` — Top divider rule between AI output and footer
- `showFeedback` (`boolean`) default ``true`` — Show AIFeedbackBar sub-atom
- `showRationale` (`boolean`) default ``false`` — Show "View rationale" ghost link
- `showAuditTrail` (`boolean`) default ``false`` — Show "View audit trail" ghost link
- `status` (`"default" \) default `"stale" \` — "missing-source" \
- `compact` (`boolean`) default ``false`` — Shorthand for layout="panel" — collapses chip row
- `layout` (`"default" \) default `"compact" \` — "panel" \
- `disabled` (`boolean`) default ``false`` — Disables all interactive link buttons
- `onViewRationale` (`() => void`) default ``undefined`` — Handler for View rationale link
- `onViewAuditTrail` (`() => void`) default ``undefined`` — Handler for View audit trail link
- `onReportIssue` (`() => void`) default ``undefined`` — Handler for Report issue link — shows when provided

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

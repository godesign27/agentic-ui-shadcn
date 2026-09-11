# Agentic Prompt — AI Suggestion Compare

You are implementing the **AI Suggestion Compare** (`ai-suggestion-compare`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Suggestion Compare (`ai-suggestion-compare`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Compare AI-generated options — benefit, tradeoff, confidence, risk — and choose, ask for another, or send for approval.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-suggestion-compare/ai-suggestion-compare.agent.json`
4. `components/ai/organisms/ai-suggestion-compare/ai-suggestion-compare.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AISuggestionCompare` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`"simple" \) default `"rich" \` — "robust"`
- `title` (`string`) default ``—`` — Comparison title (H3).
- `summary` (`string`) default ``—`` — 1-line summary under the title.
- `generatedBy` (`string`) default ``—`` — Rich+. Uppercase brand-color attribution label ("Guild AI").
- `timestamp` (`string`) default ``—`` — Rich+. Freshness or "Generated" timestamp.
- `suggestions` (`AISuggestionItem[]`) default ``required`` — 2–4 option objects. See suggestion shape below.
- `layout` (`"sideBySide" \) default `"stacked" \` — "grid" \
- `status` (`"default" \) default `"loading" \` — "updating" \
- `approvalRequired` (`boolean`) default ``false`` — Robust. Surfaces the needs-approval treatment in the footer.
- `reviewer` (`string`) default ``—`` — Robust. Reviewer name shown in the footer ("Reviewer: Maya Chen").
- `onSelectSuggestion` (`(id: string) => void`) default ``—`` — Fires when the user clicks Choose on an option.
- `onAskForAnother` (`() => void`) default ``—`` — Footer action: requests another option.
- `onSendForApproval` (`() => void`) default ``—`` — Footer action: routes the comparison into the approval flow.
- `onViewRationale` (`() => void`) default ``—`` — Rich+. Renders the View rationale link.
- `onViewSources` (`() => void`) default ``—`` — Robust. Renders the View sources link.
- `onViewAssumptions` (`() => void`) default ``—`` — Robust. Renders the View assumptions link.
- `loadingLabel` (`string`) default ``"Generating options…"`` — Calm copy displayed above the skeleton during the loading state.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

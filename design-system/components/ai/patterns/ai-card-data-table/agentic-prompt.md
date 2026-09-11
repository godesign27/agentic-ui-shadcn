# Agentic Prompt — AI Card Data Table

You are implementing the **AI Card Data Table** (`ai-card-data-table`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Card Data Table (`ai-card-data-table`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> One reusable table block — compact in chat, contextual in a drawer, governed in a review flow. Density picks how much trust + action context comes along.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-card-data-table/ai-card-data-table.agent.json`
4. `components/ai/organisms/ai-card-data-table/ai-card-data-table.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICardDataTable` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `density` (`"simple" \) default `"rich" \` — "robust"`
- `state` (`"default" \) default `"loading" \` — "progressiveLoading" \
- `title` (`string`) default ``—`` — Table title (H3).
- `subtitle` (`string`) default ``—`` — Rich+. Sub-line under the title.
- `intro` (`string`) default ``—`` — Conversational lead-in sentence rendered above the card shell.
- `generatedBy` (`string`) default ``—`` — Robust. Uppercase brand-color attribution label ("Guild AI").
- `timestamp` (`string`) default ``—`` — Robust. Freshness or "Generated" timestamp.
- `confidence` (`"low" \) default `"medium" \` — "high" \
- `risk` (`"low" \) default `"medium" \` — "high" \
- `columns` (`AIDataTableColumn[]`) default ``required`` — Column definitions — id, label, align, width, type. RiFontSize2 drives alignment and tabular numerals.
- `rows` (`AIDataTableRow[]`) default ``required`` — Row objects with cells array (must match columns length), optional row state, optional note.
- `rowCount` (`number`) default ``—`` — Footer row count when truncating ("5 rows").
- `flaggedSummary` (`string`) default ``—`` — Rich+. Single-line callout above the table for flagged-row context.
- `source` (`{ label: string; icon?: string }`) default ``—`` — Footer source chip (Rich+).
- `freshness` (`string`) default ``—`` — Footer freshness chip (Rich+).
- `reviewer` (`string`) default ``—`` — Robust. Reviewer name shown in the footer trust line.
- `approvalRequired` (`boolean`) default ``false`` — Robust. When true, primary action swaps to "Send for approval".
- `onViewRationale` (`() => void`) default ``—`` — Rich+. Renders the View rationale link.
- `onViewSources` (`() => void`) default ``—`` — Robust. Renders the View sources link.
- `onViewAssumptions` (`() => void`) default ``—`` — Robust. Renders the View assumptions link.
- `onViewAuditTrail` (`() => void`) default ``—`` — Robust. Renders the View audit trail link.
- `onViewChangeSummary` (`() => void`) default ``—`` — Robust. Renders the View change summary link.
- `primaryAction` (`{ label, onClick?, disabled? }`) default ``—`` — Rich+. Primary action button in the footer.
- `secondaryAction` (`{ label, onClick?, disabled? }`) default ``—`` — Rich+. Secondary action button.
- `tertiaryAction` (`{ label, onClick? }`) default ``—`` — Robust. Tertiary action (left-anchored).
- `onExpand` (`() => void`) default ``—`` — Robust. Renders a small expand-icon button in the top-right of the header with a hover tooltip. Use this for the "Expand Full Table" affordance instead of a footer-anchored action.
- `expandTooltip` (`string`) default ``"Expand Full Table"`` — Hover-tooltip label for the top-right expand icon.
- `onRetry` (`() => void`) default ``—`` — When the state is error or sourceUnavailable, renders a Retry button inside the body callout.
- `loadingLabel` (`string`) default ``"Generating table…"`` — Calm copy displayed above the skeleton during the loading state.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

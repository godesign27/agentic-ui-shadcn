# Agentic Prompt — AI Process Trace

You are implementing the **AI Process Trace** (`ai-reasoning-trace`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Process Trace (`ai-reasoning-trace`) |
| **Status** | Draft |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Governed process telemetry, not private reasoning. Shows what the AI system did — step by step — so users, admins, and governance reviewers can inspect execution without seeing internal deliberation.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-reasoning-trace/ai-reasoning-trace.agent.json`
4. `components/ai/organisms/ai-reasoning-trace/ai-reasoning-trace.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIReasoningTrace` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``"AI Process Trace"`` — Display title in the header row
- `status` (`TraceOverallStatus`) default ``required`` — running \
- `steps` (`TraceStep[]`) default ``required`` — Ordered array of trace step objects
- `defaultExpanded` (`boolean`) default ``false`` — Start with the trace body visible
- `expandedStepIds` (`string[]`) default ``[]`` — IDs of steps that start pre-expanded
- `allowExpandAll` (`boolean`) default ``true`` — Show Expand all / Collapse all controls
- `allowCopy` (`boolean`) default ``true`` — Show Copy trace action in footer
- `showDurations` (`boolean`) default ``true`` — Show per-step timing strings
- `showAuditLink` (`boolean`) default ``false`` — Show View audit trail link in footer
- `showRationaleLink` (`boolean`) default ``false`` — Show View rationale link in footer
- `showSourcesLink` (`boolean`) default ``false`` — Show View sources link in footer
- `mode` (`TraceMode`) default ``"technical"`` — business \
- `compact` (`boolean`) default ``false`` — Reduce row height and padding — for embedded contexts
- `onToggle` (`(expanded: boolean) => void`) default ``undefined`` — Called when the trace header is toggled
- `onToggleStep` (`(id, expanded) => void`) default ``undefined`` — Called when a step row is expanded or collapsed
- `onCopyTrace` (`() => void`) default ``undefined`` — Called after clipboard copy
- `onViewAuditTrail` (`() => void`) default ``undefined`` — Called when View audit trail is clicked
- `onViewRationale` (`() => void`) default ``undefined`` — Called when View rationale is clicked
- `onRetryStep` (`(id: string) => void`) default ``undefined`` — Called when Retry is clicked on a failed step
- `onEscalateStep` (`(id: string) => void`) default ``undefined`` — Called when Escalate is clicked on a blocked step

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

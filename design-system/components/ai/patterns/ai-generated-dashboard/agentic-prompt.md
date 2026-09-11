# Agentic Prompt — AI Generated Dashboard

You are implementing the **AI Generated Dashboard** (`ai-generated-dashboard`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Generated Dashboard (`ai-generated-dashboard`) |
| **Status** | Draft |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> The AI-generated workspace. Scenarios, impact, and map overlays compose into a single governed output the operator can shape, approve, and submit.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-generated-dashboard/ai-generated-dashboard.agent.json`
4. `components/ai/pages/ai-generated-dashboard/ai-generated-dashboard.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIGeneratedDashboard` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `title` (`string`) default ``“Cardiology Expansion Q2”`` — Dashboard title shown in the header.
- `status` (`"draft" \) default `"active" \` — "generating" \
- `outputType` (`string`) default ``"Alignment Map"`` — Output-type label shown next to the title (e.g. Alignment Map, Scenario Plan).
- `confidence` (`number`) default ``92.4`` — Confidence percentage displayed in the header trust pair.
- `impactScore` (`number`) default ``12.2`` — Impact percentage displayed in the header trust pair.
- `mode` (`"draft" \) default `"live"`` — `"draft"`
- `variant` (`"standalone" \) default `"embedded"`` — `"standalone"`
- `showHeader` (`boolean`) default ``true`` — Whether to render the dashboard header. Set false when embedded.
- `criticalMode` (`boolean`) default ``false`` — Surfaces signal-orange highlights on impact tiles and escalation thresholds.
- `mapFocused` (`boolean`) default ``false`` — Expands the map module to full width and condenses other modules to a side rail.
- `onSubmit` (`() => void`) default ``undefined`` — Fires when the Submit button is pressed.
- `onToggleDraft` (`() => void`) default ``undefined`` — Fires when the Draft Mode toggle is flipped.
- `onViewRationale` (`() => void`) default ``undefined`` — Fires when any “View rationale” link is activated.
- `onViewSources` (`() => void`) default ``undefined`` — Fires when any “View sources” link is activated.
- `onPromptSelect` (`(prompt: string) => void`) default ``undefined`` — Fires when a contextual prompt chip is selected.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

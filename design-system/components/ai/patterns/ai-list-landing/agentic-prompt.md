# Agentic Prompt — AI List Landing

You are implementing the **AI List Landing** (`ai-list-landing`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI List Landing (`ai-list-landing`) |
| **Status** | Beta |
| **Category** | AI pages |
| **Source** | Make export 2026-08-06 |

> Turn a product home page into an AI-led morning briefing.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/pages/ai-list-landing/ai-list-landing.agent.json`
4. `components/ai/pages/ai-list-landing/ai-list-landing.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIListLanding` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `eyebrow` (`string`) default ``"AI Briefing"`` — Uppercase eyebrow over the heading.
- `heading` (`string`) default ``"Good morning, Sarah."`` — Page-level greeting (h2).
- `intro` (`string`) default ``"Here's what's changed…"`` — One-line briefing intro.
- `lastUpdated` (`string`) default ``"Updated 2m ago"`` — Freshness pill in the header.
- `backgroundTone` (`AISoftSurfaceTone`) default ``"ambient"`` — AISoftSurface tone for the page canvas. Defaults to the animated ambient orb canvas.
- `sections` (`AIListLandingSection[]`) default ``DEFAULT_SECTIONS`` — Section definitions. Each is an AIList props object with id.
- `generating` (`boolean`) default ``false`` — When true, every section shows the loading placeholder.
- `onItemOpen` (`(item, sectionId, index) => void`) default ``undefined`` — Fires when an item is opened.
- `onSectionToggle` (`(sectionId, collapsed) => void`) default ``undefined`` — Fires when a collapsible section is toggled.
- `onAssessmentStart` (`(item) => void`) default ``undefined`` — Fires when a Suggested Next Assessment item is opened — typical hand-off into AICommandCenterSplitView.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

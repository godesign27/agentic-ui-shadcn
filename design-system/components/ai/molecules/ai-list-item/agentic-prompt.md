# Agentic Prompt — AI List Item

You are implementing the **AI List Item** (`ai-list-item`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI List Item (`ai-list-item`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> Card row that presents one AI-generated signal, recommendation, or update.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-list-item/ai-list-item.agent.json`
4. `components/ai/molecules/ai-list-item/ai-list-item.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIListItem` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`"signal" \) default `"stable" \` — "impact" \
- `title` (`string`) default ``required`` — Row headline.
- `label` (`string`) default ``undefined`` — Secondary label in the eyebrow row.
- `status` (`AIListItemStatus`) default ``undefined`` — One of needsReview / balanced / recommended / ready / optional / active / critical / dataStale.
- `body` (`string`) default ``undefined`` — One-to-two-line narrative under the title.
- `type` (`string`) default ``undefined`` — Uppercase type tag (e.g. "Request", "Data Update").
- `icon` (`ReactNode`) default ``undefined`` — Overrides the variant default icon.
- `metric` (`string`) default ``undefined`` — Optional metric pill (e.g. "+6% balance").
- `source` (`string`) default ``undefined`` — Optional source label.
- `freshness` (`string`) default ``undefined`` — Optional freshness/timestamp label.
- `confidence` (`"high" \) default `"medium" \` — "low"`
- `actionLabel` (`string`) default ``undefined`` — Inline action affordance text (replaces trailing chevron).
- `onClick` (`() => void`) default ``undefined`` — Click handler. Implies interactive=true.
- `interactive` (`boolean`) default ``auto`` — Force interactivity. Auto-detected from onClick.
- `tone` (`"ai" \) default `"tan" \` — "neutral"`
- `selected` (`boolean`) default ``false`` — Highlighted/selected state.
- `loading` (`boolean`) default ``false`` — Dimmed loading state.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

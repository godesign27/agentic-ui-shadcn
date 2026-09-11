# Agentic Prompt — AI Node Connector

You are implementing the **AI Node Connector** (`ai-node-connector`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Node Connector (`ai-node-connector`) |
| **Status** | Beta |
| **Category** | AI molecules |
| **Source** | Make export 2026-08-06 |

> The standard connector with the theme swapped — plus the four states an agent graph needs.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/molecules/ai-node-connector/ai-node-connector.agent.json`
4. `components/ai/molecules/ai-node-connector/ai-node-connector.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `node-connector` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `intent` (`'default' \) default `'suggested' \` — 'active' \
- `line` (`'solid' \) default `'dashed'`` — `intent's default`
- `radius` (`'with' \) default `'without'`` — `'with'`
- `startingPoint` (`'none' \) default `'circle' \` — 'ring'`
- `endingPoint` (`'none' \) default `'arrow' \` — 'dot'`
- `badge` (`'none' \) default `'expand' \` — 'collapse' \
- `confidence` (`number`) default ``0.8`` — 0–1. Renders the ring on badge="confidence" and its percentage in the disc.
- `flow` (`boolean`) default ``false`` — Marches a pulse along the run. Decorative; suppressed under reduced motion.
- `label` (`string`) default ``—`` — Relationship pill on the bottom run.
- `state` (`'default' \) default `'focused'`` — `'default'`
- `weight` (`number`) default ``intent's default`` — Overrides the intent stroke weight.
- `width` (`number`) default ``73.5`` — Overall width — grow to reach a deeper child column.
- `height` (`number`) default ``115`` — Overall height — grow to span more rows.
- `indent` (`number`) default ``18.5`` — x of the trunk, and the length of the top run. 0 collapses it to a two-segment elbow.
- `onBadgeClick` (`() => void`) default ``—`` — Supplying it makes the badge a real button with aria-expanded.
- `badgeLabel` (`string`) default ``derived`` — Accessible name for the badge control.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

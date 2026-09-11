# Agentic Prompt — AI Chip

You are implementing the **AI Chip** (`ai-chip`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI Chip (`ai-chip`) |
| **Status** | Stable |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> The single pill atom for the AI system. `kind` selects memory context, task-brief status, outcome status, or an agent handoff — all sharing radius, sizing, and caption typography.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-chip/ai-chip.agent.json`
4. `components/ai/atomic/ai-chip/ai-chip.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIChip` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `kind` (`"memory" \) default `"brief" \` — "status" \
- `size` (`"sm" \) default `"md"`` — `"md"`
- `label` (`string`) default ``—`` — memory / brief / status — the pill text. (handoff uses fromLabel + toLabel instead.)
- `variant` (`MemoryVariant`) default ``—`` — kind="memory" — using-memory \
- `status` (`BriefChipStatus`) default ``"default"`` — kind="brief" — default \
- `noDot` (`boolean`) default ``false`` — kind="brief" — hides the status dot (role/label chips).
- `icon` (`string \) default `ReactNode`` — `—`
- `accentColor` (`string`) default ``—`` — kind="brief" — overrides the derived dot / text accent color.
- `accentBg` (`string`) default ``—`` — kind="brief" — overrides the derived chip background fill.
- `tone` (`AIStatusPillTone`) default ``"neutral"`` — kind="status" — success \
- `showIndicator` (`boolean`) default ``true`` — kind="status" — toggles the leading glyph.
- `onDark` (`boolean`) default ``false`` — kind="status" — switches to the dark-surface tone palette.
- `direction` (`HandoffDirection`) default ``—`` — kind="handoff" — agent-to-agent \
- `fromLabel` (`string`) default ``—`` — kind="handoff" — name of the source party.
- `toLabel` (`string`) default ``—`` — kind="handoff" — name of the target party.
- `state` (`TagChipState`) default ``"neutral"`` — kind="tag" — neutral \
- `tagSize` (`"normal" \) default `"small" \` — "x-small"`
- `interaction` (`TagChipInteraction`) default ``"default"`` — kind="tag" — default \
- `dismissible` (`boolean`) default ``true`` — kind="tag" — shows the trailing zs-icon-close dismiss button (suppressed when active/disabled).
- `leftIcon` (`boolean`) default ``false`` — kind="tag" — leading zs-icon-globe-fill; icon colour tracks the state (white when active, muted when disabled).
- `shape` (`"flat" \) default `"rounded"`` — `"flat"`
- `dataColor` (`string`) default ``—`` — kind="tag" — custom data-viz colour (border + label + filled-circle dismiss). Overrides the semantic state palette; renders as a rounded pill.
- `dataTint` (`string`) default ``dataColor @ 10%`` — kind="tag" — background tint paired with dataColor. Defaults to the data colour at ~10% alpha.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

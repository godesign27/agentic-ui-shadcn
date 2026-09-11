# Agentic Prompt — AI Capability Card

You are implementing the **AI Capability Card** (`ai-capability-card`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Capability Card (`ai-capability-card`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Compact card that surfaces a specific AI capability or model skill, with origin chip + Inspect affordance.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-capability-card/ai-capability-card.agent.json`
4. `components/ai/organisms/ai-capability-card/ai-capability-card.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AICapabilityCard` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `` (`string`) default ```` — Capability name. Rendered bold at 18px.
- `` (`string`) default ```` — Short clarification of what the capability does.
- `` (`'system-defined' \) default `'client-extended' \` — 'user-configured' \
- `` (`'active' \) default `'disabled' \` — 'needs-review'`
- `` (`string`) default ```` — Guild icon class for the drawer header tile.
- `` (`ReactNode`) default ```` — Dashed-rule footnote with a layers glyph.
- `` (`string`) default ```` — Override the right-side action label (defaults from status).
- `` (`() => void`) default ```` — Override default drawer behavior. When set, the drawer does not open automatically.
- `` (`() => void`) default ```` — When set, the drawer renders a "View Full Details" footer CTA.
- `` (`AICapabilityDetail`) default ```` — Drawer content — reasoningSummary, confidence, trend, autonomy[], knowledgeInputs[].
- `` (`boolean`) default ```` — Controlled drawer state. Omit to use internal state.
- `` (`() => void`) default ```` — Notify parent that the drawer wants to close (controlled mode).
- `` (`string`) default ```` — When set, forces disabled styling + tooltip.

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.

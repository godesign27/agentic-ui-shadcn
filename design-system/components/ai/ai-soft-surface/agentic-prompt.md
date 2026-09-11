# Agentic Prompt — AISoftSurface

You are implementing **AISoftSurface** (`ai:ai-soft-surface`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ai:ai-soft-surface` |
| **Status** | Beta |
| **Tier / Category** | atoms · AI |
| **Import** | `@/components/ai/ai-soft-surface` |
| **Exports** | `AISoftSurface`, `aiSoftSurfaceVariants` |

## What it is for

> The wash that says everything inside this boundary was machine-generated.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `/design-system/rules/ai-interaction.json` — **required for this namespace**
4. `design-system/components/ai/ai-soft-surface/ai-soft-surface.agent.json` — props, variants, forbidden usage
5. `design-system/components/ai/ai-soft-surface/ai-soft-surface.md` — anatomy, tokens, examples
6. `src/components/ai/ai-soft-surface.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Never wrap human-authored content in it.
- The wash is not attribution by itself — pair it with ai:ai-message-header or a labelled region.
- One surface per region. Do not nest.
- Reserve expressive intensity for hero surfaces.

### Accountability contract

This component operates at **Suggest** level. Rendering it obliges you to provide:

- **Attribution**


## Never

- Wrapping human-authored content
- Decorative use
- Nested soft surfaces
- As a replacement for ui:card

## Task

Implement using `AISoftSurface` exactly as the contract declares. Use only the props, variants and sizes in `ai-soft-surface.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ai/ai-soft-surface.tsx` — the source settles every disagreement.
2. Open `design-system/components/ai/ai-soft-surface/ai-soft-surface.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:card` (Human-authored containers) · `ai:ai-message-header` (The text attribution it needs)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

# Agentic Prompt — AspectRatio

You are implementing **AspectRatio** (`ui:aspect-ratio`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:aspect-ratio` |
| **Status** | Stable |
| **Tier / Category** | layout · Layout |
| **Import** | `@/components/ui/aspect-ratio` |
| **Exports** | `AspectRatio` |
| **Primitive** | `@radix-ui/react-aspect-ratio` |

## What it is for

> Reserve the right shape before the content arrives, so nothing jumps.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/aspect-ratio/aspect-ratio.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/aspect-ratio/aspect-ratio.md` — anatomy, tokens, examples
5. `src/components/ui/aspect-ratio.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Children need object-cover or object-contain and full width and height.
- Use for media, not text.

## Never

- Constraining text content

## Task

Implement using `AspectRatio` exactly as the contract declares. Use only the props, variants and sizes in `aspect-ratio.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/aspect-ratio.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/aspect-ratio/aspect-ratio.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:skeleton` (Pair for a loading placeholder of the same shape)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

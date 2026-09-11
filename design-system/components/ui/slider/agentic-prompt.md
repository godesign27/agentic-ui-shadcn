# Agentic Prompt — Slider

You are implementing **Slider** (`ui:slider`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:slider` |
| **Status** | Stable |
| **Tier / Category** | molecules · Forms |
| **Import** | `@/components/ui/slider` |
| **Exports** | `Slider` |
| **Primitive** | `@radix-ui/react-slider` |

## What it is for

> An approximate value along a continuous range, where the relative position matters more than the exact number.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/slider/slider.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/slider/slider.md` — anatomy, tokens, examples
5. `src/components/ui/slider.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Label the slider.
- Display the current value in text beside it — the thumb position is not readable enough alone.
- Set aria-valuetext when units matter.
- For exact entry, pair with ui:input.

## Never

- A slider as the only way to enter a precise value
- Unlabelled slider
- A slider with fewer than ten meaningful steps

## Task

Implement using `Slider` exactly as the contract declares. Use only the props, variants and sizes in `slider.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/slider.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/slider/slider.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:input` (Exact numeric entry) · `ui:progress` (Read-only progress, not input)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

# Agentic Prompt — Carousel

You are implementing **Carousel** (`ui:carousel`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:carousel` |
| **Status** | Stable |
| **Tier / Category** | organisms · Data Display |
| **Import** | `@/components/ui/carousel` |
| **Exports** | `Carousel`, `CarouselApi`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious` |

## What it is for

> Move horizontally through a set of items when vertical space genuinely will not stretch.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/carousel/carousel.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/carousel/carousel.md` — anatomy, tokens, examples
5. `src/components/ui/carousel.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- DESIGN_PRINCIPLES.md requires a justification for using a carousel. A grid is usually better.
- Never put a primary call to action past the first slide.
- No autoplay without a visible pause control.
- Keep the controls visible — hover-revealed arrows are undiscoverable.

### Structure is not optional

```
Carousel
  CarouselContent
    CarouselItem
  CarouselPrevious  (optional)
  CarouselNext  (optional)
```

## Never

- Unjustified carousel where a grid would work
- Autoplay with no pause
- Primary CTAs on later slides

## Task

Implement using `Carousel` exactly as the contract declares. Use only the props, variants and sizes in `carousel.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/carousel.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/carousel/carousel.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:scroll-area` (A simpler horizontal scroll region) · `ui:tabs` (When the sections are named)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

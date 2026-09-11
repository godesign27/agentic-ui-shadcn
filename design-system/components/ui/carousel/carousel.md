# Carousel

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:carousel`  
**Category:** Data Display  
**Status:** Stable  
**Import:** `@/components/ui/carousel`  
**Depends on:** `ui:button`  

## Purpose

Move horizontally through a set of items when vertical space genuinely will not stretch.

An Embla wrapper with previous and next controls and keyboard arrow support.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/carousel.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/carousel/carousel.md` | This mirror spec |
| `design-system/components/ui/carousel/carousel.agent.json` | Structured agent contract |
| `design-system/components/ui/carousel/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/carousel/carousel.preview.html` | Visual proof of every documented state |

## When to use

- Image galleries where sequence matters
- Horizontally scrolling card rows on constrained surfaces
- When the user is expected to browse rather than compare

## When not to use

- Important content — carousel items past the first are rarely seen. DESIGN_PRINCIPLES.md requires justification.
- Primary calls to action
- Content that would be better as a grid — which is usually
- More than about ten items with no other way to reach them

## Anatomy

`Carousel` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `CarouselContent` | `Carousel` | Yes | The track |
| `CarouselItem` | `CarouselContent` | Yes | One slide. Set basis-* to show several at once. |
| `CarouselPrevious` | `Carousel` | No | Auto-disables at the start unless looping |
| `CarouselNext` | `Carousel` | No | Auto-disables at the end unless looping |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **At start** | `First slide` | Previous disabled unless loop is set |
| **Mid-scroll** | `Between ends` | Both controls enabled |
| **At end** | `Last slide` | Next disabled unless loop is set |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `orientation` | `see source` | — | Declared in the component source. |
| `opts` | `see source` | — | Declared in the component source. |
| `setApi` | `see source` | — | Declared in the component source. |
| `plugins` | `see source` | — | Declared in the component source. |
| `variant` | `see source` | — | Declared in the component source. |
| `size` | `see source` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`carousel.agent.json`](carousel.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `region with roledescription="carousel"` |

**Keyboard**

- ArrowLeft — previous
- ArrowRight — next
- Tab — reach the controls

**Required**

- An accessible name on the region
- aria-roledescription="slide" on each item

**Notes**

- The component sets role="region" and aria-roledescription="carousel" on the root and "slide" on items.
- Arrow keys work when the carousel region has focus.
- Content outside the current view is still in the DOM and reachable by screen readers — which is good, and means visual position is not the whole story.
- Never autoplay without a pause control. This component does not autoplay by default; keep it that way.

## Examples

### Three-up

```tsx
<Carousel opts={{ align: "start" }} className="w-full max-w-3xl">
  <CarouselContent>
    {items.map(i => (
      <CarouselItem key={i.id} className="md:basis-1/3">
        <Card><CardContent className="p-6">{i.title}</CardContent></Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Agent rules

1. DESIGN_PRINCIPLES.md requires a justification for using a carousel. A grid is usually better.
2. Never put a primary call to action past the first slide.
3. No autoplay without a visible pause control.
4. Keep the controls visible — hover-revealed arrows are undiscoverable.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Unjustified carousel where a grid would work
- Autoplay with no pause
- Primary CTAs on later slides

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:scroll-area` | A simpler horizontal scroll region |
| `ui:tabs` | When the sections are named |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`carousel.agent.json`](carousel.agent.json) → this file → [`src/components/ui/carousel.tsx`](../../../../src/components/ui/carousel.tsx)

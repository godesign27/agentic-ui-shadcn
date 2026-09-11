# Card

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:card`  
**Category:** Layout  
**Status:** Stable  
**Import:** `@/components/ui/card`  

## Purpose

Group related content into a unit the eye reads as one thing.

Six composable parts. No variants — a card is a container, and its meaning comes from what you put in it.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/card.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/card/card.md` | This mirror spec |
| `design-system/components/ui/card/card.agent.json` | Structured agent contract |
| `design-system/components/ui/card/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/card/card.preview.html` | Visual proof of every documented state |

## When to use

- Grouping related information with a clear boundary
- Repeating items in a grid or list
- Sectioning a settings or dashboard page
- Empty states

## When not to use

- Wrapping every element on the page — nesting cards in cards destroys the hierarchy they exist to create
- A single paragraph with no grouping need
- Tabular data — use ui:table
- As a clickable button — put the interactive element inside, or the whole card in a link

## Anatomy

`Card` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `CardHeader` | `Card` | No | Title and description region |
| `CardTitle` | `CardHeader` | No | Renders <h3> by default. Set `as` to match the surrounding outline — h2 under a page h1, or "div" when it is not a heading at all. |
| `CardDescription` | `CardHeader` | No | text-muted-foreground |
| `CardContent` | `Card` | No | The body. Note its pt-0 — it assumes a CardHeader above. |
| `CardFooter` | `Card` | No | Action row |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | bg-card, border-border, rounded-lg, shadow-sm |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`card.agent.json`](card.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `card` | `bg-card`, `text-card` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Notes**

- A Card is a div. It carries no semantics of its own — that is correct and deliberate.
- CardTitle renders <h3> by default, which is right inside an <h2> section and wrong directly under the page <h1>. Set `as` to match the real outline — screen-reader users navigate by heading, so a page of cards at the wrong level is a broken outline.
- For a card grid, wrap in a ul and each card in an li so the count is announced.
- A whole-card click target needs a real button or link inside — do not attach onClick to the Card div.

## Examples

### Standard card

```tsx
<Card>
  <CardHeader>
    <CardTitle as="h2">Deployments</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-semibold">1,284</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">View all</Button>
  </CardFooter>
</Card>
```

## Agent rules

1. Do not nest cards.
2. Set `as` on CardTitle to match the surrounding heading level. The h3 default is a guess about context it cannot see.
3. CardContent has pt-0 — using it without CardHeader leaves the top padding wrong.
4. Clickable cards need a real interactive element inside.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Nested cards
- onClick on the Card div with no focusable child
- Using Card for tabular data

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:table` | Tabular data |
| `ui:accordion` | Collapsible sections |
| `ui:skeleton` | Loading placeholder |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`card.agent.json`](card.agent.json) → this file → [`src/components/ui/card.tsx`](../../../../src/components/ui/card.tsx)

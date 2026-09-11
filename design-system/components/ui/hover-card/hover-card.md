# HoverCard

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:hover-card`  
**Category:** Overlay  
**Status:** Stable  
**Primitive:** `@radix-ui/react-hover-card`  
**Import:** `@/components/ui/hover-card`  

## Purpose

A rich preview of what a link points to, without making the user go there.

Radix HoverCard. Opens on hover with a delay. Unlike a tooltip it may contain layout and images — but like a tooltip it is unreachable on touch.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/hover-card.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/hover-card/hover-card.md` | This mirror spec |
| `design-system/components/ui/hover-card/hover-card.agent.json` | Structured agent contract |
| `design-system/components/ui/hover-card/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/hover-card/hover-card.preview.html` | Visual proof of every documented state |

## When to use

- User or entity previews on a mention
- Link previews with a thumbnail and summary
- Supplementary context that is genuinely optional

## When not to use

- Anything required to complete the task — touch users will never see it
- Short text — use ui:tooltip
- Content the user must interact with — use ui:popover
- On a primarily mobile surface

## Anatomy

`HoverCard` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `HoverCardTrigger` | `HoverCard` | Yes |  |
| `HoverCardContent` | `HoverCard` | Yes |  |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Hidden** | `Rest` | Nothing rendered |
| **Visible** | `Hover after openDelay` | Fades in; stays while the pointer is over trigger or content |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`hover-card.agent.json`](hover-card.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `popover` | `bg-popover`, `text-popover` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `dialog` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Focus on the trigger opens it
- Escape closes

**Required**

- A meaningful accessible name on the trigger

**Notes**

- Hover-only by design. Always duplicate anything important somewhere reachable.
- Do not place primary actions inside — they are unreachable on touch.

## Examples

### User preview

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/u/ada" className="underline">@ada</a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar><AvatarImage src="/ada.png" /><AvatarFallback>AL</AvatarFallback></Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">Ada Lovelace</h4>
        <p className="text-sm text-muted-foreground">Analytical engine, 1843.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

## Agent rules

1. Preview only. Never the sole source of anything.
2. No primary actions inside.
3. Not appropriate on mobile-first surfaces.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Critical information
- Primary actions inside the card
- Mobile-first usage

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:tooltip` | Short text |
| `ui:popover` | Click-triggered, interactive |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`hover-card.agent.json`](hover-card.agent.json) → this file → [`src/components/ui/hover-card.tsx`](../../../../src/components/ui/hover-card.tsx)

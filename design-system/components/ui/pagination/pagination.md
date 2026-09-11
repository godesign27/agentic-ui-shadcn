# Pagination

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:pagination`  
**Category:** Navigation  
**Status:** Stable  
**Import:** `@/components/ui/pagination`  
**Depends on:** `ui:button`  

## Purpose

Move through a result set that is too large to show at once.

Semantic pagination markup using buttonVariants. Presentational only — the page state and routing are yours.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/pagination.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/pagination/pagination.md` | This mirror spec |
| `design-system/components/ui/pagination/pagination.agent.json` | Structured agent contract |
| `design-system/components/ui/pagination/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/pagination/pagination.preview.html` | Visual proof of every documented state |

## When to use

- Paged tables and result lists
- When the total count is known and useful
- When users need to return to a specific page

## When not to use

- Feeds where infinite scroll suits the content better
- Fewer than about three pages
- When the total is unknown — use a simpler next-and-previous pair

## Anatomy

`Pagination` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `PaginationContent` | `Pagination` | Yes | A ul |
| `PaginationItem` | `PaginationContent` | Yes | An li |
| `PaginationLink` | `PaginationItem` | No | isActive sets aria-current="page" and the outline variant |
| `PaginationPrevious` | `PaginationItem` | No |  |
| `PaginationNext` | `PaginationItem` | No |  |
| `PaginationEllipsis` | `PaginationItem` | No | aria-hidden, with an sr-only "More pages" |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Inactive page** | `Not the current page` | Ghost variant |
| **Active page** | `isActive` | Outline variant with aria-current="page" |
| **Boundary** | `First or last page` | Disable previous or next yourself — the component does not |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`pagination.agent.json`](pagination.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `navigation` |

**Keyboard**

- Tab through the links

**Required**

- aria-label="pagination" on the nav — set by the component
- aria-current="page" via isActive

**Notes**

- Renders anchors. For client-side routing, use asChild with your router link.
- Previous and Next are not disabled at the boundaries automatically. Handle that yourself or they lead nowhere.
- Announce the page change in a live region — the content updates silently otherwise.

## Examples

### Paged results

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" aria-disabled={page === 1} />
    </PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>
```

## Agent rules

1. Disable previous and next at the boundaries yourself.
2. Set isActive on the current page.
3. Announce page changes in a live region.
4. Use asChild for client-side routing.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Enabled previous on page one
- No current-page indication
- Silent page changes

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- No page-state logic, no boundary disabling, no live-region announcement. All presentational.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:table` | The usual companion |
| `ui:button` | buttonVariants supplies the styling |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`pagination.agent.json`](pagination.agent.json) → this file → [`src/components/ui/pagination.tsx`](../../../../src/components/ui/pagination.tsx)

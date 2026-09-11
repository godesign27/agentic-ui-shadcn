# Breadcrumb

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** molecules  
**Component id:** `ui:breadcrumb`  
**Category:** Navigation  
**Status:** Stable  
**Primitive:** `@radix-ui/react-slot`  
**Import:** `@/components/ui/breadcrumb`  

## Purpose

Show where this page sits in the hierarchy, and offer a way back up.

Semantic breadcrumb markup: nav, ordered list, links, and a current page marked with aria-current.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/breadcrumb.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/breadcrumb/breadcrumb.md` | This mirror spec |
| `design-system/components/ui/breadcrumb/breadcrumb.agent.json` | Structured agent contract |
| `design-system/components/ui/breadcrumb/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/breadcrumb/breadcrumb.preview.html` | Visual proof of every documented state |

## When to use

- Hierarchies three or more levels deep
- When users arrive from search and need orientation
- File and folder structures

## When not to use

- Flat sites with no hierarchy
- As a step indicator for a wizard — breadcrumbs describe location, not progress
- When the hierarchy is only one level deep

## Anatomy

`Breadcrumb` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `BreadcrumbList` | `Breadcrumb` | Yes | An ol |
| `BreadcrumbItem` | `BreadcrumbList` | Yes | An li |
| `BreadcrumbLink` | `BreadcrumbItem` | No | Use asChild with your router link |
| `BreadcrumbPage` | `BreadcrumbItem` | No | The current page. Carries aria-current="page" and is not a link. |
| `BreadcrumbSeparator` | `BreadcrumbList` | No | aria-hidden — decorative |
| `BreadcrumbEllipsis` | `BreadcrumbItem` | No | Collapsed middle segments |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Link** | `An ancestor level` | hover:text-foreground |
| **Current page** | `BreadcrumbPage` | text-foreground, aria-current="page", not clickable |
| **Collapsed** | `BreadcrumbEllipsis` | Stands in for hidden middle levels |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `separator` | `React.ReactNode` | — | Declared in the component source. |
| `asChild` | `boolean` | `false` | Render the child element instead, merging props and styles |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`breadcrumb.agent.json`](breadcrumb.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `foreground` | `text-foreground` |
| `muted` | `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `navigation` |

**Keyboard**

- Tab through the links

**Required**

- aria-label="Breadcrumb" on the nav — set by the component
- aria-current="page" on the last item — set by BreadcrumbPage

**Notes**

- The final item must be BreadcrumbPage, not BreadcrumbLink. Linking to the current page is a common and pointless error.
- Separators are aria-hidden so they are not read as content.
- BreadcrumbEllipsis is decorative. If the hidden levels matter, put them in a ui:dropdown-menu behind it.

## Examples

### Three levels

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/projects">Projects</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Apollo</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Agent rules

1. The last item is always BreadcrumbPage.
2. Use asChild to integrate your router.
3. Put collapsed levels behind a real menu, not a bare ellipsis.
4. Not a wizard stepper.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Linking the current page
- Breadcrumbs as a step indicator
- Flat hierarchies

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:navigation-menu` | Primary site navigation |
| `ui:dropdown-menu` | Revealing collapsed levels |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`breadcrumb.agent.json`](breadcrumb.agent.json) → this file → [`src/components/ui/breadcrumb.tsx`](../../../../src/components/ui/breadcrumb.tsx)

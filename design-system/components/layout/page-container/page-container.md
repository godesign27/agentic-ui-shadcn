# PageContainer

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** layout  
**Component id:** `layout:page-container`  
**Category:** Layout  
**Status:** Stable  
**Import:** `@/components/layout/page-container`  

## Purpose

One max-width, one gutter, one place to change either.

The layout root named by agents/page-generation.json. Renders <main> by default, so a generated page gets its main landmark without anyone remembering to add one.

## Source

| Path | Role |
| --- | --- |
| `src/components/layout/page-container.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/layout/page-container/page-container.md` | This mirror spec |
| `design-system/components/layout/page-container/page-container.agent.json` | Structured agent contract |
| `design-system/components/layout/page-container/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/layout/page-container/page-container.preview.html` | Visual proof of every documented state |

## When to use

- The outermost wrapper of any generated page
- Any region needing the standard horizontal rhythm
- Satisfying the layout root in the page-generation contract

## When not to use

- Nested inside another PageContainer — the gutters compound
- Inside a ui:dialog or ui:sheet, which bring their own padding
- For a full-bleed region; use width="full" on a child instead of dropping the container

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | main by default. Carries the max-width, the side gutter and the vertical rhythm. |

## Variants

| Variant | When to use it |
| --- | --- |
| `prose` | max-w-2xl. Long-form reading, where line length matters. |
| `narrow` | max-w-3xl. Settings and forms. |
| `default` | max-w-5xl. Most pages. |
| `wide` | max-w-7xl. Dashboards and tables. |
| `full` | No max-width. Keeps the gutter; drops the constraint. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `No props` | max-w-5xl, responsive gutter, py-8 to py-12 |
| **Full bleed** | `width="full"` | Gutter retained — content never touches the viewport edge |
| **Flush** | `spacing="none"` | No vertical padding. Side padding is never removed. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `width` | `"prose"` \| `"narrow"` \| `"default"` \| `"wide"` \| `"full"` | `"default"` | Declared in `pageContainerVariants` |
| `gutter` | `"none"` \| `"default"` \| `"loose"` | `"default"` | Declared in `pageContainerVariants` |
| `spacing` | `"none"` \| `"tight"` \| `"default"` \| `"loose"` | `"default"` | Declared in `pageContainerVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`page-container.agent.json`](page-container.agent.json)

## Tokens

This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `main` |

**Notes**

- Renders <main>, which supplies the main landmark. Exactly one per page — set as="div" for any additional container.
- The gutter never collapses below px-4, so content keeps a 16px side margin at every width, including gutter="none".
- Vertical rhythm uses py-*, never a padding shorthand, so the side gutter cannot be zeroed by accident.

## Examples

### Standard page

```tsx
<PageContainer>
  <h1 className="text-2xl font-semibold">Deployments</h1>
  {/* … */}
</PageContainer>
```

## Agent rules

1. One <main> per page. Additional containers use as="div".
2. Do not nest containers.
3. Pick width from the content: prose for reading, wide for data.
4. Never remove the side gutter.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Nested containers
- Multiple <main> landmarks
- Removing the side gutter
- Use inside a dialog or sheet

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:card` | Grouping inside the container |
| `ui:sidebar` | SidebarInset owns the main region instead |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`page-container.agent.json`](page-container.agent.json) → this file → [`src/components/layout/page-container.tsx`](../../../../src/components/layout/page-container.tsx)

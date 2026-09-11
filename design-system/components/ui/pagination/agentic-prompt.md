# Agentic Prompt — Pagination

You are implementing **Pagination** (`ui:pagination`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:pagination` |
| **Status** | Stable |
| **Tier / Category** | molecules · Navigation |
| **Import** | `@/components/ui/pagination` |
| **Exports** | `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious` |

## What it is for

> Move through a result set that is too large to show at once.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/pagination/pagination.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/pagination/pagination.md` — anatomy, tokens, examples
5. `src/components/ui/pagination.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Disable previous and next at the boundaries yourself.
- Set isActive on the current page.
- Announce page changes in a live region.
- Use asChild for client-side routing.

### Structure is not optional

```
Pagination
  PaginationContent
    PaginationItem
      PaginationLink  (optional)
      PaginationPrevious  (optional)
      PaginationNext  (optional)
      PaginationEllipsis  (optional)
```

## Never

- Enabled previous on page one
- No current-page indication
- Silent page changes

## Task

Implement using `Pagination` exactly as the contract declares. Use only the props, variants and sizes in `pagination.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/pagination.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/pagination/pagination.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:table` (The usual companion) · `ui:button` (buttonVariants supplies the styling)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

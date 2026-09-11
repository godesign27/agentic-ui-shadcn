# Agentic Prompt — Breadcrumb

You are implementing **Breadcrumb** (`ui:breadcrumb`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:breadcrumb` |
| **Status** | Stable |
| **Tier / Category** | molecules · Navigation |
| **Import** | `@/components/ui/breadcrumb` |
| **Exports** | `Breadcrumb`, `BreadcrumbEllipsis`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbList`, `BreadcrumbPage`, `BreadcrumbSeparator` |
| **Primitive** | `@radix-ui/react-slot` |

## What it is for

> Show where this page sits in the hierarchy, and offer a way back up.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/breadcrumb/breadcrumb.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/breadcrumb/breadcrumb.md` — anatomy, tokens, examples
5. `src/components/ui/breadcrumb.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- The last item is always BreadcrumbPage.
- Use asChild to integrate your router.
- Put collapsed levels behind a real menu, not a bare ellipsis.
- Not a wizard stepper.

### Structure is not optional

```
Breadcrumb
  BreadcrumbList
    BreadcrumbItem
      BreadcrumbLink  (optional)
      BreadcrumbPage  (optional)
      BreadcrumbEllipsis  (optional)
    BreadcrumbSeparator  (optional)
```

## Never

- Linking the current page
- Breadcrumbs as a step indicator
- Flat hierarchies

## Task

Implement using `Breadcrumb` exactly as the contract declares. Use only the props, variants and sizes in `breadcrumb.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/breadcrumb.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/breadcrumb/breadcrumb.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:navigation-menu` (Primary site navigation) · `ui:dropdown-menu` (Revealing collapsed levels)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

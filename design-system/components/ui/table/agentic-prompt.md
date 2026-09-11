# Agentic Prompt — Table

You are implementing **Table** (`ui:table`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:table` |
| **Status** | Stable |
| **Tier / Category** | organisms · Data Display |
| **Import** | `@/components/ui/table` |
| **Exports** | `Table`, `TableBody`, `TableCaption`, `TableCell`, `TableFooter`, `TableHead`, `TableHeader`, `TableRow` |

## What it is for

> Data with real rows and columns, where comparing across both matters.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/table/table.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/table/table.md` — anatomy, tokens, examples
5. `src/components/ui/table.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Add scope="col" to every TableHead.
- Every table needs a caption or aria-label.
- Never use a table for layout.
- Sorting, filtering and pagination are not included — build them and wire aria-sort yourself.
- Past a few hundred rows, paginate or virtualise.

### Structure is not optional

```
Table
  TableCaption  (optional)
  TableHeader
  TableBody
  TableFooter  (optional)
  TableRow  (inside TableHeader | TableBody | TableFooter)
```

## Never

- Layout tables
- Headers with no scope
- Unnamed tables
- Unbounded row counts

## Task

Implement using `Table` exactly as the contract declares. Use only the props, variants and sizes in `table.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/table.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/table/table.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:pagination` (Paging through rows) · `ui:scroll-area` (Bounded scroll regions) · `ui:skeleton` (Loading rows)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

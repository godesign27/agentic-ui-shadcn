# Table

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:table`  
**Category:** Data Display  
**Status:** Stable  
**Import:** `@/components/ui/table`  

## Purpose

Data with real rows and columns, where comparing across both matters.

Semantic HTML table elements with shadcn styling. No sorting, filtering, pagination or virtualisation — those are yours to add.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/table.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/table/table.md` | This mirror spec |
| `design-system/components/ui/table/table.agent.json` | Structured agent contract |
| `design-system/components/ui/table/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/table/table.preview.html` | Visual proof of every documented state |

## When to use

- Genuinely tabular data
- Comparison across rows and columns
- Data with a stable column structure

## When not to use

- Layout — this has been wrong since 2005
- A list of items with one attribute each — use a list or ui:card
- Hundreds of rows with no virtualisation
- Narrow screens without a responsive strategy

## Anatomy

`Table` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `TableCaption` | `Table` | No | Describes the table for screen readers. Renders visually at the bottom. |
| `TableHeader` | `Table` | Yes | thead |
| `TableBody` | `Table` | Yes | tbody |
| `TableFooter` | `Table` | No | tfoot — totals |
| `TableRow` | `TableHeader | TableBody | TableFooter` | Yes |  |
| `TableHead` | `TableRow` | No | th. Add scope="col". |
| `TableCell` | `TableRow` | No | td |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Rows separated by border-b |
| **Row hover** | `Pointer over` | hover:bg-muted/50 |
| **Row selected** | `data-state="selected"` | bg-muted |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`table.agent.json`](table.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `muted` | `bg-muted`, `text-muted` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `table` |

**Keyboard**

- Standard reading-mode navigation

**Required**

- scope="col" on column headers
- A TableCaption or aria-label naming the table

**Notes**

- TableHead does not set scope automatically. Add scope="col" yourself — without it, screen readers cannot associate cells with headers, which is the entire benefit of a table.
- TableCaption is the accessible name. Use sr-only if it should not be visible.
- The wrapper div already has overflow-auto for horizontal scroll on narrow screens.
- Sortable headers need a button inside the th plus aria-sort on the th.

## Examples

### Accessible table

```tsx
<Table>
  <TableCaption className="sr-only">Recent deployments</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Service</TableHead>
      <TableHead scope="col">Status</TableHead>
      <TableHead scope="col" className="text-right">Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">api</TableCell>
      <TableCell><Badge variant="secondary">Succeeded</Badge></TableCell>
      <TableCell className="text-right">2m 14s</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Agent rules

1. Add scope="col" to every TableHead.
2. Every table needs a caption or aria-label.
3. Never use a table for layout.
4. Sorting, filtering and pagination are not included — build them and wire aria-sort yourself.
5. Past a few hundred rows, paginate or virtualise.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Layout tables
- Headers with no scope
- Unnamed tables
- Unbounded row counts

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- No sorting, filtering, pagination, selection or virtualisation. scope is not applied automatically to TableHead.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:pagination` | Paging through rows |
| `ui:scroll-area` | Bounded scroll regions |
| `ui:skeleton` | Loading rows |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`table.agent.json`](table.agent.json) → this file → [`src/components/ui/table.tsx`](../../../../src/components/ui/table.tsx)

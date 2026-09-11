# Calendar

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:calendar`  
**Category:** Forms  
**Status:** Stable  
**Import:** `@/components/ui/calendar`  
**Depends on:** `ui:button`  

## Purpose

Pick a date when the surrounding days matter to the choice.

A react-day-picker wrapper styled with buttonVariants. Single, multiple and range selection modes.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/calendar.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/calendar/calendar.md` | This mirror spec |
| `design-system/components/ui/calendar/calendar.agent.json` | Structured agent contract |
| `design-system/components/ui/calendar/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/calendar/calendar.preview.html` | Visual proof of every documented state |

## When to use

- Date selection where day of week or adjacency matters
- Date ranges
- Inside ui:popover as a date-picker field

## When not to use

- A known specific date the user can type faster — offer a text input too
- Dates far in the past, like a birth date — a year and month select is far quicker
- Where a relative choice would do — Today, Tomorrow, Next week

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The month grid with navigation |
| **CalendarDayButton** | One day cell. Exported so you can decorate days. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Current month rendered |
| **Selected** | `Matches selected` | bg-primary text-primary-foreground |
| **Today** | `Current date` | bg-accent |
| **Outside month** | `Leading or trailing days` | text-muted-foreground, opacity reduced |
| **Disabled** | `Matched by the disabled matcher` | opacity-50, not selectable |
| **Range middle** | `Between range ends` | bg-accent with no rounding |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`calendar.agent.json`](calendar.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `accent` | `bg-accent`, `text-accent` |
| `background` | `bg-background` |
| `input` | `border-input` |
| `muted` | `text-muted` |
| `popover` | `bg-popover` |
| `primary` | `bg-primary`, `text-primary` |
| `ring` | `border-ring`, `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `grid` |

**Keyboard**

- Arrow keys — move by day
- PageUp/PageDown — move by month
- Home/End — start or end of week
- Enter or Space — select

**Required**

- An accessible label on the calendar
- aria-live announcement of the selected date

**Notes**

- react-day-picker supplies grid semantics and keyboard navigation.
- Always offer a typed alternative. Keyboard-only users navigating months by arrow key is punishing for distant dates.
- Announce the selection in a live region — the visual highlight alone is not enough.
- Set the disabled matcher rather than allowing an invalid pick and rejecting it afterwards.

## Examples

### Date picker field

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-[240px] justify-start">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} disabled={{ before: new Date() }} />
  </PopoverContent>
</Popover>
```

## Agent rules

1. Pair with a text input for typed entry.
2. Use the disabled matcher to prevent invalid selections up front.
3. Announce selections in a live region.
4. Inside ui:popover, render PopoverContent with className="w-auto p-0".

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Calendar as the only date-entry route
- Allowing invalid dates then rejecting on submit
- Using a day grid for distant historical dates

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:popover` | The usual host for a date-picker field |
| `ui:input` | Typed entry alternative |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`calendar.agent.json`](calendar.agent.json) → this file → [`src/components/ui/calendar.tsx`](../../../../src/components/ui/calendar.tsx)

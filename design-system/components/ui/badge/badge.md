# Badge

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:badge`  
**Category:** Data Display  
**Status:** Stable  
**Import:** `@/components/ui/badge`  

## Purpose

A short label that classifies the thing next to it.

A small pill with four variants. Renders a div — not interactive, despite having hover styles.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/badge.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/badge/badge.md` | This mirror spec |
| `design-system/components/ui/badge/badge.agent.json` | Structured agent contract |
| `design-system/components/ui/badge/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/badge/badge.preview.html` | Visual proof of every documented state |

## When to use

- Status labels — Active, Pending, Archived
- Categories and tags
- Counts beside a label

## When not to use

- As a button or filter chip — a Badge is a div and is not focusable
- For long text — it does not wrap gracefully
- Status conveyed by colour alone

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The pill. A div with badgeVariants applied. |

## Variants

| Variant | When to use it |
| --- | --- |
| `default` | Primary emphasis. Use sparingly or it stops meaning anything. |
| `secondary` | The everyday choice for neutral labels. |
| `destructive` | Error and failure states. |
| `outline` | Lowest emphasis, for dense surfaces like table cells. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Variant-specific fill; hover styles are present but the element is not interactive |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` | `"default"` | Declared in `badgeVariants` |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`badge.agent.json`](badge.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `destructive` | `bg-destructive`, `text-destructive` |
| `foreground` | `text-foreground` |
| `primary` | `bg-primary`, `text-primary` |
| `ring` | `ring-ring` |
| `secondary` | `bg-secondary`, `text-secondary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `none` |

**Notes**

- A Badge is a div with no semantics. Its text is read inline with surrounding content, which is usually what you want.
- Status must be in the text, not only the colour. "Failed" plus red — never red alone.
- A count badge needs context: aria-label="3 unread notifications", not a bare "3".
- The base class includes hover and focus styles, which is misleading — the element is not focusable. For an interactive chip, use ui:button or ui:toggle.

## Examples

### Status

```tsx
<Badge variant="secondary">Active</Badge>
```

### Count with context

```tsx
<Badge aria-label="3 unread notifications">3</Badge>
```

## Agent rules

1. Status goes in the text, not only the colour.
2. A bare number needs an aria-label giving it meaning.
3. For an interactive chip use ui:button variant="outline" size="sm", not a Badge.
4. Keep to one or two words.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Badge as a clickable control
- Colour-only status
- Long text

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- Carries hover and focus-visible styling despite rendering a non-focusable div. Do not read that as permission to make it interactive.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:button` | Interactive chips |
| `ui:toggle` | Filter chips |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`badge.agent.json`](badge.agent.json) → this file → [`src/components/ui/badge.tsx`](../../../../src/components/ui/badge.tsx)

# Progress

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** atoms  
**Component id:** `ui:progress`  
**Category:** Feedback  
**Status:** Stable  
**Primitive:** `@radix-ui/react-progress`  
**Import:** `@/components/ui/progress`  

## Purpose

Show how much of a known quantity of work is done.

Radix Progress: a track with an indicator translated by value. Determinate only in practice.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/progress.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/progress/progress.md` | This mirror spec |
| `design-system/components/ui/progress/progress.agent.json` | Structured agent contract |
| `design-system/components/ui/progress/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/progress/progress.preview.html` | Visual proof of every documented state |

## When to use

- File uploads
- Multi-step completion
- Anything where the total is known

## When not to use

- Unknown duration — a progress bar that sits at an arbitrary percentage is a lie
- Very short operations
- As a slider — this is read-only; use ui:slider for input

## Anatomy

| Part | Role |
| --- | --- |
| **Root** | The track, bg-secondary |
| **Indicator** | The filled portion, bg-primary, positioned by transform |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Empty** | `value={0}` | Indicator fully translated out |
| **In progress** | `0 < value < 100` | Indicator partially visible |
| **Complete** | `value={100}` | Indicator fills the track |
| **Indeterminate** | `value={null}` | Radix supports it; this styling does not animate for it. Prefer a spinner. |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `see source` | — | Declared in the component source. |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`progress.agent.json`](progress.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `primary` | `bg-primary` |
| `secondary` | `bg-secondary` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `progressbar` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Required**

- aria-label or aria-labelledby naming what is progressing

**Notes**

- Radix sets aria-valuenow, aria-valuemin and aria-valuemax.
- Label it — "Progress" alone does not say progress of what.
- Show the percentage in text too. The bar alone is hard to read precisely and invisible to some users.
- Announce completion in a live region; the bar reaching 100% is not itself announced.

## Examples

### Labelled upload

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span id="upload-label">Uploading report.pdf</span>
    <span>{pct}%</span>
  </div>
  <Progress value={pct} aria-labelledby="upload-label" />
</div>
```

## Agent rules

1. Always label the bar.
2. Show the numeric value in text alongside.
3. Use a spinner for unknown duration, not a fake percentage.
4. Announce completion separately.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Fabricated progress values
- Unlabelled progress bar
- Using Progress as an input

## Gaps

Known limitations. Honor them — do not assume the gap has since been filled.

- The indeterminate state is not visually distinguished. Use a spinner instead.

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:slider` | Input along a range |
| `ui:skeleton` | Content loading |
| `ai:ai-progress` | Agentic work with blocked and escalated states |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`progress.agent.json`](progress.agent.json) → this file → [`src/components/ui/progress.tsx`](../../../../src/components/ui/progress.tsx)

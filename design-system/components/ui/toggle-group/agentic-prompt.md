# Agentic Prompt — ToggleGroup

You are implementing **ToggleGroup** (`ui:toggle-group`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:toggle-group` |
| **Status** | Stable |
| **Tier / Category** | molecules · Forms |
| **Import** | `@/components/ui/toggle-group` |
| **Exports** | `ToggleGroup`, `ToggleGroupItem` |
| **Primitive** | `@radix-ui/react-toggle-group` |

## What it is for

> A set of related toggles that share a value and a visual group.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/toggle-group/toggle-group.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/toggle-group/toggle-group.md` — anatomy, tokens, examples
5. `src/components/ui/toggle-group.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Label the group.
- Set variant and size on the group, not per item.
- Icon-only items need aria-label.
- Decide whether type="single" may be emptied.

### Structure is not optional

```
ToggleGroup
  ToggleGroupItem
```

## Never

- Unlabelled group
- Icon-only items with no accessible name
- Using ToggleGroup for page navigation

## Task

Implement using `ToggleGroup` exactly as the contract declares. Use only the props, variants and sizes in `toggle-group.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/toggle-group.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/toggle-group/toggle-group.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:toggle` (A single independent toggle) · `ui:radio-group` (Form-field exclusive choice) · `ui:tabs` (View switching)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

# Agentic Prompt — Select

You are implementing **Select** (`ui:select`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:select` |
| **Status** | Stable |
| **Tier / Category** | molecules · Forms |
| **Import** | `@/components/ui/select` |
| **Exports** | `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, `SelectValue` |
| **Primitive** | `@radix-ui/react-select` |

## What it is for

> One choice from a list too long to show all at once.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/select/select.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/select/select.md` — anatomy, tokens, examples
5. `src/components/ui/select.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Always label the trigger.
- Always give SelectValue a placeholder.
- Never use an empty string as an item value.
- Over fifty options, or any need to search, means ui:command.
- Actions belong in ui:dropdown-menu, not here.

### Structure is not optional

```
Select
  SelectTrigger
    SelectValue
  SelectContent
    SelectGroup  (optional)
      SelectLabel  (optional)
    SelectItem
    SelectSeparator  (optional)
```

## Never

- SelectItem with an empty value
- SelectItem outside SelectContent
- Unlabelled trigger
- Using Select to fire actions

## Task

Implement using `Select` exactly as the contract declares. Use only the props, variants and sizes in `select.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/select.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/select/select.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:command` (Searchable, large sets) · `ui:radio-group` (Few options) · `ui:dropdown-menu` (Actions, not values)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

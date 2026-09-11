# Agentic Prompt — Command

You are implementing **Command** (`ui:command`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:command` |
| **Status** | Stable |
| **Tier / Category** | organisms · Overlay |
| **Import** | `@/components/ui/command` |
| **Exports** | `Command`, `CommandDialog`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList`, `CommandSeparator`, `CommandShortcut` |
| **Primitive** | `@radix-ui/react-dialog` |

## What it is for

> Find and run anything by typing, without knowing where it lives in the interface.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/command/command.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/command/command.md` — anatomy, tokens, examples
5. `src/components/ui/command.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- CommandEmpty is mandatory.
- Group once past about ten items.
- Bind the open shortcut yourself; CommandShortcut only renders the hint.
- Never the sole route to a feature.
- Under fifty options with no search need means ui:select.

### Structure is not optional

```
Command
  CommandInput
  CommandList
    CommandEmpty
    CommandGroup  (optional)
      CommandItem  (optional)
        CommandShortcut  (optional)
    CommandSeparator  (optional)
```

## Never

- Omitting CommandEmpty
- Sole route to a feature
- Items outside CommandList

## Task

Implement using `Command` exactly as the contract declares. Use only the props, variants and sizes in `command.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/command.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/command/command.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:dialog` (CommandDialog composes it) · `ui:select` (Small known sets) · `ui:popover` (Inline combobox shell)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

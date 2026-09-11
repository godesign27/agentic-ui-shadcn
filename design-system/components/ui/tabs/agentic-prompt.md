# Agentic Prompt — Tabs

You are implementing **Tabs** (`ui:tabs`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:tabs` |
| **Status** | Stable |
| **Tier / Category** | organisms · Navigation |
| **Import** | `@/components/ui/tabs` |
| **Exports** | `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger` |
| **Primitive** | `@radix-ui/react-tabs` |

## What it is for

> Switch between peer views of the same subject, where only one is relevant at a time.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/tabs/tabs.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/tabs/tabs.md` — anatomy, tokens, examples
5. `src/components/ui/tabs.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Label the TabsList when no visible heading names it.
- Every trigger value must match a content value.
- Use activationMode="manual" when panels are expensive to render.
- Tabs are not steps. A wizard needs routes or a stepper.
- Sync to the URL if a tab should be shareable.

### Structure is not optional

```
Tabs
  TabsList
    TabsTrigger
  TabsContent
```

## Never

- Tabs as a wizard
- Trigger with no matching content
- More than six tabs

## Task

Implement using `Tabs` exactly as the contract declares. Use only the props, variants and sizes in `tabs.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/tabs.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/tabs/tabs.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:accordion` (Vertical disclosure, several open at once) · `ui:toggle-group` (Compact filter switching)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

# Agentic Prompt — ResizableHandle

You are implementing **ResizableHandle** (`ui:resizable`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `ui:resizable` |
| **Status** | Stable |
| **Tier / Category** | layout · Layout |
| **Import** | `@/components/ui/resizable` |
| **Exports** | `ResizableHandle`, `ResizablePanel`, `ResizablePanelGroup` |

## What it is for

> Let the user decide how to divide the space.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/ui/resizable/resizable.agent.json` — props, variants, forbidden usage
4. `design-system/components/ui/resizable/resizable.md` — anatomy, tokens, examples
5. `src/components/ui/resizable.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- Set minSize on every panel.
- Use withHandle where touch or discoverability matters.
- Provide a non-resizable fallback for mobile.
- Persist the user's sizes if resizing is worth offering at all.

### Structure is not optional

```
ResizablePanelGroup
  ResizablePanel
  ResizableHandle
```

## Never

- Resizable layouts on mobile
- Panels with no minSize

## Task

Implement using `ResizableHandle` exactly as the contract declares. Use only the props, variants and sizes in `resizable.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/ui/resizable.tsx` — the source settles every disagreement.
2. Open `design-system/components/ui/resizable/resizable.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:sidebar` (A purpose-built collapsible navigation panel) · `ui:separator` (A static divider)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

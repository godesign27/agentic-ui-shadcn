# ResizableHandle

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** layout  
**Component id:** `ui:resizable`  
**Category:** Layout  
**Status:** Stable  
**Import:** `@/components/ui/resizable`  

## Purpose

Let the user decide how to divide the space.

A react-resizable-panels wrapper. Panels, a group, and a handle that can show a grip.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/resizable.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/resizable/resizable.md` | This mirror spec |
| `design-system/components/ui/resizable/resizable.agent.json` | Structured agent contract |
| `design-system/components/ui/resizable/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/resizable/resizable.preview.html` | Visual proof of every documented state |

## When to use

- Split editor and preview layouts
- A resizable sidebar beside content
- Any layout where users have genuinely different space preferences

## When not to use

- Mobile — there is not enough room for the interaction to be worth it
- When a sensible fixed layout exists; resizing is a cost the user pays
- For content that reflows badly at arbitrary widths

## Anatomy

`ResizablePanelGroup` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `ResizablePanel` | `ResizablePanelGroup` | Yes | Accepts defaultSize, minSize and maxSize as percentages |
| `ResizableHandle` | `ResizablePanelGroup` | Yes | Sits between panels. withHandle renders a visible grip. |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Default** | `Rest` | Panels at their default sizes |
| **Dragging** | `Pointer down on the handle` | Panels resize live |
| **Handle focused** | `Keyboard focus` | ring-1 ring-ring |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through |

Full contract, including every compound part: [`resizable.agent.json`](resizable.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `border` | `bg-border` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `separator` |

**Keyboard**

- Arrow keys — resize when the handle has focus
- Enter — collapse or expand where configured

**Required**

- An accessible name on the handle when the panels are not otherwise identifiable

**Notes**

- The library supplies keyboard resizing. The default handle is 1px wide — well under any reasonable target size.
- Use withHandle on touch surfaces so there is something to grab.
- Set minSize so a panel cannot be resized into uselessness.

## Examples

### Split view

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30} minSize={20}>
    <nav className="p-4">Navigation</nav>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70} minSize={40}>
    <main className="p-4">Content</main>
  </ResizablePanel>
</ResizablePanelGroup>
```

## Agent rules

1. Set minSize on every panel.
2. Use withHandle where touch or discoverability matters.
3. Provide a non-resizable fallback for mobile.
4. Persist the user's sizes if resizing is worth offering at all.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Resizable layouts on mobile
- Panels with no minSize

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:sidebar` | A purpose-built collapsible navigation panel |
| `ui:separator` | A static divider |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`resizable.agent.json`](resizable.agent.json) → this file → [`src/components/ui/resizable.tsx`](../../../../src/components/ui/resizable.tsx)

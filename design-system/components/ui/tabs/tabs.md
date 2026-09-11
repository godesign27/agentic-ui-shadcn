# Tabs

**Version:** 1.0  
**Last Updated:** 2026-09-11  
**Owner:** Design System — shadcn/ui  
**Tier:** organisms  
**Component id:** `ui:tabs`  
**Category:** Navigation  
**Status:** Stable  
**Primitive:** `@radix-ui/react-tabs`  
**Import:** `@/components/ui/tabs`  

## Purpose

Switch between peer views of the same subject, where only one is relevant at a time.

Radix Tabs with roving focus and automatic activation. Content is unmounted when inactive by default.

## Source

| Path | Role |
| --- | --- |
| `src/components/ui/tabs.tsx` | **Canonical implementation.** Authoritative on any conflict. |
| `design-system/components/ui/tabs/tabs.md` | This mirror spec |
| `design-system/components/ui/tabs/tabs.agent.json` | Structured agent contract |
| `design-system/components/ui/tabs/agentic-prompt.md` | Copy-paste agent prompt |
| `design-system/components/ui/tabs/tabs.preview.html` | Visual proof of every documented state |

## When to use

- Alternative views of one object — Overview, Activity, Settings
- Peer sections where the user rarely needs two at once
- Two to six sections with short labels

## When not to use

- Sequential steps — use a stepper or separate routes; tabs imply order does not matter
- Content the user needs to compare side by side
- More than about six sections, or labels that will not fit
- Content that should be linkable — unless you sync the active tab to the URL

## Anatomy

`Tabs` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.

| Part | Parent | Required | Notes |
| --- | --- | --- | --- |
| `TabsList` | `Tabs` | Yes | The tablist container |
| `TabsTrigger` | `TabsList` | Yes | value must match a TabsContent |
| `TabsContent` | `Tabs` | Yes | Unmounted when inactive unless forceMount is set |

## States

| State | Trigger | Treatment |
| --- | --- | --- |
| **Inactive** | `Not the current value` | Transparent trigger; content unmounted |
| **Active** | `Matches the current value` | bg-background with shadow-sm on the trigger |
| **Focus-visible** | `Keyboard focus` | ring-2 ring-ring ring-offset-2 |
| **Disabled** | `disabled on a trigger` | opacity-50, skipped by arrow keys |

## Props API

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `className` | `string` | — | Merged via `cn()`. Layout only — never to override an existing variant |
| `...props` | `React.ComponentProps` | — | All native props pass through. Ref is forwarded to the root. |

Full contract, including every compound part: [`tabs.agent.json`](tabs.agent.json)

## Tokens

Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.

| Token | Utilities in this component |
| --- | --- |
| `background` | `bg-background` |
| `foreground` | `text-foreground` |
| `muted` | `bg-muted`, `text-muted` |
| `ring` | `ring-ring` |

## Accessibility

| Aspect | Contract |
| --- | --- |
| Role | `tablist` |
| Handled by Radix | **Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them. |

**Keyboard**

- Arrow keys — move between and activate tabs
- Tab — move into the panel
- Home/End — first or last tab

**Required**

- aria-label on TabsList when there is no visible heading

**Notes**

- Radix wires tablist, tab and tabpanel roles plus aria-selected and aria-controls.
- Activation is automatic: arrowing to a tab selects it. For expensive content use activationMode="manual" so arrow keys only move focus.
- Inactive content is unmounted, so form state inside a tab is lost on switch. Use forceMount if that matters.

## Examples

### Object views

```tsx
<Tabs defaultValue="overview">
  <TabsList aria-label="Project views">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">{/* … */}</TabsContent>
  <TabsContent value="activity">{/* … */}</TabsContent>
</Tabs>
```

## Agent rules

1. Label the TabsList when no visible heading names it.
2. Every trigger value must match a content value.
3. Use activationMode="manual" when panels are expensive to render.
4. Tabs are not steps. A wizard needs routes or a stepper.
5. Sync to the URL if a tab should be shareable.

### Forbidden

Each of these is a hard failure. Reject the request rather than degrade.

- Tabs as a wizard
- Trigger with no matching content
- More than six tabs

## Related components

| Component | Use it instead when |
| --- | --- |
| `ui:accordion` | Vertical disclosure, several open at once |
| `ui:toggle-group` | Compact filter switching |

---

Reading order: [`agentic-prompt.md`](agentic-prompt.md) → [`tabs.agent.json`](tabs.agent.json) → this file → [`src/components/ui/tabs.tsx`](../../../../src/components/ui/tabs.tsx)

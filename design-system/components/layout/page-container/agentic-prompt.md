# Agentic Prompt — PageContainer

You are implementing **PageContainer** (`layout:page-container`) from the Agentic UI shadcn/ui design system.

---

## Component

| | |
|---|---|
| **Id** | `layout:page-container` |
| **Status** | Stable |
| **Tier / Category** | layout · Layout |
| **Import** | `@/components/layout/page-container` |
| **Exports** | `PageContainer`, `pageContainerVariants` |

## What it is for

> One max-width, one gutter, one place to change either.

## Mandatory read order

1. `/AGENT_RULES.md` — binding behavioral constraints
2. `/design-system/rules/forbidden.json` — hard failure states
3. `design-system/components/layout/page-container/page-container.agent.json` — props, variants, forbidden usage
4. `design-system/components/layout/page-container/page-container.md` — anatomy, tokens, examples
5. `src/components/layout/page-container.tsx` — canonical source, authoritative on conflict

## Critical facts — do not get these wrong

- One <main> per page. Additional containers use as="div".
- Do not nest containers.
- Pick width from the content: prose for reading, wide for data.
- Never remove the side gutter.

## Never

- Nested containers
- Multiple <main> landmarks
- Removing the side gutter
- Use inside a dialog or sheet

## Task

Implement using `PageContainer` exactly as the contract declares. Use only the props, variants and sizes in `page-container.agent.json`. Use only semantic tokens from `design-system/tokens/semantic.json`. Do not invent anything.

## If blocked

1. Open `src/components/layout/page-container.tsx` — the source settles every disagreement.
2. Open `design-system/components/layout/page-container/page-container.preview.html` — every documented state is rendered there.
3. You may have the wrong component. Consider: `ui:card` (Grouping inside the container) · `ui:sidebar` (SidebarInset owns the main region instead)

If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.

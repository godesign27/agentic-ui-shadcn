# AI Led Navigation

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiLedNavigation`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The navigation rail for AI Led product shells — inspired by modern AI tools, tuned to Guild enterprise visual language.

AILedNavigation is the left-rail navigation system for AI Led experiences. It organizes the things an AI workbench needs to surface — new chat, search, library, agents, apps, projects, pinned items, recents and account — under a single composable group. Five companion variants (default · collapsed · workspace-focused · agent-focused · minimal) and five state machines (default · nested-open · loading-recents · empty-recents · permission-restricted) cover the full life-cycle. The header reuses the canonical AIAvatar brand mark from the AI Assisted Side Drawer pattern so AI Led products share one identity across the shell.

**Export:** `AILedNavigation`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-led-navigation/AILedNavigation.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-led-navigation/ai-led-navigation.md` | This mirror spec |
| `components/ai/organisms/ai-led-navigation/ai-led-navigation.agent.json` | Agent manifest |
| `components/ai/organisms/ai-led-navigation/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Led · Adaptive |
| AI behavior | Navigate · Launch · RiSearchLine · Resume · Organize · Pin · Switch workspace · Open agent · Open artifact |
| Accountability | User control · Workspace context · Recents/history · Saved artifacts · Permissions · Account/preferences |

## Anatomy

1. **Header / brand region** _(Shared)_ — AIAvatar brand mark + product/workspace label. Identity is constant across variants. In the collapsed rail the brand glyph is nudged 8px to the left.
2. **Edge collapse handle** _(Unique)_ — Absolutely-positioned toggle pinned at `top: 16`. Sits inside the header on the right when expanded; overhangs the rail’s right edge as a tab when collapsed. Vertical position never shifts between states.
3. **Workspace switcher** _(Unique)_ — Pill with workspace dot + name + caret. Shown in default / workspace-focused / agent-focused; hidden in minimal + collapsed.
4. **Primary actions** _(Shared)_ — High-frequency AI actions: New chat, Search, Library, Agents, Apps. Icon + label expanded; icon + tooltip collapsed.
5. **Inline search field** _(Unique)_ — Clicking the Search row swaps it in place for a search input (auto-focused, search glyph leading, × button trailing, raised-surface background, brand-color inset focus ring). In the collapsed rail the input appears as a 240px popover anchored to the right edge of the rail.
6. **List-item hover state** _(Shared)_ — Every actionable row (primary actions, projects, workspaces, agents, pinned, recents, nested children) tints to `var(--ai-card-bg-raised)` on hover with a 120ms ease. Suppressed for selected, disabled, and permission-locked rows.
7. **Workspace / project group** _(Unique)_ — Section with new-project affordance and nested project items (each expands to its chats).
8. **Pinned group** _(Shared)_ — Fast access to pinned conversations / agents / dashboards.
9. **Recents group** _(Shared)_ — Recent conversations with truncation. Visually quieter than primary actions. Loading shows skeletons; empty shows a calm dashed card.
10. **Nested item** _(Unique)_ — Project disclosure expands to its chats; carat rotates to indicate state. aria-expanded reflects state.
11. **Active item** _(Shared)_ — Brand-blue 2px left rail + brand-tinted surface + 600-weight label + aria-current="page".
12. **Footer / account** _(Shared)_ — User initials + name + workspace/plan subtitle + settings glyph. Pinned to the bottom of the rail.
13. **Collapsed rail** _(Shared)_ — 64px width. Icons only. Tooltips carry labels. Headers and recents collapse out; primary actions + pinned (compact) + footer remain.

## State variations

- **Expanded · default** _(variant="default")_ — Full rail with header, workspace switcher, primary actions, projects, pinned, recents and footer. Active item highlighted with brand rail.
- **Collapsed rail** _(variant="collapsed")_ — 64px icon-only rail. Tooltips on every glyph. Recents and section labels are hidden; primary actions + footer remain.
- **Workspace-focused** _(variant="workspace-focused")_ — Header swaps to the current workspace name. Primary actions trimmed; a workspaces list with a "Show more" affordance takes the place of projects.
- **Agent-focused** _(variant="agent-focused")_ — Header carries workspace + "Command Center" subtitle. Agents moves to the selected position with a count badge; pinned agents appear above recents.
- **Minimal** _(variant="minimal")_ — Only New chat, Search, Settings, Recents and Footer. For lightweight assistant shells where the full directory model is overkill.
- **Nested project open** _(state="nested-open")_ — Active project disclosure expanded showing its child chats. Brand accent rail draws on the parent path; chat A is selected.
- **Loading recents** _(state="loading-recents")_ — Recents region renders four skeleton bars with the standard shimmer keyframe.
- **Empty recents** _(state="empty-recents")_ — First-run / cleared history state. Dashed card with a clock glyph and "Start a new chat to see it appear here."
- **Permission restricted** _(state="permission-restricted")_ — Locked items render at 0.5 opacity with a zs-icon-lock glyph and a "LOCKED" pill. aria-disabled="true" and the glyph carry the meaning - color is never the sole signal.
- **List item hover** _(hover)_ — Actionable rows tint to a soft gray on hover with a 120ms ease. Selected, disabled, and locked rows do not tint.
- **Search active (inline)** _(click "RiSearchLine")_ — RiSearchLine row morphs in place into an inline input - auto-focused, with a leading search glyph and a trailing dismiss button. Enter submits the query; Escape dismisses.
- **Search active (popover)** _(collapsed + click search icon)_ — In the collapsed rail the search input opens as a 240px popover anchored just outside the right edge. Auto-focus, outside-click dismiss, Esc dismiss, Enter submit.
- **Edge handle position** _(absolute top: 16)_ — Collapse / expand toggle stays at the same vertical position whether the rail is expanded or collapsed - only the horizontal anchor changes.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `brandLabel` | `string` | `"Guild AI"` | Product / system label shown next to the AIAvatar mark. |
| `brandIcon` | `ReactNode` | `<AIAvatar />` | Header brand mark. Defaults to the canonical Guild AI Avatar. |
| `currentWorkspace` | `{ id: string; label: string; tone?: "ai" \| "tan" }` | `Workspace A` | Active workspace surfaced in the switcher chip. |
| `primaryActions` | `AILedNavItem[]` | `5 defaults` | High-frequency AI actions row. |
| `workspaceGroups` | `AILedNavGroup[]` | `Projects preset` | Workspace / project sections — each group may contain nested children. |
| `pinnedItems` | `AILedNavItem[]` | `2 defaults` | Pinned conversations / agents / artifacts. |
| `recentItems` | `AILedNavItem[]` | `4 defaults` | Recent conversations / workstreams / outputs. |
| `user` | `{ initials: string; name: string; subtitle: string }` | `User Name preset` | Footer account block. |
| `variant` | `"default" \| "collapsed" \| "workspace-focused" \| "agent-focused" \| "product-embedded" \| "minimal"` | `"default"` | Layout variant. |
| `state` | `"default" \| "nested-open" \| "loading-recents" \| "empty-recents" \| "permission-restricted"` | `"default"` | Runtime state for the recents area + permission flags. |
| `selectedItemId` | `string` | `undefined` | Active route / item id. Drives aria-current + selected styling. |
| `collapsed` | `boolean` | `undefined` | Shortcut for variant="collapsed" — useful when toggling via a parent control. |
| `onToggleCollapse` | `() => void` | `undefined` | Fired when the user clicks the collapse / expand button. |
| `onItemSelect` | `(item: AILedNavItem) => void` | `undefined` | Fired when any item is activated. Parent typically routes via item.href or item.id. |
| `onNewChat` | `() => void` | `undefined` | Convenience handler for the New chat action. |
| `onSearch` | `(query: string) => void` | `undefined` | Fired when the user submits the inline search (Enter). Receives the typed query string. Existing callers that ignore the arg remain back-compatible. |

## Tokens

### Surface
| Token | Value | Usage |
| --- | --- | --- |
| `nav.surface` | `var(--ai-card-bg)` | Rail background |
| `nav.border` | `var(--ai-card-border)` | Right edge + section dividers |
| `nav.width.expanded` | `260px` | Expanded rail width (240–300px range per spec) |
| `nav.width.collapsed` | `64px` | Collapsed rail width (56–72px range per spec) |

### Selected state
| Token | Value | Usage |
| --- | --- | --- |
| `nav.selected.bg` | `var(--ai-brand-surface)` | Selected item background tint |
| `nav.selected.rail` | `AI.color.brand` | Brand-blue 2px left accent rail |
| `nav.selected.text` | `AI.color.brand` | Selected item label color |

### Typography
| Token | Value | Usage |
| --- | --- | --- |
| `nav.section-header` | `@ai-micro-eyebrow` | 11/600/1.0 · 0.02em letter-spacing · uppercase |
| `nav.item-label` | `@ai-section-subtitle` | 13/400/1.55 · 600 weight when selected |
| `nav.brand` | `@ai-h5` | 14/700/1.4 — brand / workspace label in header |

## Flows

### Start new chat
User opens a fresh prompt state.
- User clicks New chat (or presses ⌘/Ctrl+K)
- onNewChat fires
- AI Command Center mounts in empty prompt state

### Resume recent
User reopens a prior conversation.
- User clicks an item under Recents
- onItemSelect(item) fires
- Parent routes to that conversation; rail marks it selected

### Switch project
User changes the active project context.
- User clicks a project under Projects
- Disclosure expands to show child chats
- Selected workspace context propagates to the content area

### Collapse navigation
User narrows the rail.
- User clicks the collapse button
- aria-expanded flips to false
- Rail animates from 260 → 64px
- Section labels and recents hide; tooltips wake up

### Expand navigation
User widens the rail back to default.
- User clicks expand
- Rail animates 64 → 260px
- Section headers, recents and footer text reappear

### Open agent
User browses available agents.
- User clicks Agents
- Agent directory opens in the content area
- Selected item reflects "Agents" in the rail

### Inline search
User searches the workspace from the rail.
- User clicks the Search row
- Search row morphs into an inline input (or popover in collapsed mode)
- Input auto-focuses; user types a query
- User presses Enter → onSearch(query) fires; row reverts to Search list item
- Or user presses Esc / clicks × → input dismisses without submitting

### Toggle via edge handle
User toggles the rail using the edge handle.
- User clicks the toggle handle (inside header when expanded; overhang tab when collapsed)
- Rail animates between 260 ↔ 64px
- Toggle handle stays at the same `top: 16` y-position — only its horizontal anchor changes
- aria-expanded mirrors the new state

## Canonical implementation

```tsx
import { AILedNavigation, DEFAULT_NAV_CONFIG } from '@/components/ai/organisms/ai-led-navigation/AILedNavigation';

// Defaults are wired to a representative Guild AI workspace
<AILedNavigation />

// Custom workspace + handlers
<AILedNavigation
  brandLabel="Territory Intelligence"
  currentWorkspace={{ id: 'newark', label: 'Newark Review' }}
  selectedItemId="new-chat"
  onItemSelect={(item) => navigate(item.href ?? '#')}
  onToggleCollapse={() => setCollapsed((c) => !c)}
/>

// Variant switching
<AILedNavigation variant="collapsed" />
<AILedNavigation variant="agent-focused" />
<AILedNavigation variant="minimal" state="empty-recents" />
```

## Agent rules

1. Read this mirror spec and `ai-led-navigation.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-led-navigation/ai-led-navigation.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order

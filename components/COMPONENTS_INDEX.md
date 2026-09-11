# Components Index

The **closed-world inventory**. Only components listed here may be used.

> Generated from source by `npm run ds:build`. Do not hand-edit — edit `scripts/metadata/` instead.

**45 components** · ui 45 · ai 0

## The rule

If a component is not listed here it is **forbidden**. An agent asked for one must:

1. State that it is not in the inventory
2. Name the closest indexed alternatives by id
3. Offer to compose the need from indexed parts

Never improvise the missing component. See `/design-system/rules/forbidden.json#FORBID_UNINDEXED_COMPONENT`.

## Every component has a contract

Each entry below links to a folder holding four files: the narrative spec, the structured agent contract, a copy-paste agent prompt, and a visual preview. Read the contract before writing markup.

Machine-readable inventory: [`components/COMPONENTS_INDEX.json`](COMPONENTS_INDEX.json) · Spec lookup: [`design-system/components/agent-manifest.index.json`](../design-system/components/agent-manifest.index.json)

## Data Display

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:avatar`](../design-system/components/ui/avatar/avatar.md) | Avatar | `@/components/ui/avatar` | atoms | stable | Identify a person or entity at a glance, and degrade gracefully when the image is missing. |
| [`ui:badge`](../design-system/components/ui/badge/badge.md) | Badge | `@/components/ui/badge` | atoms | stable | A short label that classifies the thing next to it. |
| [`ui:carousel`](../design-system/components/ui/carousel/carousel.md) | Carousel | `@/components/ui/carousel` | organisms | stable | Move horizontally through a set of items when vertical space genuinely will not stretch. |
| [`ui:table`](../design-system/components/ui/table/table.md) | Table | `@/components/ui/table` | organisms | stable | Data with real rows and columns, where comparing across both matters. |

## Disclosure

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:accordion`](../design-system/components/ui/accordion/accordion.md) | Accordion | `@/components/ui/accordion` | organisms | stable | Let a long page stay scannable by collapsing detail the user can open on demand. |
| [`ui:collapsible`](../design-system/components/ui/collapsible/collapsible.md) | Collapsible | `@/components/ui/collapsible` | molecules | stable | One thing that opens and closes, with no group to coordinate. |

## Feedback

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:alert`](../design-system/components/ui/alert/alert.md) | Alert | `@/components/ui/alert` | molecules | stable | A message that stays on the page because it remains true. |
| [`ui:progress`](../design-system/components/ui/progress/progress.md) | Progress | `@/components/ui/progress` | atoms | stable | Show how much of a known quantity of work is done. |
| [`ui:skeleton`](../design-system/components/ui/skeleton/skeleton.md) | Skeleton | `@/components/ui/skeleton` | atoms | stable | Show the shape of what is coming, so the wait feels shorter and the layout does not jump. |
| [`ui:sonner`](../design-system/components/ui/sonner/sonner.md) | Toaster | `@/components/ui/sonner` | templates | stable | The same job as ui:toaster, through a different library with a simpler imperative API. |
| [`ui:toast`](../design-system/components/ui/toast/toast.md) | Toast | `@/components/ui/toast` | organisms | stable | Confirm that something happened, without taking the user away from what they are doing. |
| [`ui:toaster`](../design-system/components/ui/toaster/toaster.md) | Toaster | `@/components/ui/toaster` | templates | stable | The one place toasts actually render. |

## Forms

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:button`](../design-system/components/ui/button/button.md) | Button | `@/components/ui/button` | atoms | stable | The single most important decision available in a region, and every lesser one alongside it. |
| [`ui:calendar`](../design-system/components/ui/calendar/calendar.md) | Calendar | `@/components/ui/calendar` | organisms | stable | Pick a date when the surrounding days matter to the choice. |
| [`ui:checkbox`](../design-system/components/ui/checkbox/checkbox.md) | Checkbox | `@/components/ui/checkbox` | atoms | stable | An independent yes-or-no choice, or one of several non-exclusive options. |
| [`ui:form`](../design-system/components/ui/form/form.md) | Form | `@/components/ui/form` | groups | stable | Wires a control to its label, description and error message so the accessibility relationships are correct by construction. |
| [`ui:input`](../design-system/components/ui/input/input.md) | Input | `@/components/ui/input` | atoms | stable | A single line of user-supplied text, with the focus and disabled behavior already correct. |
| [`ui:label`](../design-system/components/ui/label/label.md) | Label | `@/components/ui/label` | atoms | stable | Names a control, and makes its text a click target for it. |
| [`ui:radio-group`](../design-system/components/ui/radio-group/radio-group.md) | RadioGroup | `@/components/ui/radio-group` | molecules | stable | Exactly one choice from a small set, with every option visible. |
| [`ui:select`](../design-system/components/ui/select/select.md) | Select | `@/components/ui/select` | molecules | stable | One choice from a list too long to show all at once. |
| [`ui:slider`](../design-system/components/ui/slider/slider.md) | Slider | `@/components/ui/slider` | molecules | stable | An approximate value along a continuous range, where the relative position matters more than the exact number. |
| [`ui:switch`](../design-system/components/ui/switch/switch.md) | Switch | `@/components/ui/switch` | atoms | stable | A setting that takes effect the moment it is flipped. |
| [`ui:textarea`](../design-system/components/ui/textarea/textarea.md) | Textarea | `@/components/ui/textarea` | atoms | stable | Multi-line text where the length is genuinely open-ended. |
| [`ui:toggle`](../design-system/components/ui/toggle/toggle.md) | Toggle | `@/components/ui/toggle` | atoms | stable | A control that stays pressed — formatting state in a toolbar, not an action. |
| [`ui:toggle-group`](../design-system/components/ui/toggle-group/toggle-group.md) | ToggleGroup | `@/components/ui/toggle-group` | molecules | stable | A set of related toggles that share a value and a visual group. |

## Layout

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:aspect-ratio`](../design-system/components/ui/aspect-ratio/aspect-ratio.md) | AspectRatio | `@/components/ui/aspect-ratio` | layout | stable | Reserve the right shape before the content arrives, so nothing jumps. |
| [`ui:card`](../design-system/components/ui/card/card.md) | Card | `@/components/ui/card` | organisms | stable | Group related content into a unit the eye reads as one thing. |
| [`ui:resizable`](../design-system/components/ui/resizable/resizable.md) | ResizableHandle | `@/components/ui/resizable` | layout | stable | Let the user decide how to divide the space. |
| [`ui:scroll-area`](../design-system/components/ui/scroll-area/scroll-area.md) | ScrollArea | `@/components/ui/scroll-area` | molecules | stable | A scrollable region with a scrollbar that looks the same on every platform. |
| [`ui:separator`](../design-system/components/ui/separator/separator.md) | Separator | `@/components/ui/separator` | atoms | stable | A visible break between groups, without implying they are different kinds of thing. |
| [`ui:sidebar`](../design-system/components/ui/sidebar/sidebar.md) | Sidebar | `@/components/ui/sidebar` | templates | stable | A complete application navigation shell — collapsible, persistent, responsive, and keyboard-reachable. |

## Navigation

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:breadcrumb`](../design-system/components/ui/breadcrumb/breadcrumb.md) | Breadcrumb | `@/components/ui/breadcrumb` | molecules | stable | Show where this page sits in the hierarchy, and offer a way back up. |
| [`ui:menubar`](../design-system/components/ui/menubar/menubar.md) | Menubar | `@/components/ui/menubar` | organisms | stable | A persistent application menu bar, in the desktop-software sense. |
| [`ui:navigation-menu`](../design-system/components/ui/navigation-menu/navigation-menu.md) | NavigationMenu | `@/components/ui/navigation-menu` | organisms | stable | Primary site navigation, with room for a rich panel under each top-level item. |
| [`ui:pagination`](../design-system/components/ui/pagination/pagination.md) | Pagination | `@/components/ui/pagination` | molecules | stable | Move through a result set that is too large to show at once. |
| [`ui:tabs`](../design-system/components/ui/tabs/tabs.md) | Tabs | `@/components/ui/tabs` | organisms | stable | Switch between peer views of the same subject, where only one is relevant at a time. |

## Overlay

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ui:alert-dialog`](../design-system/components/ui/alert-dialog/alert-dialog.md) | AlertDialog | `@/components/ui/alert-dialog` | organisms | stable | Stop the user before something irreversible happens, and make cancelling the easy path. |
| [`ui:command`](../design-system/components/ui/command/command.md) | Command | `@/components/ui/command` | organisms | stable | Find and run anything by typing, without knowing where it lives in the interface. |
| [`ui:context-menu`](../design-system/components/ui/context-menu/context-menu.md) | ContextMenu | `@/components/ui/context-menu` | organisms | stable | Actions for the specific thing the user right-clicked. |
| [`ui:dialog`](../design-system/components/ui/dialog/dialog.md) | Dialog | `@/components/ui/dialog` | organisms | stable | Interrupt the user for a self-contained task that must finish before anything else continues. |
| [`ui:dropdown-menu`](../design-system/components/ui/dropdown-menu/dropdown-menu.md) | DropdownMenu | `@/components/ui/dropdown-menu` | organisms | stable | A list of actions revealed from a button, with proper menu semantics. |
| [`ui:hover-card`](../design-system/components/ui/hover-card/hover-card.md) | HoverCard | `@/components/ui/hover-card` | molecules | stable | A rich preview of what a link points to, without making the user go there. |
| [`ui:popover`](../design-system/components/ui/popover/popover.md) | Popover | `@/components/ui/popover` | molecules | stable | Contextual content anchored to a trigger, without blocking the page. |
| [`ui:sheet`](../design-system/components/ui/sheet/sheet.md) | Sheet | `@/components/ui/sheet` | organisms | stable | A modal panel anchored to a screen edge, for content that needs more room than a dialog affords. |
| [`ui:tooltip`](../design-system/components/ui/tooltip/tooltip.md) | Tooltip | `@/components/ui/tooltip` | molecules | stable | Name a control whose purpose is not obvious from its appearance. |

## Known gaps

Declared limitations. Honor them rather than assuming they have been filled.

| Component | Gap |
|---|---|
| `ui:badge` | Carries hover and focus-visible styling despite rendering a non-focusable div. Do not read that as permission to make it interactive. |
| `ui:card` | CardTitle renders a div rather than a heading element. Supply your own heading semantics where page structure depends on it. |
| `ui:collapsible` | Entirely unstyled — no animation, chevron or spacing. Unlike every other component here, you supply all of it. |
| `ui:form` | Does not move focus to the first invalid field on submit — implement that in your onInvalid handler. |
| `ui:pagination` | No page-state logic, no boundary disabling, no live-region announcement. All presentational. |
| `ui:progress` | The indeterminate state is not visually distinguished. Use a spinner instead. |
| `ui:skeleton` | Provides no live-region semantics of its own. The announcement is yours to add every time. |
| `ui:sonner` | Depends on next-themes (^0.4.6) for theme detection, while the rest of the app toggles the dark class directly. The two can disagree. |
| `ui:sonner` | Exports a component named Toaster, colliding with ui:toaster. Only one may be mounted. |
| `ui:table` | No sorting, filtering, pagination, selection or virtualisation. scope is not applied automatically to TableHead. |

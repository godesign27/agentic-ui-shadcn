# Components Index

The **closed-world inventory**. Only components listed here may be used.

> Generated from source by `npm run ds:build`. Do not hand-edit — edit `scripts/metadata/` instead.

**74 components** · ui 45 · ai 27

## The rule

If a component is not listed here it is **forbidden**. An agent asked for one must:

1. State that it is not in the inventory
2. Name the closest indexed alternatives by id
3. Offer to compose the need from indexed parts

Never improvise the missing component. See `/design-system/rules/forbidden.json#FORBID_UNINDEXED_COMPONENT`.

## Every component has a contract

Each entry below links to a folder holding four files: the narrative spec, the structured agent contract, a copy-paste agent prompt, and a visual preview. Read the contract before writing markup.

Machine-readable inventory: [`components/COMPONENTS_INDEX.json`](COMPONENTS_INDEX.json) · Spec lookup: [`design-system/components/agent-manifest.index.json`](../design-system/components/agent-manifest.index.json)

## AI

| Id | Component | Import | Tier | Status | Intent |
|---|---|---|---|---|---|
| [`ai:ai-action`](../design-system/components/ai/ai-action/ai-action.md) | AIAction | `@/components/ai/ai-action` | atoms | beta | The decision point at the end of every AI recommendation. Primary confirms, secondary reviews, tertiary dismisses. |
| [`ai:ai-agent-stack`](../design-system/components/ai/ai-agent-stack/ai-agent-stack.md) | AIAgentStack | `@/components/ai/ai-agent-stack` | molecules | stable | Several agents working at once, and what each of them is doing. |
| [`ai:ai-agent-work-note`](../design-system/components/ai/ai-agent-work-note/ai-agent-work-note.md) | AIAgentWorkNote | `@/components/ai/ai-agent-work-note` | atoms | draft | Show what the agent is doing without exposing raw reasoning. |
| [`ai:ai-approval-card`](../design-system/components/ai/ai-approval-card/ai-approval-card.md) | AIApprovalCard | `@/components/ai/ai-approval-card` | groups | beta | A consequential proposal, and the human decision about it, in an order that cannot be got wrong. |
| [`ai:ai-avatar`](../design-system/components/ai/ai-avatar/ai-avatar.md) | AIAvatar | `@/components/ai/ai-avatar` | atoms | stable | The mark that tells a user a machine is speaking. |
| [`ai:ai-button`](../design-system/components/ai/ai-button/ai-button.md) | AIButton | `@/components/ai/ai-button` | atoms | stable | Commit to something a machine proposed. |
| [`ai:ai-chip-brief`](../design-system/components/ai/ai-chip-brief/ai-chip-brief.md) | AIChipBrief | `@/components/ai/ai-chip-brief` | atoms | stable | Whether an agent task brief is ready to run — and whether a human still has to say yes. |
| [`ai:ai-chip-handoff`](../design-system/components/ai/ai-chip-handoff/ai-chip-handoff.md) | AIChipHandoff | `@/components/ai/ai-chip-handoff` | atoms | stable | Show the moment accountability changed hands. |
| [`ai:ai-chip-memory`](../design-system/components/ai/ai-chip-memory/ai-chip-memory.md) | AIChipMemory | `@/components/ai/ai-chip-memory` | atoms | stable | Tell the user when the system is drawing on something it learned earlier. |
| [`ai:ai-chip-quick`](../design-system/components/ai/ai-chip-quick/ai-chip-quick.md) | AIChipQuick | `@/components/ai/ai-chip-quick` | atoms | stable | Offer a starting point so the user does not face an empty box. |
| [`ai:ai-confidence-risk-badge`](../design-system/components/ai/ai-confidence-risk-badge/ai-confidence-risk-badge.md) | AIConfidenceRiskBadge | `@/components/ai/ai-confidence-risk-badge` | atoms | stable | State how sure the model is and how much is at stake, before the human decides. |
| [`ai:ai-control-bar`](../design-system/components/ai/ai-control-bar/ai-control-bar.md) | AIControlBar | `@/components/ai/ai-control-bar` | molecules | stable | The human can always stop the machine. |
| [`ai:ai-dialog`](../design-system/components/ai/ai-dialog/ai-dialog.md) | AIDialogSlim | `@/components/ai/ai-dialog` | groups | stable | Where the human writes to the machine. |
| [`ai:ai-dialog-button`](../design-system/components/ai/ai-dialog-button/ai-dialog-button.md) | AIDialogButton | `@/components/ai/ai-dialog-button` | atoms | stable | A quiet control in the composer toolbar that does not compete with the message. |
| [`ai:ai-feedback-bar`](../design-system/components/ai/ai-feedback-bar/ai-feedback-bar.md) | AIFeedbackBar | `@/components/ai/ai-feedback-bar` | atoms | stable | Let the human correct the record. |
| [`ai:ai-icon`](../design-system/components/ai/ai-icon/ai-icon.md) | AIIcon | `@/components/ai/ai-icon` | atoms | beta | A treatment layer over standard icons — not a new icon set. |
| [`ai:ai-launcher`](../design-system/components/ai/ai-launcher/ai-launcher.md) | AILauncher | `@/components/ai/ai-launcher` | atoms | stable | The way in. Recognisable, confident, never instructional. |
| [`ai:ai-loading-indicators`](../design-system/components/ai/ai-loading-indicators/ai-loading-indicators.md) | AILoadingIndicator | `@/components/ai/ai-loading-indicators` | atoms | stable | Say that the machine is working, truthfully. |
| [`ai:ai-message-body`](../design-system/components/ai/ai-message-body/ai-message-body.md) | AIMessageBody | `@/components/ai/ai-message-body` | atoms | stable | AI prose, kept plain so the interface does not lend it authority the model has not earned. |
| [`ai:ai-message-footer`](../design-system/components/ai/ai-message-footer/ai-message-footer.md) | AIMessageFooter | `@/components/ai/ai-message-footer` | atoms | stable | Where the user says yes to what the response offered. |
| [`ai:ai-message-header`](../design-system/components/ai/ai-message-header/ai-message-header.md) | AIMessageHeader | `@/components/ai/ai-message-header` | atoms | stable | Establish who is speaking before the user reads a word. |
| [`ai:ai-progress`](../design-system/components/ai/ai-progress/ai-progress.md) | AIProgress | `@/components/ai/ai-progress` | atoms | draft | Progress for work that can be blocked or escalated, not merely slow. |
| [`ai:ai-queue-badge`](../design-system/components/ai/ai-queue-badge/ai-queue-badge.md) | AIQueueBadge | `@/components/ai/ai-queue-badge` | atoms | stable | The state of one item in an agent queue, readable at a glance. |
| [`ai:ai-response`](../design-system/components/ai/ai-response/ai-response.md) | AIResponse | `@/components/ai/ai-response` | groups | stable | One AI turn, assembled so attribution, progress and recourse are present by construction. |
| [`ai:ai-soft-surface`](../design-system/components/ai/ai-soft-surface/ai-soft-surface.md) | AISoftSurface | `@/components/ai/ai-soft-surface` | atoms | beta | The wash that says everything inside this boundary was machine-generated. |
| [`ai:ai-text-link`](../design-system/components/ai/ai-text-link/ai-text-link.md) | AITextLink | `@/components/ai/ai-text-link` | atoms | beta | An inline link inside AI prose whose label stands on its own. |
| [`ai:ai-why-this-link`](../design-system/components/ai/ai-why-this-link/ai-why-this-link.md) | AIWhyThisLink | `@/components/ai/ai-why-this-link` | atoms | stable | Make the reasoning reachable in one interaction. |

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
| [`pattern:form-field`](../design-system/components/patterns/form-field/form-field.md) | FormField | `@/components/patterns/form-field` | groups | stable | A labelled control with its description and error, wired together correctly. |
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
| [`layout:page-container`](../design-system/components/layout/page-container/page-container.md) | PageContainer | `@/components/layout/page-container` | layout | stable | One max-width, one gutter, one place to change either. |
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
| `ai:ai-icon` | The handoff-trail, completion-settle, nudge, shimmer and alert-ring motions from the source system are not implemented. Only spin and pulse. |
| `ai:ai-progress` | The segmented and header variants from the source design system are not implemented. Linear only. |
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

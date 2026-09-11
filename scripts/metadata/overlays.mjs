/**
 * Curated metadata — Overlays and menus.
 *
 * The single most common agent error in this category is choosing the wrong
 * surface. The decision table in each spec exists to prevent that.
 */

export const overlays = {

  dialog: {
    tier: 'organisms', category: 'Overlay', status: 'stable',
    intent: 'Interrupt the user for a self-contained task that must finish before anything else continues.',
    description: 'Radix Dialog: a centred modal with an overlay, focus trap, Escape dismissal and focus return. Renders in a portal.',
    whenToUse: ['A short focused task — rename, invite, quick edit', 'Content that genuinely requires the rest of the page to wait', 'A form of one to four fields'],
    whenNotToUse: [
      'A multi-step workflow — that belongs on a page route. This is the most frequent misuse.',
      'A destructive confirmation — use ui:alert-dialog, which has the right semantics and focus default',
      'Contextual detail beside a trigger — use ui:popover or ui:hover-card',
      'An edge panel with room for a lot of content — use ui:sheet',
      'Anything the user might want to reach by URL',
    ],
    compound: {
      root: 'Dialog',
      parts: [
        { name: 'DialogTrigger', parent: 'Dialog', required: false, note: 'Use asChild to wrap your own button' },
        { name: 'DialogPortal', parent: 'Dialog', required: false, note: 'Applied automatically by DialogContent' },
        { name: 'DialogOverlay', parent: 'DialogPortal', required: false, note: 'Rendered by DialogContent' },
        { name: 'DialogContent', parent: 'Dialog', required: true, note: 'The modal surface. Includes its own close button.' },
        { name: 'DialogHeader', parent: 'DialogContent', required: false },
        { name: 'DialogTitle', parent: 'DialogHeader', required: true, note: 'Required by Radix for the accessible name. Omitting it logs a warning and breaks screen-reader announcement.' },
        { name: 'DialogDescription', parent: 'DialogHeader', required: false, note: 'Wired to aria-describedby' },
        { name: 'DialogFooter', parent: 'DialogContent', required: false, note: 'Action row. Reverses to a column on mobile.' },
        { name: 'DialogClose', parent: 'DialogContent', required: false },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'open={false}', note: 'Nothing rendered' },
      { name: 'Open', trigger: 'open={true}', note: 'Overlay fades in, content zooms in, focus moves inside and is trapped' },
      { name: 'Closing', trigger: 'Escape, overlay click, or close button', note: 'Animates out; focus returns to the trigger' },
    ],
    a11y: {
      role: 'dialog', handledByRadix: true,
      keyboard: ['Escape — close', 'Tab — cycle within the trap', 'Shift+Tab — reverse'],
      requiredAttributes: ['DialogTitle is mandatory — it supplies the accessible name'],
      focusManagement: 'Focus moves into the content on open and returns to the trigger on close. Radix handles both.',
      notes: [
        'DialogTitle is not optional. If the design has no visible title, render one inside a VisuallyHidden wrapper.',
        'Do not nest a Dialog inside a Dialog. Replace the content instead.',
        'Page scroll is locked while open. Long content needs its own scroll container.',
      ],
    },
    agentRules: [
      'DialogTitle is mandatory, visually hidden if necessary.',
      'Multi-step workflows go on a page route, not in here.',
      'Destructive confirmations use ui:alert-dialog.',
      'Never nest dialogs.',
      'Long content needs an inner scroll region, not a taller modal.',
    ],
    forbiddenUsage: ['DialogContent without DialogTitle', 'Nested dialogs', 'Multi-step wizards', 'Destructive confirmation without alert-dialog semantics'],
    related: [
      { id: 'ui:alert-dialog', note: 'Destructive confirmation — Cancel is focused by default' },
      { id: 'ui:sheet', note: 'Edge panel with more room' },
      { id: 'ui:popover', note: 'Non-modal contextual content' },
      { id: 'ui:drawer', note: 'Not in this inventory — use ui:sheet with side="bottom"' },
    ],
    examples: [{ title: 'Edit dialog', code: '<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Edit profile</Button>\n  </DialogTrigger>\n  <DialogContent className="sm:max-w-[425px]">\n    <DialogHeader>\n      <DialogTitle>Edit profile</DialogTitle>\n      <DialogDescription>Changes save when you click Save.</DialogDescription>\n    </DialogHeader>\n    {/* fields */}\n    <DialogFooter>\n      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>\n      <Button type="submit">Save</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>' }],
  },

  'alert-dialog': {
    tier: 'organisms', category: 'Overlay', status: 'stable',
    intent: 'Stop the user before something irreversible happens, and make cancelling the easy path.',
    description: 'Radix AlertDialog. Unlike ui:dialog it cannot be dismissed by clicking the overlay, and Cancel receives initial focus — both deliberate.',
    whenToUse: ['Deleting something', 'Discarding unsaved work', 'Any action that cannot be undone', 'Any action with consequences outside the current session'],
    whenNotToUse: [
      'Routine confirmations where the action is trivially reversible — the friction is not free',
      'A form or any input collection — use ui:dialog',
      'Informational messages — use ui:toast or ui:alert',
      'So often that users stop reading it',
    ],
    compound: {
      root: 'AlertDialog',
      parts: [
        { name: 'AlertDialogTrigger', parent: 'AlertDialog', required: false },
        { name: 'AlertDialogContent', parent: 'AlertDialog', required: true },
        { name: 'AlertDialogHeader', parent: 'AlertDialogContent', required: false },
        { name: 'AlertDialogTitle', parent: 'AlertDialogHeader', required: true, note: 'Name the specific object: "Delete Apollo?"' },
        { name: 'AlertDialogDescription', parent: 'AlertDialogHeader', required: true, note: 'State exactly what is lost. This is the whole point of the component.' },
        { name: 'AlertDialogFooter', parent: 'AlertDialogContent', required: true },
        { name: 'AlertDialogCancel', parent: 'AlertDialogFooter', required: true, note: 'Receives initial focus. Never omit it.' },
        { name: 'AlertDialogAction', parent: 'AlertDialogFooter', required: true, note: 'Label with the verb. Add destructive styling via className.' },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'open={false}', note: 'Nothing rendered' },
      { name: 'Open', trigger: 'Trigger activated', note: 'Focus moves to AlertDialogCancel, not to the confirm action' },
    ],
    a11y: {
      role: 'alertdialog', handledByRadix: true,
      keyboard: ['Escape — cancel', 'Tab — cycle within the trap', 'Enter — activate the focused control, which is Cancel by default'],
      requiredAttributes: ['AlertDialogTitle and AlertDialogDescription are both required'],
      focusManagement: 'Cancel receives initial focus. Overlay clicks do not dismiss. Both differ from ui:dialog and are intentional.',
      notes: [
        'role="alertdialog" makes assistive technology announce it more assertively than a plain dialog.',
        'Never move initial focus to AlertDialogAction. A stray Enter would then destroy data.',
        'AlertDialogAction is not destructive-styled by default — add bg-destructive text-destructive-foreground yourself.',
      ],
    },
    agentRules: [
      'Name the object in the title and the loss in the description.',
      'Label the action with the verb — "Delete project", never "OK" or "Yes".',
      'Never focus the confirm action by default.',
      'Style AlertDialogAction as destructive when the action is destructive.',
      'An AI agent must never open and confirm this flow without a human gesture.',
    ],
    forbiddenUsage: ['Confirm button labelled OK or Yes', 'Initial focus on the confirm action', 'Omitting AlertDialogCancel', 'Collecting input inside an alert dialog'],
    related: [{ id: 'ui:dialog', note: 'Non-destructive tasks and forms' }, { id: 'ui:toast', note: 'Reporting the outcome afterwards' }],
    examples: [{ title: 'Delete confirmation', code: '<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="destructive">Delete project</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete “Apollo”?</AlertDialogTitle>\n      <AlertDialogDescription>\n        This removes the project and its 42 runs. This cannot be undone.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">\n        Delete project\n      </AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>' }],
  },

  sheet: {
    tier: 'organisms', category: 'Overlay', status: 'stable',
    intent: 'A modal panel anchored to a screen edge, for content that needs more room than a dialog affords.',
    description: 'Radix Dialog repositioned to an edge. Four sides via the side variant. Shares every accessibility behaviour with ui:dialog.',
    whenToUse: ['Filters, settings or detail panels beside the main content', 'Mobile navigation, via side="left"', 'A bottom sheet on touch, via side="bottom"', 'Longer forms that would make a centred dialog unwieldy'],
    whenNotToUse: [
      'A short confirmation — use ui:dialog or ui:alert-dialog',
      'Content that should persist while the user works elsewhere — a sheet is modal and blocks the page',
      'Primary navigation on desktop — use ui:sidebar',
    ],
    compound: {
      root: 'Sheet',
      parts: [
        { name: 'SheetTrigger', parent: 'Sheet', required: false },
        { name: 'SheetContent', parent: 'Sheet', required: true, note: 'Carries the side variant. Includes its own close button.' },
        { name: 'SheetHeader', parent: 'SheetContent', required: false },
        { name: 'SheetTitle', parent: 'SheetHeader', required: true, note: 'Mandatory, as in ui:dialog' },
        { name: 'SheetDescription', parent: 'SheetHeader', required: false },
        { name: 'SheetFooter', parent: 'SheetContent', required: false },
        { name: 'SheetClose', parent: 'SheetContent', required: false },
      ],
    },
    variantGuidance: {
      right: 'The default. Detail panels, filters, settings.',
      left: 'Navigation, especially mobile.',
      top: 'Announcements and search overlays. Rare.',
      bottom: 'Mobile action sheets. The most reachable position on a phone.',
    },
    states: [
      { name: 'Closed', trigger: 'open={false}', note: 'Nothing rendered' },
      { name: 'Open', trigger: 'Trigger activated', note: 'Slides in from the chosen side; focus trapped' },
    ],
    a11y: {
      role: 'dialog', handledByRadix: true,
      keyboard: ['Escape — close', 'Tab — cycle within the trap'],
      requiredAttributes: ['SheetTitle is mandatory'],
      focusManagement: 'Identical to ui:dialog — trap on open, return on close.',
      notes: ['Sheet is modal. The page behind it is inert and scroll is locked.', 'On narrow screens side="right" and side="left" occupy three-quarters of the width by default.'],
    },
    agentRules: ['SheetTitle is mandatory.', 'Choose the side from the content, not from habit: left for nav, bottom for touch actions, right for detail.', 'Long content needs an inner ui:scroll-area.', 'Do not nest sheets or place a dialog inside one.'],
    forbiddenUsage: ['SheetContent without SheetTitle', 'Nested overlays', 'Using a sheet for content that must stay visible while working'],
    related: [{ id: 'ui:dialog', note: 'Centred modal' }, { id: 'ui:sidebar', note: 'Persistent navigation' }, { id: 'ui:scroll-area', note: 'For long sheet content' }],
    examples: [{ title: 'Filter panel', code: '<Sheet>\n  <SheetTrigger asChild><Button variant="outline">Filters</Button></SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader>\n      <SheetTitle>Filters</SheetTitle>\n      <SheetDescription>Narrow the result set.</SheetDescription>\n    </SheetHeader>\n    <ScrollArea className="h-[calc(100vh-10rem)]">{/* controls */}</ScrollArea>\n  </SheetContent>\n</Sheet>' }],
  },

  popover: {
    tier: 'molecules', category: 'Overlay', status: 'stable',
    intent: 'Contextual content anchored to a trigger, without blocking the page.',
    description: 'Radix Popover. Non-modal by default: the page stays interactive and scrollable. Positioned automatically with collision detection.',
    whenToUse: ['A date picker, colour picker or small settings cluster', 'Supplementary detail the user opts into', 'Anything needing interactive content near its trigger'],
    whenNotToUse: [
      'Content critical to the task — if the user must read it, it cannot be behind a click',
      'A simple text hint — use ui:tooltip',
      'A list of actions — use ui:dropdown-menu, which has menu semantics and arrow-key navigation',
      'A form that warrants full attention — use ui:dialog',
    ],
    compound: {
      root: 'Popover',
      parts: [
        { name: 'PopoverTrigger', parent: 'Popover', required: true, note: 'Use asChild to wrap your own control' },
        { name: 'PopoverContent', parent: 'Popover', required: true, note: 'Accepts align and sideOffset' },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'Rest', note: 'Nothing rendered' },
      { name: 'Open', trigger: 'Click or Enter on trigger', note: 'Animates in from the computed side' },
    ],
    a11y: {
      role: 'dialog', handledByRadix: true,
      keyboard: ['Enter or Space — open', 'Escape — close and return focus to trigger', 'Tab — move through content'],
      requiredAttributes: ['An accessible name on the trigger'],
      focusManagement: 'Focus moves into the content on open and returns to the trigger on close.',
      notes: ['Non-modal: the rest of the page stays interactive. That is the difference from ui:dialog.', 'Content is portalled, so overflow-hidden ancestors do not clip it.'],
    },
    agentRules: ['Never hide critical information in a popover.', 'Use ui:dropdown-menu for action lists, not this.', 'Use ui:tooltip for plain hints.', 'Trigger needs an accessible name.'],
    forbiddenUsage: ['Critical-only information', 'Action menus', 'Nesting a modal dialog inside a popover'],
    related: [{ id: 'ui:tooltip', note: 'Text hints' }, { id: 'ui:dropdown-menu', note: 'Actions' }, { id: 'ui:hover-card', note: 'Hover-triggered preview' }, { id: 'ui:dialog', note: 'Focused tasks' }],
    examples: [{ title: 'Date picker', code: '<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Pick a date</Button>\n  </PopoverTrigger>\n  <PopoverContent className="w-auto p-0" align="start">\n    <Calendar mode="single" selected={date} onSelect={setDate} />\n  </PopoverContent>\n</Popover>' }],
  },

  tooltip: {
    tier: 'molecules', category: 'Overlay', status: 'stable',
    intent: 'Name a control whose purpose is not obvious from its appearance.',
    description: 'Radix Tooltip. Opens on hover and on keyboard focus. Requires TooltipProvider somewhere above it.',
    whenToUse: ['Naming an icon-only button', 'Showing a full value that is truncated', 'A keyboard shortcut hint'],
    whenNotToUse: [
      'Any information the user needs to complete the task — tooltips are invisible on touch and easy to miss',
      'Interactive content — a tooltip cannot be focused or clicked into',
      'Long text — use ui:popover or ui:hover-card',
      'As a replacement for a visible label',
    ],
    compound: {
      root: 'TooltipProvider',
      parts: [
        { name: 'TooltipProvider', parent: null, required: true, note: 'Mount once high in the tree. Without it, Tooltip throws.' },
        { name: 'Tooltip', parent: 'TooltipProvider', required: true },
        { name: 'TooltipTrigger', parent: 'Tooltip', required: true, note: 'Use asChild. The trigger must be focusable.' },
        { name: 'TooltipContent', parent: 'Tooltip', required: true },
      ],
    },
    states: [
      { name: 'Hidden', trigger: 'Rest', note: 'Nothing rendered' },
      { name: 'Visible', trigger: 'Hover or focus after the delay', note: 'Fades and zooms in from the computed side' },
    ],
    a11y: {
      role: 'tooltip', handledByRadix: true,
      keyboard: ['Tab to the trigger — opens', 'Escape — closes'],
      requiredAttributes: ['The trigger must be focusable — a div will not do'],
      notes: [
        'Opens on keyboard focus as well as hover. Radix handles this; do not reimplement it on mouse events.',
        'Touch devices have no hover. Anything tooltip-only is invisible to those users — this is the reason for the critical-information rule.',
        'A tooltip on an icon button supplies the visible hint; the button still needs aria-label for its accessible name.',
      ],
    },
    agentRules: [
      'Never put critical information in a tooltip.',
      'The trigger must be focusable.',
      'An icon button still needs aria-label — the tooltip is not a substitute.',
      'Mount TooltipProvider once at the app root, not per tooltip.',
    ],
    forbiddenUsage: ['Critical-only information', 'Interactive content inside TooltipContent', 'Non-focusable trigger', 'Tooltip as the only accessible name'],
    related: [{ id: 'ui:hover-card', note: 'Richer hover preview' }, { id: 'ui:popover', note: 'Interactive content' }],
    examples: [{ title: 'Icon button', code: '<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button size="icon" variant="ghost" aria-label="Duplicate">\n        <Copy className="h-4 w-4" />\n      </Button>\n    </TooltipTrigger>\n    <TooltipContent>Duplicate</TooltipContent>\n  </Tooltip>\n</TooltipProvider>' }],
  },

  'hover-card': {
    tier: 'molecules', category: 'Overlay', status: 'stable',
    intent: 'A rich preview of what a link points to, without making the user go there.',
    description: 'Radix HoverCard. Opens on hover with a delay. Unlike a tooltip it may contain layout and images — but like a tooltip it is unreachable on touch.',
    whenToUse: ['User or entity previews on a mention', 'Link previews with a thumbnail and summary', 'Supplementary context that is genuinely optional'],
    whenNotToUse: [
      'Anything required to complete the task — touch users will never see it',
      'Short text — use ui:tooltip',
      'Content the user must interact with — use ui:popover',
      'On a primarily mobile surface',
    ],
    compound: {
      root: 'HoverCard',
      parts: [
        { name: 'HoverCardTrigger', parent: 'HoverCard', required: true },
        { name: 'HoverCardContent', parent: 'HoverCard', required: true },
      ],
    },
    states: [
      { name: 'Hidden', trigger: 'Rest', note: 'Nothing rendered' },
      { name: 'Visible', trigger: 'Hover after openDelay', note: 'Fades in; stays while the pointer is over trigger or content' },
    ],
    a11y: {
      role: 'dialog', handledByRadix: true,
      keyboard: ['Focus on the trigger opens it', 'Escape closes'],
      requiredAttributes: ['A meaningful accessible name on the trigger'],
      notes: ['Hover-only by design. Always duplicate anything important somewhere reachable.', 'Do not place primary actions inside — they are unreachable on touch.'],
    },
    agentRules: ['Preview only. Never the sole source of anything.', 'No primary actions inside.', 'Not appropriate on mobile-first surfaces.'],
    forbiddenUsage: ['Critical information', 'Primary actions inside the card', 'Mobile-first usage'],
    related: [{ id: 'ui:tooltip', note: 'Short text' }, { id: 'ui:popover', note: 'Click-triggered, interactive' }],
    examples: [{ title: 'User preview', code: '<HoverCard>\n  <HoverCardTrigger asChild>\n    <a href="/u/ada" className="underline">@ada</a>\n  </HoverCardTrigger>\n  <HoverCardContent className="w-80">\n    <div className="flex gap-4">\n      <Avatar><AvatarImage src="/ada.png" /><AvatarFallback>AL</AvatarFallback></Avatar>\n      <div className="space-y-1">\n        <h4 className="text-sm font-semibold">Ada Lovelace</h4>\n        <p className="text-sm text-muted-foreground">Analytical engine, 1843.</p>\n      </div>\n    </div>\n  </HoverCardContent>\n</HoverCard>' }],
  },

  'dropdown-menu': {
    tier: 'organisms', category: 'Overlay', status: 'stable',
    intent: 'A list of actions revealed from a button, with proper menu semantics.',
    description: 'Radix DropdownMenu with submenus, checkbox items, radio groups, labels, separators and shortcut slots.',
    whenToUse: ['An overflow or "more actions" menu', 'A user account menu', 'Actions too numerous to sit in a toolbar', 'View options, using checkbox or radio items'],
    whenNotToUse: [
      'Selecting a form value — use ui:select, which has the right semantics for a value',
      'Navigating a site — use ui:navigation-menu',
      'Right-click context — use ui:context-menu',
      'Two or fewer actions — just show the buttons',
    ],
    compound: {
      root: 'DropdownMenu',
      parts: [
        { name: 'DropdownMenuTrigger', parent: 'DropdownMenu', required: true, note: 'Use asChild with a Button' },
        { name: 'DropdownMenuContent', parent: 'DropdownMenu', required: true },
        { name: 'DropdownMenuLabel', parent: 'DropdownMenuContent', required: false, note: 'A section heading, not selectable' },
        { name: 'DropdownMenuItem', parent: 'DropdownMenuContent', required: false },
        { name: 'DropdownMenuCheckboxItem', parent: 'DropdownMenuContent', required: false },
        { name: 'DropdownMenuRadioGroup', parent: 'DropdownMenuContent', required: false },
        { name: 'DropdownMenuRadioItem', parent: 'DropdownMenuRadioGroup', required: true },
        { name: 'DropdownMenuSub', parent: 'DropdownMenuContent', required: false, note: 'Wraps SubTrigger and SubContent' },
        { name: 'DropdownMenuSeparator', parent: 'DropdownMenuContent', required: false },
        { name: 'DropdownMenuShortcut', parent: 'DropdownMenuItem', required: false, note: 'Presentational only — it does not bind the key' },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'Rest', note: 'Nothing rendered' },
      { name: 'Open', trigger: 'Click, Enter, Space or ArrowDown', note: 'Focus moves into the menu' },
      { name: 'Item focused', trigger: 'Arrow keys or hover', note: 'bg-accent text-accent-foreground' },
      { name: 'Submenu open', trigger: 'Hover or ArrowRight on SubTrigger', note: 'Opens to the side with collision detection' },
    ],
    a11y: {
      role: 'menu', handledByRadix: true,
      keyboard: ['ArrowDown or Enter — open', 'Arrow keys — move between items', 'ArrowRight/ArrowLeft — enter and leave submenus', 'Type a letter — typeahead', 'Escape — close and return focus', 'Tab — close and move on'],
      requiredAttributes: ['An accessible name on the trigger'],
      focusManagement: 'Focus enters the menu on open and returns to the trigger on close.',
      notes: [
        'Radix supplies menu, menuitem, menuitemcheckbox and menuitemradio roles plus roving focus.',
        'DropdownMenuShortcut only renders the hint. Bind the actual key yourself.',
        'Destructive items still need ui:alert-dialog confirmation — closing the menu is not a confirmation.',
      ],
    },
    agentRules: [
      'Use ui:select for values, this for actions.',
      'Group with separators and labels once past about seven items.',
      'Destructive items get destructive styling and a confirmation step.',
      'DropdownMenuShortcut is display only — bind the key separately.',
      'Icon-only triggers need an accessible name.',
    ],
    forbiddenUsage: ['Selecting a form value', 'Destructive item with no confirmation', 'Items outside DropdownMenuContent', 'Unlabelled trigger'],
    related: [{ id: 'ui:select', note: 'Form values' }, { id: 'ui:context-menu', note: 'Right-click' }, { id: 'ui:menubar', note: 'Persistent application menu bar' }, { id: 'ui:command', note: 'Searchable command palette' }],
    examples: [{ title: 'Row actions', code: '<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="ghost" size="icon" aria-label="Row actions">\n      <MoreHorizontal className="h-4 w-4" />\n    </Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent align="end">\n    <DropdownMenuLabel>Actions</DropdownMenuLabel>\n    <DropdownMenuItem onSelect={edit}>Edit</DropdownMenuItem>\n    <DropdownMenuItem onSelect={duplicate}>Duplicate</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem className="text-destructive" onSelect={confirmDelete}>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>' }],
  },

  'context-menu': {
    tier: 'organisms', category: 'Overlay', status: 'stable',
    intent: 'Actions for the specific thing the user right-clicked.',
    description: 'Radix ContextMenu. Structurally identical to ui:dropdown-menu but triggered by right-click or long-press.',
    whenToUse: ['Per-item actions in a file browser, canvas or grid', 'A power-user accelerator for actions that also exist elsewhere'],
    whenNotToUse: [
      'As the only path to an action — right-click is undiscoverable and awkward on touch',
      'On a primarily touch surface',
      'For navigation',
    ],
    compound: {
      root: 'ContextMenu',
      parts: [
        { name: 'ContextMenuTrigger', parent: 'ContextMenu', required: true, note: 'Wraps the right-clickable region — not a button' },
        { name: 'ContextMenuContent', parent: 'ContextMenu', required: true },
        { name: 'ContextMenuItem', parent: 'ContextMenuContent', required: false },
        { name: 'ContextMenuCheckboxItem', parent: 'ContextMenuContent', required: false },
        { name: 'ContextMenuRadioGroup', parent: 'ContextMenuContent', required: false },
        { name: 'ContextMenuSub', parent: 'ContextMenuContent', required: false },
        { name: 'ContextMenuSeparator', parent: 'ContextMenuContent', required: false },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'Rest', note: 'Nothing rendered' },
      { name: 'Open', trigger: 'Right-click or long-press on the trigger region', note: 'Opens at the pointer position' },
    ],
    a11y: {
      role: 'menu', handledByRadix: true,
      keyboard: ['Shift+F10 or the Menu key — open', 'Arrow keys — navigate', 'Escape — close'],
      requiredAttributes: [],
      notes: [
        'Keyboard users reach this via Shift+F10. Most do not know that. Never make it the only route.',
        'Every action here must also exist in a visible ui:dropdown-menu or toolbar.',
      ],
    },
    agentRules: ['Always duplicate these actions somewhere visible.', 'Not appropriate as a primary interaction on touch.', 'Destructive items still require confirmation.'],
    forbiddenUsage: ['Sole route to an action', 'Primary interaction on a touch surface', 'Navigation'],
    related: [{ id: 'ui:dropdown-menu', note: 'The discoverable equivalent — provide both' }],
    examples: [{ title: 'Canvas item', code: '<ContextMenu>\n  <ContextMenuTrigger className="flex h-40 items-center justify-center rounded-md border border-dashed">\n    Right-click here\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem onSelect={rename}>Rename</ContextMenuItem>\n    <ContextMenuItem onSelect={duplicate}>Duplicate</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>' }],
  },

  command: {
    tier: 'organisms', category: 'Overlay', status: 'stable',
    intent: 'Find and run anything by typing, without knowing where it lives in the interface.',
    description: 'A cmdk-based command palette with fuzzy filtering, grouping and keyboard navigation. CommandDialog wraps it in ui:dialog for the familiar Cmd+K overlay.',
    whenToUse: ['A global Cmd+K palette', 'Searching a large option set — fifty entries or more', 'A combobox where the user types to filter', 'Power-user navigation'],
    whenNotToUse: [
      'A small known set — use ui:select',
      'As the only route to a feature — palettes are for acceleration, not discovery',
      'A primarily touch interface',
    ],
    compound: {
      root: 'Command',
      parts: [
        { name: 'CommandDialog', parent: null, required: false, note: 'Command wrapped in ui:dialog. The usual Cmd+K form.' },
        { name: 'CommandInput', parent: 'Command', required: true, note: 'The filter field. Autofocused inside CommandDialog.' },
        { name: 'CommandList', parent: 'Command', required: true, note: 'The scrollable results region' },
        { name: 'CommandEmpty', parent: 'CommandList', required: true, note: 'Shown when nothing matches. Never omit it.' },
        { name: 'CommandGroup', parent: 'CommandList', required: false, note: 'Headed section; hides itself when all children are filtered out' },
        { name: 'CommandItem', parent: 'CommandGroup', required: false },
        { name: 'CommandSeparator', parent: 'CommandList', required: false },
        { name: 'CommandShortcut', parent: 'CommandItem', required: false, note: 'Presentational only' },
      ],
    },
    states: [
      { name: 'Empty query', trigger: 'No input', note: 'All items shown, grouped' },
      { name: 'Filtering', trigger: 'Typing', note: 'Items filter live; empty groups disappear' },
      { name: 'No results', trigger: 'Nothing matches', note: 'CommandEmpty renders' },
      { name: 'Item selected', trigger: 'Arrow keys', note: 'bg-accent text-accent-foreground' },
    ],
    a11y: {
      role: 'combobox with listbox', handledByRadix: false,
      keyboard: ['Arrow keys — move through results', 'Enter — run the selected item', 'Escape — close', 'Cmd/Ctrl+K — the conventional open shortcut, which you must bind yourself'],
      requiredAttributes: ['A placeholder on CommandInput describing what can be searched'],
      notes: [
        'cmdk supplies combobox and listbox semantics and active-descendant management.',
        'Always render CommandEmpty. Without it a failed search shows a blank box.',
        'The Cmd+K binding is yours to add — see src/components/prompt-library/usePromptHotkeys.ts for the pattern already used in this repo.',
      ],
    },
    agentRules: [
      'CommandEmpty is mandatory.',
      'Group once past about ten items.',
      'Bind the open shortcut yourself; CommandShortcut only renders the hint.',
      'Never the sole route to a feature.',
      'Under fifty options with no search need means ui:select.',
    ],
    forbiddenUsage: ['Omitting CommandEmpty', 'Sole route to a feature', 'Items outside CommandList'],
    related: [{ id: 'ui:dialog', note: 'CommandDialog composes it' }, { id: 'ui:select', note: 'Small known sets' }, { id: 'ui:popover', note: 'Inline combobox shell' }],
    examples: [{ title: 'Command palette', code: '<CommandDialog open={open} onOpenChange={setOpen}>\n  <CommandInput placeholder="Search commands…" />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Navigation">\n      <CommandItem onSelect={() => go(\'/ui-kit\')}>UI Kit</CommandItem>\n      <CommandItem onSelect={() => go(\'/brand-preview\')}>Brand preview</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</CommandDialog>' }],
  },

  menubar: {
    tier: 'organisms', category: 'Navigation', status: 'stable',
    intent: 'A persistent application menu bar, in the desktop-software sense.',
    description: 'Radix Menubar: a horizontal row of menus that share focus and open on hover once one is open.',
    whenToUse: ['Desktop-class applications — editors, IDEs, design tools', 'When users expect File, Edit, View'],
    whenNotToUse: [
      'A website — use ui:navigation-menu',
      'A typical web application — a toolbar with ui:dropdown-menu is lighter and more familiar',
      'Mobile or narrow layouts',
    ],
    compound: {
      root: 'Menubar',
      parts: [
        { name: 'MenubarMenu', parent: 'Menubar', required: true, note: 'One per top-level menu' },
        { name: 'MenubarTrigger', parent: 'MenubarMenu', required: true },
        { name: 'MenubarContent', parent: 'MenubarMenu', required: true },
        { name: 'MenubarItem', parent: 'MenubarContent', required: false },
        { name: 'MenubarCheckboxItem', parent: 'MenubarContent', required: false },
        { name: 'MenubarRadioGroup', parent: 'MenubarContent', required: false },
        { name: 'MenubarSub', parent: 'MenubarContent', required: false },
        { name: 'MenubarSeparator', parent: 'MenubarContent', required: false },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'Rest', note: 'Triggers visible, no menu open' },
      { name: 'Open', trigger: 'Click or Enter on a trigger', note: 'That menu opens; hovering siblings then switches without clicking' },
    ],
    a11y: {
      role: 'menubar', handledByRadix: true,
      keyboard: ['ArrowLeft/ArrowRight — move between top-level menus', 'ArrowDown — open the focused menu', 'Arrow keys — move within a menu', 'Escape — close'],
      requiredAttributes: [],
      notes: ['The whole bar is one tab stop with roving focus.', 'This pattern is unfamiliar on the web. Only use it where the desktop metaphor is genuinely expected.'],
    },
    agentRules: ['Desktop-class applications only.', 'Use ui:navigation-menu for site navigation.', 'Keep top-level items to about five.', 'Not suitable for narrow layouts — provide an alternative.'],
    forbiddenUsage: ['Website navigation', 'Mobile layouts', 'As a general toolbar'],
    related: [{ id: 'ui:navigation-menu', note: 'Site navigation' }, { id: 'ui:dropdown-menu', note: 'A single menu button' }],
    examples: [{ title: 'File menu', code: '<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Save<MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>' }],
  },
}

/**
 * Curated metadata — Forms.
 *
 * What a parser cannot derive: what the component is for, when NOT to reach
 * for it, what each state means, and the mistakes agents actually make.
 * Mechanical facts come from scripts/lib/extract-facts.mjs.
 */

export const forms = {


  // ─── Forms ──────────────────────────────────────────────────────────────

  button: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'The single most important decision available in a region, and every lesser one alongside it.',
    description: 'The primary interactive control. Six variants spanning full emphasis to bare text, four sizes, and asChild polymorphism for rendering as a link while keeping button styling.',
    whenToUse: [
      'Any action the user takes — submit, save, open, confirm, cancel',
      'As a link that must look like a button, via asChild with an anchor inside',
      'Icon-only actions, using size="icon" plus an accessible name',
    ],
    whenNotToUse: [
      'Navigation between pages that should read as a link — use a plain anchor or variant="link"',
      'Toggling a binary setting — use ui:switch or ui:toggle so the state is announced',
      'One choice among several — use ui:radio-group or ui:tabs',
      'A destructive action on its own — pair variant="destructive" with ui:alert-dialog',
    ],
    anatomy: [
      { part: 'Root', role: 'The button element, or any element when asChild is set' },
      { part: 'Icon', role: 'Optional leading or trailing SVG. Sized automatically to 16px and made non-interactive by the base class' },
      { part: 'Label', role: 'The action text. A verb phrase, not a noun' },
    ],
    variantGuidance: {
      default: 'The one primary action in a region. Never two.',
      destructive: 'Irreversible or damaging actions only. Always confirm first.',
      outline: 'Secondary actions that still need a visible boundary.',
      secondary: 'Secondary actions on a busy surface where an outline would add noise.',
      ghost: 'Tertiary actions, toolbar controls, and icon buttons inside dense UI.',
      link: 'An action that is semantically navigation but must sit in a button row.',
    },
    sizeGuidance: {
      default: 'h-10. The standard. Use unless you have a reason not to.',
      sm: 'h-9. Dense toolbars and table rows. Verify the 44px touch target is still met by surrounding padding.',
      lg: 'h-11. Primary calls to action on marketing or empty-state surfaces.',
      icon: 'h-10 w-10. Square, icon only. Requires aria-label or an sr-only span.',
    },
    states: [
      { name: 'Default', trigger: 'Rest', note: 'Full opacity, variant background' },
      { name: 'Hover', trigger: 'Pointer over', note: 'Background shifts to /90 or /80 opacity depending on variant' },
      { name: 'Focus-visible', trigger: 'Keyboard focus', note: 'ring-2 ring-ring ring-offset-2. Never remove.' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'opacity-50 and pointer-events-none. Still reachable by screen readers, which is correct.' },
    ],
    a11y: {
      role: 'button', handledByRadix: false,
      keyboard: ['Enter — activate', 'Space — activate'],
      requiredAttributes: ['aria-label or visible text content', 'aria-label required when size="icon"'],
      notes: [
        'Native button element gives keyboard and screen-reader behavior for free.',
        'disabled removes the element from the tab order. If the user needs to know why it is disabled, use aria-disabled and handle the click instead.',
        'When asChild renders an anchor, the element becomes a link: Space no longer activates it and it gains link semantics. That is usually what you want for navigation, and wrong for actions.',
      ],
    },
    agentRules: [
      'One variant="default" button per action region.',
      'Label with a verb naming the specific outcome — "Delete project", not "OK".',
      'size="icon" without an accessible name is a hard failure.',
      'Do not restyle via className when a variant already expresses the intent.',
      'buttonVariants is imported by ui:alert-dialog, ui:calendar, ui:carousel and ui:pagination. Renaming a variant breaks all four silently.',
    ],
    forbiddenUsage: [
      'Two primary buttons in one action region',
      'variant="destructive" on a non-destructive action',
      'Removing focus-visible styling',
      'Icon-only button with no accessible name',
    ],
    related: [
      { id: 'ui:toggle', note: 'For binary state rather than an action' },
      { id: 'ui:dropdown-menu', note: 'When one button hides several actions' },
      { id: 'ui:alert-dialog', note: 'Required companion for destructive actions' },
    ],
    examples: [
      { title: 'Primary action', code: '<Button onClick={save}>Save changes</Button>' },
      { title: 'Destructive, confirmed', code: '<AlertDialogTrigger asChild>\n  <Button variant="destructive">Delete project</Button>\n</AlertDialogTrigger>' },
      { title: 'As a link', code: '<Button asChild variant="link">\n  <a href="/docs">Read the docs</a>\n</Button>' },
      { title: 'Icon only', code: '<Button size="icon" aria-label="Close panel">\n  <X />\n</Button>' },
    ],
  },

  input: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'A single line of user-supplied text, with the focus and disabled behavior already correct.',
    description: 'A styled native input. All native props and types pass through; type="file" receives specific styling.',
    whenToUse: ['Single-line text, email, password, number, search, url, tel', 'File selection via type="file"'],
    whenNotToUse: [
      'Multi-line text — use ui:textarea',
      'Choosing from a known set — use ui:select',
      'Searching a large set with filtering — use ui:command',
      'Dates — use ui:calendar inside ui:popover',
      'Any input without a ui:label, which is never acceptable',
    ],
    anatomy: [{ part: 'Root', role: 'The native input element. No wrapper is provided — pair it with ui:label and ui:form yourself.' }],
    states: [
      { name: 'Default', trigger: 'Rest', note: 'border-input on bg-background' },
      { name: 'Placeholder', trigger: 'Empty', note: 'text-muted-foreground. Never a substitute for a label.' },
      { name: 'Focus-visible', trigger: 'Keyboard or click focus', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'cursor-not-allowed, opacity-50' },
      { name: 'Invalid', trigger: 'Validation failure', note: 'Not styled by this component. ui:form supplies the error colouring and aria-describedby wiring.' },
    ],
    a11y: {
      role: 'textbox', handledByRadix: false,
      keyboard: ['Standard text editing keys'],
      requiredAttributes: ['An associated label via ui:label htmlFor, or aria-label', 'aria-describedby pointing at any helper or error text', 'aria-invalid when validation fails'],
      notes: [
        'A placeholder is not a label. It disappears on input and is invisible to some assistive technology.',
        'type="number" is hostile to screen readers and to users who paste formatted values. Prefer type="text" with inputMode="numeric".',
        'This component does not render error state. Use ui:form, which wires aria-invalid and aria-describedby for you.',
      ],
    },
    agentRules: [
      'Never render an Input without an associated Label.',
      'Set autoComplete on anything a browser can fill.',
      'Use ui:form for validation rather than hand-wiring aria-describedby.',
    ],
    forbiddenUsage: ['Placeholder as the only label', 'Error communicated by border colour alone', 'Removing the focus ring'],
    related: [{ id: 'ui:textarea', note: 'Multi-line' }, { id: 'ui:label', note: 'Required companion' }, { id: 'ui:form', note: 'Validation and error wiring' }],
    examples: [
      { title: 'Labelled input', code: '<div className="space-y-2">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" autoComplete="email" />\n</div>' },
    ],
  },

  textarea: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'Multi-line text where the length is genuinely open-ended.',
    description: 'A styled native textarea with a min-height of 80px. Does not auto-grow.',
    whenToUse: ['Comments, descriptions, notes, messages — anything where the user may reasonably write a paragraph'],
    whenNotToUse: ['Single-line values, even long ones — use ui:input', 'Rich text — this component has no formatting affordances', 'Code entry where monospace and tab handling matter'],
    anatomy: [{ part: 'Root', role: 'The native textarea element' }],
    states: [
      { name: 'Default', trigger: 'Rest', note: 'min-h-[80px], resizable by the browser default' },
      { name: 'Focus-visible', trigger: 'Focus', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'cursor-not-allowed, opacity-50' },
    ],
    a11y: {
      role: 'textbox', handledByRadix: false,
      keyboard: ['Standard text editing', 'Tab moves focus out rather than inserting a tab'],
      requiredAttributes: ['An associated label', 'aria-describedby for character limits or helper text'],
      notes: ['If you impose a character limit, announce the remaining count in a polite live region, not only visually.'],
    },
    agentRules: ['Always pair with ui:label.', 'Does not auto-grow — set rows or a min-height class if the default is wrong.', 'Announce character limits in a live region.'],
    forbiddenUsage: ['Placeholder as the only label', 'A hard character limit with no visible or announced counter'],
    related: [{ id: 'ui:input', note: 'Single-line' }, { id: 'ui:form', note: 'Validation' }],
    examples: [{ title: 'Labelled textarea', code: '<div className="space-y-2">\n  <Label htmlFor="notes">Notes</Label>\n  <Textarea id="notes" rows={5} />\n</div>' }],
  },

  label: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'Names a control, and makes its text a click target for it.',
    description: 'Radix Label with peer-disabled styling. The htmlFor association is what makes a form usable — not decoration.',
    whenToUse: ['Every form control, without exception'],
    whenNotToUse: ['As a general heading — use a semantic heading element', 'For static text that names nothing'],
    anatomy: [{ part: 'Root', role: 'The label element. htmlFor must match the control id.' }],
    states: [
      { name: 'Default', trigger: 'Rest', note: 'text-sm font-medium' },
      { name: 'Peer disabled', trigger: 'Associated control is disabled', note: 'cursor-not-allowed, opacity-70 via peer-disabled: — requires the control to carry the peer class' },
    ],
    a11y: {
      role: 'label', handledByRadix: true,
      keyboard: ['Clicking the label focuses or toggles the associated control'],
      requiredAttributes: ['htmlFor matching the control id'],
      notes: ['A label without htmlFor is decorative text and provides no accessible name.', 'Radix Label prevents text selection on double-click, which stops accidental selection when toggling a checkbox.'],
    },
    agentRules: ['htmlFor is mandatory. A Label without it is a bug.', 'Do not use Label for headings.', 'Required-field markers need text or aria-required, not an asterisk alone.'],
    forbiddenUsage: ['Label with no htmlFor', 'Asterisk as the only required indicator'],
    related: [{ id: 'ui:form', note: 'FormLabel wires htmlFor automatically' }],
    examples: [{ title: 'Basic', code: '<Label htmlFor="name">Full name</Label>\n<Input id="name" />' }],
  },

  checkbox: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'An independent yes-or-no choice, or one of several non-exclusive options.',
    description: 'Radix Checkbox with a Lucide check indicator. Supports an indeterminate state through checked="indeterminate".',
    whenToUse: ['Opting in or out of one thing', 'Selecting several items from a list', 'A parent checkbox summarising children, via the indeterminate state'],
    whenNotToUse: [
      'Exactly one choice from several — use ui:radio-group',
      'A setting that applies immediately — use ui:switch, which reads as a state rather than a selection',
      'Selecting from many options — use ui:select or ui:command',
    ],
    anatomy: [
      { part: 'Root', role: 'The interactive box' },
      { part: 'Indicator', role: 'The check or dash glyph, rendered only when checked or indeterminate' },
    ],
    states: [
      { name: 'Unchecked', trigger: 'checked={false}', note: 'border-primary, transparent fill' },
      { name: 'Checked', trigger: 'checked={true}', note: 'bg-primary with the check glyph' },
      { name: 'Indeterminate', trigger: 'checked="indeterminate"', note: 'For a parent whose children are partly selected. Announced as mixed.' },
      { name: 'Focus-visible', trigger: 'Keyboard focus', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'cursor-not-allowed, opacity-50' },
    ],
    a11y: {
      role: 'checkbox', handledByRadix: true,
      keyboard: ['Space — toggle', 'Tab — move focus'],
      requiredAttributes: ['An associated label, or aria-label'],
      notes: ['Radix supplies role, aria-checked and the mixed state. Do not add them by hand.', 'Group related checkboxes in a fieldset with a legend.'],
    },
    agentRules: ['Always pair with ui:label using htmlFor.', 'Use indeterminate for parent rows rather than a third visual style.', 'A checkbox that applies instantly should probably be a ui:switch.'],
    forbiddenUsage: ['Checkbox with no label', 'Using a checkbox where exactly one option must be chosen', 'Overriding aria-checked'],
    related: [{ id: 'ui:radio-group', note: 'Exclusive choice' }, { id: 'ui:switch', note: 'Immediate setting' }, { id: 'ui:form', note: 'Validation' }],
    examples: [{ title: 'With label', code: '<div className="flex items-center space-x-2">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms and conditions</Label>\n</div>' }],
  },

  'radio-group': {
    tier: 'molecules', category: 'Forms', status: 'stable',
    intent: 'Exactly one choice from a small set, with every option visible.',
    description: 'Radix RadioGroup with roving focus. The group owns the value; items are stateless.',
    whenToUse: ['Two to five mutually exclusive options where seeing them all aids the decision', 'Choices with enough weight to deserve the space'],
    whenNotToUse: [
      'More than about five options — use ui:select',
      'Non-exclusive choices — use ui:checkbox',
      'A binary on/off setting — use ui:switch',
      'When no selection is valid — a radio group cannot be unset once set',
    ],
    anatomy: [
      { part: 'RadioGroup', role: 'Owns value, onValueChange, and roving focus' },
      { part: 'RadioGroupItem', role: 'One option. Requires a value and an associated label.' },
    ],
    states: [
      { name: 'Unselected', trigger: 'Not the group value', note: 'border-primary, empty' },
      { name: 'Selected', trigger: 'Matches the group value', note: 'Filled circle indicator' },
      { name: 'Focus-visible', trigger: 'Arrow key or Tab', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled on group or item', note: 'opacity-50, removed from arrow navigation' },
    ],
    a11y: {
      role: 'radiogroup', handledByRadix: true,
      keyboard: ['Arrow keys — move between and select options', 'Tab — enter and leave the group as one stop', 'Space — select the focused option'],
      requiredAttributes: ['A label for the group itself, via aria-label or aria-labelledby', 'A label per item'],
      notes: [
        'The whole group is one tab stop. Arrow keys move within it. This is correct and expected — do not add tabIndex to items.',
        'Arrow-key navigation selects as it moves. If that is wrong for your case, the control should be a ui:select.',
      ],
    },
    agentRules: ['Label the group, not only the items.', 'Every RadioGroupItem needs a Label with htmlFor.', 'Over five options means ui:select.', 'Provide a default value unless empty is genuinely valid.'],
    forbiddenUsage: ['A single radio button', 'Items with no labels', 'Adding tabIndex to items'],
    related: [{ id: 'ui:select', note: 'Many options' }, { id: 'ui:checkbox', note: 'Non-exclusive' }, { id: 'ui:toggle-group', note: 'Compact exclusive choice in a toolbar' }],
    examples: [{ title: 'Labelled group', code: '<RadioGroup defaultValue="card" aria-label="Payment method">\n  <div className="flex items-center space-x-2">\n    <RadioGroupItem value="card" id="card" />\n    <Label htmlFor="card">Card</Label>\n  </div>\n  <div className="flex items-center space-x-2">\n    <RadioGroupItem value="invoice" id="invoice" />\n    <Label htmlFor="invoice">Invoice</Label>\n  </div>\n</RadioGroup>' }],
  },

  switch: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'A setting that takes effect the moment it is flipped.',
    description: 'Radix Switch styled as a sliding track and thumb. Semantically a checkbox; visually a commitment that the change is immediate.',
    whenToUse: ['Settings that apply instantly with no save step', 'Enabling or disabling a feature', 'Anything a user would describe as "turning on"'],
    whenNotToUse: [
      'Inside a form that requires submission — use ui:checkbox, because a switch promises immediacy it cannot keep',
      'Choosing between two named alternatives — use ui:toggle-group or ui:radio-group',
      'Accepting terms — that is a ui:checkbox',
    ],
    anatomy: [{ part: 'Root', role: 'The track' }, { part: 'Thumb', role: 'The sliding knob, translated on state change' }],
    states: [
      { name: 'Off', trigger: 'checked={false}', note: 'bg-input, thumb at rest' },
      { name: 'On', trigger: 'checked={true}', note: 'bg-primary, thumb translated' },
      { name: 'Focus-visible', trigger: 'Keyboard focus', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'opacity-50, cursor-not-allowed' },
    ],
    a11y: {
      role: 'switch', handledByRadix: true,
      keyboard: ['Space — toggle', 'Enter — toggle'],
      requiredAttributes: ['An associated label'],
      notes: [
        'Radix gives role="switch" and aria-checked. Screen readers announce on and off rather than checked and unchecked.',
        'The label must name the setting, not the state. "Email notifications", never "On".',
        'Position change alone does not meet the non-colour requirement for all users — keep the label adjacent and visible.',
      ],
    },
    agentRules: ['Label the setting, not the state.', 'If a save button exists, use ui:checkbox instead.', 'Reflect failure by reverting the switch and reporting it — never leave it optimistically on.'],
    forbiddenUsage: ['A switch inside a form with a submit button', 'A label that reads "On" or "Off"', 'Switch with no label'],
    related: [{ id: 'ui:checkbox', note: 'Deferred, form-submitted state' }, { id: 'ui:toggle', note: 'Toolbar pressed state' }],
    examples: [{ title: 'Setting row', code: '<div className="flex items-center justify-between">\n  <Label htmlFor="notifications">Email notifications</Label>\n  <Switch id="notifications" />\n</div>' }],
  },

  select: {
    tier: 'molecules', category: 'Forms', status: 'stable',
    intent: 'One choice from a list too long to show all at once.',
    description: 'Radix Select with a popover-styled content surface, scroll buttons, and typeahead. Renders in a portal.',
    whenToUse: ['Roughly five to fifty options', 'A known, finite set the user picks from', 'Grouped options, via SelectGroup and SelectLabel'],
    whenNotToUse: [
      'Under five options where seeing them aids choice — use ui:radio-group',
      'Over about fifty, or anything needing search — use ui:command',
      'Multiple selection — Radix Select is single-select; compose ui:popover with ui:checkbox instead',
      'Actions rather than values — use ui:dropdown-menu',
    ],
    compound: {
      root: 'Select',
      parts: [
        { name: 'SelectTrigger', parent: 'Select', required: true, note: 'The closed-state control' },
        { name: 'SelectValue', parent: 'SelectTrigger', required: true, note: 'Renders the selection or the placeholder' },
        { name: 'SelectContent', parent: 'Select', required: true, note: 'Portalled popover surface' },
        { name: 'SelectGroup', parent: 'SelectContent', required: false },
        { name: 'SelectLabel', parent: 'SelectGroup', required: false, note: 'Group heading, not an item' },
        { name: 'SelectItem', parent: 'SelectContent', required: true, note: 'Requires a unique value. An empty-string value is invalid in Radix.' },
        { name: 'SelectSeparator', parent: 'SelectContent', required: false },
      ],
    },
    states: [
      { name: 'Closed', trigger: 'Rest', note: 'Trigger shows SelectValue or placeholder' },
      { name: 'Open', trigger: 'Click or Enter', note: 'Content animates in; focus moves into the list' },
      { name: 'Item selected', trigger: 'Current value', note: 'Check indicator on the right' },
      { name: 'Item focused', trigger: 'Arrow keys or hover', note: 'bg-accent text-accent-foreground' },
      { name: 'Disabled', trigger: 'disabled on trigger or item', note: 'opacity-50, skipped in keyboard navigation' },
    ],
    a11y: {
      role: 'combobox', handledByRadix: true,
      keyboard: ['Enter or Space — open', 'Arrow keys — move between items', 'Type a letter — jump to matching item', 'Enter — select', 'Escape — close and return focus to trigger'],
      requiredAttributes: ['A label on the trigger, via ui:label htmlFor or aria-label'],
      notes: ['Radix supplies combobox semantics, focus return and typeahead.', 'Content is portalled to the body — inside an overflow-hidden container it still renders correctly.', 'SelectItem with value="" throws. Use a sentinel value for "none".'],
    },
    agentRules: [
      'Always label the trigger.',
      'Always give SelectValue a placeholder.',
      'Never use an empty string as an item value.',
      'Over fifty options, or any need to search, means ui:command.',
      'Actions belong in ui:dropdown-menu, not here.',
    ],
    forbiddenUsage: ['SelectItem with an empty value', 'SelectItem outside SelectContent', 'Unlabelled trigger', 'Using Select to fire actions'],
    related: [{ id: 'ui:command', note: 'Searchable, large sets' }, { id: 'ui:radio-group', note: 'Few options' }, { id: 'ui:dropdown-menu', note: 'Actions, not values' }],
    examples: [{ title: 'Labelled select', code: '<Label htmlFor="region">Region</Label>\n<Select>\n  <SelectTrigger id="region" className="w-[200px]">\n    <SelectValue placeholder="Select a region" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectGroup>\n      <SelectLabel>Americas</SelectLabel>\n      <SelectItem value="us-east">US East</SelectItem>\n      <SelectItem value="us-west">US West</SelectItem>\n    </SelectGroup>\n  </SelectContent>\n</Select>' }],
  },

  slider: {
    tier: 'molecules', category: 'Forms', status: 'stable',
    intent: 'An approximate value along a continuous range, where the relative position matters more than the exact number.',
    description: 'Radix Slider with a track, range fill and thumb. Supports multiple thumbs for range selection.',
    whenToUse: ['Volume, opacity, zoom, brightness — anything with immediate visible feedback', 'A price or date range, using two thumbs'],
    whenNotToUse: [
      'Precise numeric entry — use ui:input, or pair the slider with one',
      'Fewer than about ten discrete steps — use ui:radio-group or ui:toggle-group',
      'Any value where being one step off matters',
    ],
    anatomy: [
      { part: 'Root', role: 'Owns value, min, max, step' },
      { part: 'Track', role: 'The full range, bg-secondary' },
      { part: 'Range', role: 'The filled portion, bg-primary' },
      { part: 'Thumb', role: 'The draggable handle. One per value in the array.' },
    ],
    states: [
      { name: 'Default', trigger: 'Rest', note: 'Thumb positioned by value' },
      { name: 'Focus-visible', trigger: 'Keyboard focus on a thumb', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Dragging', trigger: 'Pointer down on a thumb', note: 'Value updates continuously' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'opacity-50, pointer-events-none' },
    ],
    a11y: {
      role: 'slider', handledByRadix: true,
      keyboard: ['Arrow keys — step by one', 'Page Up/Down — step by a larger increment', 'Home/End — jump to min or max'],
      requiredAttributes: ['aria-label or aria-labelledby on the root', 'aria-valuetext when the raw number is not meaningful on its own'],
      notes: [
        'Radix sets aria-valuemin, aria-valuemax and aria-valuenow.',
        'Set aria-valuetext when the number needs units or context — "40 percent" rather than "40".',
        'The thumb is 20px. Its hit area is below the 44px guideline; add vertical padding to the container on touch surfaces.',
      ],
    },
    agentRules: ['Label the slider.', 'Display the current value in text beside it — the thumb position is not readable enough alone.', 'Set aria-valuetext when units matter.', 'For exact entry, pair with ui:input.'],
    forbiddenUsage: ['A slider as the only way to enter a precise value', 'Unlabelled slider', 'A slider with fewer than ten meaningful steps'],
    related: [{ id: 'ui:input', note: 'Exact numeric entry' }, { id: 'ui:progress', note: 'Read-only progress, not input' }],
    examples: [{ title: 'Labelled with value', code: '<div className="space-y-2">\n  <div className="flex justify-between">\n    <Label htmlFor="volume">Volume</Label>\n    <span className="text-sm text-muted-foreground">{value}%</span>\n  </div>\n  <Slider id="volume" value={[value]} onValueChange={([v]) => setValue(v)} max={100} step={1} />\n</div>' }],
  },

  form: {
    tier: 'groups', category: 'Forms', status: 'stable',
    intent: 'Wires a control to its label, description and error message so the accessibility relationships are correct by construction.',
    description: 'A react-hook-form integration layer. FormField provides context; FormItem generates ids; FormControl wires aria-describedby and aria-invalid; FormMessage renders the error.',
    whenToUse: ['Any form with validation', 'Any form of more than two fields', 'Whenever error messages must be announced'],
    whenNotToUse: ['A single search box with no validation', 'A settings surface where each control applies immediately'],
    compound: {
      root: 'Form',
      parts: [
        { name: 'FormField', parent: 'Form', required: true, note: 'Provides the react-hook-form Controller and field name context' },
        { name: 'FormItem', parent: 'FormField', required: true, note: 'Generates the id namespace that ties label, control, description and message together' },
        { name: 'FormLabel', parent: 'FormItem', required: true, note: 'htmlFor is supplied automatically. Turns text-destructive on error.' },
        { name: 'FormControl', parent: 'FormItem', required: true, note: 'A Slot. Wraps exactly one control and injects id, aria-describedby and aria-invalid.' },
        { name: 'FormDescription', parent: 'FormItem', required: false, note: 'Helper text, automatically referenced by aria-describedby' },
        { name: 'FormMessage', parent: 'FormItem', required: false, note: 'The validation error. Renders nothing when valid.' },
      ],
    },
    states: [
      { name: 'Pristine', trigger: 'Untouched', note: 'No message rendered' },
      { name: 'Invalid', trigger: 'Validation failed', note: 'FormLabel and FormMessage turn destructive; aria-invalid set on the control' },
      { name: 'Submitting', trigger: 'formState.isSubmitting', note: 'Disable the submit button and give it accessible busy text' },
    ],
    a11y: {
      role: 'form', handledByRadix: false,
      keyboard: ['Tab through fields', 'Enter submits from a single-line input'],
      requiredAttributes: ['Generated automatically: id, aria-describedby, aria-invalid'],
      notes: [
        'This is the reason to use ui:form at all — the ARIA wiring is generated, not hand-written, so it cannot drift.',
        'FormControl must wrap exactly one element. Two children breaks the Slot.',
        'On failed submit, move focus to the first invalid field. react-hook-form does not do this for you.',
      ],
    },
    agentRules: [
      'The five parts are inseparable. Do not use FormLabel outside FormItem.',
      'FormControl wraps exactly one control.',
      'Never hand-write aria-describedby inside a form — you will fight the generated value.',
      'Move focus to the first invalid field after a failed submit.',
      'One submit button.',
    ],
    forbiddenUsage: ['FormControl with multiple children', 'Parts used outside their required parent', 'Manual aria-invalid on a wrapped control'],
    related: [{ id: 'ui:label', note: 'Standalone labelling outside a form' }, { id: 'ui:input', note: 'The usual wrapped control' }],
    examples: [{ title: 'One field', code: '<Form {...form}>\n  <form onSubmit={form.handleSubmit(onSubmit)}>\n    <FormField\n      control={form.control}\n      name="email"\n      render={({ field }) => (\n        <FormItem>\n          <FormLabel>Email</FormLabel>\n          <FormControl>\n            <Input type="email" {...field} />\n          </FormControl>\n          <FormDescription>We only use this for receipts.</FormDescription>\n          <FormMessage />\n        </FormItem>\n      )}\n    />\n    <Button type="submit">Save</Button>\n  </form>\n</Form>' }],
    gaps: ['Does not move focus to the first invalid field on submit — implement that in your onInvalid handler.'],
  },

  toggle: {
    tier: 'atoms', category: 'Forms', status: 'stable',
    intent: 'A control that stays pressed — formatting state in a toolbar, not an action.',
    description: 'Radix Toggle with two variants and three sizes. Semantically a pressed button, not a checkbox.',
    whenToUse: ['Text formatting controls — bold, italic, underline', 'A single filter that is either applied or not', 'Toolbar controls where the pressed state must be visible'],
    whenNotToUse: [
      'A settings toggle — use ui:switch, which announces on and off',
      'One of several exclusive options — use ui:toggle-group with type="single"',
      'An action that fires and completes — use ui:button',
    ],
    anatomy: [{ part: 'Root', role: 'The button, carrying data-state=on|off' }],
    states: [
      { name: 'Off', trigger: 'pressed={false}', note: 'Transparent background' },
      { name: 'On', trigger: 'pressed={true}', note: 'bg-accent text-accent-foreground' },
      { name: 'Focus-visible', trigger: 'Keyboard focus', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled prop', note: 'opacity-50, pointer-events-none' },
    ],
    a11y: {
      role: 'button with aria-pressed', handledByRadix: true,
      keyboard: ['Space — toggle', 'Enter — toggle'],
      requiredAttributes: ['aria-label when icon-only'],
      notes: ['Radix sets aria-pressed. Screen readers announce "pressed" or "not pressed".', 'Icon-only toggles always need an accessible name and usually a ui:tooltip.'],
    },
    agentRules: ['Icon-only toggles require aria-label.', 'Use ui:switch for settings, not this.', 'Pair icon-only toggles with ui:tooltip.'],
    forbiddenUsage: ['Icon-only toggle with no accessible name', 'Using Toggle for an immediate setting'],
    related: [{ id: 'ui:toggle-group', note: 'Several related toggles' }, { id: 'ui:switch', note: 'Settings' }, { id: 'ui:button', note: 'Actions' }],
    examples: [{ title: 'Icon toggle', code: '<Toggle aria-label="Toggle bold">\n  <Bold className="h-4 w-4" />\n</Toggle>' }],
  },

  'toggle-group': {
    tier: 'molecules', category: 'Forms', status: 'stable',
    intent: 'A set of related toggles that share a value and a visual group.',
    description: 'Radix ToggleGroup in single or multiple mode. Items inherit variant and size from the group through context.',
    whenToUse: ['Text alignment — left, centre, right', 'A compact exclusive choice in a toolbar, with type="single"', 'Multiple filters applied together, with type="multiple"'],
    whenNotToUse: [
      'A form field choice that needs a label and validation — use ui:radio-group',
      'More than about five options',
      'Navigation between views — use ui:tabs',
    ],
    compound: {
      root: 'ToggleGroup',
      parts: [{ name: 'ToggleGroupItem', parent: 'ToggleGroup', required: true, note: 'Inherits variant and size from the group. Setting them per item is ignored unless the group omits them.' }],
    },
    states: [
      { name: 'Unselected', trigger: 'Not in value', note: 'Transparent' },
      { name: 'Selected', trigger: 'In value', note: 'bg-accent text-accent-foreground' },
      { name: 'Focus-visible', trigger: 'Arrow keys', note: 'ring-2 ring-ring ring-offset-2' },
      { name: 'Disabled', trigger: 'disabled on group or item', note: 'opacity-50' },
    ],
    a11y: {
      role: 'group', handledByRadix: true,
      keyboard: ['Arrow keys — move between items', 'Tab — enter and leave as one stop', 'Space or Enter — toggle'],
      requiredAttributes: ['aria-label on the group', 'aria-label per icon-only item'],
      notes: ['Roving focus: the group is one tab stop.', 'type="single" allows deselection unless you handle the empty value — decide whether empty is valid.'],
    },
    agentRules: ['Label the group.', 'Set variant and size on the group, not per item.', 'Icon-only items need aria-label.', 'Decide whether type="single" may be emptied.'],
    forbiddenUsage: ['Unlabelled group', 'Icon-only items with no accessible name', 'Using ToggleGroup for page navigation'],
    related: [{ id: 'ui:toggle', note: 'A single independent toggle' }, { id: 'ui:radio-group', note: 'Form-field exclusive choice' }, { id: 'ui:tabs', note: 'View switching' }],
    examples: [{ title: 'Alignment', code: '<ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">\n  <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>\n  <ToggleGroupItem value="center" aria-label="Align centre"><AlignCenter /></ToggleGroupItem>\n  <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>\n</ToggleGroup>' }],
  },
}

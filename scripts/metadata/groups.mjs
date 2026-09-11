/**
 * Curated metadata — patterns, layouts, and the AI groups tier.
 *
 * The three AI entries here are compositions: they render a declared pattern
 * in the required order so it cannot be assembled wrongly. Where a spec says
 * "the header must precede the body", the group is how that stops being a
 * rule an agent might forget and becomes a shape it cannot get wrong.
 */

export const groups = {

  'form-field': {
    tier: 'groups', category: 'Forms', status: 'stable',
    intent: 'A labelled control with its description and error, wired together correctly.',
    description: 'The composition rules/composition.json requires for the form-submit pattern. Clones the child control to inject id, aria-describedby and aria-invalid, so the three relationships that make a field usable cannot be forgotten.',
    whenToUse: [
      'A standalone field outside react-hook-form',
      'Any field needing a description, an error, or both',
      'Satisfying the form-submit composition rule',
    ],
    whenNotToUse: [
      'Inside react-hook-form — use ui:form, which derives the same wiring from form state',
      'For a control that is not a form field',
      'When the label would be redundant with a visible heading — it is still required, so use sr-only rather than omitting it',
    ],
    anatomy: [
      { part: 'Label', role: 'ui:label with htmlFor wired to the generated id. Turns destructive on error.' },
      { part: 'Control', role: 'Your child element, cloned with id, aria-describedby and aria-invalid' },
      { part: 'Description', role: 'Optional helper text, referenced by aria-describedby' },
      { part: 'Error', role: 'role="alert" so a failure arriving after render is announced' },
    ],
    states: [
      { name: 'Default', trigger: 'No error', note: 'Label neutral, no alert region' },
      { name: 'Required', trigger: 'required', note: 'Visual asterisk plus an sr-only "(required)" — the asterisk alone is not a label' },
      { name: 'Described', trigger: 'description set', note: 'aria-describedby points at the helper text' },
      { name: 'Invalid', trigger: 'error set', note: 'Label and message destructive; aria-invalid set; error appended to aria-describedby' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: ['Clicking the label focuses the control'],
      requiredAttributes: ['label', 'A single React element as children'],
      liveRegion: 'The error message is role="alert"',
      notes: [
        'aria-describedby lists description then error, in that reading order — description is context, error is the newest news.',
        'The child is cloned, so props you set on it yourself win over the injected ones. That is deliberate: you can override the generated id.',
        'Children must be exactly one element. A fragment or an array breaks cloneElement.',
        'The required asterisk is aria-hidden and paired with an sr-only "(required)" — an asterisk announces as "star" or not at all.',
      ],
    },
    agentRules: [
      'Exactly one child element.',
      'Use ui:form inside react-hook-form; this is for standalone fields.',
      'Never omit the label. Use sr-only if it must be visually hidden.',
      'Pass error only when validation has actually failed — role="alert" interrupts.',
    ],
    forbiddenUsage: ['Multiple children', 'Omitting the label', 'Asterisk as the only required indicator', 'Use for non-form controls'],
    related: [
      { id: 'ui:form', note: 'react-hook-form integration' },
      { id: 'ui:label', note: 'The label alone' },
      { id: 'ui:input', note: 'The usual child' },
    ],
    examples: [{ title: 'Standalone field', code: '<FormField\n  label="Email"\n  description="We only use this for receipts."\n  error={errors.email}\n  required\n>\n  <Input type="email" autoComplete="email" />\n</FormField>' }],
  },

  'page-container': {
    tier: 'layout', category: 'Layout', status: 'stable',
    intent: 'One max-width, one gutter, one place to change either.',
    description: 'The layout root named by agents/page-generation.json. Renders <main> by default, so a generated page gets its main landmark without anyone remembering to add one.',
    whenToUse: ['The outermost wrapper of any generated page', 'Any region needing the standard horizontal rhythm', 'Satisfying the layout root in the page-generation contract'],
    whenNotToUse: [
      'Nested inside another PageContainer — the gutters compound',
      'Inside a ui:dialog or ui:sheet, which bring their own padding',
      'For a full-bleed region; use width="full" on a child instead of dropping the container',
    ],
    anatomy: [{ part: 'Root', role: 'main by default. Carries the max-width, the side gutter and the vertical rhythm.' }],
    variantGuidance: {
      prose: 'max-w-2xl. Long-form reading, where line length matters.',
      narrow: 'max-w-3xl. Settings and forms.',
      default: 'max-w-5xl. Most pages.',
      wide: 'max-w-7xl. Dashboards and tables.',
      full: 'No max-width. Keeps the gutter; drops the constraint.',
    },
    states: [
      { name: 'Default', trigger: 'No props', note: 'max-w-5xl, responsive gutter, py-8 to py-12' },
      { name: 'Full bleed', trigger: 'width="full"', note: 'Gutter retained — content never touches the viewport edge' },
      { name: 'Flush', trigger: 'spacing="none"', note: 'No vertical padding. Side padding is never removed.' },
    ],
    a11y: {
      role: 'main', handledByRadix: false,
      keyboard: [],
      requiredAttributes: [],
      notes: [
        'Renders <main>, which supplies the main landmark. Exactly one per page — set as="div" for any additional container.',
        'The gutter never collapses below px-4, so content keeps a 16px side margin at every width, including gutter="none".',
        'Vertical rhythm uses py-*, never a padding shorthand, so the side gutter cannot be zeroed by accident.',
      ],
    },
    agentRules: [
      'One <main> per page. Additional containers use as="div".',
      'Do not nest containers.',
      'Pick width from the content: prose for reading, wide for data.',
      'Never remove the side gutter.',
    ],
    forbiddenUsage: ['Nested containers', 'Multiple <main> landmarks', 'Removing the side gutter', 'Use inside a dialog or sheet'],
    related: [{ id: 'ui:card', note: 'Grouping inside the container' }, { id: 'ui:sidebar', note: 'SidebarInset owns the main region instead' }],
    examples: [{ title: 'Standard page', code: '<PageContainer>\n  <h1 className="text-2xl font-semibold">Deployments</h1>\n  {/* … */}\n</PageContainer>' }],
  },

  'ai-dialog': {
    tier: 'groups', category: 'AI', status: 'stable',
    intent: 'Where the human writes to the machine.',
    description: 'The composer. AIInputCard is the full card with a toolbar slot; AIDialogSlim is a single-line pill. Enter submits, Shift+Enter inserts a newline.',
    whenToUse: ['The message entry point of any AI surface', 'Full card for a dedicated chat or console view', 'Slim pill where vertical space is constrained'],
    whenNotToUse: [
      'As a general text input — use ui:input or ui:textarea',
      'More than one per surface',
      'Without a submit control; the button is never hidden, only disabled',
    ],
    compound: {
      root: 'AIInputCard',
      parts: [
        { name: 'AIInputCard', parent: null, required: false, note: 'Full card. Accepts toolbar and suggestions slots.' },
        { name: 'AIDialogSlim', parent: null, required: false, note: 'Single-line pill. No toolbar.' },
      ],
    },
    states: [
      { name: 'Empty', trigger: 'No value', note: 'Submit disabled — nothing to send' },
      { name: 'Composing', trigger: 'Value present', note: 'Submit enabled' },
      { name: 'Busy', trigger: 'busy', note: 'Submit suppressed while a response generates. The control stays visible.' },
      { name: 'Disabled', trigger: 'disabled', note: 'Field and submit both inert' },
      { name: 'Focused', trigger: 'Focus within', note: 'ring-2 ring-ai-accent on the container, not the field' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: ['Enter — submit', 'Shift+Enter — newline', 'Tab — reach the toolbar and submit'],
      requiredAttributes: ['An accessible label — supplied as sr-only from the label prop', 'aria-label on the submit button'],
      notes: [
        'Enter submits and Shift+Enter inserts a newline. Reversing this traps users mid-sentence, so it is not configurable.',
        'The field carries an sr-only label rather than relying on the placeholder, which disappears on input.',
        'Focus styling sits on the container via focus-within, so the whole composer reads as one control.',
        'The submit button is disabled, never hidden — a control that vanishes is harder to find than one that is greyed.',
        'Both forms are uncontrolled until you pass value; pass value and onValueChange together or neither.',
      ],
    },
    agentRules: [
      'One composer per surface.',
      'Never invert Enter and Shift+Enter.',
      'Disable submit while busy; do not hide it.',
      'Put ai:ai-dialog-button controls in the toolbar slot and ai:ai-chip-quick in suggestions.',
      'Composing is not sending — the human still presses submit.',
    ],
    forbiddenUsage: ['Multiple composers on one surface', 'Hiding the submit control', 'Inverting the Enter convention', 'Use as a general text input'],
    related: [
      { id: 'ai:ai-dialog-button', note: 'Built for the toolbar slot' },
      { id: 'ai:ai-chip-quick', note: 'Built for the suggestions slot' },
      { id: 'ui:textarea', note: 'Non-AI multi-line input' },
    ],
    examples: [{ title: 'Composer with toolbar', code: '<AIInputCard\n  onSubmit={send}\n  busy={generating}\n  toolbar={<AIDialogButton icon={<Paperclip />} aria-label="Attach a file" />}\n  suggestions={<AIChipQuick label="Find at-risk accounts" onClick={compose} />}\n/>' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted'],
      aiBehavior: ['Suggest'],
      accountability: ['Attribution'],
      humanGestureRequired: true,
      reversible: 'always',
    },
  },

  'ai-response': {
    tier: 'groups', category: 'AI', status: 'stable',
    intent: 'One AI turn, assembled so attribution, progress and recourse are present by construction.',
    description: 'patterns/ai-response.json as a component. Renders the required parts in the required order — header, optional work note, body or loading indicator, actions, feedback — so the pattern cannot be composed wrongly.',
    whenToUse: ['Any AI response in a thread or panel', 'Whenever you would otherwise hand-assemble header, body and feedback', 'Streaming responses, via the streaming prop'],
    whenNotToUse: [
      'Human messages',
      'A consequential approval — use ai:ai-approval-card, which carries the confidence and rationale slots',
      'When you need a different part order; that order is the point',
    ],
    anatomy: [
      { part: 'Surface', role: 'ai:ai-soft-surface as a labelled region. Skipped when bare.' },
      { part: 'Header', role: 'ai:ai-message-header. Always first.' },
      { part: 'Work note', role: 'Optional ai:ai-agent-work-note, collapsed' },
      { part: 'Body or loader', role: 'ai:ai-message-body, or ai:ai-loading-indicators while loading' },
      { part: 'Footer', role: 'Optional ai:ai-message-footer actions' },
      { part: 'Feedback', role: 'ai:ai-feedback-bar unless suppressed' },
    ],
    states: [
      { name: 'Loading', trigger: 'loading', note: 'Announcing loading indicator replaces the body; actions and feedback withheld until there is something to act on' },
      { name: 'Streaming', trigger: 'streaming', note: 'Body becomes a polite live region' },
      { name: 'Complete', trigger: 'Neither', note: 'Body, actions and feedback all present' },
      { name: 'Bare', trigger: 'bare', note: 'No surface wash — for a thread already marked as AI' },
    ],
    a11y: {
      role: 'region', handledByRadix: false,
      keyboard: ['Tab through actions and feedback controls'],
      requiredAttributes: ['agentLabel'],
      liveRegion: 'Loading announces politely; the body becomes a live region while streaming',
      notes: [
        'The region is labelled "Response from {agentLabel}", so a screen-reader user can identify and skip it.',
        'Actions and feedback are withheld while loading — offering them before there is output invites acting on nothing.',
        'The part order is fixed. Attribution before content is the property this component exists to guarantee.',
      ],
    },
    agentRules: [
      'Prefer this over hand-assembling the parts — the order is the safety property.',
      'Set streaming only while text is arriving.',
      'Use bare only where the containing thread already marks AI authorship.',
      'Set showFeedback false only when feedback genuinely has nowhere to go.',
    ],
    forbiddenUsage: ['Human messages', 'Reordering the parts', 'Consequential approvals'],
    related: [
      { id: 'ai:ai-approval-card', note: 'Consequential decisions' },
      { id: 'ai:ai-message-header', note: 'The parts, used directly' },
    ],
    examples: [{ title: 'A turn', code: '<AIResponse\n  agentLabel="Research agent"\n  timestamp="Just now"\n  loading={isLoading}\n  streaming={isStreaming}\n  onCopy={copy}\n>\n  <p>{text}</p>\n</AIResponse>' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest'],
      accountability: ['Attribution', 'Rationale disclosure'],
      humanGestureRequired: false,
      reversible: 'not-applicable',
    },
  },

  'ai-approval-card': {
    tier: 'groups', category: 'AI', status: 'beta',
    intent: 'A consequential proposal, and the human decision about it, in an order that cannot be got wrong.',
    description: 'patterns/ai-approval-flow.json as a component. Attribution, then the proposal, then confidence, then rationale, then the actions — and only then.',
    whenToUse: [
      'Any AI proposal a human must approve',
      'Agent-initiated changes to shared or outward-facing state',
      'Anywhere an agent needs authority it does not have',
    ],
    whenNotToUse: [
      'Informational responses — use ai:ai-response',
      'Trivial reversible actions, where the ceremony is friction for nothing',
      'Destructive operations on their own; pair with ui:alert-dialog for the final confirmation',
    ],
    anatomy: [
      { part: 'Surface', role: 'ai:ai-soft-surface, tone mixed when review is required' },
      { part: 'Header', role: 'ai:ai-message-header — who proposes this' },
      { part: 'Proposal', role: 'What the agent wants to do, stated plainly' },
      { part: 'Confidence', role: 'ai:ai-confidence-risk-badge. Omit entirely when unknown.' },
      { part: 'Rationale', role: 'ai:ai-why-this-link. Omit when there is nothing behind it.' },
      { part: 'Actions', role: 'ai:ai-action. Last in reading order, deliberately.' },
      { part: 'Error', role: 'role="alert" message beneath, when status is error' },
    ],
    states: [
      { name: 'Proposed', trigger: 'status="default"', note: 'Awaiting the human' },
      { name: 'Requires review', trigger: 'requiresReview', note: 'Mixed surface tone and the review signal above the actions' },
      { name: 'Applying', trigger: 'status="loading"', note: 'Primary spins; alternatives disable' },
      { name: 'Applied', trigger: 'status="complete"', note: 'Primary shows a check' },
      { name: 'Blocked', trigger: 'status="disabled"', note: 'Required information not yet present' },
      { name: 'Failed', trigger: 'status="error"', note: 'Destructive primary plus an announced errorMessage' },
    ],
    a11y: {
      role: 'region', handledByRadix: false,
      keyboard: ['Tab reaches rationale, then the actions'],
      requiredAttributes: ['agentLabel', 'proposal', 'primaryLabel'],
      liveRegion: 'errorMessage is role="alert"',
      notes: [
        'The order is the accessibility property. A user who tabs straight to the primary button has still passed the confidence badge and the rationale link in reading order.',
        'The region is labelled "Approval requested by {agentLabel}".',
        'There is no autoApply prop, and adding one would violate AI_RULE_NO_SILENT_APPLY. Nothing fires without a human gesture.',
        'Omitting confidence is correct when the model produced none. The component renders no badge rather than a default.',
      ],
    },
    agentRules: [
      'Never auto-fire. There is no prop for it, and there must not be.',
      'Omit confidence when the model produced none — never pass a guess.',
      'Wire onWhyThis to real reasoning, or omit it.',
      'Set requiresReview for anything consequential.',
      'On failure, always supply errorMessage saying what to do next.',
      'Pair with ui:alert-dialog when the approved action is also destructive.',
    ],
    forbiddenUsage: [
      'Auto-applying on mount',
      'Invented confidence values',
      'A rationale link with nothing behind it',
      'An error state with no explanation',
      'Use for informational responses',
    ],
    related: [
      { id: 'ai:ai-response', note: 'Informational turns' },
      { id: 'ai:ai-action', note: 'The decision row alone' },
      { id: 'ui:alert-dialog', note: 'Final confirmation for destructive actions' },
    ],
    examples: [{ title: 'Territory change', code: '<AIApprovalCard\n  agentLabel="Planning agent"\n  proposal="Move 14 accounts from the West region to Central to balance quota coverage."\n  confidence="medium"\n  risk="high"\n  requiresReview\n  onWhyThis={openRationale}\n  primaryLabel="Approve territory change"\n  secondaryLabel="Edit first"\n  tertiaryLabel="Dismiss"\n  onPrimary={approve}\n/>' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'AI Led'],
      aiBehavior: ['Confirm', 'Apply', 'Approve'],
      accountability: ['Attribution', 'Rationale disclosure', 'Confidence signalling', 'Approval', 'Audit trail', 'Reversibility'],
      humanGestureRequired: true,
      reversible: 'conditional',
    },
  },
}

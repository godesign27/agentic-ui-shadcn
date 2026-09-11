/**
 * Curated metadata — the AI namespace.
 *
 * Every entry here MUST carry experienceMetadata; the manifest schema
 * requires it for namespace "ai". That block is the whole point of the
 * namespace: it declares how much autonomy the component grants the machine
 * and what accountability it therefore owes the human.
 *
 * Escalating aiBehavior without escalating accountability is the specific
 * failure this metadata exists to prevent.
 */

// Shorthands for the common accountability postures.
const SUGGEST = {
  experienceMode: ['AI Assisted', 'Adaptive'],
  aiBehavior: ['Suggest'],
  accountability: ['Attribution'],
  humanGestureRequired: false,
  reversible: 'not-applicable',
}

export const ai = {

  'ai-avatar': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'The mark that tells a user a machine is speaking.',
    description: 'Three concentric BRAND-blue circles with a white monogram. Exported at two sizes: AIAvatar (34px, with a glow) for hero identity, BotAvatar (18px, no glow) for inline attribution. Identical artwork; only size and shadow differ.',
    whenToUse: ['Agent identity at the top of an AI surface', 'Inline attribution in ai:ai-message-header', 'Inside ai:ai-launcher and ai:ai-agent-stack'],
    whenNotToUse: [
      'As a human user avatar — use ui:avatar, and keep the two visually distinct',
      'Decoratively, anywhere that is not AI-generated',
      'Recoloured to match a surface — the fixed palette is what makes it recognisable',
    ],
    anatomy: [
      { part: 'Outer ring', role: '#B4BDFF — the lightest circle, r=17' },
      { part: 'Middle ring', role: '#5A6DFF — the BRAND blue, r=13' },
      { part: 'Inner disc', role: '#1F2A66 — the dark core, r=9' },
      { part: 'Monogram', role: 'White, 9px, semibold. One character.' },
    ],
    states: [
      { name: 'Hero', trigger: 'AIAvatar', note: '34px with drop-shadow(0 4px 14px rgba(90,109,255,0.45))' },
      { name: 'Inline', trigger: 'BotAvatar', note: '18px, no shadow. Same circles.' },
      { name: 'Labelled', trigger: 'label prop set', note: 'role="img" with an accessible name' },
      { name: 'Decorative', trigger: 'no label', note: 'aria-hidden — correct when an adjacent text label names the agent' },
    ],
    a11y: {
      role: 'img', handledByRadix: false,
      keyboard: [],
      requiredAttributes: ['label, unless an adjacent visible text label already names the agent'],
      notes: [
        'Without a label the SVG is aria-hidden, which is right when it sits beside the agent name in ai:ai-message-header.',
        'Standing alone — in ai:ai-agent-stack, say — it must carry a label naming the agent and its status.',
        'The fixed fills are chosen for contrast against both light and dark chrome. Do not recolour them to "fix" dark mode.',
      ],
    },
    agentRules: [
      'The palette is fixed. No currentColor, no dark: variants, no theme tokens, no gradient ring.',
      'Both exports share the same artwork — only size and glow differ.',
      'Label it when it stands alone; leave it aria-hidden beside a visible agent name.',
      'Never use it for a human user.',
    ],
    forbiddenUsage: ['Recolouring the rings', 'Adding a gradient or orange ring', 'Using it as a human avatar', 'Decorative use on non-AI surfaces'],
    related: [{ id: 'ui:avatar', note: 'Human users' }, { id: 'ai:ai-message-header', note: 'The usual host' }, { id: 'ai:ai-agent-stack', note: 'Several agents at once' }],
    examples: [
      { title: 'Inline attribution', code: '<BotAvatar size={20} />\n<span className="text-sm font-semibold">Research agent</span>' },
      { title: 'Standing alone', code: '<AIAvatar label="Research agent" />' },
    ],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest'],
      accountability: ['Attribution'],
      humanGestureRequired: false,
      reversible: 'not-applicable',
    },
  },

  'ai-soft-surface': {
    tier: 'atoms', category: 'AI', status: 'beta',
    intent: 'The wash that says everything inside this boundary was machine-generated.',
    description: 'A tinted container using the --ai-surface scale. The primary non-textual attribution affordance for a region of AI output.',
    whenToUse: ['Wrapping an AI response, recommendation or generated draft', 'Marking an agent-driven region inside an otherwise human-authored page', 'As the canvas for an ai-approval-flow'],
    whenNotToUse: [
      'As a general card — use ui:card',
      'Decoratively, for visual interest',
      'Around human-authored content, ever — it would falsely attribute it to a machine',
      'Nested inside another soft surface; one boundary per region',
    ],
    anatomy: [{ part: 'Root', role: 'The tinted container. Everything inside is understood to be AI-generated.' }],
    variantGuidance: {
      ai: 'The default. Blue wash, the AI identity.',
      neutral: 'Low emphasis, for a secondary AI region on a busy page.',
      mixed: 'Blue into signal — use when the region contains something awaiting review.',
    },
    states: [
      { name: 'Subtle', trigger: 'intensity="subtle"', note: 'Flat --ai-surface. The everyday choice.' },
      { name: 'Medium', trigger: 'intensity="medium"', note: 'Gradient into the accent at 10%' },
      { name: 'Expressive', trigger: 'intensity="expressive"', note: 'Three-stop gradient. Hero surfaces only.' },
      { name: 'Raised', trigger: 'elevation="soft"', note: 'Adds shadow-sm' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: [],
      requiredAttributes: [],
      notes: [
        'A tinted background is invisible to screen readers. The visual wash is NOT sufficient attribution on its own.',
        'Always pair it with text attribution — ai:ai-message-header, or an aria-label on the region.',
        'Contrast: --ai-surface is deliberately close to the page background, so any text inside still needs a foreground token, never a lightened one.',
      ],
    },
    agentRules: [
      'Never wrap human-authored content in it.',
      'The wash is not attribution by itself — pair it with ai:ai-message-header or a labelled region.',
      'One surface per region. Do not nest.',
      'Reserve expressive intensity for hero surfaces.',
    ],
    forbiddenUsage: ['Wrapping human-authored content', 'Decorative use', 'Nested soft surfaces', 'As a replacement for ui:card'],
    related: [{ id: 'ui:card', note: 'Human-authored containers' }, { id: 'ai:ai-message-header', note: 'The text attribution it needs' }],
    examples: [{ title: 'Attributed AI region', code: '<AISoftSurface className="space-y-3 p-4" role="region" aria-label="AI recommendation">\n  <AIMessageHeader agentLabel="Research agent" timestamp="Just now" />\n  <AIMessageBody>Three accounts match your criteria.</AIMessageBody>\n</AISoftSurface>' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest'],
      accountability: ['Attribution'],
      humanGestureRequired: false,
      reversible: 'not-applicable',
    },
  },

  'ai-button': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'Commit to something a machine proposed.',
    description: 'The AI call to action. Gradient primary, outlined secondary, ghost tertiary. Status is part of the contract: loading, complete and error are visual states the caller drives from real work.',
    whenToUse: ['Accepting, applying or regenerating AI output', 'Inside ai:ai-action and ai:ai-message-footer', 'Any button whose action originates from a machine suggestion'],
    whenNotToUse: [
      'Standard product actions — use ui:button',
      'As a decorative gradient button; the gradient means "AI proposed this"',
      'Where three or more would appear in one row — see AI_RULE_MAX_THREE_ACTIONS',
    ],
    anatomy: [
      { part: 'Root', role: 'The button. Disabled automatically while status is loading.' },
      { part: 'Status icon', role: 'Spinner, check or alert, swapped by status' },
      { part: 'Label', role: 'A verb naming the outcome' },
    ],
    variantGuidance: {
      primary: 'The gradient. One per action row.',
      secondary: 'Outlined. Review, edit, or an alternative path.',
      tertiary: 'Ghost. Dismiss, skip, cancel.',
    },
    sizeGuidance: { sm: '32px. Message footers and dense rows.', md: '40px. The default.', lg: '48px. Hero approval surfaces.' },
    states: [
      { name: 'Default', trigger: 'status="default"', note: 'Gradient from --ai-accent to --ai-accent-strong' },
      { name: 'Loading', trigger: 'status="loading"', note: 'Spinner, aria-busy, and the button is disabled so a double-click cannot fire twice' },
      { name: 'Complete', trigger: 'status="complete"', note: 'Check icon on the active fill' },
      { name: 'Error', trigger: 'status="error"', note: 'Destructive fill with an alert icon. Say what failed nearby.' },
      { name: 'Disabled', trigger: 'disabled', note: 'opacity-45, pointer-events-none' },
    ],
    a11y: {
      role: 'button', handledByRadix: false,
      keyboard: ['Enter — activate', 'Space — activate'],
      requiredAttributes: ['label is required — there is no icon-only form'],
      notes: [
        'status="loading" sets aria-busy and disables the button, so the action cannot be double-fired.',
        'The status icon is aria-hidden; the label must change to carry the meaning ("Applying…", "Applied").',
        'The error state colours the button but does not explain the failure. Render the reason adjacent.',
      ],
    },
    agentRules: [
      'Only for actions originating from AI output. Standard actions use ui:button.',
      'status must track real work — never animate loading to simulate effort.',
      'Change the label with the status; the icon alone is not announced.',
      'On error, say what failed and what the user can do next.',
    ],
    forbiddenUsage: ['Use on standard product actions', 'Simulated loading', 'Error state with no explanation'],
    related: [{ id: 'ui:button', note: 'Standard actions' }, { id: 'ai:ai-action', note: 'The full decision row' }],
    examples: [{ title: 'Apply with status', code: '<AIButton\n  label={applying ? "Applying…" : "Apply recommendation"}\n  status={applying ? "loading" : "default"}\n  onClick={apply}\n/>' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Confirm', 'Apply'],
      accountability: ['Attribution', 'Approval'],
      humanGestureRequired: true,
      reversible: 'conditional',
    },
  },

  'ai-action': {
    tier: 'atoms', category: 'AI', status: 'beta',
    intent: 'The decision point at the end of every AI recommendation. Primary confirms, secondary reviews, tertiary dismisses.',
    description: 'The compact action row closing an AI recommendation, assignment, approval or next-best-action. At most three choices, an optional review signal, and loading, complete, disabled and error states.',
    whenToUse: [
      'At the end of an AI recommendation or approval card',
      'After a generated draft — use draft, edit draft, regenerate',
      'When an agent needs a human to confirm before it proceeds',
      'In AI Assisted panels where the human stays in control',
    ],
    whenNotToUse: [
      'Standard product actions that are not AI-generated',
      'As a generic button group',
      'With more than three visible actions',
      'When no decision is actually being requested',
    ],
    anatomy: [
      { part: 'Review signal', role: 'The signal-coloured pill. Renders above the row so it is read before the buttons.' },
      { part: 'Primary', role: 'Gradient. The recommended next step.' },
      { part: 'Secondary', role: 'Outlined. Review, edit, an alternative. Optional.' },
      { part: 'Tertiary', role: 'Ghost. Dismiss or skip. Optional.' },
    ],
    states: [
      { name: 'Default', trigger: 'status="default"', note: 'All actions live' },
      { name: 'Loading', trigger: 'status="loading"', note: 'Primary shows a spinner; secondary and tertiary disable so the decision cannot change mid-flight' },
      { name: 'Complete', trigger: 'status="complete"', note: 'Primary shows a check' },
      { name: 'Disabled', trigger: 'status="disabled"', note: 'All actions inert — required information is not yet present' },
      { name: 'Error', trigger: 'status="error"', note: 'Primary renders destructive. The failure reason belongs adjacent.' },
      { name: 'Requires review', trigger: 'requiresReview', note: 'Signal pill renders above the row, before the buttons in DOM order' },
    ],
    a11y: {
      role: 'group', handledByRadix: false,
      keyboard: ['Tab between actions', 'Enter or Space to activate'],
      requiredAttributes: ['A verb label on every action'],
      liveRegion: 'The review pill is role="status" — a standing condition, not an interruption.',
      notes: [
        'The review signal precedes the buttons in DOM order, so a screen-reader user meets the warning before the action.',
        'Nothing here fires on mount. A human gesture is required — auto-applying is a critical violation.',
        'Secondary and tertiary disable during loading so the user cannot change the decision while it is executing.',
      ],
    },
    agentRules: [
      'Never auto-fire. A human gesture is always required.',
      'Three visible actions maximum. A fourth belongs in an overflow menu.',
      'When requiresReview is set, the signal must render before the row — do not reorder it.',
      'Label with verbs naming the outcome: "Approve territory change", not "OK".',
      'Pair with ai:ai-confidence-risk-badge and ai:ai-why-this-link so the user can judge before deciding.',
    ],
    forbiddenUsage: [
      'Standard product actions that are not AI-generated',
      'A generic button replacement',
      'More than three visible actions',
      'Rendering when no decision is being requested',
      'Auto-applying on mount',
    ],
    related: [
      { id: 'ai:ai-button', note: 'The individual button' },
      { id: 'ai:ai-confidence-risk-badge', note: 'Show certainty before asking for a decision' },
      { id: 'ai:ai-why-this-link', note: 'Show reasoning before asking for a decision' },
      { id: 'ui:alert-dialog', note: 'Destructive confirmations still need one' },
    ],
    examples: [
      { title: 'Recommendation', code: '<AIAction\n  primaryLabel="Apply recommendation"\n  secondaryLabel="Review details"\n  tertiaryLabel="Dismiss"\n  onPrimary={apply}\n/>' },
      { title: 'Approval with review', code: '<AIAction\n  primaryLabel="Approve territory change"\n  secondaryLabel="Edit first"\n  requiresReview\n  size="lg"\n  onPrimary={approve}\n/>' },
    ],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest', 'Confirm', 'Apply', 'Approve'],
      accountability: ['Attribution', 'Approval', 'Audit trail', 'Rationale disclosure'],
      humanGestureRequired: true,
      reversible: 'conditional',
    },
  },

  'ai-confidence-risk-badge': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'State how sure the model is and how much is at stake, before the human decides.',
    description: 'A labelled confidence level with an optional risk level, plus stale-data and missing-source indicators. The bar is decorative; the text is the value.',
    whenToUse: ['Beside any AI output a human will act on', 'In an approval flow, before ai:ai-action', 'Wherever the cost of the model being wrong is non-trivial'],
    whenNotToUse: [
      'When the model did not produce a confidence value — omit it rather than inventing one',
      'On trivial output where the badge is noise',
      'As a generic status badge — use ui:badge',
    ],
    anatomy: [
      { part: 'Confidence bar', role: 'Decorative fill at 90 / 55 / 20 percent. aria-hidden.' },
      { part: 'Confidence label', role: 'The accessible value: "High confidence"' },
      { part: 'Risk label', role: 'Optional. Low, medium or high.' },
      { part: 'Stale chip', role: 'Signal-coloured. The underlying data may be out of date.' },
      { part: 'Missing source chip', role: 'Destructive. The claim has no citation.' },
    ],
    states: [
      { name: 'High', trigger: 'confidence="high"', note: 'Green, bar at 90%' },
      { name: 'Medium', trigger: 'confidence="medium"', note: 'Amber, bar at 55%' },
      { name: 'Low', trigger: 'confidence="low"', note: 'Red, bar at 20%' },
      { name: 'Stale data', trigger: 'staleData', note: 'Clock chip appended' },
      { name: 'Missing source', trigger: 'missingSource', note: 'Info chip appended' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: [],
      requiredAttributes: [],
      notes: [
        'The bar is aria-hidden. Every level has a text label, so confidence is never colour-only.',
        'The three confidence colours are green, amber and red — do not rely on them alone for users who cannot distinguish them. The labels are the contract.',
      ],
    },
    agentRules: [
      'Never render a confidence value the model did not produce. Absent means absent, not high.',
      'Never map a model probability onto a level without documenting the thresholds.',
      'Show it before the decision, not after.',
      'missingSource is a claim about the output, not a UI state — only set it when true.',
    ],
    forbiddenUsage: ['Invented confidence values', 'Colour without the text label', 'Use as a generic status badge'],
    related: [{ id: 'ai:ai-why-this-link', note: 'The reasoning behind the number' }, { id: 'ai:ai-action', note: 'The decision it informs' }, { id: 'ui:badge', note: 'Generic status' }],
    examples: [{ title: 'Before a decision', code: '<AIConfidenceRiskBadge confidence="medium" risk="high" staleData />\n<AIAction primaryLabel="Approve" secondaryLabel="Review" requiresReview />' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest'],
      accountability: ['Attribution', 'Confidence signalling', 'Rationale disclosure'],
      humanGestureRequired: false,
      reversible: 'not-applicable',
    },
  },

  'ai-why-this-link': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'Make the reasoning reachable in one interaction.',
    description: 'The rationale disclosure entry point. Five variants — why this, view rationale, view sources, view assumptions, explain risk — each with its own icon and default label.',
    whenToUse: ['Beside any AI output the user may question', 'In an approval flow, so reasoning precedes the decision', 'Wherever a citation or assumption underlies a claim'],
    whenNotToUse: [
      'When there is no rationale to show — an unwired link promises transparency and does not deliver',
      'As a general help link — use ui:button variant="link"',
      'Where the explanation should simply be visible instead',
    ],
    anatomy: [{ part: 'Icon', role: 'Variant-specific, aria-hidden' }, { part: 'Label', role: 'The accessible name. Overridable.' }],
    variantGuidance: {
      'why-this': 'Generic rationale entry.',
      'view-rationale': 'Opens the full reasoning panel.',
      'view-sources': 'Opens the citation list.',
      'view-assumptions': 'Shows what the model assumed.',
      'explain-risk': 'Opens risk context. Pair with a high-risk badge.',
    },
    states: [{ name: 'Default', trigger: 'Rest', note: 'AI accent, underline on hover' }, { name: 'Focus-visible', trigger: 'Keyboard focus', note: 'ring-2 ring-ai-accent' }],
    a11y: {
      role: 'button', handledByRadix: false,
      keyboard: ['Enter or Space — activate'],
      requiredAttributes: ['A label — the default is used when none is given'],
      notes: [
        'Renders a button, not a link: it discloses in place rather than navigating.',
        'If it opens a panel, that panel must receive focus — otherwise a keyboard user activates it and nothing appears to happen.',
      ],
    },
    agentRules: [
      'Only render it when real rationale exists behind onClick.',
      'Move focus into whatever it opens.',
      'Its presence is what satisfies the Rationale disclosure obligation — do not claim that obligation without it.',
      'Place it before the decision, not after.',
    ],
    forbiddenUsage: ['Rendering with no rationale behind it', 'Opening a panel without moving focus', 'Use as a general help link'],
    related: [{ id: 'ai:ai-confidence-risk-badge', note: 'The number it explains' }, { id: 'ai:ai-text-link', note: 'General inline AI links' }],
    examples: [{ title: 'Rationale entry', code: '<AIWhyThisLink variant="view-sources" onClick={openSources} />' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest'],
      accountability: ['Rationale disclosure', 'Attribution'],
      humanGestureRequired: false,
      reversible: 'not-applicable',
    },
  },

  'ai-message-header': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'Establish who is speaking before the user reads a word.',
    description: 'Agent avatar, agent name and timestamp. Renders before the body, never after.',
    whenToUse: ['Above every AI response', 'At the top of a generated card or panel', 'Anywhere authorship could otherwise be ambiguous'],
    whenNotToUse: ['For human messages — build a separate header with ui:avatar', 'After the body', 'When ai:ai-soft-surface already carries a labelled region and a second attribution would be redundant'],
    anatomy: [
      { part: 'Avatar', role: 'ai:ai-avatar BotAvatar, aria-hidden because the name is adjacent' },
      { part: 'Agent label', role: 'The agent name. The accessible attribution.' },
      { part: 'Timestamp', role: 'Right-aligned. Pass undefined to hide.' },
    ],
    states: [{ name: 'Default', trigger: 'size="md"', note: '20px avatar, 14px label' }, { name: 'Compact', trigger: 'size="sm"', note: '16px avatar, 12px label' }],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: [],
      requiredAttributes: ['agentLabel'],
      notes: [
        'The avatar is aria-hidden because the agent name sits beside it — announcing both would be redundant.',
        'A relative timestamp like "Just now" goes stale. Prefer a <time dateTime> element supplied by the caller when the exact time matters.',
      ],
    },
    agentRules: [
      'Render before the body, always.',
      'Name the agent specifically — "Research agent", not "AI".',
      'This is what satisfies the Attribution obligation on a conversational surface.',
    ],
    forbiddenUsage: ['Rendering after the body', 'Use for human messages', 'A generic "AI" label where a specific agent name exists'],
    related: [{ id: 'ai:ai-message-body', note: 'What follows it' }, { id: 'ai:ai-avatar', note: 'The mark it uses' }],
    examples: [{ title: 'Standard', code: '<AIMessageHeader agentLabel="Research agent" timestamp="Just now" />' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive', 'AI Led'],
      aiBehavior: ['Suggest'],
      accountability: ['Attribution'],
      humanGestureRequired: false,
      reversible: 'not-applicable',
    },
  },

  'ai-message-body': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'AI prose, kept plain so the interface does not lend it authority the model has not earned.',
    description: 'The text body of an AI response. Three sizes. Sets a polite live region while streaming so assistive technology follows the update.',
    whenToUse: ['Any AI-generated prose', 'Streaming responses, with streaming set while text is arriving'],
    whenNotToUse: ['Human-authored content', 'Structured output like tables — use ui:table inside the region instead', 'Without a preceding ai:ai-message-header'],
    anatomy: [{ part: 'Root', role: 'The prose container. Paragraph spacing is handled; other formatting is not.' }],
    sizeGuidance: { sm: '14px. Dense panels.', md: '16px. The default.', lg: '18px. Hero responses.' },
    states: [
      { name: 'Static', trigger: 'streaming={false}', note: 'No live region' },
      { name: 'Streaming', trigger: 'streaming={true}', note: 'aria-live="polite" and aria-busy, so the update is announced without interrupting' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: [],
      requiredAttributes: [],
      liveRegion: 'aria-live="polite" while streaming',
      notes: [
        'Set streaming only while text is genuinely arriving. Leaving it on makes every later change announce.',
        'Announce completion too — a live region that stops updating tells the user nothing.',
        'Headings and bold inside a response make the model sound more certain than it is. Keep emphasis in the surrounding UI.',
      ],
    },
    agentRules: [
      'Always preceded by ai:ai-message-header.',
      'Set streaming only while text is arriving, and announce completion.',
      'Keep formatting plain.',
    ],
    forbiddenUsage: ['Human-authored content', 'A body with no header', 'Simulated typing delay on already-complete text'],
    related: [{ id: 'ai:ai-message-header', note: 'Required above it' }, { id: 'ai:ai-message-footer', note: 'Actions below it' }],
    examples: [{ title: 'Streaming response', code: '<AIMessageBody streaming={isStreaming}>\n  <p>{text}</p>\n</AIMessageBody>' }],
    experienceMetadata: SUGGEST,
  },

  'ai-message-footer': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'Where the user says yes to what the response offered.',
    description: 'An action row for a response. Capped at three; a fourth logs a development warning and is not rendered.',
    whenToUse: ['When a response affords a concrete action', 'Below ai:ai-message-body'],
    whenNotToUse: ['On purely informational responses', 'For approval of a consequential change — use ai:ai-action, which carries the review signal', 'With more than three actions'],
    anatomy: [{ part: 'Root', role: 'The action row. Renders nothing when actions is empty or visible is false.' }],
    states: [
      { name: 'Hidden', trigger: 'visible={false} or no actions', note: 'Renders null' },
      { name: 'Visible', trigger: 'actions present', note: 'First action defaults to primary, the rest to secondary' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: ['Tab between actions'],
      requiredAttributes: ['A verb label per action'],
      notes: ['Actions beyond the third are dropped, with a console warning in development. Do not rely on that truncation — cap it yourself.'],
    },
    agentRules: ['Three actions maximum.', 'Use ai:ai-action when the decision needs a review signal.', 'Label with verbs.'],
    forbiddenUsage: ['More than three actions', 'Consequential approval without a review signal'],
    related: [{ id: 'ai:ai-action', note: 'Approval decisions' }, { id: 'ai:ai-feedback-bar', note: 'Sentiment, not actions' }],
    examples: [{ title: 'Draft actions', code: '<AIMessageFooter actions={[\n  { label: "Use draft", onClick: use },\n  { label: "Edit draft", onClick: edit },\n  { label: "Regenerate", variant: "tertiary", onClick: regen },\n]} />' }],
    experienceMetadata: {
      experienceMode: ['AI Assisted', 'Adaptive'],
      aiBehavior: ['Confirm', 'Apply'],
      accountability: ['Attribution', 'Approval'],
      humanGestureRequired: true,
      reversible: 'conditional',
    },
  },

  'ai-feedback-bar': {
    tier: 'atoms', category: 'AI', status: 'stable',
    intent: 'Let the human correct the record.',
    description: 'Like, dislike, copy and optional share. Every control is icon-only and therefore carries an accessible name.',
    whenToUse: ['After every substantive AI response', 'Wherever sentiment would improve future output'],
    whenNotToUse: ['When the feedback goes nowhere — a bar that discards input is a lie about listening', 'On trivial responses', 'More than once per response'],
    anatomy: [
      { part: 'Thumbs up', role: 'aria-pressed reflects the current sentiment' },
      { part: 'Thumbs down', role: 'aria-pressed reflects the current sentiment' },
      { part: 'Copy', role: 'Swaps to a check for 1.5s and announces via a status region' },
      { part: 'Share', role: 'Rendered only when onShare is supplied' },
    ],
    states: [
      { name: 'Neutral', trigger: 'sentiment={null}', note: 'Both thumbs muted' },
      { name: 'Positive', trigger: 'sentiment="up"', note: 'Thumbs up in the AI accent, aria-pressed' },
      { name: 'Negative', trigger: 'sentiment="down"', note: 'Thumbs down in destructive, aria-pressed' },
      { name: 'Copied', trigger: 'After copy', note: 'Check icon and a status announcement for 1.5s' },
    ],
    a11y: {
      role: 'none', handledByRadix: false,
      keyboard: ['Tab between controls', 'Enter or Space to activate'],
      requiredAttributes: ['aria-label on every control — supplied by the component'],
      notes: [
        'Thumbs use aria-pressed so the current sentiment is announced, not just shown.',
        'The copy confirmation goes through a role="status" region — the icon swap alone is invisible to screen readers.',
      ],
    },
    agentRules: ['Wire the handlers to something real.', 'One bar per response.', 'Reflect the stored sentiment through the sentiment prop so it survives a re-render.'],
    forbiddenUsage: ['Feedback that is discarded', 'Multiple bars per response', 'Removing the accessible names'],
    related: [{ id: 'ai:ai-message-footer', note: 'Actions rather than sentiment' }],
    examples: [{ title: 'After a response', code: '<AIFeedbackBar sentiment={sentiment} onSentiment={record} onCopy={copy} />' }],
    experienceMetadata: SUGGEST,
  },
}

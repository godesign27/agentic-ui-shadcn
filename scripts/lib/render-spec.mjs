/**
 * Renders {name}.md — the narrative mirror spec.
 *
 * Section order matches the core governance contract:
 * header block, Purpose, Source, When to use / not to use, Anatomy,
 * Variants, States, Props, Tokens, Accessibility, Examples, Agent rules, Related.
 */

const esc = s => String(s)

function table(headers, rows) {
  if (!rows.length) return ''
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map(r => `| ${r.join(' | ')} |`),
  ].join('\n')
}

export function renderSpec(facts, meta, { generatedAt }) {
  const cva = facts.cva.find(c => Object.keys(c.groups).length) || { groups: {}, defaults: {} }
  const title = facts.exports[0]
  const specDir = `${facts.namespace}/${facts.name}`
  const L = []

  L.push(`# ${title}`)
  L.push('')
  L.push(`**Version:** 1.0  `)
  L.push(`**Last Updated:** ${generatedAt.slice(0, 10)}  `)
  L.push(`**Owner:** Design System — ${facts.namespace === 'ai' ? 'AI' : 'shadcn/ui'}  `)
  L.push(`**Tier:** ${meta.tier}  `)
  L.push(`**Component id:** \`${facts.id}\`  `)
  L.push(`**Category:** ${meta.category}  `)
  L.push(`**Status:** ${meta.status[0].toUpperCase() + meta.status.slice(1)}  `)
  if (facts.radixPrimitive) L.push(`**Primitive:** \`${facts.radixPrimitive}\`  `)
  L.push(`**Import:** \`@/components/${facts.namespace}/${facts.name}\`  `)
  if (facts.internalDeps.length) L.push(`**Depends on:** ${facts.internalDeps.map(d => `\`${d}\``).join(', ')}  `)
  L.push('')

  L.push('## Purpose')
  L.push('')
  L.push(meta.intent)
  L.push('')
  L.push(meta.description)
  L.push('')

  if (meta.experienceMetadata) {
    const em = meta.experienceMetadata
    L.push('## Experience metadata')
    L.push('')
    L.push('This component grants the machine a specific degree of autonomy, and therefore owes the human a specific set of guarantees. Both are enforced — see `VALIDATE_AI_ACCOUNTABILITY`.')
    L.push('')
    L.push(table(['Axis', 'Value'], [
      ['Experience mode', em.experienceMode.join(' · ')],
      ['AI behavior', em.aiBehavior.join(' · ')],
      ['Accountability', em.accountability.join(' · ')],
      ['Human gesture required', em.humanGestureRequired ? 'Yes — no state may change without one' : 'No'],
      ['Reversible', em.reversible],
    ]))
    L.push('')
  }

  L.push('## Source')
  L.push('')
  L.push(table(['Path', 'Role'], [
    [`\`${facts.file}\``, '**Canonical implementation.** Authoritative on any conflict.'],
    [`\`design-system/components/${specDir}/${facts.name}.md\``, 'This mirror spec'],
    [`\`design-system/components/${specDir}/${facts.name}.agent.json\``, 'Structured agent contract'],
    [`\`design-system/components/${specDir}/agentic-prompt.md\``, 'Copy-paste agent prompt'],
    [`\`design-system/components/${specDir}/${facts.name}.preview.html\``, 'Visual proof of every documented state'],
  ]))
  L.push('')

  L.push('## When to use')
  L.push('')
  meta.whenToUse.forEach(w => L.push(`- ${w}`))
  L.push('')

  L.push('## When not to use')
  L.push('')
  meta.whenNotToUse.forEach(w => L.push(`- ${w}`))
  L.push('')

  L.push('## Anatomy')
  L.push('')
  if (meta.compound) {
    L.push(`\`${meta.compound.root}\` is the root. Parts must nest as declared — a part outside its required parent is a structural violation, not a styling choice.`)
    L.push('')
    L.push(table(['Part', 'Parent', 'Required', 'Notes'], meta.compound.parts.map(p => [
      `\`${p.name}\``,
      p.parent ? `\`${p.parent}\`` : '—',
      p.required ? 'Yes' : 'No',
      p.note || '',
    ])))
  } else if (meta.anatomy) {
    L.push(table(['Part', 'Role'], meta.anatomy.map(a => [`**${a.part}**`, a.role])))
  }
  L.push('')

  if (meta.variantGuidance) {
    L.push('## Variants')
    L.push('')
    L.push(table(['Variant', 'When to use it'], Object.entries(meta.variantGuidance).map(([k, v]) => [`\`${k}\``, v])))
    L.push('')
  }

  if (meta.sizeGuidance) {
    L.push('## Sizes')
    L.push('')
    L.push(table(['Size', 'Guidance'], Object.entries(meta.sizeGuidance).map(([k, v]) => [`\`${k}\``, v])))
    L.push('')
  }

  if (meta.states?.length) {
    L.push('## States')
    L.push('')
    L.push(table(['State', 'Trigger', 'Treatment'], meta.states.map(s => [`**${s.name}**`, `\`${s.trigger}\``, s.note])))
    L.push('')
  }

  L.push('## Props API')
  L.push('')
  const propRows = []
  for (const [group, values] of Object.entries(cva.groups)) {
    propRows.push([
      `\`${group}\``,
      values.map(v => `\`"${v}"\``).join(' \\| '),
      cva.defaults[group] ? `\`"${cva.defaults[group]}"\`` : '—',
      `Declared in \`${cva.helper}\``,
    ])
  }
  if (facts.asChild) propRows.push(['`asChild`', '`boolean`', '`false`', 'Render the child element instead, merging props and styles'])
  propRows.push(['`className`', '`string`', '—', 'Merged via `cn()`. Layout only — never to override an existing variant'])
  propRows.push([`\`...props\``, `\`React.ComponentProps\``, '—', `All native props pass through${facts.forwardsRef ? '. Ref is forwarded to the root.' : ''}`])
  L.push(table(['Prop', 'Type', 'Default', 'Notes'], propRows))
  L.push('')
  L.push(`Full contract, including every compound part: [\`${facts.name}.agent.json\`](${facts.name}.agent.json)`)
  L.push('')

  L.push('## Tokens')
  L.push('')
  if (facts.tokens.length) {
    L.push('Consumed from the semantic contract in [`design-system/tokens/semantic.json`](../../../tokens/semantic.json). Never a raw colour, never a Tailwind palette utility.')
    L.push('')
    L.push(table(['Token', 'Utilities in this component'], facts.tokens.map(t => [
      `\`${t}\``,
      facts.utilities.filter(u => u.endsWith(`-${t}`)).map(u => `\`${u}\``).join(', ') || '—',
    ])))
  } else {
    L.push('This component consumes no semantic colour tokens directly. It inherits from its parent surface, or its parts carry their own.')
  }
  L.push('')

  L.push('## Accessibility')
  L.push('')
  const a = meta.a11y
  const a11yRows = [['Role', `\`${a.role}\``]]
  if (a.handledByRadix) a11yRows.push(['Handled by Radix', '**Yes** — roles, ARIA and focus management come from the primitive. Do not re-implement them.'])
  if (a.focusManagement) a11yRows.push(['Focus management', a.focusManagement])
  if (a.liveRegion) a11yRows.push(['Live region', a.liveRegion])
  L.push(table(['Aspect', 'Contract'], a11yRows))
  L.push('')
  if (a.keyboard?.length) {
    L.push('**Keyboard**')
    L.push('')
    a.keyboard.forEach(k => L.push(`- ${k}`))
    L.push('')
  }
  if (a.requiredAttributes?.length) {
    L.push('**Required**')
    L.push('')
    a.requiredAttributes.forEach(r => L.push(`- ${r}`))
    L.push('')
  }
  if (a.notes?.length) {
    L.push('**Notes**')
    L.push('')
    a.notes.forEach(n => L.push(`- ${n}`))
    L.push('')
  }

  if (meta.examples?.length) {
    L.push('## Examples')
    L.push('')
    meta.examples.forEach(ex => {
      L.push(`### ${ex.title}`)
      L.push('')
      L.push('```tsx')
      L.push(ex.code)
      L.push('```')
      L.push('')
    })
  }

  L.push('## Agent rules')
  L.push('')
  meta.agentRules.forEach((r, i) => L.push(`${i + 1}. ${r}`))
  L.push('')

  if (meta.forbiddenUsage?.length) {
    L.push('### Forbidden')
    L.push('')
    L.push('Each of these is a hard failure. Reject the request rather than degrade.')
    L.push('')
    meta.forbiddenUsage.forEach(f => L.push(`- ${f}`))
    L.push('')
  }

  if (meta.gaps?.length) {
    L.push('## Gaps')
    L.push('')
    L.push('Known limitations. Honor them — do not assume the gap has since been filled.')
    L.push('')
    meta.gaps.forEach(g => L.push(`- ${g}`))
    L.push('')
  }

  if (meta.related?.length) {
    L.push('## Related components')
    L.push('')
    L.push(table(['Component', 'Use it instead when'], meta.related.map(r => [`\`${r.id}\``, r.note])))
    L.push('')
  }

  L.push('---')
  L.push('')
  L.push(`Reading order: [\`agentic-prompt.md\`](agentic-prompt.md) → [\`${facts.name}.agent.json\`](${facts.name}.agent.json) → this file → [\`${facts.file}\`](../../../../${facts.file})`)
  L.push('')

  return L.join('\n')
}

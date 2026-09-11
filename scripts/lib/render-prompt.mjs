/**
 * Renders agentic-prompt.md — the copy-paste entry point.
 *
 * Designed to be pasted whole into a fresh agent session (Cursor, Figma Make,
 * Claude Code) with no other context. Everything it needs is either here or
 * reachable from the read order it names.
 */

export function renderPrompt(facts, meta) {
  const title = facts.exports[0]
  const specDir = `design-system/components/${facts.dirName}/${facts.name}`
  const L = []

  L.push(`# Agentic Prompt — ${title}`)
  L.push('')
  L.push(`You are implementing **${title}** (\`${facts.id}\`) from the Agentic UI shadcn/ui design system.`)
  L.push('')
  L.push('---')
  L.push('')
  L.push('## Component')
  L.push('')
  L.push('| | |')
  L.push('|---|---|')
  L.push(`| **Id** | \`${facts.id}\` |`)
  L.push(`| **Status** | ${meta.status[0].toUpperCase() + meta.status.slice(1)} |`)
  L.push(`| **Tier / Category** | ${meta.tier} · ${meta.category} |`)
  L.push(`| **Import** | \`@/components/${facts.dirName}/${facts.name}\` |`)
  L.push(`| **Exports** | ${facts.exports.map(e => `\`${e}\``).join(', ')} |`)
  if (facts.radixPrimitive) L.push(`| **Primitive** | \`${facts.radixPrimitive}\` |`)
  L.push('')

  L.push('## What it is for')
  L.push('')
  L.push(`> ${meta.intent}`)
  L.push('')

  L.push('## Mandatory read order')
  L.push('')
  L.push('1. `/AGENT_RULES.md` — binding behavioral constraints')
  L.push('2. `/design-system/rules/forbidden.json` — hard failure states')
  if (facts.namespace === 'ai') {
    L.push('3. `/design-system/rules/ai-interaction.json` — **required for this namespace**')
    L.push(`4. \`${specDir}/${facts.name}.agent.json\` — props, variants, forbidden usage`)
    L.push(`5. \`${specDir}/${facts.name}.md\` — anatomy, tokens, examples`)
    L.push(`6. \`${facts.file}\` — canonical source, authoritative on conflict`)
  } else {
    L.push(`3. \`${specDir}/${facts.name}.agent.json\` — props, variants, forbidden usage`)
    L.push(`4. \`${specDir}/${facts.name}.md\` — anatomy, tokens, examples`)
    L.push(`5. \`${facts.file}\` — canonical source, authoritative on conflict`)
  }
  L.push('')

  L.push('## Critical facts — do not get these wrong')
  L.push('')
  meta.agentRules.slice(0, 5).forEach(r => L.push(`- ${r}`))
  L.push('')

  if (meta.compound) {
    L.push('### Structure is not optional')
    L.push('')
    L.push('```')
    const lines = []
    const walk = (parent, depth) => {
      meta.compound.parts.filter(p => p.parent === parent).forEach(p => {
        lines.push(`${'  '.repeat(depth)}${p.name}${p.required ? '' : '  (optional)'}`)
        walk(p.name, depth + 1)
      })
    }
    lines.push(meta.compound.root)
    walk(meta.compound.root, 1)
    // Parts with a null or multi parent are appended flat.
    meta.compound.parts
      .filter(p => p.parent && !meta.compound.parts.some(q => q.name === p.parent) && p.parent !== meta.compound.root)
      .forEach(p => lines.push(`  ${p.name}  (inside ${p.parent})`))
    L.push(lines.join('\n'))
    L.push('```')
    L.push('')
  }

  if (meta.experienceMetadata) {
    const em = meta.experienceMetadata
    L.push('### Accountability contract')
    L.push('')
    L.push(`This component operates at **${em.aiBehavior.join(' / ')}** level. Rendering it obliges you to provide:`)
    L.push('')
    em.accountability.forEach(x => L.push(`- **${x}**`))
    L.push('')
    if (em.humanGestureRequired) L.push('**No state may change without an explicit human gesture.** Auto-applying on render is a critical violation.')
    L.push('')
  }

  L.push('## Never')
  L.push('')
  ;(meta.forbiddenUsage || []).forEach(f => L.push(`- ${f}`))
  L.push('')

  L.push('## Task')
  L.push('')
  L.push(`Implement using \`${title}\` exactly as the contract declares. Use only the props, variants and sizes in \`${facts.name}.agent.json\`. Use only semantic tokens from \`design-system/tokens/semantic.json\`. Do not invent anything.`)
  L.push('')

  L.push('## If blocked')
  L.push('')
  L.push(`1. Open \`${facts.file}\` — the source settles every disagreement.`)
  L.push(`2. Open \`${specDir}/${facts.name}.preview.html\` — every documented state is rendered there.`)
  if (meta.related?.length) {
    L.push(`3. You may have the wrong component. Consider: ${meta.related.map(r => `\`${r.id}\` (${r.note})`).join(' · ')}`)
  }
  L.push('')
  L.push('If the thing you need is not in the contract, **reject and propose** — name the closest indexed alternative. Do not improvise.')
  L.push('')

  return L.join('\n')
}

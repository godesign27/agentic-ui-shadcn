#!/usr/bin/env node
/**
 * Build the design-system spec layer.
 *
 * For every component in src/components/{ui,ai}/, emits the four-file contract:
 *
 *   design-system/components/{ns}/{name}/
 *     {name}.md              narrative mirror spec
 *     {name}.agent.json      structured agent contract
 *     agentic-prompt.md      copy-paste agent entry point
 *     {name}.preview.html    visual proof surface
 *
 * Plus the indexes:
 *   design-system/components/agent-manifest.index.json
 *   design-system/components/preview/index.html
 *   components/COMPONENTS_INDEX.json
 *
 * Mechanical facts are parsed from source. Everything a parser cannot know
 * comes from scripts/metadata/. A manifest marked "curated": true is never
 * silently overwritten — see --force.
 *
 *   npm run ds:build          regenerate, preserving hand-edited manifests
 *   npm run ds:build -- --force   overwrite curated manifests too
 *   npm run ds:build -- --check   fail if anything is out of date (CI)
 */

import { mkdir, writeFile, readFile, access } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { extractAll } from './lib/extract-facts.mjs'
import { renderManifest } from './lib/render-manifest.mjs'
import { renderSpec } from './lib/render-spec.mjs'
import { renderPrompt } from './lib/render-prompt.mjs'
import { renderPreview } from './lib/render-preview.mjs'
import { metadata } from './metadata/index.mjs'
import { specimens } from './metadata/specimens.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const CHECK = args.includes('--check')
const generatedAt = new Date().toISOString()

const NAMESPACES = [
  { ns: 'ui', dir: join(repoRoot, 'src/components/ui') },
  { ns: 'ai', dir: join(repoRoot, 'src/components/ai') },
]

const exists = async p => { try { await access(p); return true } catch { return false } }

let written = 0, skipped = 0, stale = 0, missingMeta = []

async function emit(path, content, { protectHandEdits = false } = {}) {
  // Manifests are GENERATED from scripts/metadata/, which is where curation
  // lives — so "curated: true" on a manifest describes its content, not that
  // the file was typed by hand, and it does not block regeneration.
  //
  // A manifest a human edited in place marks itself with "handEdited": true.
  // Those are preserved, because regenerating would silently discard the edit.
  if (protectHandEdits && !FORCE && await exists(path)) {
    try {
      const current = JSON.parse(await readFile(path, 'utf8'))
      if (current.handEdited === true) {
        skipped++
        return
      }
    } catch {
      // Unparseable: fall through and overwrite with a valid manifest.
    }
  }
  if (CHECK) {
    // generatedAt changes on every run, so normalise it out — otherwise the
    // check reports every file as stale and tells CI nothing.
    const norm = t => t.replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z/g, 'TIMESTAMP')
                       .replace(/\*\*Last Updated:\*\* \d{4}-\d{2}-\d{2}/g, '**Last Updated:** DATE')
                       .replace(/Generated \d{4}-\d{2}-\d{2}/g, 'Generated DATE')
    if (!(await exists(path)) || norm(await readFile(path, 'utf8')) !== norm(content)) {
      stale++
      console.log(`  stale: ${path.replace(repoRoot + '/', '')}`)
    }
    return
  }
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content)
  written++
}

const manifestIndex = []
const inventory = []

for (const { ns, dir } of NAMESPACES) {
  if (!(await exists(dir))) continue
  const all = await extractAll(dir, ns)

  for (const facts of all) {
    const meta = metadata[facts.name]
    if (!meta) { missingMeta.push(facts.id); continue }

    const specDir = join(repoRoot, 'design-system/components', ns, facts.name)

    const manifest = renderManifest(facts, meta, { generatedAt })
    await emit(join(specDir, `${facts.name}.agent.json`), JSON.stringify(manifest, null, 2) + '\n', { protectHandEdits: true })
    await emit(join(specDir, `${facts.name}.md`), renderSpec(facts, meta, { generatedAt }))
    await emit(join(specDir, 'agentic-prompt.md'), renderPrompt(facts, meta))
    await emit(join(specDir, `${facts.name}.preview.html`), renderPreview(facts, meta, specimens[facts.name], { generatedAt }))

    manifestIndex.push({
      id: facts.id,
      name: manifest.name,
      namespace: ns,
      tier: meta.tier,
      category: meta.category,
      status: meta.status,
      mirrorSpec: `design-system/components/${ns}/${facts.name}/${facts.name}.md`,
      agentManifest: `design-system/components/${ns}/${facts.name}/${facts.name}.agent.json`,
      prompt: `design-system/components/${ns}/${facts.name}/agentic-prompt.md`,
      preview: `design-system/components/${ns}/${facts.name}/${facts.name}.preview.html`,
      source: facts.file,
    })

    inventory.push({
      id: facts.id,
      name: manifest.name,
      importPath: `@/components/${ns}/${facts.name}`,
      files: [facts.file],
      category: meta.category,
      tier: meta.tier,
      status: 'allowed',
      lifecycle: meta.status,
      exports: facts.exports,
      variants: manifest.variants,
      sizes: manifest.sizes,
      intent: meta.intent,
      spec: `design-system/components/${ns}/${facts.name}/`,
      forbiddenUsage: meta.forbiddenUsage || [],
      experienceMetadata: meta.experienceMetadata,
      gaps: meta.gaps || [],
    })
  }
}

manifestIndex.sort((a, b) => a.id.localeCompare(b.id))
inventory.sort((a, b) => a.id.localeCompare(b.id))

await emit(
  join(repoRoot, 'design-system/components/agent-manifest.index.json'),
  JSON.stringify({
    $schema: '../schemas/manifest-index.schema.json',
    schemaVersion: 1,
    description: 'Lookup from component id to its four spec files and its source. Regenerate with npm run ds:build.',
    generatedAt,
    count: manifestIndex.length,
    byNamespace: {
      ui: manifestIndex.filter(m => m.namespace === 'ui').length,
      ai: manifestIndex.filter(m => m.namespace === 'ai').length,
    },
    manifests: manifestIndex,
  }, null, 2) + '\n'
)

await emit(
  join(repoRoot, 'components/COMPONENTS_INDEX.json'),
  JSON.stringify({
    $schema: '../design-system/schemas/inventory.schema.json',
    version: '2.0.0',
    source: 'shadcn/ui + Agentic UI AI namespace',
    enforcement: 'closed-world',
    rule: 'Only ids listed here may be used. Anything absent must be rejected, not improvised. Each entry points at a spec folder containing the full contract.',
    generatedAt,
    count: inventory.length,
    components: inventory,
  }, null, 2) + '\n'
)

// COMPONENTS_INDEX.md — the human-readable inventory.
// This replaces a hand-maintained list that had drifted to 6 of 45 entries,
// which under the closed-world rule silently forbade 39 real components.
const mdIndex = [
  '# Components Index',
  '',
  'The **closed-world inventory**. Only components listed here may be used.',
  '',
  '> Generated from source by `npm run ds:build`. Do not hand-edit — edit `scripts/metadata/` instead.',
  '',
  `**${inventory.length} components** · ui ${inventory.filter(c => c.id.startsWith('ui:')).length} · ai ${inventory.filter(c => c.id.startsWith('ai:')).length}`,
  '',
  '## The rule',
  '',
  'If a component is not listed here it is **forbidden**. An agent asked for one must:',
  '',
  '1. State that it is not in the inventory',
  '2. Name the closest indexed alternatives by id',
  '3. Offer to compose the need from indexed parts',
  '',
  'Never improvise the missing component. See `/design-system/rules/forbidden.json#FORBID_UNINDEXED_COMPONENT`.',
  '',
  '## Every component has a contract',
  '',
  'Each entry below links to a folder holding four files: the narrative spec, the structured agent contract, a copy-paste agent prompt, and a visual preview. Read the contract before writing markup.',
  '',
  'Machine-readable inventory: [`components/COMPONENTS_INDEX.json`](COMPONENTS_INDEX.json) · Spec lookup: [`design-system/components/agent-manifest.index.json`](../design-system/components/agent-manifest.index.json)',
  '',
]
const mdByCat = {}
for (const c of inventory) (mdByCat[c.category] ||= []).push(c)
for (const cat of Object.keys(mdByCat).sort()) {
  mdIndex.push(`## ${cat}`, '')
  mdIndex.push('| Id | Component | Import | Tier | Status | Intent |')
  mdIndex.push('|---|---|---|---|---|---|')
  for (const c of mdByCat[cat]) {
    const dir = c.spec
    mdIndex.push(`| [\`${c.id}\`](../${dir}${c.id.split(':')[1]}.md) | ${c.name} | \`${c.importPath}\` | ${c.tier} | ${c.lifecycle} | ${c.intent} |`)
  }
  mdIndex.push('')
}
const withGaps = inventory.filter(c => c.gaps.length)
if (withGaps.length) {
  mdIndex.push('## Known gaps', '')
  mdIndex.push('Declared limitations. Honor them rather than assuming they have been filled.', '')
  mdIndex.push('| Component | Gap |')
  mdIndex.push('|---|---|')
  for (const c of withGaps) for (const g of c.gaps) mdIndex.push(`| \`${c.id}\` | ${g} |`)
  mdIndex.push('')
}
await emit(join(repoRoot, 'components/COMPONENTS_INDEX.md'), mdIndex.join('\n'))

// ai/llms.txt — the scoped index for AI-native work.
const aiComponents = manifestIndex.filter(m => m.namespace === 'ai')
if (aiComponents.length) {
  const aiMeta = id => metadata[id.split(':')[1]]
  const llms = [
    '# Agentic UI — AI Components Index',
    '',
    '> Scoped index for AI-native UI only. Load this when the task is an AI-generated or agent-driven surface.',
    '>',
    '> **Rules:** [/design-system/rules/ai-interaction.json](../../rules/ai-interaction.json) · **Tokens:** [/design-system/tokens/semantic.json](../../tokens/semantic.json) · **Parent:** [agent-instructions.md](../agent-instructions.md)',
    '',
    '---',
    '',
    '## Before anything else',
    '',
    'The `ai:*` namespace is not a style. These components carry signals — the AI accent, the soft surface, the attribution header — that tell a user **a machine produced this**.',
    '',
    '- Using them on human-authored UI falsely attributes it to a machine.',
    '- Using `ui:*` for AI output hides authorship.',
    '',
    'Both are violations. See [`FORBID_AI_IN_STANDARD_UI`](../../rules/forbidden.json).',
    '',
    '## Load order',
    '',
    '1. [/design-system/rules/ai-interaction.json](../../rules/ai-interaction.json) — experience modes, behaviors, accountability obligations',
    '2. [/design-system/tokens/semantic.json](../../tokens/semantic.json) — the `--ai-*` scale',
    '3. The component folders below — prompt, then contract, then spec',
    '4. [/design-system/patterns/ai-approval-flow.json](../../patterns/ai-approval-flow.json) and [ai-response.json](../../patterns/ai-response.json) — composition sequences',
    '',
    '## Experience metadata',
    '',
    'Every component below declares how much autonomy it grants the machine and what it owes the human in return. **Match the component to the actual autonomy being granted.** Do not reach for an Approve-level component when the interaction is a suggestion, or the reverse.',
    '',
    '| Behavior | What the machine may do | What it then owes |',
    '|---|---|---|',
    '| Suggest | Propose. No state changes. | Attribution |',
    '| Confirm | Ask before proceeding. Blocking. | Attribution, Approval |',
    '| Apply | Execute a change. | Approval, Audit trail, Reversibility |',
    '| Approve | Act on the human\'s behalf. | All of the above, explicitly consented |',
    '',
    '---',
    '',
    '## Components',
    '',
  ]
  const byBehavior = { 'Approve / Apply': [], 'Confirm': [], 'Suggest': [] }
  for (const m of aiComponents) {
    const e = aiMeta(m.id).experienceMetadata
    const key = e.aiBehavior.some(b => b === 'Approve' || b === 'Apply') ? 'Approve / Apply'
      : e.aiBehavior.includes('Confirm') ? 'Confirm' : 'Suggest'
    byBehavior[key].push(m)
  }
  const HEAD = {
    'Approve / Apply': 'These change state. Every one requires a human gesture and owes an audit trail.',
    'Confirm': 'These block on the human before anything proceeds.',
    'Suggest': 'These change nothing. They inform, attribute, or disclose.',
  }
  for (const [group, items] of Object.entries(byBehavior)) {
    if (!items.length) continue
    llms.push(`### ${group}`, '', HEAD[group], '')
    llms.push('| Component | Status | Intent | Accountability |')
    llms.push('|---|---|---|---|')
    for (const m of items) {
      const meta = aiMeta(m.id)
      const name = m.id.split(':')[1]
      llms.push(`| [\`${m.id}\`](${name}/${name}.md) | ${meta.status} | ${meta.intent} | ${meta.experienceMetadata.accountability.join(', ')} |`)
    }
    llms.push('')
  }
  llms.push('---', '', '## Non-negotiable', '')
  llms.push('- **Never auto-apply on render.** A human gesture is required for every Apply and Approve behavior.')
  llms.push('- **Never render a confidence value the model did not produce.** Absent means absent, not high.')
  llms.push('- **Never animate to simulate effort.** Loading indicators must track real in-flight work.')
  llms.push('- **Never exceed three visible actions** in one decision row.')
  llms.push('- **Never mix `--ai-*` tokens into standard product UI.**')
  llms.push('- **Attribution comes before the body**, never after.')
  llms.push('')
  llms.push('Full set: [/design-system/rules/ai-interaction.json](../../rules/ai-interaction.json)')
  llms.push('')
  await emit(join(repoRoot, 'design-system/components/ai/llms.txt'), llms.join('\n'))
}

// Preview hub
const byCategory = {}
for (const m of manifestIndex) (byCategory[m.category] ||= []).push(m)
const hub = [
  '<title>Component Previews — Agentic UI</title>',
  '<link rel="stylesheet" href="preview-shared.css" />',
  '<div class="page">',
  '<h1>Component previews</h1>',
  `<p class="lede">Every governed component in this design system, with its documented states, anatomy, tokens and rules. ${manifestIndex.length} components across the <code>ui</code> and <code>ai</code> namespaces.</p>`,
  '<div class="note" style="margin-bottom:36px">Previews are <strong>illustrative, never normative</strong>. The component source in <code>src/components/</code> is the truth; where a behaviour cannot be shown honestly in static HTML, the page says so rather than mocking it up.</div>',
]
for (const cat of Object.keys(byCategory).sort()) {
  hub.push(`<section><h2>${cat}</h2><div class="table-wrap"><table><thead><tr><th>Component</th><th>Id</th><th>Tier</th><th>Status</th></tr></thead><tbody>`)
  for (const m of byCategory[cat]) {
    hub.push(`<tr><td><a href="../${m.namespace}/${m.id.split(':')[1]}/${m.id.split(':')[1]}.preview.html"><strong>${m.name}</strong></a></td><td><code>${m.id}</code></td><td>${m.tier}</td><td><span class="pill ${m.status}">${m.status}</span></td></tr>`)
  }
  hub.push('</tbody></table></div></section>')
}
hub.push('</div>')
await emit(join(repoRoot, 'design-system/components/preview/index.html'), hub.join('\n'))

console.log('')
console.log(`  components   ${manifestIndex.length}  (ui ${manifestIndex.filter(m => m.namespace === 'ui').length}, ai ${manifestIndex.filter(m => m.namespace === 'ai').length})`)
console.log(`  files ${CHECK ? 'checked' : 'written'}  ${CHECK ? stale + ' stale' : written}`)
if (skipped) console.log(`  preserved    ${skipped} manifest(s) marked handEdited — use --force to overwrite`)
if (missingMeta.length) {
  console.log('')
  console.log(`  MISSING CURATION (${missingMeta.length}):`)
  missingMeta.forEach(id => console.log(`    ${id}`))
  console.log('  Add entries to scripts/metadata/ — a component with no curated metadata is not governed.')
}
console.log('')
if (CHECK && stale) { console.error('Design system specs are out of date. Run: npm run ds:build'); process.exit(1) }
if (missingMeta.length) process.exit(1)

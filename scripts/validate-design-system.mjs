#!/usr/bin/env node
/**
 * Validate the design system contract.
 *
 * Checks the invariants that make the system trustworthy rather than
 * decorative. Run in CI: npm run ds:validate
 *
 * These are the same checks design-system/agents/validation.json asks an
 * agent to perform on generated code — applied here to the specs themselves,
 * so the contract an agent reads is never internally inconsistent.
 */

import { readdir, readFile, access } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const exists = async p => { try { await access(p); return true } catch { return false } }

const MODES = ['AI Assisted', 'Adaptive', 'AI Led']
const BEHAVIORS = ['Suggest', 'Confirm', 'Apply', 'Approve']
const ACCOUNTABILITY = [
  'Attribution', 'Rationale disclosure', 'Confidence signalling',
  'Approval', 'Audit trail', 'Reversibility',
]

const violations = []
const fail = (ruleId, location, message, suggestedFix, severity = 'high') =>
  violations.push({ ruleId, severity, message, location, suggestedFix })

let checked = 0

for (const ns of ['ui', 'ai']) {
  const nsDir = join(repoRoot, 'design-system/components', ns)
  if (!(await exists(nsDir))) continue

  // Only directories are component folders. Files like llms.txt live alongside them.
  const entries = (await readdir(nsDir, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()

  for (const name of entries) {
    const dir = join(nsDir, name)
    const loc = `design-system/components/${ns}/${name}`

    // VALIDATE_FOUR_FILE_CONTRACT — a folder missing any file is not governed.
    for (const f of [`${name}.md`, `${name}.agent.json`, 'agentic-prompt.md', `${name}.preview.html`]) {
      if (!(await exists(join(dir, f)))) {
        fail('VALIDATE_FOUR_FILE_CONTRACT', `${loc}/${f}`, `Missing ${f}`, 'Run npm run ds:build', 'critical')
      }
    }

    const manifestPath = join(dir, `${name}.agent.json`)
    if (!(await exists(manifestPath))) continue
    checked++

    let m
    try {
      m = JSON.parse(await readFile(manifestPath, 'utf8'))
    } catch (e) {
      fail('VALIDATE_MANIFEST_JSON', loc, `Manifest is not valid JSON: ${e.message}`, 'Regenerate it', 'critical')
      continue
    }

    // VALIDATE_ID — the id must match the folder and namespace.
    if (m.id !== `${ns}:${name}`) {
      fail('VALIDATE_ID', loc, `id "${m.id}" does not match its location`, `Set id to "${ns}:${name}"`, 'critical')
    }

    // VALIDATE_AUTHORITY — every manifest must point at a source that exists.
    if (!m.authority?.source || !(await exists(join(repoRoot, m.authority.source)))) {
      fail('VALIDATE_AUTHORITY', loc, `authority.source does not resolve: ${m.authority?.source}`, 'Point it at the real component file', 'critical')
    }

    // VALIDATE_CONTRACT_COMPLETENESS — a contract with no rules governs nothing.
    if (!m.rules?.agentRules?.length) {
      fail('VALIDATE_CONTRACT_COMPLETENESS', loc, 'No agentRules declared', 'Add curated agentRules in scripts/metadata/')
    }
    if (!m.accessibility?.role) {
      fail('VALIDATE_CONTRACT_COMPLETENESS', loc, 'No accessibility role declared', 'Add an a11y block in scripts/metadata/')
    }

    // ── AI namespace invariants ──
    if (ns === 'ai') {
      const e = m.experienceMetadata
      if (!e) {
        fail('VALIDATE_AI_ACCOUNTABILITY', loc, 'AI component with no experienceMetadata', 'The schema requires it for namespace "ai"', 'critical')
        continue
      }
      for (const [field, allowed] of [['experienceMode', MODES], ['aiBehavior', BEHAVIORS], ['accountability', ACCOUNTABILITY]]) {
        const invalid = (e[field] ?? []).filter(v => !allowed.includes(v))
        if (invalid.length) {
          fail('VALIDATE_AI_ACCOUNTABILITY', loc, `Invalid ${field}: ${invalid.join(', ')}`, `Use one of: ${allowed.join(', ')}`, 'critical')
        }
      }

      // The core invariant: autonomy and accountability escalate together.
      const escalated = e.aiBehavior?.some(b => b === 'Apply' || b === 'Approve')
      if (escalated && !e.humanGestureRequired) {
        fail('VALIDATE_AI_ACCOUNTABILITY', loc,
          'Declares Apply or Approve but humanGestureRequired is false',
          'A component that changes state on the human\'s behalf must require an explicit gesture', 'critical')
      }
      if (escalated && !e.accountability?.includes('Approval')) {
        fail('VALIDATE_AI_ACCOUNTABILITY', loc,
          'Declares Apply or Approve without the Approval obligation',
          'Add "Approval" to accountability, or lower the declared behavior', 'critical')
      }
      if (e.aiBehavior?.includes('Apply') && e.reversible === 'never' && !e.accountability?.includes('Audit trail')) {
        fail('VALIDATE_AI_ACCOUNTABILITY', loc,
          'Applies an irreversible change with no audit trail',
          'Add "Audit trail", or make the change reversible', 'critical')
      }
      if (!e.accountability?.includes('Attribution')) {
        fail('VALIDATE_AI_ACCOUNTABILITY', loc,
          'AI component that does not declare Attribution',
          'Every AI-namespace component must be identifiable as machine-produced')
      }
    } else if (m.experienceMetadata) {
      // VALIDATE_NAMESPACE — experience metadata is the AI namespace's marker.
      fail('VALIDATE_NAMESPACE', loc,
        'Standard component carries experienceMetadata',
        'Remove it, or move the component to the ai namespace')
    }
  }
}

// VALIDATE_COMPONENT_INDEX — the inventory and the specs must agree.
const inventory = JSON.parse(await readFile(join(repoRoot, 'components/COMPONENTS_INDEX.json'), 'utf8'))
const indexFile = JSON.parse(await readFile(join(repoRoot, 'design-system/components/agent-manifest.index.json'), 'utf8'))
const invIds = new Set(inventory.components.map(c => c.id))
const idxIds = new Set(indexFile.manifests.map(m => m.id))
for (const id of idxIds) {
  if (!invIds.has(id)) fail('VALIDATE_COMPONENT_INDEX', 'components/COMPONENTS_INDEX.json', `${id} has a spec but is not in the inventory`, 'Run npm run ds:build', 'critical')
}
for (const id of invIds) {
  if (!idxIds.has(id)) fail('VALIDATE_COMPONENT_INDEX', 'design-system/components/agent-manifest.index.json', `${id} is in the inventory but has no spec`, 'Run npm run ds:build', 'critical')
}

// VALIDATE_NO_DANGLING_REFS — a rule that names a component which does not
// exist sends an agent straight into the closed-world rejection with nowhere
// to go. The contract must not contradict its own inventory.
const refs = new Map()
for (const d of ['design-system/rules', 'design-system/patterns', 'design-system/graph', 'design-system/agents']) {
  for (const f of await readdir(join(repoRoot, d))) {
    const text = await readFile(join(repoRoot, d, f), 'utf8')
    for (const m of text.matchAll(/"((?:ui|ai|pattern|layout):[a-z0-9-]+)"/g)) {
      if (!refs.has(m[1])) refs.set(m[1], `${d}/${f}`)
    }
  }
}
for (const [id, where] of refs) {
  if (!invIds.has(id)) {
    fail('VALIDATE_NO_DANGLING_REFS', where,
      `References ${id}, which is not in the inventory`,
      'Build the component, or remove the reference', 'critical')
  }
}

// ── Report, in the shape agents/validation.json declares ──
const bySeverity = s => violations.filter(v => v.severity === s)
const critical = bySeverity('critical')
const high = bySeverity('high')
const status = critical.length ? 'fail' : high.length ? 'fail' : 'pass'

console.log('')
console.log(`  components checked   ${checked}`)
console.log(`  violations           ${violations.length}  (${critical.length} critical, ${high.length} high)`)
console.log(`  status               ${status.toUpperCase()}`)
console.log('')

if (violations.length) {
  for (const v of violations) {
    console.log(`  [${v.severity}] ${v.ruleId}`)
    console.log(`    ${v.location}`)
    console.log(`    ${v.message}`)
    console.log(`    fix: ${v.suggestedFix}`)
    console.log('')
  }
  process.exit(1)
}

console.log('  Every component carries a complete four-file contract.')
console.log('  Every AI component declares its autonomy and the accountability it owes.')
console.log('  No standard component claims AI experience metadata.')
console.log('  The inventory and the spec index agree.')
console.log('')

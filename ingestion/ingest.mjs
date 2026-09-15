#!/usr/bin/env node
/**
 * Scan local {slug}.contract.json files and write the generated lookup layer:
 *
 *   /contracts/component-index.json
 *   /contracts/components.generated.json
 *   /contracts/tokens.generated.json
 *   /contracts/patterns.generated.json
 *   /contracts/governance.generated.json
 *   /contracts/gaps.generated.json
 *
 * Local contracts are authored (or generated into component folders).
 * These global files are always generated. Do not hand-edit them.
 *
 *   node ingestion/ingest.mjs
 *   node ingestion/ingest.mjs --check
 */

import { readdir, readFile, writeFile, mkdir, access } from 'fs/promises'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { validateContract } from './lib/validate-contract.mjs'
import { containsForbiddenBrand, keepGuildToken, scrubBrand } from './lib/brand.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(repoRoot, 'contracts')
const CHECK = process.argv.includes('--check')
const generatedAt = new Date().toISOString()
const exists = async p => { try { await access(p); return true } catch { return false } }
const stamp = t => t.replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z/g, 'TIMESTAMP')

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const abs = join(dir, ent.name)
    if (ent.isDirectory()) await walk(abs, acc)
    else if (ent.name.endsWith('.contract.json')) acc.push(abs)
  }
  return acc
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

const contractPaths = await walk(join(repoRoot, 'design-system/components'))
const contracts = []
const errors = []

for (const abs of contractPaths.sort()) {
  const rel = relative(repoRoot, abs).replaceAll('\\', '/')
  let data
  try {
    data = await readJson(abs)
  } catch (e) {
    errors.push(`${rel}: invalid JSON (${e.message})`)
    continue
  }
  errors.push(...validateContract(data, { path: rel }))
  if (containsForbiddenBrand(data)) errors.push(`${rel}: forbidden Zaidyn/ZS brand strings`)
  contracts.push({ path: rel, data })
}

if (errors.length) {
  console.error(`Ingestion refused ${errors.length} issue(s):`)
  for (const e of errors.slice(0, 40)) console.error(`  ${e}`)
  process.exit(1)
}

contracts.sort((a, b) => a.data.id.localeCompare(b.data.id))

const byId = {}
for (const { data } of contracts) {
  if (byId[data.id]) errors.push(`duplicate contract id ${data.id}`)
  byId[data.id] = data
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

const index = {
  generatedAt,
  brand: 'Guild',
  source: 'local {slug}.contract.json',
  count: contracts.length,
  byNamespace: Object.fromEntries(
    ['ui', 'ai', 'pattern', 'layout'].map(ns => [
      ns,
      contracts.filter(c => c.data.governance.namespace === ns).length,
    ])
  ),
  byStatus: Object.fromEntries(
    [...new Set(contracts.map(c => c.data.status))].sort().map(status => [
      status,
      contracts.filter(c => c.data.status === status).length,
    ])
  ),
  components: contracts.map(({ path, data }) => ({
    id: data.id,
    slug: data.slug,
    name: data.name,
    status: data.status,
    layer: data.layer,
    namespace: data.governance.namespace,
    path,
    implementation: data.runtime.implementation,
    closedWorldIndexed: data.governance.closedWorldIndexed,
    gapCount: data.gaps.length,
  })),
}

const componentsGenerated = {
  generatedAt,
  brand: 'Guild',
  count: contracts.length,
  byId,
}

const semanticCatalog = await readJson(join(repoRoot, 'design-system/tokens/semantic.json'))
const usedByToken = {}
for (const { data } of contracts) {
  for (const token of [...(data.tokens.semantic || []), ...(data.tokens.utilities || []), ...(data.tokens.ai || [])]) {
    if (!keepGuildToken(token)) continue
    ;(usedByToken[token] ||= []).push(data.id)
  }
}

const tokensGenerated = {
  generatedAt,
  brand: 'Guild',
  source: [
    'design-system/tokens/semantic.json',
    'design-system/tokens/primitives.json',
    'design-system/tokens/aliases.json',
    'local {slug}.contract.json tokens',
  ],
  catalog: {
    purpose: semanticCatalog._purpose || null,
    roles: semanticCatalog.roles || {},
    decisionTable: semanticCatalog.decisionTable || [],
    forbidden: semanticCatalog.forbidden || [],
  },
  usedByToken,
  componentsMissingTokens: contracts
    .filter(c => c.data.gaps.some(g => g.field === 'tokens'))
    .map(c => c.data.id),
}

const patternDir = join(repoRoot, 'design-system/patterns')
const patternCatalog = []
if (await exists(patternDir)) {
  for (const name of (await readdir(patternDir)).filter(f => f.endsWith('.json')).sort()) {
    const raw = await readJson(join(patternDir, name))
    patternCatalog.push({
      file: `design-system/patterns/${name}`,
      name: raw.name || name.replace(/\.json$/, ''),
      intent: scrubBrand(raw.intent || '') || null,
      requiredComponents: raw.requiredComponents || raw.mustInclude || [],
      forbiddenRules: raw.forbiddenRules || [],
    })
  }
}

const patternsGenerated = {
  generatedAt,
  brand: 'Guild',
  catalog: patternCatalog,
  componentPatterns: contracts
    .filter(c => c.data.layer === 'patterns')
    .map(({ data }) => ({
      id: data.id,
      name: data.name,
      status: data.status,
      intent: data.intent || null,
      usage: data.usage,
      doNotUse: data.doNotUse,
      gaps: data.gaps,
    })),
}

const rulesDir = join(repoRoot, 'design-system/rules')
const ruleFiles = (await readdir(rulesDir)).filter(f => f.endsWith('.json')).sort()
const rules = []
for (const name of ruleFiles) {
  const raw = await readJson(join(rulesDir, name))
  const file = `design-system/rules/${name}`
  if (Array.isArray(raw.forbidden)) {
    for (const item of raw.forbidden) {
      rules.push({
        id: item.id,
        file,
        severity: item.severity || null,
        rule: item.rule,
      })
    }
  } else if (Array.isArray(raw.rules)) {
    for (const item of raw.rules) {
      rules.push({
        id: item.id || item.pattern || name,
        file,
        severity: item.severity || null,
        rule: item.rule || item.pattern || JSON.stringify(item).slice(0, 200),
      })
    }
  } else {
    rules.push({
      id: name.replace(/\.json$/, ''),
      file,
      severity: null,
      rule: raw.description || name,
    })
  }
}

const governanceGenerated = {
  generatedAt,
  brand: 'Guild',
  phase: 0,
  note: 'Phase 0 is contracts + ingestion only. Component resolver / specialists / concierge are later.',
  closedWorld: {
    inventory: 'components/COMPONENTS_INDEX.json',
    contracts: 'contracts/component-index.json',
  },
  rules,
  byComponent: Object.fromEntries(contracts.map(({ data }) => [data.id, {
    status: data.status,
    closedWorldIndexed: data.governance.closedWorldIndexed,
    gapCount: data.gaps.length,
    experienceMetadata: data.governance.experienceMetadata || null,
  }])),
}

const gapItems = []
for (const { path, data } of contracts) {
  for (const g of data.gaps) {
    gapItems.push({ id: data.id, path, field: g.field, reason: g.reason })
  }
}
const byField = {}
for (const item of gapItems) byField[item.field] = (byField[item.field] || 0) + 1

const gapsGenerated = {
  generatedAt,
  brand: 'Guild',
  contractCount: contracts.length,
  gapCount: gapItems.length,
  contractsWithGaps: contracts.filter(c => c.data.gaps.length).length,
  byField,
  items: gapItems,
}

const outputs = {
  'component-index.json': index,
  'components.generated.json': componentsGenerated,
  'tokens.generated.json': tokensGenerated,
  'patterns.generated.json': patternsGenerated,
  'governance.generated.json': governanceGenerated,
  'gaps.generated.json': gapsGenerated,
}

if (CHECK) {
  let stale = 0
  for (const [name, data] of Object.entries(outputs)) {
    const abs = join(outDir, name)
    const json = JSON.stringify(data, null, 2) + '\n'
    if (!(await exists(abs)) || stamp(await readFile(abs, 'utf8')) !== stamp(json)) {
      stale++
      console.log(`  stale: contracts/${name}`)
    }
  }
  if (stale) {
    console.error(`${stale} generated contract index file(s) out of date. Run: node ingestion/ingest.mjs`)
    process.exit(1)
  }
  console.log(`ingest check ok: ${contracts.length} contracts, ${gapItems.length} gaps`)
  process.exit(0)
}

await mkdir(outDir, { recursive: true })
for (const [name, data] of Object.entries(outputs)) {
  await writeFile(join(outDir, name), JSON.stringify(data, null, 2) + '\n')
}

console.log(`Ingested ${contracts.length} local contracts → /contracts/ (${gapItems.length} gaps flagged).`)

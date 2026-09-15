#!/usr/bin/env node
/**
 * Generate {slug}.contract.json next to every design-system component folder.
 *
 * Reads existing {slug}.md, {slug}.agent.json, and TSX. Unknown fields become
 * gaps — status/tokens/props are never invented. Brand is Guild only.
 *
 *   node ingestion/generate-contracts.mjs
 *   node ingestion/generate-contracts.mjs --check
 *   node ingestion/generate-contracts.mjs --force
 */

import { mkdir, writeFile, readFile, access } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { discoverComponentFolders } from './lib/discover.mjs'
import { buildContract } from './lib/build-contract.mjs'
import { containsForbiddenBrand } from './lib/brand.mjs'
import { validateContract } from './lib/validate-contract.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const CHECK = args.includes('--check')
const FORCE = args.includes('--force')
const generatedAt = new Date().toISOString()

const exists = async p => { try { await access(p); return true } catch { return false } }

const stamp = t => t.replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z/g, 'TIMESTAMP')

const folders = await discoverComponentFolders(repoRoot)
let written = 0
let skipped = 0
let stale = 0
const errors = []

for (const folder of folders) {
  const outPath = join(folder.dir, `${folder.slug}.contract.json`)
  if (!FORCE && await exists(outPath)) {
    try {
      const current = JSON.parse(await readFile(outPath, 'utf8'))
      if (current.origin?.curated === true || current.curated === true) {
        skipped++
        continue
      }
    } catch {
      // Unparseable: overwrite with a valid contract.
    }
  }

  const contract = await buildContract(repoRoot, folder, { generatedAt })
  const json = JSON.stringify(contract, null, 2) + '\n'
  const problems = validateContract(contract, { path: outPath.replace(repoRoot + '/', '') })
  if (containsForbiddenBrand(contract)) {
    problems.push('contains forbidden Zaidyn/ZS brand strings')
  }
  if (problems.length) {
    errors.push(...problems)
    continue
  }

  if (CHECK) {
    if (!(await exists(outPath)) || stamp(await readFile(outPath, 'utf8')) !== stamp(json)) {
      stale++
      console.log(`  stale: ${outPath.replace(repoRoot + '/', '')}`)
    }
    continue
  }

  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, json)
  written++
}

if (errors.length) {
  console.error(`Contract generation failed with ${errors.length} validation error(s):`)
  for (const e of errors.slice(0, 40)) console.error(`  ${e}`)
  if (errors.length > 40) console.error(`  … ${errors.length - 40} more`)
  process.exit(1)
}

if (CHECK) {
  if (stale) {
    console.error(`${stale} contract(s) out of date. Run: node ingestion/generate-contracts.mjs`)
    process.exit(1)
  }
  console.log(`contracts check ok: ${folders.length} folders, ${skipped} curated preserved`)
  process.exit(0)
}

console.log(`Wrote ${written} {slug}.contract.json file(s) across ${folders.length} component folders (${skipped} curated preserved).`)

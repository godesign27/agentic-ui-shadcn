import { readdir, readFile, access } from 'fs/promises'
import { join, relative } from 'path'

export const AI_TIERS = [
  'foundations',
  'atomic',
  'molecules',
  'organisms',
  'patterns',
  'pages',
  'data-viz',
]

const AI_SKIP_TOP = new Set([...AI_TIERS, 'tokens', '_support', 'preview'])
const SLUG_RE = /^[a-z][a-z0-9-]*$/

const exists = async p => { try { await access(p); return true } catch { return false } }

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch {
    return null
  }
}

function namespaceFor(relParts) {
  const root = relParts[0]
  if (root === 'ui') return 'ui'
  if (root === 'ai') return 'ai'
  if (root === 'patterns') return 'pattern'
  if (root === 'layout') return 'layout'
  return null
}

function layerFor(relParts, manifest) {
  if (relParts[0] === 'ai' && AI_TIERS.includes(relParts[1])) return relParts[1]
  if (relParts[0] === 'layout') return 'layout'
  if (relParts[0] === 'patterns') return 'patterns'
  const fromManifest = manifest?.tier
  if (typeof fromManifest === 'string' && fromManifest.trim()) {
    const t = fromManifest.trim().toLowerCase().replace(/\s+\(ai\)$/, '')
    const allowed = new Set([
      'foundations', 'atomic', 'atoms', 'molecules', 'organisms',
      'patterns', 'pages', 'data-viz', 'layout', 'templates', 'groups',
      'reference', 'tokens',
    ])
    if (allowed.has(t)) return t
  }
  if (relParts[0] === 'ui') return 'atoms'
  if (relParts[0] === 'ai') return 'atomic'
  return 'unknown'
}

async function looksLikeComponent(dir, slug) {
  const files = [
    `${slug}.md`,
    `${slug}.agent.json`,
    'agentic-prompt.md',
    `${slug}.preview.html`,
  ]
  for (const f of files) {
    if (await exists(join(dir, f))) return true
  }
  return false
}

/**
 * Discover every design-system component folder that should carry a contract.
 */
export async function discoverComponentFolders(repoRoot) {
  const componentsRoot = join(repoRoot, 'design-system/components')
  const inventory = await readJson(join(repoRoot, 'components/COMPONENTS_INDEX.json'))
  const bySpec = new Map()
  for (const c of inventory?.components ?? []) {
    const spec = String(c.spec || '').replace(/\/$/, '')
    if (spec) bySpec.set(spec, c)
  }

  const folders = []

  async function consider(relParts) {
    const slug = relParts[relParts.length - 1]
    if (!SLUG_RE.test(slug)) return
    const dir = join(componentsRoot, ...relParts)
    if (!(await looksLikeComponent(dir, slug))) return
    const specPath = ['design-system/components', ...relParts].join('/')
    const manifestPath = join(dir, `${slug}.agent.json`)
    const specMdPath = join(dir, `${slug}.md`)
    const manifest = (await exists(manifestPath)) ? await readJson(manifestPath) : null
    const indexed = bySpec.get(specPath) || null
    folders.push({
      slug,
      dir,
      relParts,
      specPath,
      namespace: namespaceFor(relParts),
      layer: layerFor(relParts, manifest),
      manifest,
      hasSpec: await exists(specMdPath),
      hasManifest: Boolean(manifest),
      hasPrompt: await exists(join(dir, 'agentic-prompt.md')),
      hasPreview: await exists(join(dir, `${slug}.preview.html`)),
      indexed,
    })
  }

  for (const root of ['ui', 'layout', 'patterns']) {
    const rootDir = join(componentsRoot, root)
    if (!(await exists(rootDir))) continue
    for (const ent of await readdir(rootDir, { withFileTypes: true })) {
      if (ent.isDirectory()) await consider([root, ent.name])
    }
  }

  const aiRoot = join(componentsRoot, 'ai')
  if (await exists(aiRoot)) {
    for (const ent of await readdir(aiRoot, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue
      if (AI_SKIP_TOP.has(ent.name)) continue
      await consider(['ai', ent.name])
    }
    for (const tier of AI_TIERS) {
      const tierDir = join(aiRoot, tier)
      if (!(await exists(tierDir))) continue
      for (const ent of await readdir(tierDir, { withFileTypes: true })) {
        if (ent.isDirectory()) await consider(['ai', tier, ent.name])
      }
    }
  }

  const usedIds = new Set()
  for (const folder of folders) {
    let id = folder.indexed?.id
    if (!id && folder.manifest?.id && /^(ui|ai|pattern|layout):[a-z0-9-]+$/.test(folder.manifest.id)) {
      id = folder.manifest.id
    }
    if (!id) {
      if (folder.namespace === 'ai' && folder.relParts.length === 3) {
        const candidate = `ai:${folder.slug}`
        const taken = folders.some(f => f !== folder && (
          f.indexed?.id === candidate ||
          (f.relParts.length === 2 && f.slug === folder.slug)
        ))
        id = taken ? `ai:${folder.relParts[1]}-${folder.slug}` : candidate
      } else {
        id = `${folder.namespace}:${folder.slug}`
      }
    }
    if (usedIds.has(id)) {
      const disambiguated = folder.relParts.length === 3
        ? `ai:${folder.relParts[1]}-${folder.slug}`
        : `${folder.namespace}:${folder.relParts.join('-')}`
      id = usedIds.has(disambiguated) ? `${id}-${folders.indexOf(folder)}` : disambiguated
    }
    usedIds.add(id)
    folder.id = id
  }

  folders.sort((a, b) => a.specPath.localeCompare(b.specPath))
  return folders
}

export function schemaRefFor(folder, repoRoot) {
  const schemaAbs = join(repoRoot, 'design-system/schemas/component-contract.schema.json')
  let rel = relative(folder.dir, schemaAbs).replaceAll('\\', '/')
  if (!rel.startsWith('.')) rel = `./${rel}`
  return rel
}

export { exists }

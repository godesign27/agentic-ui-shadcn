import { readFile, access } from 'fs/promises'
import { join } from 'path'
import { scrubBrand, scrubList, keepGuildToken, containsForbiddenBrand } from './brand.mjs'
import { schemaRefFor } from './discover.mjs'
import { parseImplementation } from './parse-tsx.mjs'
import { markdownSection, bullets, namesFromTable, tableRows, frontmatterStatus, frontmatterName } from './parse-md.mjs'

const exists = async p => { try { await access(p); return true } catch { return false } }

const STATUS_ENUM = new Set(['unknown', 'draft', 'experimental', 'beta', 'stable', 'deprecated', 'active'])
const A11Y_PLACEHOLDER_KEYBOARD = 'Ensure keyboard focus order matches visual order'
const EXPERIENCE_MODES = new Set(['AI Assisted', 'Adaptive', 'AI Led'])
const AI_BEHAVIORS = new Set(['Suggest', 'Confirm', 'Apply', 'Approve'])
const ACCOUNTABILITY = new Set([
  'Attribution', 'Rationale disclosure', 'Confidence signalling',
  'Approval', 'Audit trail', 'Reversibility',
])
const REVERSIBLE = new Set(['always', 'conditional', 'never', 'not-applicable'])

function gap(field, reason) {
  return { field, reason }
}

function asStringArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(v => typeof v === 'string' && v.trim()).map(v => v.trim())
  if (typeof value === 'string') {
    return value.split(/[·,;|/]/).map(s => s.trim()).filter(Boolean)
  }
  return []
}

function normalizeStatus(raw) {
  if (!raw || typeof raw !== 'string') return null
  const s = raw.trim().toLowerCase()
  if (s === 'approved') return null
  if (STATUS_ENUM.has(s)) return s
  return null
}

function wellFormedProps(props) {
  if (!Array.isArray(props) || !props.length) return []
  const out = []
  for (const p of props) {
    if (!p || typeof p !== 'object') continue
    if (typeof p.name !== 'string' || !p.name.trim()) continue
    if (typeof p.type !== 'string' || !p.type.trim()) continue
    if (Array.isArray(p.values)) continue
    if (/\\$/.test(p.type) || p.type === 'see source' && !p.name) continue
    const hint = typeof p.hint === 'string' ? scrubBrand(p.hint) : undefined
    const type = scrubBrand(p.type) || p.type
    if (containsForbiddenBrand(type)) continue
    out.push({
      name: p.name.trim(),
      type,
      ...(typeof p.required === 'boolean' ? { required: p.required } : {}),
      ...(typeof p.default === 'string' && scrubBrand(p.default) ? { default: scrubBrand(p.default) } : {}),
      ...(hint ? { hint } : {}),
    })
  }
  return out
}

function variantObjects(names, group, whenByName = {}) {
  return names.filter(Boolean).map(name => {
    const when = whenByName[name]
    return when ? { group, name, when } : { group, name }
  })
}

function stateObjects(names, whenByName = {}) {
  return names.filter(Boolean).map(name => {
    const when = whenByName[name]
    return when ? { name, when } : { name }
  })
}

function validExperience(raw) {
  if (!raw || typeof raw !== 'object') return null
  const experienceMode = asStringArray(raw.experienceMode).filter(v => EXPERIENCE_MODES.has(v))
  const aiBehavior = asStringArray(raw.aiBehavior).filter(v => AI_BEHAVIORS.has(v))
  const accountability = asStringArray(raw.accountability).filter(v => ACCOUNTABILITY.has(v))
  if (!experienceMode.length && !aiBehavior.length && !accountability.length) return null
  const out = {}
  if (experienceMode.length) out.experienceMode = experienceMode
  if (aiBehavior.length) out.aiBehavior = aiBehavior
  if (accountability.length) out.accountability = accountability
  if (typeof raw.humanGestureRequired === 'boolean') out.humanGestureRequired = raw.humanGestureRequired
  if (typeof raw.reversible === 'string' && REVERSIBLE.has(raw.reversible)) out.reversible = raw.reversible
  return Object.keys(out).length ? out : null
}

function relatedFrom(manifest) {
  const raw = manifest?.relatedComponents || manifest?.related || []
  if (!Array.isArray(raw)) return []
  const out = []
  for (const item of raw) {
    if (typeof item === 'string' && /^(ui|ai|pattern|layout):/.test(item)) {
      out.push({ id: item })
      continue
    }
    if (item && typeof item.id === 'string' && /^(ui|ai|pattern|layout):/.test(item.id)) {
      const note = typeof item.note === 'string' ? scrubBrand(item.note) : undefined
      out.push(note ? { id: item.id, note } : { id: item.id })
    }
  }
  return out
}

function figmaFrom(manifest) {
  const empty = { fileKey: null, nodeId: null, url: null }
  const raw = manifest?.figma ?? manifest?.figmaCodeConnect ?? manifest?.codeConnect
  if (!raw || (Array.isArray(raw) && raw.length === 0)) return { figma: empty, codeConnect: { mapped: false, url: null, component: null } }
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    const fileKey = raw.fileKey || raw.file || null
    const nodeId = raw.nodeId || raw.node || null
    const url = raw.url || null
    const mapped = Boolean(raw.codeConnect || raw.mapped || url)
    return {
      figma: {
        fileKey: typeof fileKey === 'string' ? fileKey : null,
        nodeId: typeof nodeId === 'string' ? nodeId : null,
        url: typeof url === 'string' ? url : null,
      },
      codeConnect: {
        mapped,
        url: typeof raw.codeConnectUrl === 'string' ? raw.codeConnectUrl : (typeof url === 'string' ? url : null),
        component: typeof raw.component === 'string' ? raw.component : null,
      },
    }
  }
  return { figma: empty, codeConnect: { mapped: false, url: null, component: null } }
}

function importPathFor(folder, impl) {
  if (typeof folder.indexed?.importPath === 'string') return folder.indexed.importPath
  if (typeof folder.manifest?.javascriptApi?.import === 'string') {
    const m = folder.manifest.javascriptApi.import.match(/from\s+["']([^"']+)["']/)
    if (m && !m[1].startsWith('.')) return m[1]
  }
  if (impl.files[0]?.startsWith('src/components/')) {
    return `@/${impl.files[0].replace(/^src\//, '').replace(/\.tsx?$/, '')}`
  }
  return null
}

export async function buildContract(repoRoot, folder, { generatedAt }) {
  const gaps = []
  const from = []
  const mdPath = join(folder.dir, `${folder.slug}.md`)
  const md = folder.hasSpec ? await readFile(mdPath, 'utf8') : ''
  if (md) from.push('md')
  if (folder.manifest) from.push('agent.json')

  const impl = await parseImplementation(repoRoot, folder)
  if (impl.files.length) from.push('tsx')

  const indexed = folder.indexed
  const manifest = folder.manifest || {}

  const name = (
    (typeof manifest.name === 'string' && manifest.name.trim()) ||
    indexed?.name ||
    (impl.exports[0] || null) ||
    frontmatterName(md) ||
    folder.slug
  )

  let status = normalizeStatus(manifest.status)
    || normalizeStatus(indexed?.lifecycle)
    || normalizeStatus(frontmatterStatus(md))
  if (!status) {
    status = 'unknown'
    gaps.push(gap('status', 'No declared status in spec, manifest, or inventory; recorded as unknown. Not approved.'))
  }

  const layer = folder.layer === 'unknown'
    ? (gaps.push(gap('layer', 'Layer could not be determined from folder path or manifest tier.')), 'unknown')
    : folder.layer

  const { figma, codeConnect } = figmaFrom(manifest)
  if (!figma.fileKey && !figma.url && !codeConnect.mapped) {
    gaps.push(gap('figma', 'No Figma file, node, or Code Connect mapping in the spec or manifest.'))
    gaps.push(gap('codeConnect', 'No Code Connect mapping declared.'))
  }

  let props = wellFormedProps(manifest.props)
  if (!props.length && impl.props.length) {
    props = impl.props.map(p => ({
      name: p.name,
      type: p.type,
      required: p.required,
    }))
    from.push('tsx-props')
  }
  if (!props.length) {
    gaps.push(gap('props', 'No well-formed props in the manifest and none extracted from TSX. Not guessed.'))
  }

  const whenByVariant = {}
  for (const row of tableRows(markdownSection(md, 'Variants(?:.*)?') || markdownSection(md, 'Variants \\(emphasis\\)'))) {
    const key = String(row[0] || '').replace(/[*`]/g, '').replace(/\s*\(.*\)/, '').trim()
    const when = scrubBrand(row[row.length - 1] || '')
    if (key && when) whenByVariant[key] = when
  }

  const variantNames = []
  if (impl.variants.variant?.length) {
    variantNames.push(...impl.variants.variant)
  } else if (Array.isArray(manifest.variants) && manifest.variants.every(v => typeof v === 'string') && manifest.variants.length) {
    variantNames.push(...manifest.variants)
  } else {
    const fromMd = namesFromTable(markdownSection(md, 'Variants(?:.*)?'))
    if (fromMd.length) variantNames.push(...fromMd)
    else gaps.push(gap('variants', 'No variants declared in manifest, source unions, or spec table.'))
  }

  const extraGroups = []
  for (const [group, values] of Object.entries(impl.variants)) {
    if (group === 'variant' || group === 'size') continue
    extraGroups.push(...variantObjects(values, group))
  }

  const variants = [
    ...variantObjects([...new Set(variantNames)], 'variant', whenByVariant),
    ...extraGroups,
  ]

  const sizeNames = []
  if (impl.sizes?.length) {
    sizeNames.push(...impl.sizes)
  } else if (Array.isArray(manifest.sizes) && manifest.sizes.every(s => typeof s === 'string') && manifest.sizes.length) {
    sizeNames.push(...manifest.sizes)
  } else {
    sizeNames.push(...namesFromTable(markdownSection(md, 'Sizes')))
  }

  const whenByState = {}
  const stateSection = markdownSection(md, 'States') || markdownSection(md, 'State variations')
  for (const row of tableRows(stateSection)) {
    const key = String(row[0] || '').replace(/[*`]/g, '').trim()
    const when = scrubBrand(row[1] || row[2] || '')
    if (key && when) whenByState[key] = when
  }
  let stateNames = asStringArray(manifest.states)
  if (!stateNames.length) {
    const statusUnion = Object.entries(impl.unions).find(([k]) => /status|state/i.test(k) && !/preview/i.test(k))
    if (statusUnion) stateNames = statusUnion[1]
    else {
      const fromMd = namesFromTable(stateSection)
      if (fromMd.length) stateNames = fromMd
      else gaps.push(gap('states', 'No states declared in manifest, source unions, or spec table.'))
    }
  }
  const states = stateObjects(stateNames, whenByState)

  const semantic = []
  const utilities = []
  const aiTokens = []
  const manifestTokens = manifest.tokens
  if (manifestTokens && Array.isArray(manifestTokens.semantic) && manifestTokens.semantic.length) {
    semantic.push(...manifestTokens.semantic.filter(keepGuildToken))
  } else if (impl.tokens.length) {
    semantic.push(...impl.tokens.filter(keepGuildToken))
  } else {
    gaps.push(gap('tokens', 'No Guild semantic tokens declared in the manifest or extracted from TSX. Not guessed.'))
  }
  if (manifestTokens && Array.isArray(manifestTokens.utilities)) {
    utilities.push(...manifestTokens.utilities.filter(keepGuildToken))
  } else {
    utilities.push(...impl.utilities.filter(keepGuildToken))
  }
  if (impl.aiTokens.length) aiTokens.push(...impl.aiTokens.filter(keepGuildToken))

  const a11ySrc = manifest.accessibility || manifest.a11y || {}
  const keyboard = scrubList(asStringArray(a11ySrc.keyboard))
  const requiredAttributes = scrubList(asStringArray(a11ySrc.requiredAttributes))
  const notes = scrubList(asStringArray(a11ySrc.notes))
  const roleRaw = typeof a11ySrc.role === 'string' ? scrubBrand(a11ySrc.role) : null
  const placeholder = roleRaw === 'group' && keyboard.length === 1 && keyboard[0] === A11Y_PLACEHOLDER_KEYBOARD
  if (!roleRaw && !keyboard.length && !requiredAttributes.length && !notes.length) {
    gaps.push(gap('a11y', 'No accessibility role, keyboard map, or notes declared.'))
  } else if (placeholder) {
    gaps.push(gap('a11y', 'Manifest accessibility block is a generic placeholder, not a reviewed contract.'))
  }

  const a11y = {
    role: roleRaw || null,
    keyboard,
    requiredAttributes,
    notes,
    ...(typeof a11ySrc.focusManagement === 'string' && scrubBrand(a11ySrc.focusManagement)
      ? { focusManagement: scrubBrand(a11ySrc.focusManagement) } : {}),
    ...(typeof a11ySrc.liveRegion === 'string' && scrubBrand(a11ySrc.liveRegion)
      ? { liveRegion: scrubBrand(a11ySrc.liveRegion) } : {}),
    ...(typeof a11ySrc.handledByRadix === 'boolean' ? { handledByRadix: a11ySrc.handledByRadix } : {}),
    ...(placeholder ? { placeholder: true } : {}),
  }

  const usage = scrubList(bullets(markdownSection(md, 'When to use')))
  if (!usage.length) {
    const intentLine = typeof manifest.intent === 'string' ? scrubBrand(manifest.intent) : null
    if (intentLine) {
      // Intent is not usage. Record the gap rather than treating intent as approved usage.
      gaps.push(gap('usage', 'No "When to use" list in the spec. Intent was not copied into usage.'))
    } else {
      gaps.push(gap('usage', 'No usage guidance declared in the spec.'))
    }
  }

  const doNotUse = scrubList([
    ...bullets(markdownSection(md, 'When not to use')),
    ...asStringArray(manifest.rules?.forbiddenUsage),
    ...asStringArray(indexed?.forbiddenUsage),
  ])
  if (!doNotUse.length) {
    gaps.push(gap('doNotUse', 'No do-not-use / forbidden-usage list declared.'))
  }

  const agentRules = scrubList(asStringArray(manifest.rules?.agentRules))
  const experience = validExperience(manifest.experienceMetadata || indexed?.experienceMetadata)
  if (folder.namespace === 'ai' && !experience) {
    gaps.push(gap('governance', 'AI component has no schema-valid experienceMetadata (modes/behaviors/accountability). Not inferred.'))
  }

  const implementation = impl.primary
    || impl.files[0]
    || (typeof indexed?.file === 'string' ? indexed.file : indexed?.files?.[0] || null)
    || (typeof manifest.authority?.source === 'string' && await exists(join(repoRoot, manifest.authority.source))
      ? manifest.authority.source
      : null)

  if (!implementation) {
    gaps.push(gap('runtime', 'No implementation TSX found next to the spec or under src/components. Recorded as spec-only.'))
  }

  const declaredExports = [
    ...asStringArray(manifest.exports),
    ...asStringArray(manifest.javascriptApi?.exports),
    ...asStringArray(indexed?.exports),
  ].filter(name => name !== 'default')
  const exports = [...new Set(declaredExports.length ? declaredExports : impl.exports)]

  const platforms = asStringArray(manifest.platforms)
  const runtime = {
    kind: implementation ? 'react' : (folder.hasSpec ? 'spec-only' : 'unknown'),
    platforms: platforms.length ? platforms.filter(p => p === 'web' || p === 'react') : (implementation ? ['web', 'react'] : ['web']),
    importPath: importPathFor(folder, impl),
    exports,
    implementation: implementation || null,
  }

  const description = scrubBrand(typeof manifest.description === 'string' ? manifest.description : '')
    || scrubBrand(typeof indexed?.intent === 'string' ? '' : '')
  const intent = scrubBrand(typeof manifest.intent === 'string' ? manifest.intent : '')
    || scrubBrand(typeof indexed?.intent === 'string' ? indexed.intent : '')

  const specRel = folder.hasSpec ? `${folder.specPath}/${folder.slug}.md` : null
  const manifestRel = folder.hasManifest ? `${folder.specPath}/${folder.slug}.agent.json` : null
  const promptRel = folder.hasPrompt ? `${folder.specPath}/agentic-prompt.md` : null
  const previewRel = folder.hasPreview ? `${folder.specPath}/${folder.slug}.preview.html` : null
  const contractRel = `${folder.specPath}/${folder.slug}.contract.json`

  if (!folder.hasSpec) gaps.push(gap('sources', 'No {slug}.md spec in this folder.'))
  if (!folder.hasManifest) gaps.push(gap('sources', 'No {slug}.agent.json manifest in this folder.'))

  const contract = {
    $schema: schemaRefFor(folder, repoRoot),
    schemaVersion: 1,
    id: folder.id,
    slug: folder.slug,
    name,
    ...(description ? { description } : {}),
    ...(intent ? { intent } : {}),
    status,
    layer,
    runtime,
    figma,
    codeConnect,
    props,
    variants,
    states,
    sizes: sizeNames.filter(s => typeof s === 'string'),
    tokens: {
      semantic: [...new Set(semantic)],
      utilities: [...new Set(utilities)],
      ...(aiTokens.length ? { ai: [...new Set(aiTokens)] } : {}),
    },
    a11y,
    usage,
    doNotUse,
    governance: {
      namespace: folder.namespace,
      brand: 'Guild',
      closedWorldIndexed: Boolean(indexed),
      agentRules,
      related: relatedFrom(manifest),
      ...(experience ? { experienceMetadata: experience } : {}),
    },
    sources: {
      spec: specRel,
      manifest: manifestRel,
      implementation: runtime.implementation,
      prompt: promptRel,
      preview: previewRel,
      contract: contractRel,
    },
    gaps,
    origin: {
      generated: true,
      curated: false,
      generatedAt,
      from,
    },
  }

  return JSON.parse(JSON.stringify(contract))
}

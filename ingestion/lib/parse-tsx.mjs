import { readFile, readdir, access } from 'fs/promises'
import { join } from 'path'

const exists = async p => { try { await access(p); return true } catch { return false } }

const SEMANTIC_TOKENS = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'muted',
  'muted-foreground', 'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
  'border', 'input', 'ring', 'sidebar-background', 'sidebar-foreground', 'sidebar-primary',
  'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border',
  'sidebar-ring', 'ai-accent', 'ai-accent-strong', 'ai-accent-active', 'ai-accent-foreground',
  'ai-surface', 'ai-surface-border', 'ai-signal', 'ai-signal-surface', 'ai-signal-border',
  'ai-confidence-high', 'ai-confidence-medium', 'ai-confidence-low', 'ai-muted',
]

const UTILITY_PREFIXES = 'bg|text|border|ring|from|to|via|fill|stroke|divide|outline|decoration|shadow|accent|caret|placeholder'

function matchBrace(str, openIdx) {
  let depth = 0
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === '{') depth++
    else if (str[i] === '}') { depth--; if (!depth) return i }
  }
  return -1
}

function matchAngle(str, openIdx) {
  let depth = 0
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === '<') depth++
    else if (str[i] === '>') { depth--; if (!depth) return i }
  }
  return -1
}

function extractCva(src) {
  const blocks = []
  const re = /const\s+(\w+)\s*=\s*cva\(/g
  let m
  while ((m = re.exec(src))) {
    const rest = src.slice(m.index)
    const vIdx = rest.indexOf('variants: {')
    const block = { helper: m[1], groups: {}, defaults: {} }
    if (vIdx !== -1) {
      const open = rest.indexOf('{', vIdx + 'variants:'.length)
      const close = matchBrace(rest, open)
      const body = rest.slice(open + 1, close)
      for (const gm of body.matchAll(/(\w+):\s*\{/g)) {
        const gOpen = body.indexOf('{', gm.index + gm[0].length - 1)
        const gClose = matchBrace(body, gOpen)
        const gBody = body.slice(gOpen + 1, gClose)
        const keys = [...gBody.matchAll(/(?:^|\n)\s*["']?([\w-]+)["']?\s*:/g)].map(x => x[1])
        if (keys.length) block.groups[gm[1]] = [...new Set(keys)]
      }
    }
    const dv = rest.match(/defaultVariants:\s*\{([^}]*)\}/)
    if (dv) {
      for (const d of dv[1].matchAll(/(\w+):\s*["']([\w-]+)["']/g)) block.defaults[d[1]] = d[2]
    }
    blocks.push(block)
  }
  return blocks
}

function extractExports(src) {
  const set = new Set()
  for (const m of src.matchAll(/^export\s*\{([^}]+)\}/gms)) {
    m[1].split(',')
      .map(s => s.trim())
      .filter(s => s && !/^type\s+/.test(s))
      .map(s => s.split(/\s+as\s+/).pop().trim())
      .filter(Boolean)
      .forEach(e => set.add(e))
  }
  for (const m of src.matchAll(/^export\s+(?:const|function|class)\s+(\w+)/gm)) set.add(m[1])
  return [...set].filter(e => e !== 'default').sort()
}

function extractTokens(src) {
  const re = new RegExp(`\\b(?:${UTILITY_PREFIXES})-(${SEMANTIC_TOKENS.join('|')})\\b`, 'g')
  return [...new Set([...src.matchAll(re)].map(m => m[1]))].sort()
}

function extractUtilities(src) {
  const re = new RegExp(`\\b((?:${UTILITY_PREFIXES})-(?:${SEMANTIC_TOKENS.join('|')}))\\b`, 'g')
  return [...new Set([...src.matchAll(re)].map(m => m[1]))].sort()
}

function extractAiTokenPaths(src) {
  const paths = [...src.matchAll(/\bAI\.[A-Za-z][\w.]*/g)].map(m => m[0])
  return [...new Set(paths)].filter(p => !/zs/i.test(p)).sort()
}

function extractProps(src) {
  const bodies = []
  for (const m of src.matchAll(/(?:export\s+)?interface\s+(\w*Props)\b/g)) {
    const open = src.indexOf('{', m.index)
    if (open === -1) continue
    const close = matchBrace(src, open)
    if (close === -1) continue
    bodies.push({ owner: m[1], body: src.slice(open + 1, close) })
  }
  for (const m of src.matchAll(/React\.forwardRef\s*</g)) {
    const openAngle = src.indexOf('<', m.index)
    const closeAngle = matchAngle(src, openAngle)
    if (closeAngle === -1) continue
    const generic = src.slice(openAngle + 1, closeAngle)
    let cursor = 0
    while (true) {
      const brace = generic.indexOf('{', cursor)
      if (brace === -1) break
      const end = matchBrace(generic, brace)
      if (end === -1) break
      bodies.push({ owner: null, body: generic.slice(brace + 1, end) })
      cursor = end + 1
    }
  }

  const props = []
  const seen = new Set()
  for (const { body } of bodies) {
    let depth = 0
    let flat = ''
    for (const ch of body) {
      if (ch === '{') { depth++; if (depth === 1) flat += 'object'; continue }
      if (ch === '}') { depth--; continue }
      if (depth === 0) flat += ch
    }
    for (const line of flat.split(/[;\n]/)) {
      const t = line.trim()
      if (!t || t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) continue
      const m = t.match(/^(?:readonly\s+)?(["']?)([A-Za-z_$][\w$-]*)\1(\?)?\s*:\s*(.+)$/)
      if (!m) continue
      const [, , name, optional, rawType] = m
      if (seen.has(name) || name === 'key' || name === 'ref') continue
      seen.add(name)
      props.push({
        name,
        type: rawType.trim().replace(/\s+/g, ' '),
        required: !optional,
      })
    }
  }
  return props
}

function extractStringUnions(src) {
  const out = {}
  for (const m of src.matchAll(/export type (\w+)\s*=\s*([^;\n]+)/g)) {
    const values = [...m[2].matchAll(/['"]([\w-]+)['"]/g)].map(x => x[1])
    if (values.length) out[m[1]] = values
  }
  return out
}

function pascalSlug(slug) {
  return slug.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}

function relFrom(repoRoot, abs) {
  return abs.slice(repoRoot.length + 1)
}

function pickPrimary(repoRoot, folder, files) {
  const pascal = pascalSlug(folder.slug)
  const byPascal = files.find(abs => abs.endsWith(`/${pascal}.tsx`))
  if (byPascal) return byPascal
  const bySlug = files.find(abs => abs.endsWith(`/${folder.slug}.tsx`))
  if (bySlug) return bySlug
  const indexedFile = folder.indexed?.file || folder.indexed?.files?.[0]
  if (typeof indexedFile === 'string') {
    const abs = join(repoRoot, indexedFile)
    if (files.includes(abs)) return abs
  }
  return files[0]
}

export async function parseImplementation(repoRoot, folder) {
  const files = []
  const nestedDir = join(repoRoot, 'src/components', ...folder.relParts)
  if (await exists(nestedDir)) {
    for (const name of (await readdir(nestedDir)).filter(f => f.endsWith('.tsx') || f.endsWith('.ts')).sort()) {
      files.push(join(nestedDir, name))
    }
  }
  // Top-level kit files (src/components/ui/button.tsx) only apply to
  // non-nested folders. Nested AI tiers have their own directory.
  if (folder.relParts.length === 2) {
    const nsDir = folder.relParts[0] === 'patterns' ? 'patterns' : folder.relParts[0]
    const kitFile = join(repoRoot, 'src/components', nsDir, `${folder.slug}.tsx`)
    if (await exists(kitFile) && !files.includes(kitFile)) files.push(kitFile)
  }

  const indexedFile = folder.indexed?.file || folder.indexed?.files?.[0]
  if (typeof indexedFile === 'string') {
    const abs = join(repoRoot, indexedFile)
    const nestedOk = abs.startsWith(nestedDir + '/') || abs === nestedDir
    const topLevelOk = folder.relParts.length === 2
    if (await exists(abs) && !files.includes(abs) && (nestedOk || topLevelOk)) files.push(abs)
  }
  const authority = folder.manifest?.authority?.source
  if (typeof authority === 'string') {
    const abs = join(repoRoot, authority)
    const nestedOk = abs.startsWith(nestedDir + '/') || abs === nestedDir
    const topLevelOk = folder.relParts.length === 2
    if (await exists(abs) && !files.includes(abs) && (nestedOk || topLevelOk)) files.push(abs)
  }

  if (!files.length) {
    return { files: [], primary: null, exports: [], props: [], variants: {}, sizes: [], tokens: [], utilities: [], aiTokens: [], unions: {} }
  }

  const primaryAbs = pickPrimary(repoRoot, folder, files)
  const merged = {
    files: files.map(abs => relFrom(repoRoot, abs)),
    primary: relFrom(repoRoot, primaryAbs),
    exports: new Set(),
    props: [],
    seenProps: new Set(),
    variants: {},
    sizes: [],
    tokens: new Set(),
    utilities: new Set(),
    aiTokens: new Set(),
    unions: {},
  }

  for (const abs of files) {
    const src = await readFile(abs, 'utf8')
    extractExports(src).forEach(e => merged.exports.add(e))
    extractTokens(src).forEach(t => merged.tokens.add(t))
    extractUtilities(src).forEach(u => merged.utilities.add(u))
    extractAiTokenPaths(src).forEach(t => merged.aiTokens.add(t))
    if (abs === primaryAbs) {
      Object.assign(merged.unions, extractStringUnions(src))
      for (const block of extractCva(src)) {
        for (const [group, values] of Object.entries(block.groups)) {
          merged.variants[group] = [...new Set([...(merged.variants[group] || []), ...values])]
        }
      }
      for (const p of extractProps(src)) {
        if (merged.seenProps.has(p.name)) continue
        merged.seenProps.add(p.name)
        merged.props.push(p)
      }
    }
  }

  const variantUnion = Object.entries(merged.unions).find(([k]) => /variant/i.test(k))
  if (variantUnion && !merged.variants.variant) merged.variants.variant = variantUnion[1]
  const sizeUnion = Object.entries(merged.unions).find(([k]) => /size/i.test(k) && !/status/i.test(k))
  if (sizeUnion) merged.sizes = sizeUnion[1]
  else if (merged.variants.size) merged.sizes = merged.variants.size

  return {
    files: merged.files,
    primary: merged.primary,
    exports: [...merged.exports].sort(),
    props: merged.props,
    variants: merged.variants,
    sizes: merged.sizes,
    tokens: [...merged.tokens].sort(),
    utilities: [...merged.utilities].sort(),
    aiTokens: [...merged.aiTokens].sort(),
    unions: merged.unions,
  }
}

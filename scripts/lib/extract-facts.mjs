/**
 * Mechanical extraction from component source.
 *
 * Everything here is derivable by parsing. Anything a parser cannot know —
 * when NOT to use a component, what a state means, why a rule exists —
 * lives in scripts/component-metadata.mjs and is curated by hand.
 */
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

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
      .map(s => s.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop().trim())
      .filter(Boolean)
      .forEach(e => set.add(e))
  }
  for (const m of src.matchAll(/^export\s+(?:const|function)\s+(\w+)/gm)) set.add(m[1])
  return [...set].filter(e => !/^[A-Z_]+$/.test(e)).sort()
}

function extractTokens(src) {
  const re = new RegExp(`\\b(?:${UTILITY_PREFIXES})-(${SEMANTIC_TOKENS.join('|')})\\b`, 'g')
  return [...new Set([...src.matchAll(re)].map(m => m[1]))].sort()
}

function extractUtilities(src) {
  const re = new RegExp(`\\b((?:${UTILITY_PREFIXES})-(?:${SEMANTIC_TOKENS.join('|')}))\\b`, 'g')
  return [...new Set([...src.matchAll(re)].map(m => m[1]))].sort()
}

export async function extractAll(dir, namespace) {
  const files = (await readdir(dir)).filter(f => f.endsWith('.tsx')).sort()
  const out = []
  for (const file of files) {
    const src = await readFile(join(dir, file), 'utf8')
    const name = file.replace(/\.tsx$/, '')
    const imports = [...src.matchAll(/from\s+"((?!@\/|\.)[^"]+)"/g)].map(m => m[1])
    out.push({
      name,
      id: `${namespace}:${name}`,
      namespace,
      file: `src/components/${namespace}/${file}`,
      lines: src.split('\n').length,
      exports: extractExports(src),
      radixPrimitive: imports.find(i => i.startsWith('@radix-ui/')) || null,
      external: [...new Set(imports.filter(i => i !== 'react'))].sort(),
      cva: extractCva(src),
      forwardsRef: /React\.forwardRef/.test(src),
      asChild: /asChild/.test(src),
      tokens: extractTokens(src),
      utilities: extractUtilities(src),
      usesCn: /from\s+"@\/lib\/utils"/.test(src),
      internalDeps: [...new Set([...src.matchAll(/from\s+"@\/components\/(ui|ai)\/([\w-]+)"/g)].map(m => `${m[1]}:${m[2]}`))],
    })
  }
  return out
}

export { SEMANTIC_TOKENS }

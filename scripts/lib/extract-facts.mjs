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

function matchAngle(str, openIdx) {
  let depth = 0
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === '<') depth++
    else if (str[i] === '>') { depth--; if (!depth) return i }
  }
  return -1
}

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

/**
 * @param dir        absolute path to the component directory
 * @param namespace  the id prefix ("ui", "ai", "pattern", "layout")
 * @param dirName    the folder under src/components/ — differs from the
 *                   namespace for pattern (patterns/), so ids stay singular
 *                   while import paths mirror the real directory.
 */

/**
 * Props declared in a TypeScript interface or an inline forwardRef generic.
 *
 * The cva blocks give us variant and size. Everything else a component
 * requires — AIButton's `label`, CardTitle's `as`, ResizableHandle's
 * `withHandle` — is declared in TypeScript, and reading only the cva blocks
 * silently drops it. A contract that omits a required prop is worse than no
 * contract: the spec says "if it is not here, it does not exist".
 */
function extractProps(src) {
  const bodies = []

  // export interface XProps extends A, B { ... }  /  interface XProps { ... }
  for (const m of src.matchAll(/(?:export\s+)?interface\s+(\w*Props)\b/g)) {
    const open = src.indexOf('{', m.index)
    if (open === -1) continue
    const close = matchBrace(src, open)
    if (close === -1) continue
    bodies.push({ owner: m[1], body: src.slice(open + 1, close) })
  }

  // Inline object types in a forwardRef generic:
  //   React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<…> & { as?: … }>
  //
  // The generic argument list nests its own angle brackets, so the span has to
  // be found by depth, not by scanning to the first '>'. Getting this wrong
  // dropped CardTitle's `as` prop from the contract entirely.
  for (const m of src.matchAll(/React\.forwardRef\s*</g)) {
    const openAngle = src.indexOf('<', m.index)
    const closeAngle = matchAngle(src, openAngle)
    if (closeAngle === -1) continue
    const generic = src.slice(openAngle + 1, closeAngle)

    // Every inline object literal inside the generic contributes members.
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

  for (const { owner, body } of bodies) {
    // Collapse nested object literals to a placeholder rather than deleting
    // them: `workNote?: { content?: string }` must still register as a member,
    // and dropping the braces left `workNote?:` with no type at all.
    let depth = 0
    let flat = ''
    for (const ch of body) {
      if (ch === '{') {
        depth++
        if (depth === 1) flat += 'object'
        continue
      }
      if (ch === '}') { depth--; continue }
      if (depth === 0) flat += ch
    }

    for (const line of flat.split(/[;\n]/)) {
      const t = line.trim()
      if (!t || t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) continue
      const m = t.match(/^(?:readonly\s+)?(["']?)([A-Za-z_$][\w$-]*)\1(\?)?\s*:\s*(.+)$/)
      if (!m) continue
      const [, , name, optional, rawType] = m
      if (seen.has(name)) continue
      seen.add(name)
      props.push({
        name,
        type: rawType.trim().replace(/\s+/g, ' '),
        required: !optional,
        owner,
      })
    }
  }

  // Doc comments immediately above a member become the prop hint.
  for (const prop of props) {
    const re = new RegExp(`/\\*\\*([\\s\\S]*?)\\*/\\s*${prop.name}\\??\\s*:`, 'm')
    const doc = src.match(re)
    if (doc) {
      prop.hint = doc[1].replace(/^\s*\*\s?/gm, '').replace(/\s+/g, ' ').trim()
    }
  }

  const IGNORED = new Set(['className', 'children', 'ref', 'props', 'key'])
  for (const sig of src.matchAll(/\(\s*\{([^}]*)\}\s*,\s*ref\s*\)/g)) {
    for (const part of sig[1].split(',')) {
      const t = part.trim()
      if (!t || t.startsWith('...')) continue
      const m = t.match(/^([A-Za-z_$][\w$]*)\s*(?::\s*[A-Za-z_$][\w$]*)?\s*(?:=\s*(.+))?$/)
      if (!m) continue
      const [, name, defaultValue] = m
      if (IGNORED.has(name) || seen.has(name)) continue
      seen.add(name)
      props.push({
        name,
        type: 'see source',
        required: false,
        default: defaultValue ? defaultValue.trim() : undefined,
        inherited: true,
      })
    }
  }

  return props
}

export async function extractAll(dir, namespace, dirName = namespace) {
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
      dirName,
      file: `src/components/${dirName}/${file}`,
      lines: src.split('\n').length,
      exports: extractExports(src),
      radixPrimitive: imports.find(i => i.startsWith('@radix-ui/')) || null,
      external: [...new Set(imports.filter(i => i !== 'react'))].sort(),
      cva: extractCva(src),
      declaredProps: extractProps(src),
      // Helpers this component imports from a sibling, and the helper names it
      // actually uses in VariantProps<typeof X>. A component can inherit its
      // whole variant surface from another file — ui:toggle-group takes its
      // variants from ui:toggle — and reading only local cva blocks reports
      // those components as having no variants at all.
      importedHelpers: Object.fromEntries(
        [...src.matchAll(/import\s*\{([^}]+)\}\s*from\s*"@\/components\/(ui|ai)\/([\w-]+)"/g)]
          .flatMap(m => m[1].split(',')
            .map(x => x.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop().trim())
            .filter(Boolean)
            .map(name => [name, `${m[2]}:${m[3]}`]))
      ),
      variantPropsRefs: [...new Set(
        [...src.matchAll(/VariantProps<\s*typeof\s+(\w+)\s*>/g)].map(m => m[1])
      )],
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

#!/usr/bin/env node

/**
 * Build Components Index
 * 
 * Scans src/components/ui/ directory and generates components/COMPONENTS_INDEX.json
 * This script ensures the inventory stays in sync with actual component files.
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = join(__dirname, '..')
const uiComponentsDir = join(repoRoot, 'src', 'components', 'ui')
const outputFile = join(repoRoot, 'components', 'COMPONENTS_INDEX.json')

// Component metadata mapping (can be extended)
const componentMetadata = {
  button: {
    category: 'Forms',
    propsNotes: 'Supports variants: default, destructive, outline, secondary, ghost, link. Sizes: default, sm, lg, icon. Uses class-variance-authority for variant management.',
    a11yNotes: 'Native button element with focus-visible ring. Supports disabled state. Keyboard accessible by default.',
  },
  card: {
    category: 'Layout',
    propsNotes: 'Composed of Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. Uses CSS variables for theming.',
    a11yNotes: 'Semantic container. Ensure proper heading hierarchy when using CardTitle.',
  },
  input: {
    category: 'Forms',
    propsNotes: 'Standard HTML input with shadcn styling. Supports all native input props and types.',
    a11yNotes: 'Requires associated label element. Supports aria-describedby for error messages. Focus-visible ring included.',
  },
  'scroll-area': {
    category: 'Layout',
    propsNotes: 'Custom scrollable container using Radix UI ScrollArea. Composed of ScrollArea and ScrollBar components.',
    a11yNotes: 'Keyboard scrollable. Maintains focus management within scrollable region.',
  },
  separator: {
    category: 'Layout',
    propsNotes: 'Visual divider. Supports horizontal (default) and vertical orientations. Uses Radix UI Separator primitive.',
    a11yNotes: 'Decorative by default. Does not interfere with screen reader navigation.',
  },
  sheet: {
    category: 'Overlay',
    propsNotes: 'Slide-out panel from screen edge. Composed of Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter. Supports side: top, bottom, left, right.',
    a11yNotes: 'Focus trap when open. ESC key closes. Returns focus to trigger on close. Uses Radix UI Dialog primitive with proper ARIA attributes.',
  },
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

async function buildIndex() {
  try {
    // Read component files
    const files = await readdir(uiComponentsDir)
    const componentFiles = files.filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))

    // Build component entries
    const components = componentFiles
      .map(filename => {
        const nameWithoutExt = basename(filename, '.tsx').replace('.ts', '')
        const componentId = `ui:${nameWithoutExt}`
        const componentName = toPascalCase(nameWithoutExt)
        const metadata = componentMetadata[nameWithoutExt] || {
          category: 'Unknown',
          propsNotes: 'See component source for details.',
          a11yNotes: 'Follow shadcn/ui accessibility patterns.',
        }

        return {
          id: componentId,
          name: componentName,
          importPath: `@/components/ui/${nameWithoutExt}`,
          files: [`src/components/ui/${filename}`],
          category: metadata.category,
          propsNotes: metadata.propsNotes,
          a11yNotes: metadata.a11yNotes,
          status: 'allowed',
        }
      })
      .sort((a, b) => a.id.localeCompare(b.id))

    // Build index object
    const index = {
      version: '1.0.0',
      source: 'shadcn/ui',
      enforcement: 'closed-world',
      lastUpdated: new Date().toISOString().split('T')[0],
      components,
      patterns: [],
      layouts: [],
      forbidden: [
        'Do not install external UI libraries (Material UI, Ant Design, Chakra UI, etc.) unless explicitly approved and added to this index',
        'Do not create new UI components outside src/components/ui/ and src/components/patterns/',
        'Do not modify base component implementations in src/components/ui/ unless explicitly required by task',
        'Do not import from non-approved paths (only @/components/ui/*, @/components/patterns/*, @/components/layout/*)',
        'Do not generate raw bespoke UI markup when an equivalent shadcn/ui component exists',
        'Do not use third-party component libraries without adding to this index first',
        'Do not create duplicate components that replicate shadcn/ui functionality',
      ],
    }

    // Ensure components directory exists
    await mkdir(join(repoRoot, 'components'), { recursive: true })

    // Write index file
    await writeFile(outputFile, JSON.stringify(index, null, 2) + '\n', 'utf-8')

    console.log(`✅ Generated components/COMPONENTS_INDEX.json`)
    console.log(`   Found ${components.length} components`)
    console.log(`   Components: ${components.map(c => c.id).join(', ')}`)
  } catch (error) {
    console.error('❌ Error building components index:', error)
    process.exit(1)
  }
}

buildIndex()


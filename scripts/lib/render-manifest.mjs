/**
 * Renders {name}.agent.json — the structured contract.
 *
 * Merges mechanical facts (extracted) with curated metadata (hand-written).
 * Conforms to design-system/components/agent-manifest.schema.json.
 */

export function renderManifest(facts, meta, { generatedAt }) {
  const cva = facts.cva.find(c => Object.keys(c.groups).length) || { groups: {}, defaults: {} }
  const specDir = `design-system/components/${facts.namespace}/${facts.name}`

  const props = []
  for (const [group, values] of Object.entries(cva.groups)) {
    props.push({
      name: group,
      type: values.map(v => `"${v}"`).join(' | '),
      default: cva.defaults[group] ? `"${cva.defaults[group]}"` : undefined,
      required: false,
      hint: meta.variantGuidance && group === 'variant'
        ? 'See variantGuidance in the mirror spec for when to use each.'
        : meta.sizeGuidance && group === 'size'
        ? 'See sizeGuidance in the mirror spec.'
        : `One of the ${group} values declared in ${cva.helper || 'the cva helper'}.`,
    })
  }
  if (facts.asChild) {
    props.push({
      name: 'asChild',
      type: 'boolean',
      default: 'false',
      required: false,
      hint: 'Renders the child element instead of the default one, merging props and styles. Use for links that must look like this component.',
    })
  }
  props.push({
    name: 'className',
    type: 'string',
    required: false,
    hint: 'Merged with the component classes via cn(). Use for layout only — never to override a variant that already exists.',
  })

  const manifest = {
    $schema: '../../agent-manifest.schema.json',
    schemaVersion: 1,
    id: facts.id,
    name: facts.exports[0],
    namespace: facts.namespace,
    tier: meta.tier,
    status: meta.status,
    category: meta.category,
    description: meta.description,
    intent: meta.intent,
    authority: {
      source: facts.file,
      mirrorSpec: `${specDir}/${facts.name}.md`,
      contract: `${specDir}/${facts.name}.agent.json`,
      prompt: `${specDir}/agentic-prompt.md`,
      preview: `${specDir}/${facts.name}.preview.html`,
      upstream: facts.namespace === 'ui' ? `shadcn/ui registry: ${facts.name}` : undefined,
      note: 'src/ is authoritative. If this contract disagrees with the source, implement from the source and report the drift.',
    },
    platforms: ['web', 'react'],
    dependencies: {
      internal: facts.internalDeps,
      external: facts.external,
      radixPrimitive: facts.radixPrimitive || undefined,
    },
    exports: facts.exports,
    compound: meta.compound,
    variants: cva.groups.variant || [],
    sizes: cva.groups.size || cva.groups.side || [],
    states: (meta.states || []).map(s => s.name),
    props,
    javascriptApi: {
      import: `import { ${facts.exports.slice(0, 3).join(', ')}${facts.exports.length > 3 ? ', …' : ''} } from "@/components/${facts.namespace}/${facts.name}"`,
      exports: facts.exports,
      forwardsRef: facts.forwardsRef,
      asChild: facts.asChild,
      notes: meta.apiNotes || [],
    },
    tokens: {
      semantic: facts.tokens,
      utilities: facts.utilities,
    },
    accessibility: {
      role: meta.a11y.role,
      keyboard: meta.a11y.keyboard || [],
      requiredAttributes: meta.a11y.requiredAttributes || [],
      focusManagement: meta.a11y.focusManagement,
      liveRegion: meta.a11y.liveRegion,
      handledByRadix: meta.a11y.handledByRadix,
      notes: meta.a11y.notes || [],
    },
    rules: {
      allowedChildren: meta.compound ? meta.compound.parts.map(p => p.name) : [],
      forbiddenChildren: meta.forbiddenChildren || [],
      forbiddenUsage: meta.forbiddenUsage || [],
      agentRules: meta.agentRules || [],
    },
    experienceMetadata: meta.experienceMetadata,
    relatedComponents: meta.related || [],
    gaps: meta.gaps || [],
    generatedAt,
    curated: true,
  }

  // Strip undefined so the JSON stays clean.
  return JSON.parse(JSON.stringify(manifest))
}

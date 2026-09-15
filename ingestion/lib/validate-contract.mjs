const STATUS = new Set(['unknown', 'draft', 'experimental', 'beta', 'stable', 'deprecated', 'active'])
const LAYERS = new Set([
  'unknown', 'foundations', 'atomic', 'atoms', 'molecules', 'organisms',
  'patterns', 'pages', 'data-viz', 'layout', 'templates', 'groups', 'reference', 'tokens',
])
const NAMESPACES = new Set(['ui', 'ai', 'pattern', 'layout'])
const REQUIRED = [
  'schemaVersion', 'id', 'slug', 'name', 'status', 'layer', 'runtime',
  'figma', 'codeConnect', 'props', 'variants', 'states', 'tokens',
  'a11y', 'usage', 'doNotUse', 'governance', 'sources', 'gaps',
]

export function validateContract(contract, { path = '' } = {}) {
  const errors = []
  if (!contract || typeof contract !== 'object') {
    return [`${path}: not an object`]
  }
  if (contract.schemaVersion !== 1) errors.push(`${path}: schemaVersion must be 1`)
  for (const key of REQUIRED) {
    if (!(key in contract)) errors.push(`${path}: missing ${key}`)
  }
  if (typeof contract.id !== 'string' || !/^(ui|ai|pattern|layout):[a-z0-9-]+$/.test(contract.id)) {
    errors.push(`${path}: invalid id ${contract.id}`)
  }
  if (typeof contract.slug !== 'string' || !/^[a-z][a-z0-9-]*$/.test(contract.slug)) {
    errors.push(`${path}: invalid slug`)
  }
  if (!STATUS.has(contract.status)) errors.push(`${path}: invalid status ${contract.status}`)
  if (!LAYERS.has(contract.layer)) errors.push(`${path}: invalid layer ${contract.layer}`)
  if (contract.status === 'approved') errors.push(`${path}: status must not be guessed as approved`)
  if (contract.governance?.brand !== 'Guild') errors.push(`${path}: governance.brand must be Guild`)
  if (!NAMESPACES.has(contract.governance?.namespace)) errors.push(`${path}: invalid namespace`)
  if (!Array.isArray(contract.gaps)) errors.push(`${path}: gaps must be an array`)
  const rt = contract.runtime
  if (!rt || !['react', 'spec-only', 'unknown'].includes(rt.kind)) {
    errors.push(`${path}: runtime.kind invalid`)
  }
  return errors
}

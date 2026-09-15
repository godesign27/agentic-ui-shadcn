/**
 * Guild-only branding for generated contract content.
 * Host zs-* CSS names are omitted, never rewritten as if they were Guild tokens.
 */

export const FORBIDDEN_BRAND = /\bZaidyn\b|\bZAIDYN\b|\bzaidyn\b|\bZAIYDN\b|\bZS\b|\bZDS\b|\bzds-ai\b|@zs[/.]|@zs-|\bzs-[A-Za-z0-9_-]+/i

export function containsForbiddenBrand(value) {
  if (typeof value === 'string') return FORBIDDEN_BRAND.test(value)
  if (Array.isArray(value)) return value.some(containsForbiddenBrand)
  if (value && typeof value === 'object') return Object.values(value).some(containsForbiddenBrand)
  return false
}

export function scrubBrand(text) {
  if (typeof text !== 'string') return text
  const scrubbed = text
    .replace(/@zs\/[\w-]+/g, 'Guild')
    .replace(/@zs-[A-Za-z0-9_-]+/g, '')
    .replace(/\bzs-[A-Za-z0-9_-]+/gi, '')
    .replace(/\bzds-ai\b/gi, 'Guild AI')
    .replace(/\bZaidyn\b/gi, 'Guild')
    .replace(/\bZAIDYN\b/g, 'Guild')
    .replace(/\bzaidyn\b/g, 'Guild')
    .replace(/\bZAIYDN\b/g, 'Guild')
    .replace(/\bZDS\b/g, 'Guild')
    .replace(/\bZS\b/g, 'Guild')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ ?· ?·/g, ' ·')
    .replace(/\s+,/g, ',')
    .trim()
  return containsForbiddenBrand(scrubbed) ? null : scrubbed
}

export function keepGuildToken(name) {
  if (typeof name !== 'string' || !name.trim()) return false
  return !FORBIDDEN_BRAND.test(name)
}

export function scrubList(items) {
  if (!Array.isArray(items)) return []
  const out = []
  for (const item of items) {
    if (typeof item !== 'string') continue
    const scrubbed = scrubBrand(item)
    if (scrubbed) out.push(scrubbed)
  }
  return [...new Set(out)]
}

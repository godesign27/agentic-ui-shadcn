export function markdownSection(md, heading) {
  if (!md) return ''
  const re = new RegExp(`^##+\\s+${heading}\\s*$`, 'im')
  const start = md.search(re)
  if (start === -1) return ''
  const after = md.slice(start).split('\n').slice(1)
  const lines = []
  for (const line of after) {
    if (/^##+\s+/.test(line)) break
    lines.push(line)
  }
  return lines.join('\n').trim()
}

export function bullets(text) {
  if (!text) return []
  const out = []
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*[-*•]\s+(.*)$/)
    if (m) out.push(m[1].replace(/\s+/g, ' ').trim())
  }
  return out.filter(Boolean)
}

function cellName(raw) {
  return String(raw || '')
    .replace(/[*`]/g, '')
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .split('/')[0]
    .trim()
}

export function tableRows(text) {
  if (!text) return []
  const rows = []
  for (const line of text.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    if (/^\|\s*:?-{3,}/.test(line.trim())) continue
    const cells = line.split('|').slice(1, -1).map(c => c.trim())
    if (!cells.length) continue
    const headerish = cells[0].toLowerCase()
    if (['variant', 'size', 'state', 'part', 'path', 'tier'].includes(headerish)) continue
    rows.push(cells)
  }
  return rows
}

export function namesFromTable(text) {
  return tableRows(text)
    .map(cells => cellName(cells[0]))
    .filter(name => name && !/^-+$/.test(name) && name.length < 80)
}

export function frontmatterStatus(md) {
  if (!md) return null
  const m = md.match(/\*\*Status:\*\*\s+([A-Za-z][\w-]*)/)
  return m ? m[1] : null
}

export function frontmatterName(md) {
  if (!md) return null
  const h1 = md.match(/^#\s+(.+)$/m)
  return h1 ? h1[1].trim() : null
}

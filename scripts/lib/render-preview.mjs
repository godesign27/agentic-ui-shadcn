/**
 * Renders {name}.preview.html — the visual proof surface.
 *
 * Shows what can be shown honestly: live token swatches pulled from the real
 * scale, static specimens where a static replica is faithful, and the full
 * documented state, anatomy and rule set where it is not.
 *
 * Never fakes interactive behaviour. A component whose truth is its focus trap
 * gets a pointer to the running app, not a mockup that lies about it.
 */

const escape = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const inlineCode = s => escape(s).replace(/`([^`]+)`/g, '<code>$1</code>')

export function renderPreview(facts, meta, specimens, { generatedAt }) {
  const title = facts.exports[0]
  const isAi = facts.namespace === 'ai'
  const H = []

  H.push(`<title>${escape(title)} — Component Preview</title>`)
  H.push(`<link rel="stylesheet" href="../../preview/preview-shared.css" />`)
  H.push(`<div class="page">`)
  H.push(`<a class="back" href="../../preview/index.html">← All component previews</a>`)
  H.push(`<h1>${escape(title)}</h1>`)
  H.push(`<p class="lede">${escape(meta.intent)}</p>`)

  H.push(`<div class="meta">`)
  H.push(`<span class="pill mono">${escape(facts.id)}</span>`)
  H.push(`<span class="pill ${meta.status}">${escape(meta.status)}</span>`)
  H.push(`<span class="pill">${escape(meta.tier)}</span>`)
  H.push(`<span class="pill">${escape(meta.category)}</span>`)
  if (isAi) H.push(`<span class="pill ai">AI namespace</span>`)
  if (facts.radixPrimitive) H.push(`<span class="pill mono">${escape(facts.radixPrimitive)}</span>`)
  H.push(`</div>`)

  // ── Specimens, or an honest note that there are none ──
  H.push(`<section>`)
  H.push(`<h2>Appearance</h2>`)
  if (specimens?.length) {
    H.push(`<p class="desc">Static replicas built from the same token values the component uses. Illustrative — the source component is the truth.</p>`)
    H.push(`<div class="surface"><div class="specimens">`)
    specimens.forEach(s => {
      H.push(`<div class="specimen"><span class="specimen-label">${escape(s.label)}</span>${s.html}</div>`)
    })
    H.push(`</div></div>`)
  } else {
    H.push(`<p class="desc">No static specimen.</p>`)
    H.push(`<div class="note">This component's behaviour — ${escape(
      meta.a11y.handledByRadix
        ? 'focus management, portalling and keyboard interaction'
        : 'its runtime interaction'
    )} — cannot be shown honestly in static HTML, so nothing is mocked up here. Run <code>npm run dev</code> and view it at <code>/ui-kit</code>, or read <code>${escape(facts.file)}</code>.</div>`)
  }
  H.push(`</section>`)

  // ── Experience metadata (AI only) ──
  if (meta.experienceMetadata) {
    const em = meta.experienceMetadata
    H.push(`<section>`)
    H.push(`<h2>Experience metadata</h2>`)
    H.push(`<p class="desc">The autonomy this component grants, and the guarantees it therefore owes.</p>`)
    H.push(`<div class="table-wrap"><table><tbody>`)
    H.push(`<tr><th scope="row">Experience mode</th><td>${em.experienceMode.map(escape).join(' · ')}</td></tr>`)
    H.push(`<tr><th scope="row">AI behavior</th><td>${em.aiBehavior.map(escape).join(' · ')}</td></tr>`)
    H.push(`<tr><th scope="row">Accountability</th><td>${em.accountability.map(escape).join(' · ')}</td></tr>`)
    H.push(`<tr><th scope="row">Human gesture</th><td>${em.humanGestureRequired ? 'Required — no state changes without one' : 'Not required'}</td></tr>`)
    H.push(`<tr><th scope="row">Reversible</th><td>${escape(em.reversible)}</td></tr>`)
    H.push(`</tbody></table></div>`)
    H.push(`</section>`)
  }

  // ── States ──
  if (meta.states?.length) {
    H.push(`<section>`)
    H.push(`<h2>States</h2>`)
    H.push(`<p class="desc">Every state the component documents. If a state is not listed here, it does not exist.</p>`)
    H.push(`<div class="table-wrap"><table><thead><tr><th>State</th><th>Trigger</th><th>Treatment</th></tr></thead><tbody>`)
    meta.states.forEach(s => {
      H.push(`<tr><td><strong>${escape(s.name)}</strong></td><td><code>${escape(s.trigger)}</code></td><td>${escape(s.note)}</td></tr>`)
    })
    H.push(`</tbody></table></div>`)
    H.push(`</section>`)
  }

  // ── Anatomy ──
  H.push(`<section>`)
  H.push(`<h2>Anatomy</h2>`)
  if (meta.compound) {
    H.push(`<p class="desc">Parts must nest as shown. A part outside its required parent is a structural violation.</p>`)
    const lines = [meta.compound.root]
    const walk = (parent, depth) => {
      meta.compound.parts.filter(p => p.parent === parent).forEach(p => {
        lines.push(`${'  '.repeat(depth)}${p.name}${p.required ? '' : '   <span class="opt">(optional)</span>'}`)
        walk(p.name, depth + 1)
      })
    }
    walk(meta.compound.root, 1)
    meta.compound.parts
      .filter(p => p.parent && p.parent !== meta.compound.root && !meta.compound.parts.some(q => q.name === p.parent))
      .forEach(p => lines.push(`  ${p.name}   <span class="opt">(inside ${p.parent})</span>`))
    H.push(`<div class="surface"><pre class="tree">${lines.join('\n')}</pre></div>`)
  } else if (meta.anatomy) {
    H.push(`<div class="table-wrap"><table><thead><tr><th>Part</th><th>Role</th></tr></thead><tbody>`)
    meta.anatomy.forEach(a => H.push(`<tr><td><strong>${escape(a.part)}</strong></td><td>${escape(a.role)}</td></tr>`))
    H.push(`</tbody></table></div>`)
  }
  H.push(`</section>`)

  // ── Tokens, live ──
  if (facts.tokens.length) {
    H.push(`<section>`)
    H.push(`<h2>Tokens</h2>`)
    H.push(`<p class="desc">Live swatches from the real scale. These respond to your system theme, exactly as the component does.</p>`)
    H.push(`<div class="swatches">`)
    facts.tokens.forEach(t => {
      H.push(`<div class="swatch"><div class="chip" style="background:hsl(var(--${escape(t)}))"></div><div class="name">--${escape(t)}</div></div>`)
    })
    H.push(`</div>`)
    H.push(`</section>`)
  }

  // ── Do / Don't ──
  H.push(`<section>`)
  H.push(`<h2>Rules</h2>`)
  H.push(`<p class="desc">The full set is in <code>${escape(facts.name)}.agent.json</code>. These are the ones agents get wrong.</p>`)
  H.push(`<div class="cols">`)
  H.push(`<div class="do"><div class="rule-head">Use it for</div><ul class="rule-list">`)
  meta.whenToUse.forEach(w => H.push(`<li>${inlineCode(w)}</li>`))
  H.push(`</ul></div>`)
  H.push(`<div class="dont"><div class="rule-head">Not for</div><ul class="rule-list">`)
  meta.whenNotToUse.forEach(w => H.push(`<li>${inlineCode(w)}</li>`))
  H.push(`</ul></div>`)
  H.push(`</div>`)
  H.push(`</section>`)

  // ── Accessibility ──
  H.push(`<section>`)
  H.push(`<h2>Accessibility</h2>`)
  if (meta.a11y.handledByRadix) {
    H.push(`<p class="desc">Roles, ARIA wiring and focus management come from <code>${escape(facts.radixPrimitive || 'the primitive')}</code>. Do not re-implement them.</p>`)
  } else {
    H.push(`<p class="desc">This component supplies no ARIA of its own beyond what is listed. The rest is yours.</p>`)
  }
  H.push(`<div class="table-wrap"><table><tbody>`)
  H.push(`<tr><th scope="row">Role</th><td><code>${escape(meta.a11y.role)}</code></td></tr>`)
  if (meta.a11y.keyboard?.length) H.push(`<tr><th scope="row">Keyboard</th><td>${meta.a11y.keyboard.map(escape).join('<br />')}</td></tr>`)
  if (meta.a11y.requiredAttributes?.length) H.push(`<tr><th scope="row">Required</th><td>${meta.a11y.requiredAttributes.map(escape).join('<br />')}</td></tr>`)
  if (meta.a11y.focusManagement) H.push(`<tr><th scope="row">Focus</th><td>${escape(meta.a11y.focusManagement)}</td></tr>`)
  H.push(`</tbody></table></div>`)
  if (meta.a11y.notes?.length) {
    H.push(`<ul class="rule-list" style="margin-top:14px">`)
    meta.a11y.notes.forEach(n => H.push(`<li>${inlineCode(n)}</li>`))
    H.push(`</ul>`)
  }
  H.push(`</section>`)

  // ── Gaps ──
  if (meta.gaps?.length) {
    H.push(`<section>`)
    H.push(`<h2>Gaps</h2>`)
    H.push(`<p class="desc">Known limitations. Honor them rather than assuming they have been filled.</p>`)
    H.push(`<div class="note"><ul class="rule-list" style="margin:0">`)
    meta.gaps.forEach(g => H.push(`<li>${inlineCode(g)}</li>`))
    H.push(`</ul></div>`)
    H.push(`</section>`)
  }

  // ── Footer ──
  H.push(`<section>`)
  H.push(`<h2>Spec files</h2>`)
  H.push(`<div class="table-wrap"><table><tbody>`)
  H.push(`<tr><th scope="row">Source</th><td><code>${escape(facts.file)}</code> — authoritative</td></tr>`)
  H.push(`<tr><th scope="row">Contract</th><td><a href="${escape(facts.name)}.agent.json"><code>${escape(facts.name)}.agent.json</code></a></td></tr>`)
  H.push(`<tr><th scope="row">Mirror spec</th><td><a href="${escape(facts.name)}.md"><code>${escape(facts.name)}.md</code></a></td></tr>`)
  H.push(`<tr><th scope="row">Agent prompt</th><td><a href="agentic-prompt.md"><code>agentic-prompt.md</code></a></td></tr>`)
  H.push(`</tbody></table></div>`)
  H.push(`<p class="desc" style="margin-top:14px">Generated ${escape(generatedAt.slice(0, 10))} from the curated metadata and the component source. Illustrative, never normative.</p>`)
  H.push(`</section>`)

  H.push(`</div>`)
  return H.join('\n')
}

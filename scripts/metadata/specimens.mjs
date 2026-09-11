/**
 * Static visual specimens for preview pages.
 *
 * These are plain HTML/CSS replicas built from the same token values the real
 * components use — see design-system/components/preview/preview-shared.css.
 * They exist so a preview page shows something true without a React runtime.
 *
 * They are ILLUSTRATIVE, NEVER NORMATIVE. The source component is the truth.
 * Components whose behaviour cannot be honestly shown in static HTML (every
 * Radix overlay, for instance) deliberately have no specimen — the preview
 * says so rather than faking it.
 */

export const specimens = {
  button: [
    { label: 'default', html: '<button class="btn btn--default">Save changes</button>' },
    { label: 'destructive', html: '<button class="btn btn--destructive">Delete</button>' },
    { label: 'outline', html: '<button class="btn btn--outline">Cancel</button>' },
    { label: 'secondary', html: '<button class="btn btn--secondary">Export</button>' },
    { label: 'ghost', html: '<button class="btn btn--ghost">Dismiss</button>' },
    { label: 'link', html: '<button class="btn btn--link">Read the docs</button>' },
    { label: 'sm', html: '<button class="btn btn--default btn--sm">Small</button>' },
    { label: 'lg', html: '<button class="btn btn--default btn--lg">Large</button>' },
    { label: 'icon', html: '<button class="btn btn--outline btn--icon" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' },
    { label: 'disabled', html: '<button class="btn btn--default" disabled>Save changes</button>' },
  ],
  badge: [
    { label: 'default', html: '<span class="bdg bdg--default">New</span>' },
    { label: 'secondary', html: '<span class="bdg bdg--secondary">Active</span>' },
    { label: 'destructive', html: '<span class="bdg bdg--destructive">Failed</span>' },
    { label: 'outline', html: '<span class="bdg bdg--outline">Archived</span>' },
  ],
  input: [
    { label: 'default', html: '<input class="fld" placeholder="you@example.com" />' },
    { label: 'with value', html: '<input class="fld" value="ada@analytical.dev" />' },
    { label: 'disabled', html: '<input class="fld" placeholder="Unavailable" disabled />' },
  ],
  textarea: [
    { label: 'default', html: '<textarea class="fld" placeholder="Add a note…"></textarea>' },
    { label: 'disabled', html: '<textarea class="fld" placeholder="Unavailable" disabled></textarea>' },
  ],
  label: [
    { label: 'default', html: '<label style="font-size:14px;font-weight:500">Email address</label>' },
    { label: 'peer disabled', html: '<label style="font-size:14px;font-weight:500;opacity:.7;cursor:not-allowed">Email address</label>' },
  ],
  skeleton: [
    { label: 'avatar + lines', html: '<div style="display:flex;gap:16px;align-items:center"><div class="skel" style="width:48px;height:48px;border-radius:999px"></div><div style="display:flex;flex-direction:column;gap:8px"><div class="skel" style="width:220px;height:16px"></div><div class="skel" style="width:170px;height:16px"></div></div></div>' },
  ],
  card: [
    { label: 'default', html: '<div class="mini-card"><div class="mini-card__head"><div class="mini-card__title">Deployments</div><div class="mini-card__desc">Last 30 days</div></div><div class="mini-card__body" style="font-size:26px;font-weight:600">1,284</div><div class="mini-card__foot"><button class="btn btn--outline btn--sm">View all</button></div></div>' },
  ],
  alert: [
    { label: 'default', html: '<div class="alrt"><div class="alrt__title">Scheduled maintenance</div><div class="alrt__desc">The API will be read-only on Sunday from 02:00 UTC.</div></div>' },
    { label: 'destructive', html: '<div class="alrt alrt--destructive"><div class="alrt__title">Payment failed</div><div class="alrt__desc">Your card was declined. Try another payment method.</div></div>' },
  ],
  avatar: [
    { label: 'fallback', html: '<span class="avt">AL</span>' },
    { label: 'group', html: '<span style="display:inline-flex"><span class="avt" style="border:2px solid hsl(var(--background))">AL</span><span class="avt" style="border:2px solid hsl(var(--background));margin-left:-12px">GH</span><span class="avt" style="border:2px solid hsl(var(--background));margin-left:-12px">+3</span></span>' },
  ],
  separator: [
    { label: 'horizontal', html: '<div class="sep sep--h"></div>' },
    { label: 'vertical', html: '<div style="display:flex;align-items:center;gap:16px;font-size:13px">Edit<span class="sep sep--v"></span>View<span class="sep sep--v"></span>Share</div>' },
  ],
  progress: [
    { label: '0%', html: '<div class="prog"><i style="width:0%"></i></div>' },
    { label: '38%', html: '<div class="prog"><i style="width:38%"></i></div>' },
    { label: '100%', html: '<div class="prog"><i style="width:100%"></i></div>' },
  ],
  switch: [
    { label: 'off', html: '<span class="sw"></span>' },
    { label: 'on', html: '<span class="sw on"></span>' },
    { label: 'disabled', html: '<span class="sw" style="opacity:.5"></span>' },
  ],
  checkbox: [
    { label: 'unchecked', html: '<span class="cbx"></span>' },
    { label: 'checked', html: '<span class="cbx on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>' },
    { label: 'indeterminate', html: '<span class="cbx on"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14"/></svg></span>' },
  ],
  table: [
    { label: 'default', html: '<div class="table-wrap" style="max-width:440px"><table><thead><tr><th scope="col">Service</th><th scope="col">Status</th><th scope="col">Duration</th></tr></thead><tbody><tr><td style="font-weight:500">api</td><td><span class="bdg bdg--secondary">Succeeded</span></td><td>2m 14s</td></tr><tr><td style="font-weight:500">worker</td><td><span class="bdg bdg--destructive">Failed</span></td><td>0m 08s</td></tr></tbody></table></div>' },
  ],
}

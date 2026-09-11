# Agent Instructions — `design-system/components/`

**Version:** 1.0
**Last Updated:** 2026-09-11
**Audience:** AI agents building, composing or validating UI in this repository
**Scope:** Every component in `src/components/ui/` and `src/components/ai/`

---

## Start here

When the task is **implement, compose, or validate UI**, this folder is your primary working surface.

**Reading order:**

1. This file — how specs work and what wins on conflict
2. [`agent-manifest.index.json`](agent-manifest.index.json) — find a spec by component id
3. The four-file set for the component you need:
   - **`{name}/agentic-prompt.md`** — orientation, critical facts, read order
   - **`{name}/{name}.agent.json`** — structured contract: props, variants, forbidden usage, a11y
   - **`{name}/{name}.md`** — anatomy, tokens, states, examples, agent rules
   - **`{name}/{name}.preview.html`** — visual proof of every documented state
4. `src/components/{ns}/{name}.tsx` — canonical source, authoritative on conflict

**Global rules still apply:** [`/AGENT_RULES.md`](../../AGENT_RULES.md) is binding. The machine-readable mirror of those rules is [`/design-system/rules/`](../rules/).

---

## The four-file contract

Every governed component is a folder, and the folder always contains the same four files. They are not redundant — each answers a different question at a different moment.

| File | Question it answers | When you read it |
|------|--------------------|------------------|
| `agentic-prompt.md` | "What is this and what must I not get wrong?" | First, or when pasting into a fresh agent session |
| `{name}.agent.json` | "What exactly may I type?" | **Before writing markup.** Props, variants, sizes, compound structure, forbidden usage |
| `{name}.md` | "How do I use it well?" | Before styling. Anatomy, when-not-to-use, state table, token table, flows, examples |
| `{name}.preview.html` | "What does it actually look like?" | When verifying, or when the spec and your mental model disagree |

**A folder missing any of the four is incomplete**, and the component is not fully governed. Treat a missing `.agent.json` as a hard stop, not an invitation to improvise.

**Read `.agent.json` before `.md`.** The JSON is the contract; the markdown is the explanation. If you only need a prop name, you never need to open the markdown.

---

## Namespaces

This repository has two component namespaces, and mixing them is a governance violation.

| Namespace | Source | Import | Use for |
|-----------|--------|--------|---------|
| `ui:*` | `src/components/ui/` | `@/components/ui/{name}` | All standard product UI |
| `ai:*` | `src/components/ai/` | `@/components/ai/{name}` | **Only** surfaces that are AI-generated or agent-driven |

`ai:*` components carry visual signals — the AI accent, the soft surface, the attribution header — that tell a user *a machine produced this*. Using them on human-authored UI is a lie told in CSS. Using `ui:*` for AI output hides authorship. Both are forbidden; see [`FORBID_AI_IN_STANDARD_UI`](../rules/forbidden.json).

---

## Experience metadata — the AI axis

Every `ai:*` manifest carries an `experienceMetadata` block. It is **required by schema** for that namespace and absent from `ui:*` by design. It declares three things:

```json
"experienceMetadata": {
  "experienceMode": ["AI Assisted", "AI Led"],
  "aiBehavior": ["Suggest", "Confirm", "Apply", "Approve"],
  "accountability": ["Attribution", "Approval", "Audit trail"],
  "humanGestureRequired": true,
  "reversible": "conditional"
}
```

**`experienceMode`** — who is driving. *AI Assisted* means the human leads and the machine offers. *Adaptive* means the interface reshapes itself but the human can override. *AI Led* means the agent proposes and executes multi-step work.

**`aiBehavior`** — what the machine may do. These escalate: *Suggest* changes nothing. *Confirm* blocks on the human. *Apply* executes and owes an undo. *Approve* acts on the human's behalf and owes explicit consent.

**`accountability`** — what the component owes the human in return. These are not documentation; `VALIDATE_AI_ACCOUNTABILITY` checks that the rendered output satisfies each one.

**Match the component to the actual autonomy being granted.** Do not reach for an Approve-level component when the interaction is a suggestion, and never the reverse. Escalating autonomy without escalating accountability is the specific failure this metadata exists to prevent.

Full definitions: [`/design-system/rules/ai-interaction.json`](../rules/ai-interaction.json).

---

## Authority — what wins on conflict

| Priority | Source | Role |
|----------|--------|------|
| 1 | `src/components/{ns}/{name}.tsx` | Canonical implementation |
| 2 | `{name}.agent.json` | Structured contract — props, variants, rules |
| 3 | `{name}.md` | Narrative mirror — anatomy, guidance, examples |
| 4 | `{name}.preview.html` | Illustrative only, never normative |

**If a spec disagrees with `src/`, trust `src/` and implement from it now.** Note the drift; do not silently follow the stale spec. Every manifest declares its own `authority` block naming its canonical source — read it rather than assuming.

---

## `curated: true`

A manifest with `"curated": true` was written by a human. **The generator must never overwrite it.**

`npm run components:generate-manifests` regenerates manifests by parsing source files. It extracts what is mechanically derivable — exports, cva variants, prop types, Radix primitives — and it preserves every curated file untouched. Anything a parser cannot know (when *not* to use a component, what a state means, why a rule exists) is curated by hand and protected by that flag.

If you improve a generated manifest by hand, set `curated: true` or your work is lost on the next run.

---

## Closed-world rule

Only components in [`/components/COMPONENTS_INDEX.json`](../../components/COMPONENTS_INDEX.json) may be used.

Before generating code:

1. Resolve the component id (`ui:button`, `ai:ai-action`) against the index
2. Verify the import path prefix is approved
3. If the component is absent — **reject and propose**. Name the closest indexed alternatives. Never hand-roll the missing component, and never substitute silently.

---

## Rules while working in this folder

1. **Do not invent** props, variants, sizes, tokens or class names. If it is not in the `.agent.json`, it does not exist.
2. **Read `.agent.json` before writing markup.**
3. **Honor `gaps`** — a declared gap is a known limitation, not an oversight to route around.
4. **Honor `compound`** — compound parts must nest as declared. `SelectItem` outside `SelectContent` is a structural violation, not a styling preference.
5. **Use semantic tokens only** — see [`/design-system/tokens/semantic.json`](../tokens/semantic.json). Never a raw color, never a Tailwind palette utility.
6. **Never remove focus styling.** `focus-visible:ring-2 ring-ring ring-offset-2` is the baseline.
7. **Check `relatedComponents`** before picking the wrong one — `ui:dialog` vs `ui:sheet` vs `ui:drawer` vs `ui:alert-dialog` are four different decisions.
8. **`handledByRadix: true` means do not re-implement.** Adding your own `role` or focus trap on top of a Radix primitive breaks it.

---

## If you get stuck

Escalate outward in this order:

1. **`src/components/{ns}/{name}.tsx`** — the source. Always settles it.
2. **`{name}.preview.html`** — open it; every documented state is rendered.
3. **[`/design-system/graph/component-dependencies.json`](../graph/component-dependencies.json)** — what else this affects.
4. **[`/design-system/patterns/`](../patterns/)** — a composition sequence may already exist for your flow.
5. **[`/design-system/rules/`](../rules/)** — the machine-readable constraints, each citing its source doc.
6. **Radix UI documentation** — for primitive behavior this repo does not restate.

---

## Common failure modes

| Symptom | Fix |
|---------|-----|
| Prop not in `.agent.json` | Read the source; the manifest may be stale. Regenerate, then re-curate. |
| Compound part renders unstyled or errors | It is outside its required parent. Check `compound.parts`. |
| Dark mode breaks | A Tailwind palette utility or raw color slipped in. Replace with a semantic token. |
| Focus ring invisible | Something set `outline-none` without `focus-visible:ring-*`. |
| Chose the wrong overlay | `dialog` = centered modal task · `sheet` = edge panel · `alert-dialog` = destructive confirm · `popover` = light contextual · `drawer` = mobile-first bottom sheet |
| AI component on a standard surface | Wrong namespace. Use the `ui:*` equivalent. |
| `VALIDATE_AI_ACCOUNTABILITY` fails | An obligation in `experienceMetadata.accountability` has no corresponding affordance in the output. |

---

## Summary

- **Standard UI:** `/AGENT_RULES.md` → this file → `agent-manifest.index.json` → the component's four files → `src/`
- **AI-native UI:** same path, plus [`ai/llms.txt`](ai/llms.txt) and [`/design-system/rules/ai-interaction.json`](../rules/ai-interaction.json) before anything else
- **`src/` wins** when a spec disagrees
- **Never invent** — if it is not in the contract, reject and propose

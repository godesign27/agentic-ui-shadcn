# Agentic Prompt — AI Design Tokens

You are implementing or consuming **ZAIDYN AI Design Tokens** from the mirror repo.

---

## Repository

| | |
|---|---|
| **GitHub** | `https://github.com/zsainc/9904PD0068_zds-ai-mirror` |
| **Layer** | AI tokens (`components/ai/tokens/`) |
| **Status** | Active |

---

## Mandatory read order (before writing AI component code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/tokens/tokens.agent.json`
4. `components/ai/tokens/ai-tokens.ts` + `components/ai/tokens/ai-typography.ts`
5. `components/ai/tokens/typography.md` — **12px floor, weight rules, structural vs component text**
6. `components/ai/tokens/color.md` — semantic AI color roles

---

## Critical implementation facts

1. **Three tiers** — Tier 1 palettes (`ZSAI`, `ZS_ORANGE`, `ZSAI_TAN`) are for token authors only. Components consume Tier 2 (`AI.*`) and Tier 3 (`--ai-*` CSS vars).
2. **Never hardcode brand hex** — use `AI.color.*`, `AI.gradient.*`, `var(--ai-card-bg)`, etc.
3. **Typography spreads** — `...AI_TYPOGRAPHY['@zsai-*']` — no raw `fontSize` / `fontWeight`.
4. **12px hard floor** — no text below 12px. Sub-14px requires Medium (500) minimum weight.
5. **Warning = Dark Yellow** — not Orange. Orange is accent/signal only.
6. **Standard ZDS colors** live in `components/tokens/` — do not mix into AI component code except via documented bridges.

---

## Key exports

| File | Exports |
|------|---------|
| `ai-tokens.ts` | `AI`, `ZSAI`, `ZS_ORANGE`, `ZSAI_TAN`, `ZDS`, `F`, `AI_THEME` |
| `ai-typography.ts` | `AI_TYPOGRAPHY`, `AITypographyToken` |

---

## When NOT to use

- Do not import AI tokens into standard (non-AI) product pages unless the surface is explicitly AI-native.
- Do not reference `ZSAI[n]` directly in component code — use `AI.color.*`.

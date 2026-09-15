# Contracts

Retrieval-first lookup for Guild design-system components. Agents resolve approved UI from these files instead of inventing it.

## Authored vs generated

| Kind | Where | Edit? |
| --- | --- | --- |
| **Authored** | `{slug}.contract.json` next to each component under `design-system/components/` | Yes. These are the source contracts. Prefer filling gaps here (or in the spec/manifest the generator reads). |
| **Generated** | this folder (`component-index.json`, `*.generated.json`) | **No.** Produced by `npm run contracts:ingest`. Hand-edits are overwritten. |

The JSON schema for authored contracts is [`design-system/schemas/component-contract.schema.json`](../design-system/schemas/component-contract.schema.json).

```
design-system/components/ai/atomic/ai-button/ai-button.contract.json   ← authored
contracts/component-index.json                                        ← generated
contracts/components.generated.json
contracts/tokens.generated.json
contracts/patterns.generated.json
contracts/governance.generated.json
contracts/gaps.generated.json
```

Regenerate with `npm run contracts:build`. Schema and scripts live under `/ingestion/` and `design-system/schemas/`. Brand is Guild. Concierge / specialist agents are not in this layer.

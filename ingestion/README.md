# Contract ingestion

Phase 0 of the retrieval-first contracts model. Local `{slug}.contract.json` files are the authored machine contracts. This folder scans them and writes the generated lookup layer under `/contracts/`.

Do not build the concierge or specialist runtime here.

## Commands

```bash
npm run contracts:generate   # write {slug}.contract.json next to each component
npm run contracts:ingest     # scan local contracts → /contracts/*.generated.json
npm run contracts:build      # generate + ingest
npm run contracts:check      # fail if generated files are stale
```

Generate reads `{slug}.md`, `{slug}.agent.json`, and TSX. Missing status, tokens, props, Figma/Code Connect, and similar fields are recorded as **gaps**. They are never guessed, and status is never set to `approved`.

Brand in new contract content is **Guild** only.

# AI components

**Agents: start at [`agent-instructions.md`](agent-instructions.md), then [`llms.txt`](llms.txt).**

This folder holds AI-native specs for the shadcn implementation repo. Architecture matches the ZAIDYN AI Pattern Library (`zds-ai/components/ai/`).

```
design-system/components/ai/
  {slug}/          # governed shadcn AI kit (existing ports; src is canonical)
  foundations/     # FND — imported zds-ai specs
  atomic/          # ATM (formerly atoms)
  molecules/       # MOL
  organisms/       # ORG (formerly groups)
  pages/           # PG
  patterns/        # PT
  data-viz/        # DV
  tokens/          # TK
  _support/
```

Runtime React for the imported architecture lives at `src/components/ai/{foundations,atomic,molecules,organisms,patterns,pages,data-viz,tokens,_support}/`. That snapshot is excluded from this repo’s strict `tsc` (inline-style library, not shadcn CVA). Specs-only tiers (`foundations/`, `data-viz/`) have no TSX.

Do **not** use a `groups/` folder. Governed kit index: [`llms.txt`](llms.txt). Imported library registry: [`registry.v1.2.json`](registry.v1.2.json). Previews: [`preview/preview.html`](preview/preview.html).

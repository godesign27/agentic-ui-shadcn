# AI runtime

Two trees share this folder:

- **Governed shadcn ports** — top-level `ai-*.tsx`. These are what the UI Kit and `ds:build` inventory use. Import as `@/components/ai/ai-button`.
- **Imported zds-ai architecture** — `foundations/`, `atomic/`, `molecules/`, `organisms/`, `patterns/`, `pages/`, `data-viz/`, `tokens/`, `_support/`. Relative imports inside that tree stay intact. Import as `@/components/ai/atomic/ai-avatar/AIAvatar`.

Specs for the architecture live under `design-system/components/ai/` with the same tier folders. `foundations/` and `data-viz/` are spec-only in this import. The architecture TSX is excluded from the kit’s strict `tsc`. Do not add a `groups/` directory.

# AI shared support modules

Self-contained helpers used by organisms (chat patterns, skill menu, hooks).

Agents: import from here with relative paths — do **not** require `an external AI UI package`.

| File | Role |
|------|------|
| `AIResponsePatterns.tsx` | Analytical / Q&A / actionable response patterns |
| `useAIChat.ts` | Demo chat state hook |
| `SkillMenu.tsx` | `/ Skills` picker for input toolbars |
| `clipboard.ts` | Clipboard helpers |

Tokens live in `../tokens/`.

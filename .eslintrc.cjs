module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // The design system co-locates each component with its cva helper —
      // buttonVariants, badgeVariants, aiActionVariants — which is the shadcn
      // convention and what design-system/rules/naming.json mandates.
      //
      // react-refresh/only-export-components fires on every one of them.
      // allowConstantExport does not cover these: the helper is the result of a
      // cva() call, not a literal constant, so the rule cannot see it as safe.
      //
      // The cost is a full reload instead of a hot update when editing a
      // component file in dev. The alternative is splitting 20+ files in two,
      // which would break the documented import paths for no user-facing gain.
      files: ['src/components/**/*.{ts,tsx}'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
    {
      // Imported zds-ai architecture uses inline-style token modules, remixicon,
      // and a looser TS style than the governed shadcn kit. Lint it as a library
      // snapshot rather than rewriting hundreds of files on import.
      files: [
        'src/components/ai/foundations/**/*.{ts,tsx}',
        'src/components/ai/atomic/**/*.{ts,tsx}',
        'src/components/ai/molecules/**/*.{ts,tsx}',
        'src/components/ai/organisms/**/*.{ts,tsx}',
        'src/components/ai/patterns/**/*.{ts,tsx}',
        'src/components/ai/pages/**/*.{ts,tsx}',
        'src/components/ai/data-viz/**/*.{ts,tsx}',
        'src/components/ai/tokens/**/*.{ts,tsx}',
        'src/components/ai/_support/**/*.{ts,tsx}',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'no-empty': 'off',
        'prefer-const': 'off',
      },
    },
    {
      // Type re-exports and context hooks legitimately live beside components.
      files: ['src/hooks/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
}

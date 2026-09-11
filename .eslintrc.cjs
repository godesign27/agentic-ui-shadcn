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
      // Type re-exports and context hooks legitimately live beside components.
      files: ['src/hooks/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
}

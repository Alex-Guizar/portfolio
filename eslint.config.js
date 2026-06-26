import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  { ignores: ['dist'] },

  // CJS config files need Node globals
  {
    files: ['**/*.cjs'],
    languageOptions: { globals: globals.node },
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript flat config (array — spread it)
  ...tsPlugin.configs['flat/recommended'],

  // React hooks + refresh
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  // Browser globals for all source files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // TS parser for TS files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {},
  },
]

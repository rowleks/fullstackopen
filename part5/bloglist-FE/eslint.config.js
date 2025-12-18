import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      prettier,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    settings: { react: { version: '18.3' } },

    rules: {
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      semi: ['error', 'never'],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'object-shorthand': ['warn', 'always'],
      'prefer-template': 'warn',
      'no-duplicate-imports': 'error',
      'require-await': 'warn',
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
      'prefer-destructuring': ['warn', { object: true, array: false }],
    },
  },

  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },

  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
])

import js from '@eslint/js'
import globals from 'globals'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Recommended JS rules
  js.configs.recommended,

  // Prettier recommended config (includes plugin, rules, and disables conflicts)
  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Custom rules
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-var': 'error',
      'object-shorthand': ['warn', 'always'],
      'prefer-template': 'warn',
      'no-duplicate-imports': 'error',
      'require-await': 'warn',
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
      'prefer-destructuring': ['warn', { object: true, array: false }],
    },
  },

  // Separate config for CommonJS files
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
])

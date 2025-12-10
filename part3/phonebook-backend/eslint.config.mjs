import js from '@eslint/js'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Recommended JS rules
  js.configs.recommended,

  // Prettier config to disable conflicting rules
  prettierConfig,

  {
    files: ['**/*.{js,mjs,cjs}'],

    plugins: {
      prettier: prettierPlugin,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Prettier integration
      'prettier/prettier': ['error'],

      // Your custom rules
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
]

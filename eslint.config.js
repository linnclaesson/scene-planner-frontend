import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import reactPlugin from 'eslint-plugin-react';


export default tseslint.config(
  {
    ignores: [
      'dist',
      "node_modules"
    ]
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-curly-brace-presence': ['warn', { props: "never", children: "never" }],
      'react/jsx-key': 'error',
      // JS rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'default-case': 'warn',
      'no-else-return': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      'object-shorthand': ['warn', 'always'],
      'no-empty-function': 'warn',
      // TS rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      "@typescript-eslint/array-type": ["warn", { default: "array" }],
      // Prettier rules, set in .prettierrc
      "prettier/prettier": "warn",
    },
  },
)

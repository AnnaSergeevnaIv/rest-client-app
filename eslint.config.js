import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from './next-plugin.config.js';
import prettierConfig from './prettier.config.js';

const ECMA_VERSION = 2022;
const MAX_LINES_PER_FUNCTION = 120;

export default defineConfig([
  ...nextPlugin,
  { ignores: ['dist', '**/*.test.ts', '**/*.test.js', '**/*.test.tsx'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        ecmaFeatures: { jsx: true },
        ecmaVersion: ECMA_VERSION,
        sourceType: 'module',
        project: './tsconfig.json',
        globals: globals.browser,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
      'react-compiler': eslintPluginReactCompiler,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      'react-compiler/react-compiler': 'error',
      'max-len': [
        'warn',
        {
          code: prettierConfig.printWidth,
          tabWidth: prettierConfig.tabWidth,
        },
      ],
      'max-lines-per-function': [
        'warn',
        {
          max: MAX_LINES_PER_FUNCTION,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_[^_].*$|^_$',
          varsIgnorePattern: '^_[^_].*$|^_$',
          caughtErrorsIgnorePattern: '^_[^_].*$|^_$',
        },
      ],
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
          },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);

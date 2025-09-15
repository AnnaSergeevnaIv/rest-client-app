import eslintPluginNext from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    plugins: {
      '@next/next': eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
    },
  },
]);

import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    ignores: ['node_modules/*', '.git/', 'dist/**/*'],
    rules: {
      'prefer-const': 1,
      'no-console': 1,
    },
  },
];

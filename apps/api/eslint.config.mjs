import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      semi: 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
        },
      ],

      'no-undef': 'off',
    },
  },
);

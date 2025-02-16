// import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  // ...fixupConfigRules([]),
  { ignores: ['dist/', 'src/**/fonts/'] },
];

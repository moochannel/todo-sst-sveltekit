import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'

import svelteConfig from './packages/frontend/svelte.config.js'

export default ts.config(
  {
    ignores: [
      './**/node_modules/',
      '.sst/',
      'packages/frontend/build/',
      'packages/frontend/.svelte-kit/',
      'packages/frontend/package/',
    ],
  },
  // JavaScript
  js.configs.recommended,
  // TypeScript
  ...ts.configs.recommendedTypeChecked,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,

  // Prettier
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
  {
    files: [
      'eslint.config.js',
      'packages/frontend/svelte.config.js',
      'packages/frontend/tailwind.config.ts',
      'packages/frontend/postcss.config.js',
      'packages/frontend/drizzle.config.ts',
    ],
    ...ts.configs.disableTypeChecked,
  },
  {
    files: ['packages/frontend/**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
)

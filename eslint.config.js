import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import ts from 'typescript-eslint'

export default ts.config(
  {
    ignores: ['./**/node_modules/', '.sst/'],
  },
  // JavaScript
  js.configs.recommended,
  // TypeScript
  ...ts.configs.recommendedTypeChecked,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['eslint.config.js'],
    ...ts.configs.disableTypeChecked,
  },
  // Prettier
  eslintConfigPrettier,
)

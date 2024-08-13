import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      '*.min.js',
      '.config/*',
      'coverage/',
    ],
  },
]

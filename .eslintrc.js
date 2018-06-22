module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/extensions': 0,
    // Disabled due to babel-eslint bug (and enforced by prettier anyway):
    // https://github.com/babel/babel-eslint/issues/530
    // indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    // Disabled to a bug causing false positive warnings, pending this PR being
    // merged: https://github.com/evcohen/eslint-plugin-jsx-a11y
    'jsx-a11y/heading-has-content': 0,
    'keyword-spacing': 'error',
    'no-console': 'warn',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: false }],
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': 'error',
    'react/display-name': 0,
    'react/jsx-boolean-value': 2,
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-closing-tag-location': 2,
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 1,
    'react/no-unused-state': 1,
    'react/prefer-stateless-function': 1,
    'react/require-default-props': 1,
    'react/prop-types': 2,
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  plugins: ['import', 'jest', 'prettier'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  globals: {
    __DEV__: true,
    __ENV__: true,
  },
}

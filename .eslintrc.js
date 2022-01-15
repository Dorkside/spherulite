module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['google', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'max-len': ['error', { code: 150 }],
    'require-jsdoc': 'off',
    semi: 'off',
    'prettier/prettier': ['error', { arrowParens: 'avoid' }],
    'vue/multi-word-component-names': 'off',
    camelcase: 'off',
    'no-debugger': 'error'
  }
}

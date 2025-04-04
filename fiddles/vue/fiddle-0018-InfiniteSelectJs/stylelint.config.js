module.exports = {
    ignoreFiles: ['**/*.less'],
    extends: [
      'stylelint-config-recommended',
      'stylelint-config-recommended-vue',
      'stylelint-config-standard',
    ],
    rules: {
      'function-no-unknown': [true, { ignoreFunctions: ['v-bind'] }],
      "at-rule-no-unknown": [true, {
        "ignoreAtRules": ["tailwind"]
      }]
    },
  }
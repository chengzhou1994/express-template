module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['standard'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-undef': 'off',
    'no-constant-condition': 'off'
  }
}

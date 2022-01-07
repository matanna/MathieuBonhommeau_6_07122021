module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    strict: 1
  },
  ignorePatterns: ['/dist/*']
}

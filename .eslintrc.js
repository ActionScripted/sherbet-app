module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2, {'SwitchCase': 1}],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'react/prop-types': 0,
    'semi': ['error', 'always']
  }
};

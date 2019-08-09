module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'google',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'rules': {
        'indent': ['error', 2, { "SwitchCase": 1 }],
        'max-len': 0,
        'require-jsdoc': 0, // Added just temporarily
        'camelcase': 0,
        'semi': ["error", "never"],
    },
};

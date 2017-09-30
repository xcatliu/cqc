module.exports = {
    extends: [
        'plugin:vue/base'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
            modules: true
        }
    },
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    plugins: [
        'vue'
    ],
    rules: {
        complexity: [
            'error',
            {
                max: 1
            }
        ]
    }
};

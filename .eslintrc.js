module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: [
        'plugin:vue/recommended',
        
    ],
    globals: {
        process: true,
        require: true,
        NGJsBridge: true,
        wx: true,
        sa: true,
        OSS: true,
        module: true,
        WeixinJSBridge: true,
        define: true,
        mbUploadify: true
    },
    rules: {
        'camelcase': 'off',
        'eqeqeq': 'off',
        'no-extend-native': 'off',
        'no-useless-escape': 'warn',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never'
        }],
        'vue/no-v-html': 'off',
        'vue/no-use-v-if-with-v-for': ["error", {
            "allowUsingIterationVar": true
        }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
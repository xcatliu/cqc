const path = require('path');
const babelEslintParser = require('babel-eslint');
const vueEslintParser = require('vue-eslint-parser');

module.exports = function getParserFromFilepath(filepath) {
    const extension = path.extname(filepath).slice(1);

    if (extension === 'vue') {
        return vueEslintParser;
    }

    return babelEslintParser;
};

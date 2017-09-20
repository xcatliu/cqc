const path = require('path');

const TokenizerFactory = require('jscpd/lib/tokenizer/TokenizerFactory');

const languageToExtentionMap = TokenizerFactory.prototype.LANGUAGES;
const extensionToLanguageMap = {};

Object.keys(languageToExtentionMap).forEach((language) => {
    languageToExtentionMap[language].forEach((extention) => {
        extensionToLanguageMap[extention] = language;
    });
});

module.exports = function getLanguageFromFilepath(filepath) {
    const extension = path.extname(filepath).slice(1);
    const result = extensionToLanguageMap[extension];
    if (typeof result === 'undefined') {
        return 'js';
    }
    return result;
};

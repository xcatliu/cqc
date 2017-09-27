const _ = require('lodash');

// Override the logger level for jscpd, so there will be no stdout anymore
const logger = require('winston');
logger.level = 'error';

const JsCpd = require('jscpd');
const jscpd = new JsCpd();

const BaseChecker = require('../BaseChecker');
const getLanguageFromFilepath = require('./getLanguageFromFilepath');
const CheckerResult = require('../CheckerResult');

const customRepoterPath = require.resolve('./jscpdReporter.js');

class JscpdChecker extends BaseChecker {
    check(...args) {
        const baseResult = super.check(...args);

        const languages = this.getLanguages();
        const jscpdOptions = _.merge({
            languages,
            reporter: customRepoterPath
        }, this.options, {
            files: this.fileList
        });
        const jscpdResult = jscpd.run(jscpdOptions);

        return new CheckerResult(_.merge({}, baseResult, {
            jscpd: {
                percentage: jscpdResult.report.statistics.percentage
            }
        }, {
            jscpd: jscpdResult
        }));
    }
    getLanguages() {
        const languages = [];

        this.fileList.forEach((filepath) => {
            const language = getLanguageFromFilepath(filepath);
            if (languages.indexOf(language) !== -1) {
                return;
            }
            languages.push(language);
        });

        return languages;
    }
}

module.exports = JscpdChecker;

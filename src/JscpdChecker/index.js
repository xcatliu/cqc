const _ = require('lodash');

// Override the logger level for jscpd, so there will be no stdout anymore
const logger = require('winston');
logger.level = 'error';

const JsCpd = require('jscpd');
const jscpd = new JsCpd();

const BaseChecker = require('../BaseChecker');
const getLanguageFromFilepath = require('./getLanguageFromFilepath');

const customRepoterPath = require.resolve('./reporter.js');

class JscpdChecker extends BaseChecker {
    check(...args) {
        const result = super.check(...args);

        const languages = this.getLanguages();
        const jscpdOptions = _.merge({
            languages,
            reporter: customRepoterPath
        }, this.options, {
            files: this.fileList
        });
        const jscpdResult = jscpd.run(jscpdOptions);

        _.merge(result, {
            jscpd: {
                percentage: jscpdResult.report.statistics.percentage
            }
        });

        if (this.options.verbose) {
            _.merge(result, {
                jscpd: jscpdResult
            });
        }

        return result;
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

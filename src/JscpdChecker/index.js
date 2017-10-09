const _ = require('lodash');

// Override the logger level for jscpd, so there will be no stdout anymore
const logger = require('winston');
logger.level = 'error';

const JsCpd = require('jscpd');
const jscpd = new JsCpd();

const BaseChecker = require('../BaseChecker');
const getLanguageFromFilepath = require('./getLanguageFromFilepath');
const CheckerResult = require('../CheckerResult');

class JscpdChecker extends BaseChecker {
    check(...args) {
        super.check(...args);

        const languages = this.getLanguages();
        const jscpdOptions = _.merge({
            languages,
            reporter: 'json',
            limit: 100
        }, this.options, {
            files: this.fileList,
            'min-lines': this.options.jscpdMinLines,
            'min-tokens': this.options.jscpdMinTokens
        });
        const jscpdResult = jscpd.run(jscpdOptions);

        const result = _.merge({
            jscpd: {
                percentage: jscpdResult.report.statistics.percentage
            }
        }, {
            jscpd: jscpdResult
        });

        if (this.options.filterPattern) {
            // Get the filterClones
            const filterClones = result.jscpd.map.clones.filter(({ firstFile, secendFile }) => {
                for (let i = 0; i < this.filterFileList.length; i++) {
                    // If the filepath is same, then return true
                    if (this.filterFileList[i] === firstFile || this.filterFileList[i] === secendFile) {
                        return true;
                    }
                }
                return false;
            });

            const filterDuplicates = filterClones.map((clone) => {
                // Keep the structure same with duplicates property
                return {
                    lines: clone.linesCount,
                    tokens: clone.tokensCount,
                    firstFile: {
                        start: clone.firstFileStart,
                        name: clone.firstFile
                    },
                    secondFile: {
                        start: clone.secondFileStart,
                        name: clone.secondFile
                    },
                    fragment: _.escape(clone.getLines())
                };
            });

            result.jscpd.report.filterDuplicates = filterDuplicates;
        }

        return new CheckerResult(result, this.options);
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

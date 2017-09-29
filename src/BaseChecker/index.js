const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const globby = require('globby');

const CheckerResult = require('../CheckerResult');
const defaultCqcReporter = require('../CheckerResult/cqcReporter');

const whiteSpaceOrComma = /[\s,]+/;
const defaultOptions = {
    jscpdMinLines: 5,
    jscpdMinTokens: 70,
    complexityMax: 10,
    cqcReporter: defaultCqcReporter
};

// Use Symbol to create private variables
// https://curiosity-driven.org/private-properties-in-javascript
const _baseOptions = Symbol('baseOptions');

class BaseChecker {
    constructor(options = {}) {
        this[_baseOptions] = _.merge({}, defaultOptions, options);
    }

    check(patterns, options = {}) {
        this.patterns = patterns;
        this.options = _.merge({}, this[_baseOptions], options);

        this.fileList = this.getFileList();

        const result = {
            base: {
                numberOfFiles: this.fileList.length,
                fileList: this.fileList.map((filepath) => {
                    return path.resolve(filepath);
                })
            }
        };

        if (this.options.filterPattern) {
            this.filterFileList = this.getFilterFileList();
            result.base.filterFileList = this.filterFileList;
        }

        return new CheckerResult(result, this.options);
    }

    getFileList() {
        const { ignorePath, ignorePattern } = this.options;

        let ignorePatternList = [];
        if (ignorePath) {
            const ignorePathList = ignorePath.split(whiteSpaceOrComma);
            ignorePathList.forEach((currentIgnorePath) => {
                const currentIgnorePattern = fs.readFileSync(currentIgnorePath, 'utf-8').split(whiteSpaceOrComma);
                ignorePatternList = ignorePatternList.concat(currentIgnorePattern);
            });
        }
        if (ignorePattern) {
            const currentIgnorePattern = ignorePattern.split(whiteSpaceOrComma);
            ignorePatternList = ignorePatternList.concat(currentIgnorePattern);
        }

        const globbyOptions = {
            nodir: true
        };
        if (ignorePatternList.length > 0) {
            globbyOptions.ignore = ignorePatternList;
        }
        return globby.sync(this.patterns, globbyOptions);
    }

    getFilterFileList() {
        let filterPatternList = this.options.filterPattern.split(whiteSpaceOrComma);

        const globbyOptions = {
            nodir: true
        };

        let filterFileList = globby.sync(filterPatternList, globbyOptions);
        filterFileList = filterFileList.map((filepath) => {
            return path.resolve(filepath);
        });
        return filterFileList;
    }
}

module.exports = BaseChecker;

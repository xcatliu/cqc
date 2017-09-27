const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const globby = require('globby');

const CheckerResult = require('../CheckerResult');

const whiteSpaceOrComma = /[\s,]+/;

class BaseChecker {
    constructor(options = {}) {
        this.baseOptions = options;
    }
    check(patterns, options = {}) {
        this.patterns = patterns;
        this.options = _.merge({}, this.baseOptions, options);

        this.fileList = this.getFileList();

        return new CheckerResult({
            numberOfFiles: this.fileList.length,
            fileList: this.fileList.map((filepath) => {
                return path.resolve(filepath);
            })
        });
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
}

module.exports = BaseChecker;

const path = require('path');

const _ = require('lodash');
const globby = require('globby');

const defaultOptions = {
    verbose: false
};

class BaseChecker {
    constructor(options = {}) {
        this.baseOptions = _.merge({}, defaultOptions, options);
    }
    check(patterns, options = {}) {
        this.patterns = patterns;
        this.options = _.merge({}, this.baseOptions, options);

        this.fileList = this.getFileList();

        if (this.options.verbose) {
            return {
                numberOfFiles: this.fileList.length,
                fileList: this.fileList.map((filepath) => {
                    return path.resolve(filepath);
                })
            };
        }

        return {
            numberOfFiles: this.fileList.length
        };
    }
    getFileList() {
        const { ignore } = this.options;
        const globbyOptions = {
            nodir: true
        };
        if (ignore) {
            globbyOptions.ignore = ignore;
        }
        return globby.sync(this.patterns, globbyOptions);
    }
}

module.exports = BaseChecker;

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

        let result = {
            numberOfFiles: this.fileList.length
        };

        if (this.options.verbose) {
            _.merge(result, {
                fileList: this.fileList.map((filepath) => {
                    return path.resolve(filepath);
                })
            });
        }

        return result;
    }
    getFileList() {
        const { ignore } = this.options;
        if (ignore) {
            return globby.sync(this.patterns, { ignore });
        }
        return globby.sync(this.patterns);
    }
}

module.exports = BaseChecker;

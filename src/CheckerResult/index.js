const _ = require('lodash');

const defaultReporter = require('./reporter');

const defaultOptions = {
    verbose: false
};

class CheckerResult {
    constructor(checkResult) {
        Object.keys(checkResult).forEach((key) => {
            this[key] = checkResult[key];
        });
    }
    report(options = {}) {
        let reporter = options.reporter || defaultReporter;

        reporter(this, _.merge({}, defaultOptions, _.pick(options, [
            'format',
            'verbose',
            'filterPattern'
        ])));
    }
}

module.exports = CheckerResult;

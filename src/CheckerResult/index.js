const _ = require('lodash');

// Use Symbol to create private variables
// https://curiosity-driven.org/private-properties-in-javascript
const _baseOptions = Symbol('baseOptions');

class CheckerResult {
    constructor(resultObject, options = {}) {
        this[_baseOptions] = options;

        Object.keys(resultObject).forEach((key) => {
            this[key] = resultObject[key];
        });
    }
    report(options = {}) {
        const reporterOptions = _.merge({}, this[_baseOptions], options);

        reporterOptions.cqcReporter(this, reporterOptions);
    }
}

module.exports = CheckerResult;

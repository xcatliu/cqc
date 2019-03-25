const _ = require('lodash');
const logStdout = require('./logStdout');
const fs = require('fs');

function cqcReporter(resultObject, options = {}) {
    const {
        format,
        thresholdJscpd,
        thresholdComplexity,
        jsonPath,
    } = options;

    // Add threshold to JSON, add filter details if necessary
    const result = processResult(resultObject, options);

    if (format === 'json') {
        fs.writeFile(jsonPath, JSON.stringify(result, null, 4), 'utf-8', (err) => {
            if (err) throw err;
            console.log('save file success');
        });
        console.log(JSON.stringify(result, null, 4));
    } else {
        logStdout(result, options);
    }

    let shouldExit = false;
    if (typeof thresholdJscpd !== 'undefined' && result.jscpd.percentage > thresholdJscpd) {
        shouldExit = true;
    }
    if (typeof thresholdComplexity !== 'undefined' && result.complexity.percentage > thresholdComplexity) {
        shouldExit = true;
    }
    if (shouldExit) {
        process.exit(1);
    }
}

function processResult(resultObject, options) {
    const {
        verbose,
        thresholdJscpd,
        thresholdComplexity
    } = options;

    if (!verbose) {
        return simplifyResult(resultObject, options);
    }

    let result = _.cloneDeep(resultObject);
    if (result.jscpd && typeof thresholdJscpd !== 'undefined') {
        result.jscpd.threshold = thresholdJscpd;
    }
    if (result.complexity && typeof thresholdComplexity !== 'undefined') {
        result.complexity.threshold = thresholdComplexity;
    }

    return result;
}

function simplifyResult(result, { thresholdJscpd, thresholdComplexity }) {
    const simplifiedResult = {};

    if (result.base) {
        simplifiedResult.base = {
            numberOfFiles: result.base.numberOfFiles
        };
    }
    if (result.sloc) {
        simplifiedResult.sloc = {
            source: result.sloc.source
        };
    }
    if (result.jscpd) {
        simplifiedResult.jscpd = {
            percentage: result.jscpd.percentage
        };
        if (typeof thresholdJscpd !== 'undefined') {
            simplifiedResult.jscpd.threshold = thresholdJscpd;
        }
    }
    if (result.complexity) {
        simplifiedResult.complexity = {
            percentage: result.complexity.percentage,
            max: result.complexity.max
        };
        if (typeof thresholdComplexity !== 'undefined') {
            simplifiedResult.complexity.threshold = thresholdComplexity;
        }
    }

    return simplifiedResult;
}

module.exports = cqcReporter;

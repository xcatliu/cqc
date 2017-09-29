// Custom reporter https://github.com/kucherenko/jscpd#reporters
// Ref https://github.com/kucherenko/jscpd/blob/master/src/reporters/json.coffee
// and https://github.com/kucherenko/jscpd/blob/master/src/reporters/_std-log.coffee

const _ = require('lodash');
const jsonReporter = require('jscpd/lib/reporters/json');

function jscpdReporter(options) {
    // Pass filterFiles option will enhance the result with an extro property: filterDuplicates
    const filterFiles = options.filterFiles;
    // If no filterFiles is passed, then we just return the origin report with our custom logger
    if (typeof filterFiles === 'undefined' || filterFiles.length === 0) {
        return reporterOrigin.call(this, options);
    }

    // Calling the origin reporter and add an extro property filterDuplicates
    const jsonReporterResult = jsonReporter.call(this, options);

    // Get the filterClones
    const filterClones = this.map.clones.filter(({ firstFile, secendFile }) => {
        for (let i = 0; i < filterFiles.length; i++) {
            // If the filepath is same, then return true
            if (filterFiles[i] === firstFile || filterFiles[i] === secendFile) {
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

    // Add an extro property filterDuplicates to result
    const result = _.merge({}, jsonReporterResult, {
        filterDuplicates
    });

    const percentage = this.map.getPercentage();
    const limit = options.limit;
    // Custom logger
    const log = getDuplicatesLog(filterDuplicates) + getPercentageLog({
        percentage,
        limit
    });

    if (percentage > limit) {
        // If the percentage is greater than limit, then we just output the log and exit the process. Keep the logic same with _std-log.coffee
        console.error(log);
        process.exit(1);
    }

    // The first one is the output json
    // The second one is the content which need to be writen to the output file
    // The third one is the content which will output to the stdout
    return [result, JSON.stringify(result, null, 4), log];
}

function reporterOrigin(options) {
    // Calling the origin reporter
    const jsonReporterResult = jsonReporter.call(this, options);
    const percentage = this.map.getPercentage();
    const limit = options.limit;

    // The log is the third args of the return array, which will output to the stdout
    const log = getPercentageLog({
        percentage,
        limit
    });

    if (percentage > limit) {
        // If the percentage is greater than limit, then we just output the log and exit the process. Keep the logic same with _std-log.coffee
        console.error(log);
        process.exit(1);
    }

    // The first one is the output json
    // The second one is the content which need to be writen to the output file
    // The third one is the content which will output to the stdout
    return [jsonReporterResult[0], jsonReporterResult[1], log];
}

function getDuplicatesLog(filterDuplicates) {
    if (filterDuplicates.length === 0) {
        return 'No duplicated code';
    }
    return filterDuplicates.reduce((prev, clone) => {
        // Keep the same structure with _std-log.coffee
        return `${prev}
\t- ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}
\t  ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}
`;
    }, 'Duplicated code:\r\n');
}

function getPercentageLog({ percentage, limit }) {
    if (percentage > limit) {
        return `\r\nError: jscpd found too many duplicates (${percentage}%) over threshold (${limit}%)\r\n`;
    }
    return `\r\nGood, The duplicate rate is ${percentage}% which is less than ${limit}%\r\n`;
}

module.exports = jscpdReporter;

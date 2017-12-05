const newLine = `
`;

function logStdout(result, options) {
    const {
        verbose,
        thresholdJscpd,
        thresholdComplexity
    } = options;

    if (verbose) {
        logVerbose(result);
    } else {
        logSimple(result);
    }
    // Log a new line if threshold is given
    if (typeof thresholdJscpd !== 'undefined' || typeof thresholdComplexity !== 'undefined') {
        console.log('');
    }
    logThreshold(result, options);
}

function logVerbose(result) {
    let logArray = [];

    // Files
    if (result.base) {
        logArray.push(`Number of files: ${result.base.numberOfFiles}`);

        if (result.base.filterFileList) {
            logArray.push('File list (filtered):');
            result.base.filterFileList.forEach((filepath) => {
                logArray.push(`    - ${filepath}`);
            });
        } else {
            logArray.push('File list:');
            result.base.fileList.forEach((filepath) => {
                logArray.push(`    - ${filepath}`);
            });
        }
    }

    // Source lines of code
    if (result.sloc) {
        logArray.push('');
        logArray.push(`Physical lines:             ${result.sloc.total}`);
        logArray.push(`Source lines of code:       ${result.sloc.source}`);
        logArray.push(`Comments:                   ${result.sloc.comment}`);
        logArray.push(`Single-line comments:       ${result.sloc.single}`);
        logArray.push(`Block comments:             ${result.sloc.block}`);
        logArray.push(`Mixed source and comments:  ${result.sloc.mixed}`);
        logArray.push(`Empty lines:                ${result.sloc.empty}`);
        logArray.push(`TODO's:                     ${result.sloc.todo}`);
    }

    // Duplicate code
    if (result.jscpd) {
        logArray.push('');
        logArray.push(`Duplicate rate:             ${result.jscpd.percentage}%`);

        if (result.jscpd.percentage !== '0.00') {
            logArray.push(`Files of duplicated code:   ${result.jscpd.report.statistics.files}`);
            logArray.push(`Count of duplicated code:   ${result.jscpd.report.statistics.clones}`);
            logArray.push(`Lines of duplicated code:   ${result.jscpd.report.statistics.duplications}`);

            if (result.jscpd.report.filterDuplicates) {
                logArray.push('Duplication details (filtered):');
                result.jscpd.report.filterDuplicates.forEach((clone) => {
                    logArray.push(`    - ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}`);
                    logArray.push(`      ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}`);
                });
            } else {
                logArray.push('Duplication details:');
                result.jscpd.report.duplicates.forEach((clone) => {
                    logArray.push(`    - ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}`);
                    logArray.push(`      ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}`);
                });
            }
        }
    }

    // Complexity
    if (result.complexity) {
        logArray.push('');
        logArray.push();
        logArray.push(`High complexity rate:                ${result.complexity.percentage}%`);
        logArray.push(`Number of functions:                 ${result.complexity.numberOfFunctions}`);
        logArray.push(`Number of high complexity functions: ${result.complexity.numberOfHighComplexityFunctions}`);

        if (result.complexity.percentage !== '0.00') {
            if (result.complexity.filterDetails) {
                logArray.push('Complexity details (filtered):');
                result.complexity.filterDetails.forEach((detail) => {
                    logArray.push(`    - ${detail.filepath}`);
                    detail.details.forEach(({ line, endLine, complexity }) => {
                        logArray.push(`        ${line}-${endLine}: complexity ${complexity}`);
                    });
                });
            } else {
                logArray.push('Complexity details:');
                result.complexity.details.forEach((detail) => {
                    logArray.push(`    - ${detail.filepath}`);
                    detail.details.forEach(({ line, endLine, complexity }) => {
                        logArray.push(`        ${line}-${endLine}: complexity ${complexity}`);
                    });
                });
            }
        }
    }

    console.log(logArray.join(newLine));
}

function logSimple(result) {
    let logArray = [];

    if (result.base) {
        logArray.push(`Number of files:        ${result.base.numberOfFiles}`);
    }
    if (result.sloc) {
        logArray.push(`Source lines of code:   ${result.sloc.source}`);
    }
    if (result.jscpd) {
        logArray.push(`Duplicate rate:         ${result.jscpd.percentage}%`);
    }
    if (result.complexity) {
        logArray.push(`High complexity rate:   ${result.complexity.percentage}%`);
    }

    console.log(logArray.join(newLine));
}

function logThreshold(result, { verbose, thresholdJscpd, thresholdComplexity }) {
    if (typeof thresholdJscpd !== 'undefined') {
        if (result.jscpd.percentage > thresholdJscpd) {
            console.error(`Oops, duplicate rate is MORE than threshold ${thresholdJscpd}%, please check the details${verbose ? '' : ' by adding --verbose option'}.`);
        } else {
            console.log(`Good, duplicate rate is LESS than threshold ${thresholdJscpd}%`);
        }
    }

    if (typeof thresholdComplexity !== 'undefined') {
        if (result.complexity.percentage > thresholdComplexity) {
            console.error(`Oops, high complexity rate is MORE than threshold ${thresholdComplexity}%, please check the details${verbose ? '' : ' by adding --verbose option'}.`);
        } else {
            console.log(`Good, high complexity rate is LESS than threshold ${thresholdComplexity}%`);
        }
    }
}

module.exports = logStdout;

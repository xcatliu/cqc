const newLine = `
`;

function reporter(checkerResult, options = {}) {
    const {
        format,
        verbose,
        // filterPattern
    } = options;

    let result;
    if (verbose) {
        result = checkerResult;
    } else {
        result = simplifyResult(checkerResult);
    }

    if (format === 'json') {
        console.log(JSON.stringify(result, null, 4));
        return;
    }

    if (verbose) {
        console.log(getVerboseLog(result));
        return;
    }

    console.log(getSimpleLog(result));
}

function simplifyResult(result) {
    const simplifiedResult = {};

    if (typeof result.numberOfFiles !== 'undefined') {
        simplifiedResult.numberOfFiles = result.numberOfFiles;
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
    }
    if (result.complexity) {
        simplifiedResult.complexity = {
            percentage: result.complexity.percentage,
            max: result.complexity.max
        };
    }

    return simplifiedResult;
}

function getVerboseLog(result) {
    let logArray = [];

    // Files
    if (typeof result.numberOfFiles !== 'undefined') {
        logArray.push(`Number of files: ${result.numberOfFiles}`);
        logArray.push('File list:');
        result.fileList.forEach((filepath) => {
            logArray.push(`    - ${filepath}`);
        });
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
            logArray.push('Duplication details:');

            result.jscpd.report.duplicates.forEach((clone) => {
                logArray.push(`    - ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}`);
                logArray.push(`      ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}`);
            });
        }
    }

    // Complexity
    if (result.complexity) {
        logArray.push('');
        logArray.push();
        logArray.push(`High complexity rate:       ${result.complexity.percentage}%`);
        logArray.push(`High complexity count:      ${result.complexity.count}`);
        logArray.push(`Max complexity:             ${result.complexity.max}`);

        if (result.complexity.percentage !== '0.00') {
            logArray.push('Complexity details:');

            result.complexity.details.forEach((detail) => {
                logArray.push(`    - ${detail.filepath}`);
                detail.details.forEach(({ line, endLine, complexity }) => {
                    logArray.push(`        ${line}-${endLine}: complexity ${complexity}`);
                });
            });
        }
    }

    return logArray.join(newLine);
}

function getSimpleLog(result) {
    let logArray = [];

    if (typeof result.numberOfFiles !== 'undefined') {
        logArray.push(`Number of files:        ${result.numberOfFiles}`);
    }
    if (result.sloc) {
        logArray.push(`Source lines of code:   ${result.sloc.source}`);
    }
    if (result.jscpd) {
        logArray.push(`Duplicate rate:         ${result.jscpd.percentage}%`);
    }
    if (result.complexity) {
        logArray.push(`High complexity rate:   ${result.complexity.percentage}%`);
        logArray.push(`Max complexity:         ${result.complexity.max}`);
    }

    return logArray.join(newLine);
}

module.exports = reporter;

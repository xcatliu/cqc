function reporter(checkerResult, options = {}) {
    const {
        format,
        // verbose,
        // filterPattern
    } = options;

    if (format === 'json') {
        console.log(checkerResult, null, 4);
        return;
    }

    // let stdout;

    // /* eslint-disable indent */
    // if (!options.verbose) {

    // stdout = `
    // Number of files:        ${cqcResult.numberOfFiles}
    // Source lines of code:   ${cqcResult.sloc.source}
    // Duplicate rate:         ${cqcResult.jscpd.percentage}%
    // High complexity rate:   ${cqcResult.complexity.percentage}%
    // Max complexity:         ${cqcResult.complexity.max}
    // `;

    // } else {

    // // Files
    // stdout = `
    // Number of files: ${cqcResult.numberOfFiles}
    // File list:
    // ${cqcResult.fileList.map((filepath) => `    - ${filepath}`).join('\r\n')}
    // `;

    // // Source lines of code
    // stdout += `
    // Physical lines:             ${cqcResult.sloc.total}
    // Source lines of code:       ${cqcResult.sloc.source}
    // Comments:                   ${cqcResult.sloc.comment}
    // Single-line comments:       ${cqcResult.sloc.single}
    // Block comments:             ${cqcResult.sloc.block}
    // Mixed source and comments:  ${cqcResult.sloc.mixed}
    // Empty lines:                ${cqcResult.sloc.empty}
    // TODO's:                     ${cqcResult.sloc.todo}
    // `;

    // // Duplicate code
    // stdout += `
    // Duplicate rate:             ${cqcResult.jscpd.percentage}%
    // `;

    //     if (cqcResult.jscpd.percentage !== '0.00') {

    // stdout += `Files of duplicated code:   ${cqcResult.jscpd.report.statistics.files}
    // Count of duplicated code:   ${cqcResult.jscpd.report.statistics.clones}
    // Lines of duplicated code:   ${cqcResult.jscpd.report.statistics.duplications}
    // Duplication details:
    // ${cqcResult.jscpd.report.duplicates.map((clone) => {
    //     return `    - ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}
    //       ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}`;
    // }).join('\r\n')}
    // `;

    //     }

    // // Complexity
    // stdout += `
    // High complexity rate:       ${cqcResult.complexity.percentage}%
    // High complexity count:      ${cqcResult.complexity.count}
    // Max complexity:             ${cqcResult.complexity.max}
    // `;

    //     if (cqcResult.complexity.percentage !== '0.00') {

    // stdout += `Complexity details:
    // ${cqcResult.complexity.details.map((detail) => {
    //     return `    - ${detail.filepath}:
    // ${detail.details.map(({ line, endLine, complexity }) => `        ${line}-${endLine}: complexity: ${complexity}`).join('\r\n')}`;
    // }).join('\r\n')}
    // `;

    //     }

    // }
    // /* eslint-enable indent */

    // console.log(stdout);

    console.log(checkerResult);
}

module.exports = reporter;

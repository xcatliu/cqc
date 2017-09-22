#!/usr/bin/env node
const fs = require('fs');

const program = require('commander');

const pkg = require('../package.json');

const CodeQualityChecker = require('..');
const codeQualityChecker = new CodeQualityChecker();

const whiteSpaceOrComma = /[\s,]+/;

program
    .version(pkg.version)
    .usage('[options] <pattern ...>')
    .option('--ignore-pattern <pattern>', 'Pattern of files to ignore')
    .option('--ignore-path <path>', 'Specify path of ignore file')
    .option('-f, --format <string>', 'Specify an output format. Supported format: json')
    .option('-v, --verbose', 'Verbose mode. A lot more information output')
    .option('--complexity-threshold <number>', 'Set the complexity threshold, default to 10')
    .parse(process.argv);

let files = program.args;

let ignorePattern = [];
if (program.ignorePath) {
    const ignorePathList = program.ignorePath.split(whiteSpaceOrComma);
    ignorePathList.forEach((ignorePath) => {
        const currentIgnorePattern = fs.readFileSync(ignorePath, 'utf-8').split(whiteSpaceOrComma);
        ignorePattern = ignorePattern.concat(currentIgnorePattern);
    });
}
if (program.ignorePattern) {
    const currentIgnorePattern = program.ignorePattern.split(whiteSpaceOrComma);
    ignorePattern = ignorePattern.concat(currentIgnorePattern);
}

const options = {};

if (ignorePattern.length > 0) {
    options.ignore = ignorePattern;
}
if (typeof program.verbose === 'boolean') {
    options.verbose = program.verbose;
}
if (typeof program.complexityThreshold === 'string') {
    options.complexityThreshold = program.complexityThreshold;
}

const cqcResult = codeQualityChecker.check(files, options);

if (program.format === 'json') {
    console.log(JSON.stringify(cqcResult, null, 4));
    process.exit(0);
    return;
}

let stdout;

/* eslint-disable indent */
if (!options.verbose) {

stdout = `
Number of files:        ${cqcResult.numberOfFiles}
Source lines of code:   ${cqcResult.sloc.source}
Duplicate rate:         ${cqcResult.jscpd.percentage}%
High complexity rate:   ${cqcResult.complexity.percentage}%
Max complexity:         ${cqcResult.complexity.max}
`;

} else {

// Files
stdout = `
Number of files: ${cqcResult.numberOfFiles}
File list:
${cqcResult.fileList.map((filepath) => `    - ${filepath}`).join('\r\n')}
`;

// Source lines of code
stdout += `
Physical lines:             ${cqcResult.sloc.total}
Source lines of code:       ${cqcResult.sloc.source}
Comments:                   ${cqcResult.sloc.comment}
Single-line comments:       ${cqcResult.sloc.single}
Block comments:             ${cqcResult.sloc.block}
Mixed source and comments:  ${cqcResult.sloc.mixed}
Empty lines:                ${cqcResult.sloc.empty}
TODO's:                     ${cqcResult.sloc.todo}
`;

// Duplicate code
stdout += `
Duplicate rate:             ${cqcResult.jscpd.percentage}%
`;

    if (cqcResult.jscpd.percentage !== '0.00') {

stdout += `Files of duplicated code:   ${cqcResult.jscpd.report.statistics.files}
Count of duplicated code:   ${cqcResult.jscpd.report.statistics.clones}
Lines of duplicated code:   ${cqcResult.jscpd.report.statistics.duplications}
Duplication details:
${cqcResult.jscpd.report.duplicates.map((clone) => {
    return `    - ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}
      ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}`;
}).join('\r\n')}
`;

    }

// Complexity
stdout += `
High complexity rate:       ${cqcResult.complexity.percentage}%
High complexity count:      ${cqcResult.complexity.count}
Max complexity:             ${cqcResult.complexity.max}
`;

    if (cqcResult.complexity.percentage !== '0.00') {

stdout += `Complexity details:
${cqcResult.complexity.details.map((detail) => {
    return `    - ${detail.filepath}:
${detail.details.map(({ line, endLine, complexity }) => `        ${line}-${endLine}: complexity: ${complexity}`).join('\r\n')}`;
}).join('\r\n')}
`;

    }

}
/* eslint-enable indent */

console.log(stdout);

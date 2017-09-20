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
    .option('--ignore-path <file>', 'Specify path of ignore file')
    .option('--ignore-pattern <pattern>', 'Pattern of files to ignore')
    .option('-f, --format <string>', 'Specify an output format, e.g. json')
    .option('-v, --verbose', 'Verbose mode. A lot more information output.')
    .parse(process.argv);

const files = program.args;

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

const options = {
    verbose: program.verbose,
    ignore: ignorePattern
};

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
Number of files:            ${cqcResult.numberOfFiles}
Souce lines of code:        ${cqcResult.sloc.source}
Duplicate rate:             ${cqcResult.jscpd.percentage}%
Max complexity:             ${cqcResult.complexity.max}
Complexity > 5  (count):    ${cqcResult.complexity.gt5Count}
Complexity > 10 (count):    ${cqcResult.complexity.gt10Count}
Complexity > 20 (count):    ${cqcResult.complexity.gt20Count}`;

} else {

// Files
stdout = `
Number of files: ${cqcResult.numberOfFiles}
File list:
    - ${cqcResult.fileList.join('\r\n    - ')}

`;

// Source lines of code
stdout += `
Physical lines:             ${cqcResult.sloc.total}
Source lines of code:       ${cqcResult.sloc.source}
Lines with comments:        ${cqcResult.sloc.comment}
Lines with single-line comments:    ${cqcResult.sloc.single}
Lines with block comments:          ${cqcResult.sloc.block}
Lines mixed up with source and comments:    ${cqcResult.sloc.mixed}
Empty lines:                ${cqcResult.sloc.empty}
Lines with TODO's:          ${cqcResult.sloc.todo}

`;

// Duplicate code
stdout += `
Duplicate rate:             ${cqcResult.jscpd.percentage}%
Files of duplicated code:   ${cqcResult.jscpd.files}
Count of duplicated code:   ${cqcResult.jscpd.clones}
Lines of duplicated code:   ${cqcResult.jscpd.duplications}
Duplication details:
${cqcResult.jscpd.report.duplicates.map((clone) => {
    return `
    - ${clone.firstFile.name}: ${clone.firstFile.start}-${clone.firstFile.start + clone.lines - 1}
      ${clone.secondFile.name}: ${clone.secondFile.start}-${clone.secondFile.start + clone.lines - 1}`;
}).join('\r\n')}

`;

// Complexity
stdout += `
Max complexity:             ${cqcResult.complexity.max}
Complexity > 5  (count):    ${cqcResult.complexity.gt5Count}
Complexity > 10 (count):    ${cqcResult.complexity.gt10Count}
Complexity > 20 (count):    ${cqcResult.complexity.gt20Count}
Complexity details:
${cqcResult.complexity.details.map((detail) => {
    return `
    - ${detail.filepath}:
        ${detail.details.map(({ line, endLine, complexity }) => {
            return `${line}-${endLine}: complexity: ${complexity}`;
        }).join('\r\n        ')}`;
}).join('\r\n')}`;

}
/* eslint-enable indent */

console.log(stdout);

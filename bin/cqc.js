#!/usr/bin/env node
const program = require('commander');
const _ = require('lodash');

const pkg = require('../package.json');
const CodeQualityChecker = require('..');

program
    .version(pkg.version)
    .usage('[options] <pattern ...>')
    // Files options
    .option('--ignore-path <path>', 'Specify path of ignore file')
    .option('--ignore-pattern <pattern>', 'Pattern of files to ignore')
    .option('--filter-pattern <pattern>', 'Output percentage of all files but only details that related to the filter pattern')
    // Script options
    .option('--jscpd-min-lines <number>', 'Set the min size of duplication in code lines, default to 5')
    .option('--jscpd-min-tokens <number>', 'Set the min size of duplication in code tokens, default to 70')
    .option('--complexity-max <number>', 'Set the complexity threshold, default to 10')
    // Disable options
    .option('--disable-base', 'Disable base checker')
    .option('--disable-sloc', 'Disable sloc checker')
    .option('--disable-jscpd', 'Disable jscpd checker')
    .option('--disable-complexity', 'Disable complexity checker')
    // Reporter options
    .option('-f, --format <string>', 'Specify an output format. Supported format: json')
    .option('--verbose', 'Verbose mode. A lot more information output')
    .option('--threshold-jscpd <number>', 'Set the jscpd threshold')
    .option('--threshold-complexity <number>', 'Set the complexity threshold')
    .parse(process.argv);

const patterns = program.args;
const checkOptions = _.pick(program, [
    'ignorePath',
    'ignorePattern',
    'filterPattern',

    'jscpdMinLines',
    'jspcdMinTokens',
    'complexityMax',

    'disableBase',
    'disableSloc',
    'disableJscpd',
    'disableComplexity',

    'format',
    'verbose',
    'thresholdJscpd',
    'thresholdComplexity'
]);

const codeQualityChecker = new CodeQualityChecker();
codeQualityChecker
    .check(patterns, checkOptions)
    .report();

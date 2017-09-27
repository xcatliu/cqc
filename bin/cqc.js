#!/usr/bin/env node
const program = require('commander');
const _ = require('lodash');

const pkg = require('../package.json');
const CodeQualityChecker = require('..');

program
    .version(pkg.version)
    .usage('[options] <pattern ...>')
    .option('--ignore-path <path>', 'Specify path of ignore file')
    .option('--ignore-pattern <pattern>', 'Pattern of files to ignore')
    .option('--complexity-max <number>', 'Set the complexity threshold, default to 10')
    .option('--jscpd-limit <number>', 'Set the limit of allowed duplications, default to 50')
    .option('--disable-sloc', 'Disable sloc checker')
    .option('--disable-jscpd', 'Disable jscpd checker')
    .option('--disable-complexity', 'Disable complexity checker')
    .option('-f, --format <string>', 'Specify an output format. Supported format: json')
    .option('--verbose', 'Verbose mode. A lot more information output')
    .option('--filter-pattern <pattern>', 'Only output files related to the filter pattern')
    .option('-r, --reporter')
    .parse(process.argv);

const patterns = program.args;
const checkOptions = _.pick(program, [
    'ignorePath',
    'ignorePattern',
    'complexityMax',
    'jscpdLimit',
    'disableSloc',
    'disableJscpd',
    'disableComplexity'
]);
const reportOptions = _.pick(program, [
    'format',
    'verbose',
    'filterPattern',
    'reporter'
]);

const codeQualityChecker = new CodeQualityChecker();
codeQualityChecker
    .check(patterns, checkOptions)
    .report(reportOptions);

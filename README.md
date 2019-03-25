# Code Quality Checker

[![Build Status](https://img.shields.io/travis/xcatliu/cqc.svg)](https://travis-ci.org/xcatliu/cqc) [![npm package](https://img.shields.io/npm/v/cqc.svg)](https://www.npmjs.org/package/cqc) [![npm downloads](http://img.shields.io/npm/dm/cqc.svg)](https://www.npmjs.org/package/cqc) [![Coveralls](https://img.shields.io/coveralls/xcatliu/cqc.svg)](https://coveralls.io/github/xcatliu/cqc)

Check your code quality by running one command.

    publish npmjs
    
    npm publish --access=public
    

## Supported Languages

- js, jsx, vue
- css, less, scss, sass, styl

## Quick Start

Install cqc:

```bash
npm install -g cqc
```

Run Code Quality Checker for all JavaScript files in `src` directory:

```bash
cqc src
```

Output:

```
Number of files:        12
Source lines of code:   696
Duplicate rate:         3.23%
High complexity rate:   0.00%
```

## Usage

To run cqc, use the following format:

```bash
cqc [options] <file|dir|glob>*
```

For example:

```bash
cqc src/file1.js src/file2.js
```

or

```bash
cqc src lib
```

or

```bash
cqc src/**/*.js src/**/*.jsx
```

Please note that when passing a glob as a parameter, it will be expanded by your shell. The results of the expansion can vary depending on your shell, and its configuration. If you want to use node `glob` syntax, you have to quote your parameter (using double quotes if you need it to run in Windows), as follows:

```bash
cqc "src/**/*.js" "src/**/*.jsx"
```

### Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
Files options |
`--ext` | string | `.js` | Specify file extensions. `--ext` is only used when the arguments are directories. If you use glob patterns or file names, then `--ext` is ignored.
`--ignore-path` | path | | Specify path of ignore file
`--ignore-pattern` | pattern | | Pattern of files to ignore
`--filter-pattern` | pattern | | Output percentage of all files but only details that related to the filter pattern
Script options |
`--jscpd-min-lines` | number | `5` | Set the min size of duplication in code lines
`--jscpd-min-tokens` | number | `70` | Set the min size of duplication in code tokens
`--complexity-max` | number | `10` | Set the allowed max complexity of a function
Disable options |
`--disable-base` | | | Disable base checker
`--disable-sloc` | | | Disable sloc checker
`--disable-jscpd` | | | Disable jscpd checker
`--disable-complexity` | | | Disable complexity checker
Reporter options |
`-f`, `--format` | string | | Specify an output format. Supported format: json
`--verbose` | | | Verbose mode. A lot more information output
`--threshold-jscpd` | number | | Set the jscpd threshold, process will exit if duplicate rate is more than threshold
`--threshold-complexity` | number | | Set the complexity threshold, process will exit if complexity rate is more than threshold
`--json-path` | string | | output json file,unite ` -f json` format.

Examples:

#### Set the file extensions

```bash
cqc src --ext ".js,.jsx"
```

#### Set the ignore file path

```bash
cqc src/**/*.js --ignore-path ".gitignore,.eslintignore"
```

#### Ignore vendors and third-party libraries

```bash
cqc src/**/*.js --ignore-pattern "src/vendor/**/*.js,src/third-party/**/*.js"
```

#### Output json format

```bash
cqc src/**/*.js --format json
```

Output:

```json
{
    "base": {
        "numberOfFiles": 12
    },
    "sloc": {
        "source": 696
    },
    "jscpd": {
        "percentage": "3.23"
    },
    "complexity": {
        "percentage": "0.00"
    }
}
```

#### Verbose mode

```bash
cqc src/**/*.js --verbose
```

Output:

```
Number of files: 12
File list:
    - E:\github\xcatliu\cqc\src\BaseChecker\index.js
    - E:\github\xcatliu\cqc\src\CheckerResult\cqcReporter.js
    - E:\github\xcatliu\cqc\src\CheckerResult\index.js
    - E:\github\xcatliu\cqc\src\CheckerResult\logStdout.js
    - E:\github\xcatliu\cqc\src\CodeQualityChecker\index.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\eslintConfig.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\getParserFromFilepath.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\index.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\getLanguageFromFilepath.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\index.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\jscpdReporter.js
    - E:\github\xcatliu\cqc\src\SlocChecker\index.js

Physical lines:             854
Source lines of code:       696
Comments:                   36
Single-line comments:       36
Block comments:             0
Mixed source and comments:  0
Empty lines:                122
TODO's:                     1

Duplicate rate:             3.23%
Files of duplicated code:   3
Count of duplicated code:   2
Lines of duplicated code:   28
Duplication details:
    - E:\github\xcatliu\cqc\src\CheckerResult\logStdout.js: 67-71
      E:\github\xcatliu\cqc\src\CheckerResult\logStdout.js: 73-77
    - E:\github\xcatliu\cqc\src\JscpdChecker\index.js: 42-64
      E:\github\xcatliu\cqc\src\JscpdChecker\jscpdReporter.js: 22-44

High complexity rate:                0.00%
Number of functions:                 58
Number of high complexity functions: 0
```

#### Set the jscpd threshold

```bash
cqc src --threshold-jscpd 3
```

Output:

```
Number of files:        12
Source lines of code:   696
Duplicate rate:         3.23%
High complexity rate:   0.00%

Oops, duplicate rate is MORE than threshold 3%, please check the details by adding --verbose option.
```

## API

It's also able to use cqc as a node module:

```js
const CodeQualityChecker = require('cqc');
const codeQualityChecker = new CodeQualityChecker();

// This will return a checkerResult object which include the check result
const cqcResult = codeQualityChecker.check([
    'src'
], {
    ext: '.js',
    ignorePath: '.gitignore,.eslintignore',
    ignorePattern: 'src/vendor/**/*.js,src/third-party/**/*.js',
    filterPattern: 'src/path/to/filterPattern',

    jscpdMinLines: 5,
    jspcdMinTokens: 70,
    complexityMax: 10,

    disableBase: false,
    disableSloc: false,
    disableJscpd: false,
    disableComplexity: false,

    format: undefined,
    verbose: true,
    thresholdJscpd: 3,
    thresholdComplexity: 10
});

// Calling report function will console.log result like cli did
cqcResult.report({
    format: undefined,
    verbose: true,
    thresholdJscpd: 3,
    thresholdComplexity: 10
});
```

## Concept Definition

Concept | Definition
------- | ----------
Number of files             | The number of input files
Source lines of code        | The lines of code except commants and blank lines
Lines of duplicated code    | Lines of code (more than 5 lines or more than 70 tokens) which is exactly the same between two files, or in different place of one file
Duplicate rate              | Lines of duplicated code / Source lines of code
Complexity                  | https://en.wikipedia.org/wiki/Cyclomatic_complexity
Number of functions         | The number of functions
Number of high complexity functions | The number of functions which has complexity more than 10
High complexity rate        | Number of high complexity functions / Number of functions

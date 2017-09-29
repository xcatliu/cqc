# Code Quality Checker

[![Build Status](https://img.shields.io/travis/xcatliu/cqc.svg)](https://travis-ci.org/xcatliu/cqc) [![npm package](https://img.shields.io/npm/v/cqc.svg)](https://www.npmjs.org/package/cqc) [![npm downloads](http://img.shields.io/npm/dm/cqc.svg)](https://www.npmjs.org/package/cqc) [![Coveralls](https://img.shields.io/coveralls/xcatliu/cqc.svg)](https://coveralls.io/github/xcatliu/cqc)

Check your code quality by running one command.

## Supported Languages

- js, jsx
- css, less, scss, sass, styl

## Getting Started

### Installation

```sh
npm install -g cqc
```

### Usage

```sh
cqc src/**/*.js src/**/*.jsx
```

Output:

```
Number of files:        10
Source lines of code:   647
Duplicate rate:         3.46%
High complexity rate:   0.00%
Max complexity:         10
```

### Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
Files options |
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
`--threshold-jscpd` | number | | Set the jscpd threshold
`--threshold-complexity` | number | | Set the complexity threshold

Examples:

#### Ignore vendors and third-party libraries

```sh
cqc src/**/*.js --ignore-pattern "src/vendor/**/*.js,src/third-party/**/*.js"
```

#### Set the ignore file path

```sh
cqc src/**/*.js --ignore-path ".gitignore,.eslintignore"
```

#### Output json format

```sh
cqc src/**/*.js --format json
```

Output:

```json
{
    "base": {
        "numberOfFiles": 10
    },
    "sloc": {
        "source": 647
    },
    "jscpd": {
        "percentage": "3.46"
    },
    "complexity": {
        "percentage": "0.00",
        "max": 10
    }
}
```

#### Verbose mode

```sh
cqc src/**/*.js --verbose
```

Output:

```
Number of files: 10
File list:
    - E:\github\xcatliu\cqc\src\BaseChecker\index.js
    - E:\github\xcatliu\cqc\src\CheckerResult\cqcReporter.js
    - E:\github\xcatliu\cqc\src\CheckerResult\index.js
    - E:\github\xcatliu\cqc\src\CodeQualityChecker\index.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\eslintConfig.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\index.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\getLanguageFromFilepath.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\index.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\jscpdReporter.js
    - E:\github\xcatliu\cqc\src\SlocChecker\index.js

Physical lines:             800
Source lines of code:       647
Comments:                   36
Single-line comments:       36
Block comments:             0
Mixed source and comments:  0
Empty lines:                117
TODO's:                     1

Duplicate rate:             3.46%
Files of duplicated code:   3
Count of duplicated code:   2
Lines of duplicated code:   28
Duplication details:
    - E:\github\xcatliu\cqc\src\CheckerResult\cqcReporter.js: 150-154
      E:\github\xcatliu\cqc\src\CheckerResult\cqcReporter.js: 156-160
    - E:\github\xcatliu\cqc\src\JscpdChecker\index.js: 41-63
      E:\github\xcatliu\cqc\src\JscpdChecker\jscpdReporter.js: 22-44

High complexity rate:       0.00%
High complexity count:      0
Max complexity:             10
```

#### Set the complexity threshold

```sh
cqc src/**/*.js --complexity-threshold 5
```

## Concept Definition

Concept | Definition
------- | ----------
Number of files             | The number of input files
Source lines of code        | The lines of code except commants and blank lines
Lines of duplicated code    | Lines of code (more than 5 lines or more than 70 tokens) which is exactly the same between two files, or in different place of one file
Duplicate rate              | Lines of duplicated code / Source lines of code
Complexity                  | https://en.wikipedia.org/wiki/Cyclomatic_complexity
High complexity rate        | The number of files which has complexity more than 10 / Number of files
Max complexity              | The highest complexity of all input files

## Troubleshootings

### Why `cqc src/**/*.js` only identify the files under two-level dir?

Some shell has different behavior between others. Please try to wrap the pattern by quotes:

```sh
cqc "src/**/*.js"
```

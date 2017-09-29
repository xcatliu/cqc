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
Number of files:        9
Source lines of code:   463
Duplicate rate:         15.71%
High complexity rate:   11.11%
Max complexity:         19
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
    "numberOfFiles": 9,
    "sloc": {
        "source": 463
    },
    "jscpd": {
        "percentage": "15.71"
    },
    "complexity": {
        "percentage": "11.11",
        "max": 19
    }
}
```

#### Verbose mode

```sh
cqc src/**/*.js --verbose
```

Output:

```
Number of files: 9
File list:
    - E:\github\xcatliu\cqc\src\BaseChecker\index.js
    - E:\github\xcatliu\cqc\src\CodeQualityChecker\index.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\eslintConfig.js
    - E:\github\xcatliu\cqc\src\ComplexityChecker\index.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\getLanguageFromFilepath.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\index.js
    - E:\github\xcatliu\cqc\src\JscpdChecker\reporter.js
    - E:\github\xcatliu\cqc\src\SlocChecker\index.js
    - E:\github\xcatliu\cqc\src\test.js

Physical lines:             552
Source lines of code:       463
Comments:                   23
Single-line comments:       23
Block comments:             0
Mixed source and comments:  0
Empty lines:                66
TODO's:                     0

Duplicate rate:             15.71%
Files of duplicated code:   1
Count of duplicated code:   2
Lines of duplicated code:   88
Duplication details:
    - E:\github\xcatliu\cqc\src\test.js: 1-33
      E:\github\xcatliu\cqc\src\test.js: 4-36
    - E:\github\xcatliu\cqc\src\test.js: 1-55
      E:\github\xcatliu\cqc\src\test.js: 40-94

High complexity rate:       11.11%
High complexity count:      1
Max complexity:             19
Complexity details:
    - E:\github\xcatliu\cqc\src\test.js:
        1-38: complexity: 13
        40-95: complexity: 19
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
Lines of duplicated code    | Lines of code (more than 5 lines) which is exactly the same between two files, or in different place of one file
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

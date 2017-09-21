# Code Quality Checker

- Number of files
- Source lines of code
- Duplicate rate
- High complexity rate
- Max complexity

## Supported Languages

- js, jsx
- css, less, scss

## Getting Started

### Installation

```sh
npm install -g cqc
```

### Usage

```sh
cqc [options] <pattern ...>
# pattern is a string, you should wrap it by quotes
```

Example:

```sh
cqc "src/**/*.js"
```

Output:

```
Number of files:        9
Source lines of code:   463
Duplicate rate:         15.71%
High complexity rate:   11.11%
Max complexity:         19
```

#### Multiple patterns

```sh
cqc "src/**/*.js,src/**/*.jsx"
```

#### `--ignore-pattern`

```sh
cqc "src/**/*.js" --ignore-pattern "src/vendor/**/*.js"
```

```sh
cqc "src/**/*.js" --ignore-pattern "src/vendor/**/*.js,src/third-party/**/*.js"
```

#### `--ignore-path`

```sh
cqc "src/**/*.js" --ignore-path ".gitignore"
```

```sh
cqc "src/**/*.js" --ignore-path ".gitignore,.eslintignore"
```

#### `--format`

```sh
cqc "src/**/*.js" --format json
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

#### `--verbose`

```sh
cqc "src/**/*.js" --verbose
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

#### `--complexity-threshold`

```sh
cqc "src/**/*.js" --complexity-threshold 5
```

Default is `10`

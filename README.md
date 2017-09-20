# Code Quality Checker

- Number of files
- Source lines of code
- Duplicate rate
- Max complexity
- Complexity > 5  (count)
- Complexity > 10 (count)
- Complexity > 20 (count)

## Supported Languages

- js
- jsx
- css
- less
- scss

## Getting Started

### Installation

```sh
npm install -g cqc
```

### Usage

```sh
cqc [options] <pattern ...>
```

Examples:

```sh
cqc src/**/*.js
```

Output:

```
Number of files:            8
Source lines of code:        357
Duplicate rate:             5.62%
Max complexity:             15
Complexity > 5  (count):    3
Complexity > 10 (count):    1
Complexity > 20 (count):    0
```

#### Multiple patterns

```sh
cqc src/**/*.js src/**/*.jsx
```

#### `--ignore-pattern`

```sh
cqc src/**/*.js --ignore-pattern src/vendor/**/*.js
```

```sh
cqc src/**/*.js --ignore-pattern src/vendor/**/*.js,src/third-party/**/*.js
```

#### `--ignore-path`

```sh
cqc src/**/*.js --ignore-path .gitignore
```

```sh
cqc src/**/*.js --ignore-path .gitignore,.eslintignore
```

#### `--format`

```sh
cqc src/**/*.js --format json
```

Output:

```json
{
    "numberOfFiles": 8,
    "sloc": {
        "source": 357
    },
    "jscpd": {
        "percentage": "5.62"
    },
    "complexity": {
        "max": 15,
        "gt5Count": 3,
        "gt10Count": 1,
        "gt20Count": 0
    }
}
```

#### `--verbose`

```sh
cqc src/**/*.js --verbose
```

Output:

```
Number of files: 10
File list:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/BaseChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/CodeQualityChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/ComplexityChecker/eslintConfig.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/ComplexityChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/JscpdChecker/getLanguageFromFilepath.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/JscpdChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/JscpdChecker/reporter.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.2.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.js

Physical lines:             682
Source lines of code:       573
Lines with comments:        24
Lines with single-line comments:    24
Lines with block comments:          0
Lines mixed up with source and comments:    0
Empty lines:                85
Lines with TODO's:          0

Duplicate rate:             31.21%
Files of duplicated code:   3
Count of duplicated code:   4
Lines of duplicated code:   216
Duplication details:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 10-39
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 13-42
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 9-33
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 87-111
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 1-116
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.2.js: 1-116
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 43-87
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.js: 10-54

Max complexity:             13
Complexity > 5  (count):    2
Complexity > 10 (count):    2
Complexity > 20 (count):    0
Complexity details:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js:
        10-87: complexity: 13
        88-114: complexity: 9
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.2.js:
        10-87: complexity: 13
        88-114: complexity: 9
```

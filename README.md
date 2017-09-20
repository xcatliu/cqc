# Code Quality Checker

- Number of files
- Souce lines of code
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
Souce lines of code:        357
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
Number of files: 9
File list:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/BaseChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/CodeQualityChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/ComplexityChecker/eslintConfig.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/ComplexityChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/JscpdChecker/getLanguageFromFilepath.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/JscpdChecker/index.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/JscpdChecker/reporter.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.js


Physical lines:             601
Source lines of code:       501
Lines with comments:        24
Lines with single-line comments:    24
Lines with block comments:          0
Lines mixed up with source and comments:    0
Empty lines:                76
Lines with TODO's:          0


Duplicate rate:             22.30%
Files of duplicated code:   undefined
Count of duplicated code:   undefined
Lines of duplicated code:   undefined
Duplication details:

    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 55-117
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 58-120

    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 54-81
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.js: 9-36

    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js: 10-54
      /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.js: 37-81


Max complexity:             23
Complexity > 5  (count):    2
Complexity > 10 (count):    2
Complexity > 20 (count):    1
Complexity details:

    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.1.js:
        55-123: complexity: 23

    - /Users/xcatliu/Workspace/github/xcatliu/cqc/src/SlocChecker/index.js:
        10-81: complexity: 11
```

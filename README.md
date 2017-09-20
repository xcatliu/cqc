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

```sh
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

#### `--ignore-file`

```sh
cqc src/**/*.js --ignore-file .gitignore
```

```sh
cqc src/**/*.js --ignore-file .gitignore,.eslintignore
```

#### `--format`

```sh
cqc src/**/*.js --format json
```

Output:

```sh
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

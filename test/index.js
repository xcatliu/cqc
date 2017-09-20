const CodeQualityChecker = require('../src/CodeQualityChecker');

const codeQualityChecker = new CodeQualityChecker();

const result = codeQualityChecker.check('src/**/*.js', {
    verbose: false
});

console.log(JSON.stringify(result, null, 4));

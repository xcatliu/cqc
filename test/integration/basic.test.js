const assert = require('chai').assert;
const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Basic', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

    describe('check without options', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ]);
        cqcResult.report();
        baseAssertion(cqcResult);
        slocAssertion(cqcResult);
        jscpdAssertion(cqcResult);
        complexityAssertion(cqcResult);
    });

    describe('check with option disableSloc', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            disableSloc: true
        });
        baseAssertion(cqcResult);
        it('should not have sloc check result', () => {
            assert.isUndefined(cqcResult.sloc);
        });
        jscpdAssertion(cqcResult);
        complexityAssertion(cqcResult);
    });

    describe('check with option disableJscpd', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            disableJscpd: true
        });
        baseAssertion(cqcResult);
        slocAssertion(cqcResult);
        it('should not have jscpd check result', () => {
            assert.isUndefined(cqcResult.jscpd);
        });
        complexityAssertion(cqcResult);
    });

    describe('check with option disableComplexity', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            disableComplexity: true
        });
        baseAssertion(cqcResult);
        slocAssertion(cqcResult);
        jscpdAssertion(cqcResult);
        it('should not have complexity check result', () => {
            assert.isUndefined(cqcResult.complexity);
        });
    });

    describe('check with option disableSloc and disableJscpd', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            disableSloc: true,
            disableJscpd: true
        });
        baseAssertion(cqcResult);
        it('should not have sloc check result', () => {
            assert.isUndefined(cqcResult.sloc);
        });
        it('should not have jscpd check result', () => {
            assert.isUndefined(cqcResult.jscpd);
        });
        complexityAssertion(cqcResult);
    });


    describe('report without options', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ]);
        it('Should match provided console.log result', function () {
            this.sinon.spy(console, 'log');

            cqcResult.report();

            this.sinon.assert.calledWith(console.log, `Number of files:        6
Source lines of code:   266
Duplicate rate:         21.21%
High complexity rate:   33.33%
Max complexity:         16`);
        });
    });

    describe('report with options format=json', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ]);
        it('Should match provided console.log result', function () {
            this.sinon.spy(console, 'log');

            cqcResult.report({
                format: 'json'
            });

            this.sinon.assert.calledWith(console.log, `{
    "numberOfFiles": 6,
    "sloc": {
        "source": 266
    },
    "jscpd": {
        "percentage": "21.21"
    },
    "complexity": {
        "percentage": "33.33",
        "max": 16
    }
}`);
        });
    });

    describe('report with options verbose=true', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ]);
        it('Should match provided console.log result', function () {
            this.sinon.spy(console, 'log');

            cqcResult.report({
                verbose: true
            });

            this.sinon.assert.calledWith(console.log, `Number of files: 6
File list:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/one.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/subFolder/five.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/three.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/two.js
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/four.jsx
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/subFolder/six.jsx

Physical lines:             291
Source lines of code:       266
Comments:                   9
Single-line comments:       9
Block comments:             0
Mixed source and comments:  0
Empty lines:                16
TODO's:                     0

Duplicate rate:             21.21%
Files of duplicated code:   4
Count of duplicated code:   3
Lines of duplicated code:   63
Duplication details:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/one.js: 27-39
      /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/subFolder/five.js: 1-13
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/one.js: 1-17
      /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/two.js: 1-17
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/subFolder/six.jsx: 45-77
      /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/subFolder/six.jsx: 48-80

High complexity rate:       33.33%
High complexity count:      2
Max complexity:             16
Complexity details:
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/three.js
        1-47: complexity 16
    - /Users/xcatliu/Workspace/github/xcatliu/cqc/test/sample/subFolder/six.jsx
        1-33: complexity 11
        45-95: complexity 13`);
        });
    });
});

function baseAssertion(cqcResult) {
    it('should have correct base check result', () => {
        assert.equal(cqcResult.numberOfFiles, 6);
        assert.lengthOf(cqcResult.fileList, 6);
    });
}

function slocAssertion(cqcResult) {
    it('should have correct sloc check result', () => {
        assert.deepEqual(cqcResult.sloc, {
            total: 291,
            source: 266,
            comment: 9,
            single: 9,
            block: 0,
            mixed: 0,
            empty: 16,
            todo: 0
        });
    });
}

function jscpdAssertion(cqcResult) {
    it('should have correct jscpd check result', () => {
        assert.equal(cqcResult.jscpd.percentage, '21.21');
        assert.deepEqual(cqcResult.jscpd.report.statistics, {
            clones: 3,
            duplications: 63,
            files: 4,
            percentage: '21.21',
            lines: 297
        });
        assert.lengthOf(cqcResult.jscpd.report.duplicates, 3);
        assert.lengthOf(cqcResult.jscpd.map.clones, 3);
        assert.lengthOf(Object.keys(cqcResult.jscpd.map.clonesByFile), 4);
        assert.equal(cqcResult.jscpd.map.numberOfDuplication, 63);
        assert.equal(cqcResult.jscpd.map.numberOfLines, 297);
        assert.equal(cqcResult.jscpd.map.numberOfFiles, 4);
    });
}

function complexityAssertion(cqcResult) {
    it('should have correct complexity check result', () => {
        assert.equal(cqcResult.complexity.percentage, '33.33');
        assert.equal(cqcResult.complexity.count, 2);
        assert.equal(cqcResult.complexity.max, 16);
        assert.lengthOf(cqcResult.complexity.details, 2);
        assert.equal(cqcResult.complexity.details[0].complexity, 16);
        assert.equal(cqcResult.complexity.details[1].complexity, 13);
        assert.lengthOf(cqcResult.complexity.details[0].details, 1);
        assert.deepEqual(cqcResult.complexity.details[0].details[0], {
            complexity: 16,
            ruleId: 'complexity',
            severity: 2,
            message: 'Function \'three\' has a complexity of 16.',
            line: 1,
            column: 18,
            nodeType: 'FunctionExpression',
            source: 'module.exports = function three() {',
            endLine: 47,
            endColumn: 2
        });
        assert.lengthOf(cqcResult.complexity.details[1].details, 2);
        assert.deepEqual(cqcResult.complexity.details[1].details[0], {
            complexity: 11,
            ruleId: 'complexity',
            severity: 2,
            message: 'Function \'Welcome\' has a complexity of 11.',
            line: 1,
            column: 1,
            nodeType: 'FunctionDeclaration',
            source: 'function Welcome(props) {',
            endLine: 33,
            endColumn: 2
        });
        assert.deepEqual(cqcResult.complexity.details[1].details[1], {
            complexity: 13,
            ruleId: 'complexity',
            severity: 2,
            message: 'Function \'HelloWorld\' has a complexity of 13.',
            line: 45,
            column: 5,
            nodeType: 'FunctionDeclaration',
            source: '    function HelloWorld() {',
            endLine: 95,
            endColumn: 6
        });
    });
}

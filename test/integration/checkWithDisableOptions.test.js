const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check with disable options', () => {
    describe('disableSloc', () => {
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

    describe('disableJscpd', () => {
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

    describe('disableComplexity', () => {
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

    describe('disableSloc and disableJscpd', () => {
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

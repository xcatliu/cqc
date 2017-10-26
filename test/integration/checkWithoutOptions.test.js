const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check without options', () => {
    describe('multiple patterns', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ]);
        baseAssertion(cqcResult);
        slocAssertion(cqcResult);
        jscpdAssertion(cqcResult);
        complexityAssertion(cqcResult);
    });

    describe('one pattern', () => {
        const cqcResult = codeQualityChecker.check('test/sample/**/*.js');
        it('should have correct base check result', () => {
            assert.equal(cqcResult.base.numberOfFiles, 4);
            assert.lengthOf(cqcResult.base.fileList, 4);
        });
    });

    describe('dir input', () => {
        const cqcResult = codeQualityChecker.check('test/sample');
        it('should have correct base check result', () => {
            assert.equal(cqcResult.base.numberOfFiles, 4);
            assert.lengthOf(cqcResult.base.fileList, 4);
        });
    });

    describe('vue file', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.vue'
        ]);
        it('should have correct result', () => {
            assert.equal(cqcResult.base.numberOfFiles, 1);
            assert.deepEqual(cqcResult.sloc, {
                total: 75,
                source: 73,
                comment: 0,
                single: 0,
                block: 0,
                mixed: 0,
                empty: 2,
                todo: 0
            });
            assert.equal(cqcResult.jscpd.percentage, '68.42');
            assert.equal(cqcResult.complexity.percentage, '100.00');
            assert.equal(cqcResult.complexity.count, 1);
            assert.equal(cqcResult.complexity.max, 13);
            assert.lengthOf(cqcResult.complexity.details, 1);
            assert.equal(cqcResult.complexity.details[0].complexity, 13);
            assert.lengthOf(cqcResult.complexity.details[0].details, 1);
            assert.deepEqual(cqcResult.complexity.details[0].details[0], {
                complexity: 13,
                ruleId: 'complexity',
                severity: 2,
                message: 'Method \'data\' has a complexity of 13.',
                line: 26,
                column: 11,
                nodeType: 'FunctionExpression',
                source: '    data: function () {',
                endLine: 66,
                endColumn: 6
            });
        });
    });
});

function baseAssertion(cqcResult) {
    it('should have correct base check result', () => {
        assert.equal(cqcResult.base.numberOfFiles, 6);
        assert.lengthOf(cqcResult.base.fileList, 6);
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

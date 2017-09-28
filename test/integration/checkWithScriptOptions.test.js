const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check with script options', () => {
    describe('jscpdMinLines', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            jscpdMinLines: 20
        });
        it('should have correct jscpd check result', () => {
            assert.equal(cqcResult.jscpd.percentage, '11.11');
        });
    });

    describe('jscpdMinTokens', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            jscpdMinTokens: 10
        });
        it('should have correct jscpd check result', () => {
            assert.equal(cqcResult.jscpd.percentage, '27.95');
        });
    });

    describe('complexityMax', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            complexityMax: 15
        });
        it('should have correct complexity check result', () => {
            assert.equal(cqcResult.complexity.percentage, '16.67');
        });
    });
});

const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check with ignore options', () => {
    describe('ignorePath', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            ignorePath: '.eslintignore'
        });
        it('should have correct base check result', () => {
            assert.equal(cqcResult.numberOfFiles, 2);
            assert.lengthOf(cqcResult.fileList, 2);
        });
    });

    describe('ignorePattern', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            ignorePattern: 'test/sample/subFolder/five.js, test/sample/**/*.jsx'
        });
        it('should have correct base check result', () => {
            assert.equal(cqcResult.numberOfFiles, 3);
            assert.lengthOf(cqcResult.fileList, 3);
        });
    });

    describe('ignorePath and ignorePattern', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            ignorePath: '.eslintignore',
            ignorePattern: 'test/sample/four.jsx'
        });
        it('should have correct base check result', () => {
            assert.equal(cqcResult.numberOfFiles, 1);
            assert.lengthOf(cqcResult.fileList, 1);
        });
    });
});

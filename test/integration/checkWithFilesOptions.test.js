const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check with files options', () => {
    describe('ext', () => {
        const cqcResult = codeQualityChecker.check('test/sample', {
            ext: '.js,.jsx'
        });
        it('should have correct base check result', () => {
            assert.equal(cqcResult.base.numberOfFiles, 6);
            assert.lengthOf(cqcResult.base.fileList, 6);
        });
    });

    describe('ignorePath', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            ignorePath: '.eslintignore'
        });
        it('should have correct base check result', () => {
            assert.equal(cqcResult.base.numberOfFiles, 2);
            assert.lengthOf(cqcResult.base.fileList, 2);
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
            assert.equal(cqcResult.base.numberOfFiles, 3);
            assert.lengthOf(cqcResult.base.fileList, 3);
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
            assert.equal(cqcResult.base.numberOfFiles, 1);
            assert.lengthOf(cqcResult.base.fileList, 1);
        });
    });

    describe('filterPattern', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            filterPattern: 'test/sample/one.js, test/sample/subFolder/**/*.js, test/sample/subFolder/**/*.jsx'
        });
        it('should have correct base check result', () => {
            assert.equal(cqcResult.base.numberOfFiles, 6);
            assert.lengthOf(cqcResult.base.fileList, 6);
            assert.lengthOf(cqcResult.base.filterFileList, 3);
        });
        it('should have correct jscpd check result', () => {
            assert.lengthOf(cqcResult.jscpd.report.filterDuplicates, 3);
        });
        it('should have correct complexity check result', () => {
            assert.lengthOf(cqcResult.complexity.filterDetails, 1);
        });
    });
});

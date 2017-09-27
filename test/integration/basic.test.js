const assert = require('chai').assert;
const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Basic', () => {
    const cqcResult = codeQualityChecker.check([
        'test/sample/**/*.js',
        'test/sample/**/*.jsx'
    ]);
    describe('check without options', () => {
        it('should have correct base check result', () => {
            assert.equal(cqcResult.numberOfFiles, 6);
            assert.lengthOf(cqcResult.fileList, 6);
        });
        it('should have correct sloc check result', () => {
            assert.deepEqual(cqcResult.sloc, {
                total: 225,
                source: 200,
                comment: 9,
                single: 9,
                block: 0,
                mixed: 0,
                empty: 16,
                todo: 0
            });
        });
        it('should have correct jscpd check result', () => {
            assert.equal(cqcResult.jscpd.percentage, 12.99);
            assert.deepEqual(cqcResult.jscpd.report.statistics, {
                clones: 2,
                duplications: 30,
                files: 3,
                percentage: '12.99',
                lines: 231
            });
            assert.lengthOf(cqcResult.jscpd.report.duplicates, 2);
            assert.lengthOf(cqcResult.jscpd.map.clones, 2);
            assert.lengthOf(Object.keys(cqcResult.jscpd.map.clonesByFile), 3);
            assert.equal(cqcResult.jscpd.map.numberOfDuplication, 30);
            assert.equal(cqcResult.jscpd.map.numberOfLines, 231);
            assert.equal(cqcResult.jscpd.map.numberOfFiles, 3);
        });
    });

    describe('report without options', () => {
        beforeEach(function () {
            this.sinon = sinon.sandbox.create();
        });
        afterEach(function () {
            this.sinon.restore();
        });

        it('Should match provided console.log result', function () {
            cqcResult.report();

            sinon.assert.calledWith(console.log, 'hello');
        });
    });
});

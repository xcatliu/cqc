/* eslint max-nested-callbacks:0 */

const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Report with thresholdComplexity options', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

    describe('complexity rate less than threshold', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            thresholdComplexity: 20
        });
        it('Should match provided console.log result', function () {
            this.sinon.spy(console, 'log');

            cqcResult.report();

            this.sinon.assert.calledWithMatch(console.log, `Number of files:        6
Source lines of code:   266
Duplicate rate:         21.21%
High complexity rate:   17.65%`);
            this.sinon.assert.calledWithMatch(console.log, 'Good, high complexity rate is LESS than threshold 20%');
        });
    });

    describe('complexity rate more than threshold', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            thresholdComplexity: 15
        });
        it('Should match provided log result and exit 1', function () {
            this.sinon.spy(console, 'log');
            this.sinon.spy(console, 'error');
            this.sinon.stub(process, 'exit');

            cqcResult.report();

            this.sinon.assert.calledWithMatch(console.log, `Number of files:        6
Source lines of code:   266
Duplicate rate:         21.21%
High complexity rate:   17.65%`);
            this.sinon.assert.calledWithMatch(console.error, 'Oops, high complexity rate is MORE than threshold 15%, please check the details by adding --verbose option.');
            this.sinon.assert.calledWith(process.exit, 1);
        });
    });

    describe('complexity rate more than threshold and verbose: true', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            thresholdComplexity: 15,
            verbose: true
        });
        it('Should match provided log result and exit 1', function () {
            this.sinon.spy(console, 'log');
            this.sinon.spy(console, 'error');
            this.sinon.stub(process, 'exit');

            cqcResult.report();

            this.sinon.assert.calledWithMatch(console.log, /^Number of files: 6[\s\S]*45-95: complexity 13$/);
            this.sinon.assert.calledWithMatch(console.error, 'Oops, high complexity rate is MORE than threshold 15%, please check the details.');
            this.sinon.assert.calledWith(process.exit, 1);
        });
    });
});

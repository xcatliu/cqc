/* eslint max-nested-callbacks:0 */

const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Report with thresholdJscpd options', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

    describe('duplicate rate less than threshold', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            thresholdJscpd: 22
        });
        it('Should match provided console.log result', function () {
            this.sinon.spy(console, 'log');

            cqcResult.report();

            this.sinon.assert.calledWithMatch(console.log, `Number of files:        6
Source lines of code:   266
Duplicate rate:         21.21%
High complexity rate:   17.65%`);
            this.sinon.assert.calledWithMatch(console.log, 'Good, duplicate rate is LESS than threshold 22%');
        });
    });

    describe('duplicate rate more than threshold', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            thresholdJscpd: 20
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
            this.sinon.assert.calledWithMatch(console.error, 'Oops, duplicate rate is MORE than threshold 20%, please check the details by adding --verbose option.');
            this.sinon.assert.calledWith(process.exit, 1);
        });
    });

    describe('duplicate rate more than threshold and verbose: true', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            thresholdJscpd: 20,
            verbose: true
        });
        it('Should match provided log result and exit 1', function () {
            this.sinon.spy(console, 'log');
            this.sinon.spy(console, 'error');
            this.sinon.stub(process, 'exit');

            cqcResult.report();

            this.sinon.assert.calledWithMatch(console.log, /^Number of files: 6[\s\S]*45-95: complexity 13$/);
            this.sinon.assert.calledWithMatch(console.error, 'Oops, duplicate rate is MORE than threshold 20%, please check the details.');
            this.sinon.assert.calledWith(process.exit, 1);
        });
    });
});

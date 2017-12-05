const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Report with disable options', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

    describe('disableSloc', () => {
        const cqcResult = codeQualityChecker.check([
            'test/sample/**/*.js',
            'test/sample/**/*.jsx'
        ], {
            disableSloc: true
        });
        it('Should match provided console.log result', function () {
            this.sinon.spy(console, 'log');

            cqcResult.report();

            this.sinon.assert.calledWith(console.log, `Number of files:        6
Duplicate rate:         21.21%
High complexity rate:   17.65%`);
        });
    });
});

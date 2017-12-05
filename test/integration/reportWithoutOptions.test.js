const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Report without options', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

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
High complexity rate:   17.65%`);
    });
});

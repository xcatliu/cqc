/* eslint max-nested-callbacks:0 */

const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Report with format options', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

    const cqcResult = codeQualityChecker.check([
        'test/sample/**/*.js',
        'test/sample/**/*.jsx'
    ], {
        format: 'json'
    });
    it('Should match provided console.log result', function () {
        this.sinon.spy(console, 'log');

        cqcResult.report();

        this.sinon.assert.calledWith(console.log, `{
    "numberOfFiles": 6,
    "sloc": {
        "source": 266
    },
    "jscpd": {
        "percentage": "21.21"
    },
    "complexity": {
        "percentage": "33.33",
        "max": 16
    }
}`);
    });
});

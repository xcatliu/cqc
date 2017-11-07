/* eslint max-nested-callbacks:0 */

const sinon = require('sinon');

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Report with empty outputs', () => {
    beforeEach(function () {
        this.sinon = sinon.sandbox.create();
    });
    afterEach(function () {
        this.sinon.restore();
    });

    const cqcResult = codeQualityChecker.check([
        'test/sample/not-exist-path.js',
    ], {
        format: 'json'
    });
    it('Should match provided console.log result', function () {
        this.sinon.spy(console, 'log');

        cqcResult.report();

        this.sinon.assert.calledWith(console.log, `{
    "base": {
        "numberOfFiles": 0
    },
    "sloc": {
        "source": 0
    },
    "jscpd": {
        "percentage": "0.00"
    },
    "complexity": {
        "percentage": "0.00",
        "max": 0
    }
}`);
    });
});

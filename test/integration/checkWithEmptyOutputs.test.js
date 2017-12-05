const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check with empty input', () => {
    const cqcResult = codeQualityChecker.check([
        'test/sample/not-exist-path.js'
    ]);
    it('should have correct result', () => {
        assert.equal(cqcResult.base.numberOfFiles, 0);
        assert.equal(cqcResult.sloc.source, 0);
        assert.equal(cqcResult.jscpd.percentage, '0.00');
        assert.equal(cqcResult.complexity.percentage, '0.00');
    });
});

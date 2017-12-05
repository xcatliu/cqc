const assert = require('chai').assert;

const CodeQualityChecker = require('../../');
const codeQualityChecker = new CodeQualityChecker();

describe('Check unsupported filetype', () => {
    const cqcResult = codeQualityChecker.check([
        'test/sample/hello.java'
    ]);
    it('should have correct result', () => {
        assert.equal(cqcResult.base.numberOfFiles, 1);
        assert.equal(cqcResult.sloc.source, 5);
        assert.equal(cqcResult.jscpd.percentage, '0.00');
        assert.equal(cqcResult.complexity.percentage, '0.00');
    });
});

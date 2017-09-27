const _ = require('lodash');

const BaseChecker = require('../BaseChecker');
const SlocChecker = require('../SlocChecker');
const JscpdChecker = require('../JscpdChecker');
const ComplexityChecker = require('../ComplexityChecker');
const CheckerResult = require('../CheckerResult');

class CodeQualityChecker extends BaseChecker {
    constructor(...args) {
        super(...args);
        this.slocChecker = new SlocChecker(...args);
        this.jscpdChecker = new JscpdChecker(...args);
        this.complexityChecker = new ComplexityChecker(...args);
    }
    check(...args) {
        const baseResult = super.check(...args);
        const slocResult = this.slocChecker.check(...args);
        const jscpdResult = this.jscpdChecker.check(...args);
        const complexityChecker = this.complexityChecker.check(...args);

        return new CheckerResult(_.merge({}, baseResult, slocResult, jscpdResult, complexityChecker));
    }
}

module.exports = CodeQualityChecker;

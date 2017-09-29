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

        const result = {};
        if (!this.options.disableBase) {
            _.merge(result, baseResult);
        }
        if (!this.options.disableSloc) {
            _.merge(result, this.slocChecker.check(...args));
        }
        if (!this.options.disableJscpd) {
            _.merge(result, this.jscpdChecker.check(...args));
        }
        if (!this.options.disableComplexity) {
            _.merge(result, this.complexityChecker.check(...args));
        }

        return new CheckerResult(result, this.options);
    }
}

module.exports = CodeQualityChecker;

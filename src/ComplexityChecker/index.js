const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const Linter = require('eslint').Linter;

const BaseChecker = require('../BaseChecker');
const eslintConfig = require('./eslintConfig');
const defaultComplexityThreshold = 10;

const linter = new Linter();

const COMPLEXITY = /complexity of (\d*)./;

class ComplexityChecker extends BaseChecker {
    check(...args) {
        const baseResult = super.check(...args);

        this.complexityThreshold = this.getComplexityThreshold();

        let count = 0;
        let max = 0;

        const details = this.fileList.map((filepath) => {
            return this.getEslintResultFromFilepath(filepath);
        }).filter((eslintResult) => {
            max = Math.max(max, eslintResult.complexity);
            if (eslintResult.complexity > this.complexityThreshold) {
                count += 1;
                return true;
            }
            return false;
        });

        let percentage = this.getPercentage(count);

        if (this.options.verbose) {
            return _.merge({}, baseResult, {
                complexity: {
                    percentage,
                    count,
                    max,
                    details
                }
            });
        }

        return _.merge({}, baseResult, {
            complexity: {
                percentage,
                max
            }
        });
    }
    getEslintResultFromFilepath(filepath) {
        const extname = path.extname(filepath).slice(1);
        const resolvedFilepath = path.resolve(filepath);
        if (extname !== 'js' && extname !== 'jsx') {
            return {
                filepath: resolvedFilepath,
                complexity: 0,
                details: []
            };
        }

        const fileContent = fs.readFileSync(filepath, 'utf-8');
        const eslintResult = linter.verify(fileContent, eslintConfig, {
            filename: resolvedFilepath,
            allowInlineConfig: false
        });

        let maxComplexity = 0;
        const eslintResultWithComplexity = eslintResult.map((oneResult) => {
            const { message } = oneResult;
            const complexity = this.getComplexityFromMessage(message);
            maxComplexity = Math.max(maxComplexity, complexity);
            return _.merge({ complexity }, oneResult);
        }).filter(({ complexity }) => {
            return complexity > this.complexityThreshold;
        });

        return {
            filepath: resolvedFilepath,
            complexity: maxComplexity,
            details: eslintResultWithComplexity
        };
    }
    getComplexityFromMessage(message) {
        const regExpResult = COMPLEXITY.exec(message);
        if (regExpResult && typeof regExpResult[1] === 'string') {
            return Number(regExpResult[1]);
        }
        return 0;
    }
    getComplexityThreshold() {
        if (this.options.complexityThreshold) {
            return this.options.complexityThreshold;
        }
        return defaultComplexityThreshold;
    }
    getPercentage(count) {
        let result = count / this.fileList.length * 100;
        result = result.toFixed(2);
        return result;
    }
}

module.exports = ComplexityChecker;

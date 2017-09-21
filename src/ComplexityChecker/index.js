const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const Linter = require('eslint').Linter;

const BaseChecker = require('../BaseChecker');
const eslintConfig = require('./eslintConfig');

const linter = new Linter();

const COMPLEXITY = /complexity of (\d*)./;

class ComplexityChecker extends BaseChecker {
    check(...args) {
        const result = super.check(...args);

        // Greater than 5 count
        let gt5Count = 0;
        let gt10Count = 0;
        let gt20Count = 0;
        let max = 0;

        const details = this.fileList.map((filepath) => {
            return this.getEslintResultFromFilepath(filepath);
        }).filter((eslintResult) => {
            if (eslintResult.maxComplexity > 20) {
                gt20Count += 1;
            }
            if (eslintResult.maxComplexity > 10) {
                gt10Count += 1;
            }
            if (eslintResult.maxComplexity > 5) {
                gt5Count += 1;
            }
            max = Math.max(max, eslintResult.maxComplexity);
            return eslintResult.maxComplexity > 5;
        });

        _.merge(result, {
            complexity: {
                max,
                gt5Count,
                gt10Count,
                gt20Count,
            }
        });

        if (this.options.verbose) {
            _.merge(result, {
                complexity: {
                    details
                }
            });
        }

        return result;
    }
    getEslintResultFromFilepath(filepath) {
        const extname = path.extname(filepath).slice(1);
        const resolvedFilepath = path.resolve(filepath);
        if (extname !== 'js' && extname !== 'jsx') {
            return {
                filepath: resolvedFilepath,
                maxComplexity: 0,
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
            return complexity > 5;
        });

        return {
            filepath: resolvedFilepath,
            maxComplexity,
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
}

module.exports = ComplexityChecker;

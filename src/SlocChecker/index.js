const fs = require('fs');
const path = require('path');

const sloc = require('sloc');

const BaseChecker = require('../BaseChecker');
const CheckerResult = require('../CheckerResult');

class SlocChecker extends BaseChecker {
    check(...args) {
        super.check(...args);

        const slocResult = this.fileList.reduce((prev, filepath) => {
            const fileContent = fs.readFileSync(filepath, 'utf-8');
            const slocType = this.getSlocTypeFromFilepath(filepath);
            const fileSlocResult = sloc(fileContent, slocType);

            Object.keys(prev).forEach((key) => {
                prev[key] += fileSlocResult[key];
            });
            return prev;
        }, {
            total: 0,
            source: 0,
            comment: 0,
            single: 0,
            block: 0,
            mixed: 0,
            empty: 0,
            todo: 0
        });

        const result = {
            sloc: {
                total: slocResult.total,
                source: slocResult.source,
                comment: slocResult.comment,
                single: slocResult.single,
                block: slocResult.block,
                mixed: slocResult.mixed,
                empty: slocResult.empty,
                todo: slocResult.todo
            }
        };

        return new CheckerResult(result, this.options);
    }
    getSlocTypeFromFilepath(filepath) {
        const extname = path.extname(filepath).slice(1);

        if (extname === 'vue') {
            return 'html';
        }

        return extname;
    }
}

module.exports = SlocChecker;

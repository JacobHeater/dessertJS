(() => {

    'use strict';

    const classHelperStr = `function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }`;
    const createClassStr = `var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();`;
    const toConsumableArrStr = `function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }`;
    const path = `compat/**/*.js`;
    const glob = require('glob-fs')();
    const fs = require('fs');
    const beginIife = '(function () {';
    const strStrict = `'use strict';`;

    var files = glob.readdirSync(path);

    files.forEach(f => {
        console.log(`Cleaning up ${f}...`);

        var contents = fs.readFileSync(f).toString();
        var lines = contents.split(/\n/g);
        var beginIifeIdx = lines.indexOf(beginIife);
        var line;
        var strictIdx;
        var strictLine;

        for (var i = beginIifeIdx - 1; i >= 0; i--) {
            line = lines[i];
            beginIifeIdx = lines.indexOf(beginIife);
            strictLine = lines.find(s => s.indexOf(strStrict) > -1 && lines.indexOf(s) > beginIifeIdx);
            strictIdx = lines.indexOf(strictLine);

            if (line === strStrict) {
                lines.splice(lines.indexOf(line), 1);
            } else if (line === createClassStr || line === classHelperStr || line === toConsumableArrStr) {
                lines.splice(lines.indexOf(line), 1);
                lines.splice(strictIdx + 1, 0, `    ${line}\n`);
            }
        }

        contents = lines.join('\n').trim();

        fs.readFileSync(f).lines

        fs.writeFileSync(f, contents);

        console.log(`Done cleaning up ${f}!`);
    });

})();
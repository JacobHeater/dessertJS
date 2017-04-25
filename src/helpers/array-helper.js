(() => {

    'use strict';

    define(main);

    function main() {
        return ArrayHelper;
    }

    class ArrayHelper {
        static objectValues(obj) {
            return Object.keys(obj).map(k => obj[k]);
        }

        static enumerate(enumerable, callback) {
            if (Array.isArray(enumerable) || 'length' in enumerable) {
                for (var i = 0; i < enumerable.length; i++) {
                    callback(enumerable[i], i);
                }
            }
        }

        static remove(enumerable, callback) {
            if (Array.isArray(enumerable)) {
                let match = enumerable.find(callback);
                let idx = enumerable.indexOf(match);
                enumerable.splice(idx, 1);
            }
        }

        static isInArray(value, array) {
            return array.indexOf(value) > -1;
        }
    }
})();

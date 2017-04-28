(() => {

    'use strict';

    define(main);

    function main() {
        return TypeHelper;
    }

    class TypeHelper {
        static isFunction(fn) {
            return typeof fn === 'function';
        }
        static isObject(obj) {
            return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
        }
        static isString(str) {
            return typeof str === 'string';
        }
    }

})();
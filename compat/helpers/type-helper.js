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
    }
})();
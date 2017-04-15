(() => {

    'use strict';

    const COMMON = {
        get noop() {
            return function () {};
        }
    };

    define(main);

    function main() {
        return COMMON;
    }
})();
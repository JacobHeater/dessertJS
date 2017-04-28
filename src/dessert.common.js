(() => {

    'use strict';

    const COMMON = {
        get noop() {
            return function() {};
        },
        isInvalid: isInvalid
    };

    define(main);

    function main() {
        return COMMON;
    }

    function isInvalid(value) {
        return isNaN(value) || (value === new Date("abc")) || value === null || value === undefined;
    }

})();
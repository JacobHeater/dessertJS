(function () {

    'use strict';

    var COMMON = {
        get noop() {
            return function () {};
        }
    };

    define(main);

    function main() {
        return COMMON;
    }
})();
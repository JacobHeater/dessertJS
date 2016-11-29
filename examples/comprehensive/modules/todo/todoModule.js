(function () {
    'use strict';

    define(main);

    function main() {
        return function todoModuleInit(app) {
            return app.module("todoModule");
        }
    }
})();
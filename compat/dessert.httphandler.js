(function () {

    'use strict';

    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    define(main);

    function main() {
        return HttpHandler;
    }

    var HttpHandler = function HttpHandler() {
        _classCallCheck(this, HttpHandler);

        var HANDLERS = {};

        addHandlerFunctions(this, HANDLERS);
    };

    function addHandlerFunctions(instance, handlers) {
        instance.addHandler = function addHandler(code, handler) {
            var cache = handlers[code];

            if (!cache) {
                cache = [];
                handlers[code] = cache;
            }

            cache.push(handler);
        };

        instance.getHandlers = function (code) {
            return handlers[code] || [];
        };

        instance.fireHandlers = function (code, args) {
            return instance.getHandlers(code).forEach(function (h) {
                return h.apply(undefined, _toConsumableArray(args));
            });
        };
    }
})();
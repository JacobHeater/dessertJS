(() => {

    'use strict';

    define(main);

    function main() {
        return HttpHandler;
    }

    class HttpHandler {
        constructor() {
            const HANDLERS = {};

            addHandlerFunctions(this, HANDLERS);
        }
    }

    function addHandlerFunctions(instance, handlers) {
        instance.addHandler = function addHandler(code, handler) {
            var cache = handlers[code];

            if (!cache) {
                cache = [];
                handlers[code] = cache;
            }

            cache.push(handler);
        };

        instance.getHandlers = code => handlers[code] || [];

        instance.fireHandlers = (code, args) => instance.getHandlers(code).forEach(h => h(...args));
    }
})();
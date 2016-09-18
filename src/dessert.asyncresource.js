(function() {
    "use strict";
    define("dessert.asyncresource", ["dessert.common"], function(common) {
        function asyncResource() {
            var _ready = common.utils.noop;
            this.ready = function(done) {
                _ready = done;
                return this;
            };

            this.notify = function(thisArg, args) {
                args = Array.isArray(args) ? args : [];
                if (common.utils.isFunction(_ready)) {
                    _ready.apply(thisArg, args);
                }
                return this;
            };
        }

        return asyncResource;
    });
})();

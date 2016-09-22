(function() {
    "use strict";
    define("dessert.asyncresource", ["dessert.common"], function(common) {
        function asyncResource() {
            var _resolve = common.utils.noop;
            this.resolve = function(done) {
                _resolve = done;
                return this;
            };

            this.notify = function(thisArg, args) {
                args = Array.isArray(args) ? args : [];
                if (common.utils.isFunction(_resolve)) {
                    _resolve.apply(thisArg, args);
                }
                return this;
            };
        }

        return asyncResource;
    });
})();

(function() {

    "use strict";

    var depedencies = [
        "dessert.common"
    ];

    define("dessert.asyncresource", depedencies, main);

    /**
     * Require entry point.
     * 
     * @param {Object} common The common library for dessertJS.
     */
    function main(common) {
        /**
         * A class for handling asynchronous resources in dessertJS.
         * 
         * @class
         */
        function asyncResource() {
            var _resolve = common.utils.noop;

            /**
             * Sets the function to be called when the resource .notify() function is called.
             * 
             * @param {Function} done The function to call when the resource is notified.
             * @returns {Object} The current instance of asyncResource.
             */
            this.resolve = function(done) {
                _resolve = done;
                return this;
            };

            /**
             * Notifies the asynchronous resource that the resource has finished loading.
             * 
             * @param {any} thisArg The argument to bind the .resolve() function's this context to.
             * @param {any[]} args The arguments to pass into the .resolve() function.
             * @returns {Object} The current instance of asyncResource.
             */
            this.notify = function(thisArg, args) {
                args = Array.isArray(args) ? args : [];
                if (common.utils.isFunction(_resolve)) {
                    _resolve.apply(thisArg, args);
                }
                return this;
            };
        }

        return asyncResource;
    }
})();
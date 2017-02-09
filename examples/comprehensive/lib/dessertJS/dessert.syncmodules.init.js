/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function () {

    "use strict";

    define([
            './dessert.context.init',
            "./dessert.customtag"
        ],
        /**
         * Require entry point.
         * 
         * @param {ContextInit} contextInit A function that initializes dessert using the given context.
         * @param {CustomTag} $customTag A helper that converts custom tags from their custom tags to their respective HTML.
         * @returns {Function} A wrapper that uses the given DOM element to initialize dessert.
         */
        function dessertSyncModuleInitModule(contextInit, $customTag) {
            /**
             * Creates a closure using the given DOM element to initialize dessert using the given
             * application context.
             * 
             * @param {Element} $context The DOM Element that wraps the dessert scope.
             * @param {Application} app The application instance that holds the configuration for initialization.
             * @param {any} args Arguments that are to be passed along to the initializer.
             * @returns {Function} The closure that contains information about the $context, app and arguments.
             */
            return function dessertSyncModuleInit($context, app, args) {
                return function onExternalModulesProcessed(done) {
                    $customTag.init(app);
                    contextInit($context, app, args, done);
                };
            };
        });

})();
/**
@file A helper module to initialize dessertJS in any context where dessertJS components are defined. Examples of dessertJS elements that need to be initialized are elements that have a dsrt-src attribute on them.
@author Jacob Heater
*/
(function() {

    "use strict";

    define("dessert.context.init", ['dessert.module.init'], main);

    /**
     * The require entry point.
     * 
     * @param {Function} moduleInit The module initialization function that initializes all dsrt-module entities.
     * @returns {Function} A function that initializes dessertJS in a given context.
     */
    function main(moduleInit) {
        /**
         * A function that does the module initialization in dessertJS.
         * 
         * @param {Object} $context The jQuery context that the module is to be initialized in.
         * @param {Object} app The dessertJS application instance that the module belongs to.
         * @param {any[]} args The arguments array that is to be passed into the constructor.
         * @param {Function} callback A callback that is to be fired when initialization is complete.
         */
        return function($context, app, args, callback) {
            moduleInit($context, app, args, callback);
        };
    }
})();
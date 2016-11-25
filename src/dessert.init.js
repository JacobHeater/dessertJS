/**
 * @file A simple require.js module to invoke both async and sync module loading.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define([
        './dessert.externalmodules.init',
        './dessert.syncmodules.init',
        "./dessert.common"
    ],  
    /**
     * The dessertJS initialization module that initializes dessertJS.
     * 
     * @param {ExternalModulesInit} exMod The function that initializes dessertJS external modules.
     * @param {SyncModulesInit} syncmod The function that synchronously initializes dessertJS views.
     * @param {Common} common The dessertJS common library.
     * 
     * @returns {Function} The function that is responsible initializing dessertJS.
     */
    function dessertInitModule(exmod, syncmod, common) {

        /**
         * The function that is responsible for initializing dessertJS.
         * 
         * @param {Element} $app The DOM element that represents the Application.
         * @param {Application} app The application that is being initialized.
         * @param {any} args The arguments that are to be passed to the controller.
         * @param {Boolean} isPage Determines if this is a single page application being initialized or not.
         * @param {Boolean} isHash Determines if the window.onhashchange event called the initialization.
         * @param {Function} done The function that will be invoked after initialization is done.
         */
        return function dessertInit($app, app, args, isPage, isHash, done) {
            var $context;
            if (!app.initialized) {
                $context = $app;
                app.initialized = true;
            } else {
                if (isPage) {
                    $context = $app.find(common.selectors.page).parent();
                } else {
                    $context = $app;
                }
            }
            var externalInit = exmod($context, app, isPage);
            var syncInit = syncmod($context, app, args);
            if (isHash) {
                externalInit(function emptyInitCallback() {}, done);
            } else {
                externalInit(syncInit, done);
            }
        };
    });

})();
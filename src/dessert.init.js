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
    ], function dessertInitModule(exmod, syncmod, common) {
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
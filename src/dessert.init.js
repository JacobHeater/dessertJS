/**
 * @file A simple require.js module to invoke both async and sync module loading.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.init", ['dessert.externalmodules.init', 'dessert.syncmodules.init'], function(exmod, syncmod) {
        return function($app, app, args, isPage, isHash, done) {
            var externalInit = exmod($app, app, isPage);
            var syncInit = syncmod($app, app, args, done);
            if (isHash) {
                externalInit(function() {}, done);
            } else {
                externalInit(syncInit, done);
            }
        };
    });

})();
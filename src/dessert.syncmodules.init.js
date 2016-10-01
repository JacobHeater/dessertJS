/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function() {

    "use strict";

    define("dessert.syncmodules.init", [
        'dessert.context.init',
        "dessert.customtag"
    ], function(contextInit, $customTag) {
        return function dessertSyncModuleInit($context, app, args) {
            return function onExternalModulesProcessed(done) {
                $customTag.init(app);
                contextInit($context, app, args, done);
            };
        };
    });

})();
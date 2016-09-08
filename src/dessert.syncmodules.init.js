(function() {

    "use strict";

    define("dessert.syncmodules.init", [
        'dessert.context.init'
    ], function(contextInit) {
        return function($context, app, args) {
            return function onExternalModulesProcessed(done) {
                contextInit($context, app, args, done);
            };
        };
    });

})();
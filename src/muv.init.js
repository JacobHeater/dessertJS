define(['./muv.externalmodules.init', './muv.syncmodules.init'], function(exmod, syncmod) {
    "use strict";
    return function($app, app, args) {
        var externalInit = exmod($app, app);
        var syncInit = syncmod($app, app, args);
        externalInit(syncInit);
    };
});

define(['./dessert.externalmodules.init', './dessert.syncmodules.init'], function(exmod, syncmod) {
    "use strict";
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
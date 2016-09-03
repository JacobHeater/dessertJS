define([
    './dessert.context.init'
], function(contextInit) {
    "use strict";
    return function($context, app, args) {
        return function onExternalModulesProcessed(done) {
          contextInit($context, app, args, done);
        };
    };
});

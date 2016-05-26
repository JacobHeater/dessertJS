define([
    './muv.context.init'
], function(contextInit) {
    return function($context, app, args) {
        return function onExternalModulesProcessed() {
          contextInit($context, app, args);
        };
    };
});

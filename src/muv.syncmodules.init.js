define([
    './muv.context.init'
], function(contextInit) {
    "use strict";
    return function($context, app, args) {
        return function onExternalModulesProcessed() {
          contextInit($context, app, args);
        };
    };
});

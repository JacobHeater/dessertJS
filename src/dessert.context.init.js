/***************************
@file A helper module to initialize dessertJS in any context where dessertJS components are defined. Examples of dessertJS elements that need to be initialized are elements that have a dsrt-src attribute on them.
@author Jacob Heater
****************************/
define(['./dessert.module.init'], function(moduleInit) {
    "use strict";
    return function($context, app, args, callback) {
        moduleInit($context, app, args, callback);
    };
});

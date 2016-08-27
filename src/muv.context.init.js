/***************************
@file A helper module to initialize muvJS in any context where muvJS components are defined. Examples of muvJS elements that need to be initialized are elements that have a muv-src attribute on them.
@author Jacob Heater
****************************/
define(['./muv.module.init'], function(moduleInit) {
    "use strict";
    return function($context, app, args, callback) {
        moduleInit($context, app, args, callback);
    };
});

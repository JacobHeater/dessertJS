/***********************************
@file The muvJS Control class is simply just a decorator that adds some muvJS dependencies to the jQuery element that is given as the element argument.
@author Jacob Heater
************************************/
define(['./muv.common', './muv.control.extensions'], function(common, extender, view) {
    "use strict";
    var attrs = common.attrs;
    var selectors = common.selectors;
    //A Control is a wrapper for an element in a view.
    function Control(name, element, view) {
        //This just ensures that we don't accidentally override any current instance to the muv object.
        element.muv = element.muv || {};
        element.muv.name = name;
        element.muv.view = view;
        extender(element, $);
        return element;
    };
    return Control;
});

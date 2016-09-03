/***********************************
@file The dessertJS Control class is simply just a decorator that adds some dessertJS dependencies to the jQuery element that is given as the element argument.
@author Jacob Heater
************************************/
define(['./dessert.common', './dessert.control.extensions'], function(common, extender, view) {
    "use strict";
    var attrs = common.attrs;
    var selectors = common.selectors;
    //A Control is a wrapper for an element in a view.
    function Control(name, element, view) {
        //This just ensures that we don't accidentally override any current instance to the dsrt object.
        element.dsrt = element.dsrt || {};
        element.dsrt.name = name;
        element.dsrt.view = view;
        extender(element, $);
        return element;
    };
    return Control;
});

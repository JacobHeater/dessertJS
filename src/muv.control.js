
define(['./muv.common', './muv.control.extensions'], function(common, extender) {
    var attrs = common.attrs;
    var selectors = common.selectors;
    //A Control is a wrapper for an element in a view.
    var Control = function(name, element, $) {
        //This just ensures that we don't accidentally override any current instance to the muv object.
        element.muv = element.muv || {};
        element.muv.name = name;
        extender(element, $);
        return element;
    };
    return Control;
});

/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function () {

    "use strict";

    define("dessert.view.init", [
        "dessert.common",
        "dessert.viewbuilder"
    ], dessertViewInitModule);

    /**
     * Require entry point.
     * 
     * TODO: define params.
     */
    function dessertViewInitModule(
        $common,
        $ViewBuilder
    ) {
        var selectors = $common.selectors;
        var attrs = $common.attrs;

        return function dessertViewInit($controller, controller, module, $module, app, args, page, callback) {

            var $jquery = null;

            if (app && app.providers) {
                if (app.providers.jquery && app.providers.jquery.fn) {
                    $jquery = app.providers.jquery;
                }
            }

            var views;

            if ($controller) {
                //If no controller, we'll consider it a partial view.
                views = $controller.find(selectors.view);
            } else {
                //Look in the module definition for partial views.
                views = $module.find(selectors.view);
            }

            var $view;

            //We need to go through each view and start building out the view elements.
            views.each(function () {
                //Keep a reference to the jQuery view object.
                $view = $jquery(this);
                
                $ViewBuilder($view, controller, module, app, args, page);
            });

            $jquery(selectors.mask).removeAttr(attrs.mask);

            if ($common.utils.isFunction(app.maskLifted)) {
                app.maskLifted();
            }

            if ($common.utils.isFunction(callback)) {
                callback();
            }
        };
    }

})();
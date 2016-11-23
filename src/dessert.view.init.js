/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function () {

    "use strict";

    define([
        "./dessert.common",
        "./dessert.viewbuilder"
    ], dessertViewInitModule);

    /**
     * Require entry point.
     * 
     * @param {Common} $common The dessert common helper library.
     * @param {ViewBuilder} $ViewBuilder The dessert view builder helper function.
     */
    function dessertViewInitModule(
        $common,
        $ViewBuilder
    ) {
        var selectors = $common.selectors;
        var attrs = $common.attrs;

        /**
         * Initializes the view using the dessert ViewBuilder helper function and
         * appends it to the page.
         * 
         * @param {Element} $controller The DOM Element that represents dessert controller that the view belongs to.
         * @param {Controller} controller The dessert controller instance that the binds the View to the model.
         * @param {Module} module The dessert Module instance that the View belongs to.
         * @param {Element} $module The DOM Element that represents the dessert Module instance.
         * @param {Application} app The dessert application instance that the View belongs to.
         * @param {any} args Arguments that are to be passed along to the controller when the view is initialized.
         * @param {Page} page The dessert Page instance that the View will be rendere to.
         * @param {Function} callback The callback to be called when the rendering is completed. 
         */
        return function dessertViewInit($controller, controller, module, $module, app, args, page, callback) {

            var $jquery = null;

            if (app.providers.jquery) {
                $jquery = app.providers.jquery;
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
                //Use the $ViewBuilder function to render the view.
                $ViewBuilder($view, controller, module, app, args, page);
            });

            //Because view rendering is synchronous, we can remove the mask attribute at this point
            //because we know that the rendering is complete at this point.
            $jquery(selectors.mask).removeAttr(attrs.mask);

            /*
            A hook has been provided in the Application prototype to listen for when
            the dessert mask has been lifted. Call that here if it's defined.
            */
            if ($common.utils.isFunction(app.maskLifted)) {
                app.maskLifted();
            }

            if ($common.utils.isFunction(callback)) {
                callback();
            }
        };
    }

})();
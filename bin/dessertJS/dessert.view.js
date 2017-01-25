(function () {

    "use strict";

    define([
            "./dessert.common",
            "./dessert.events",
            "./dessert.control"
        ],
        /**
         * The dessert View module exposes the dessert View constructor.
         * 
         * @param {Common} common The dessertJS common library.
         * @param {Events} events The events module.
         * @param {Control} Control The dessertJS Control prototype.
         * 
         * @returns {View} The View constructor.
         */
        function dessertViewModule(
            common,
            events,
            Control
        ) {


            /**
             * A view in dessertJS is a self-explanatory component, it represents
             * the visual element of your application. That being said, Views are
             * comprised of Controls in the View. The Controls are elements in the View
             * marked with the Control attribute. They are compiled at the time the application
             * is loaded, and are added to a hash table by their name. So, essentially,
             * a View is a collection of Controls on the page, that can be interacted with.
             * 
             * @param {Element} $view The DOM Element that represents the view on the page.
             * @param {String} name The name of the view.
             * @param {Application} app The dessert application instance the View instance belongs to.
             * @param {Module} module The dessert module instance that the View instance belongs to.
             * @param {Controller} controller The dessert controller instance that the View instance belongs to.
             * @param {any} args Any arguments that are to be passed along to the controller when the View is rendered.
             */
            function View($view, name, app, module, controller, args) {
                this.name = name || "";
                this.app = app;
                this.module = module;
                this.viewArgs = args;
                this.controller = controller;
                this.$view = $view;
                /**
                 * Destroys the view on the page.
                 */
                this.destroy = function destroy() {
                    this.$view.remove();
                    delete this.controller;
                    delete this.$view;
                };
                /**
                 * Wires up events using the dessert events utility.
                 * The event names are mapped to a property on the view
                 * instance with the same name, and allow for handling
                 * events with the given name.
                 * 
                 * @param {String[]} eventNames The names of the events to wire up.
                 * @returns {Object} The current instance of View for chaining.
                 */
                this.configureEvents = function configureEvents() {
                    events(this, Array.apply(null, arguments));
                    return this;
                };
                /**
                 * A hash table of controls that are added by unique name.
                 * Because of the nature of the controls hash table, the names of
                 * controsl must be unique.
                 */
                this.controls = {
                    /**
                     * Adds a control instance to the view controls hash table.
                     * 
                     * @param {Object} control The control instance to add.
                     * @returns {Object} The current instance of the controls object.
                     */
                    add: function add(control) {
                        if (common.utils.isObject(control)) {
                            this[control.name] = new Control(control.name, control.elem, control.view, control.app);
                        }
                        return this;
                    },
                    /**
                     * Gets a control in the view hash table by name.
                     * 
                     * @param {String} name The name of the control to look up.
                     * @returns {Object} The control in the hash table.
                     */
                    get: function get(name) {
                        return this[name];
                    },
                    /**
                     * Removes a control by name from the hash table.
                     * 
                     * @param {String} name The name of the control to remove.
                     * @returns {Object} The current instance of the controls object.
                     */
                    remove: function remove(name) {
                        delete this[name];
                        return this;
                    }
                };
                /**
                 * Control groups are groups of controls that are grouped together by a common name.
                 * This makes it easy to apply common functionality to a group of controls.
                 */
                this.controlGroups = {};
                /**
                 * A hash table that represents the components of the view. Components are reusable
                 * controls that encapsulate their own logic.
                 */
                this.components = {};
            };

            /**
             * Refreshes the current View and rebuilds the controls hash, components hash, and
             * reinitializes external modules.
             */
            View.prototype.refresh = function emptyRefreshFunction() {}; //To be set in the view builder.

            return View;
        });
})();
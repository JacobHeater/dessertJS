(function() {

    "use strict";

    define("dessert.view", [
            "dessert.events"
        ],
        function dessertViewModule(events) {

            
            /**
             * A view in dessertJS is a self-explanatory component, it represents
             * the visual element of your application. That being said, Views are
             * comprised of Controls in the View. The Controls are elements in the View
             * marked with the Control attribute. They are compiled at the time the application
             * is loaded, and are added to a hash table by their name. So, essentially,
             * a View is a collection of Controls on the page, that can be interacted with.
             * 
             * @param {String} name The name of the view.
             * @param {Object} controller The controller that the view is associated with.
             * @param {Object} $view The jQuery object that represents the view on the page.
             */
            function View(name, controller, $view) {
                this.name = name || "";
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
                this.controls = {
                    /**
                     * Adds a control instance to the view controls hash table.
                     * 
                     * @param {Object} control The control instance to add.
                     * @returns {Object} The current instance of the controls object.
                     */
                    add: function add(control) {
                        if (control && control.dsrt) {
                            this[control.dsrt.name] = control;
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
                this.controlGroups = {};
                this.components = {};
            };
            return View;
        });
})();
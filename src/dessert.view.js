(function() {

    "use strict";

    define("dessert.view", [
            "dessert.events"
        ],
        function(events) {
            //A View is a collection of Controls
            var View = function(name, controller, $view) {
                this.name = name || "";
                this.controller = controller;
                this.$view = $view;
                this.destroy = function() {
                    this.$view.remove();
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
                this.configureEvents = function() {
                    events(this, Array.apply(null, arguments));
                    return this;
                };
                this.controls = {
                    add: function(control) {
                        if (control && control.dsrt) {
                            this[control.dsrt.name] = control;
                        }
                        return this;
                    },
                    get: function(name) {
                        return this[name];
                    },
                    remove: function(name) {
                        delete this[name];
                        return this;
                    }
                };
            };
            return View;
        });
})();
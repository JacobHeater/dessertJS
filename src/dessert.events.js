/**
 * @file Sets up events for the given view, and allows for custom event handling
 * in the dessertJS view context.
 * @author Jacob Heater
 */
define("dessert.events", [], function() {
    
    "use strict";
    
    /**
     * Iterates over the eventNames array and creates a new hash table that allows for adding
     * event listeners to custom events. The events can be looked up in the view by their name.
     * 
     * @param {Object} view The dessertJS view instance to add events to.
     * @param {String[]} eventNames The list of event names to add as events.
     */
    return function(view, eventNames) {
        //Duck type eventNames to check if it's an array
        if (eventNames && eventNames.length && eventNames.concat && eventNames.shift && eventNames.splice && eventNames.pop && eventNames.map) {
            eventNames.map(function(n) {
                view[n] = {
                    listeners: [],
                    //Adds a listener to the listeners stack
                    /**
                     * Adds an event listener to the current event.
                     * 
                     * @param {Function} handler The function to be invoked when
                     * the event is raised.
                     * @returns {Object} The current event for chaining.
                     */
                    addListener: function(handler) {
                        if (typeof handler === 'function') {
                            this.listeners.push(handler);
                        }
                        return this;
                    },
                    /**
                     * Removes the given listener from the listener array.
                     * 
                     * @param {Function} handler The handler to remove from the array.
                     * @returns {Object} The current instance of the event for chaining.
                     */
                    removeListener: function(handler) {
                        var indexOf = this.listeners.indexOf(handler);
                        if (indexOf > -1) {
                            this.listeners.splice(indexOf, 1);
                        }
                        return this;
                    },
                    /**
                     * Triggers all of the event listeners for the current event,
                     * and supplies any arguments to the handler functions.
                     * 
                     * @returns {Object} The current event instance for chaining.
                     */
                    trigger: function() {
                        for (var i = 0, len = this.listeners.length; i < len; i++) {
                            this.listeners[i].apply(null, arguments);
                        }
                        return this;
                    }
                };
            });
        }
    };
});

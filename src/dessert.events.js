define(function() {
    "use strict";
    return function(view, eventNames) {
        //Duck type eventNames to check if it's an array
        if (eventNames && eventNames.length && eventNames.concat && eventNames.shift && eventNames.splice && eventNames.pop && eventNames.map) {
            eventNames.map(function(n) {
                view[n] = {
                    listeners: [],
                    //Adds a listener to the listeners stack
                    addListener: function(listener) {
                        if (typeof listener === 'function') {
                            this.listeners.push(listener);
                        }
                        return this;
                    },
                    removeListener: function(listener) {
                        var indexOf = this.listeners.indexOf(listener);
                        if (indexOf > -1) {
                            this.listeners.splice(indexOf, 1);
                        }
                        return this;
                    },
                    trigger: function(params) {
                        for (var i = 0, len = this.listeners.length; i < len; i++) {
                            this.listeners[i].apply(this.listeners[i], arguments);
                        }
                        return this;
                    }
                };
            });
        }
    };
});

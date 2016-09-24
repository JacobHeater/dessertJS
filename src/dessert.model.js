/**
 * @file A simple prototype that defines a data model.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.model", function dessertModelModule() {
        //A Model is a data object for the view.
        /**
         * Defines a data model for the dessertJS MVC application.
         * 
         * @class
         * 
         * @param {Object} members The members hash table to merge into the current
         * Model instance.
         */
        function Model(members) {
            if (typeof members === 'object') {
                Object.keys(members).forEach(function modelKeysEach(key) {
                    this[key] = members[key];
                }.bind(this));
            }
        };
        return Model;
    });

})();
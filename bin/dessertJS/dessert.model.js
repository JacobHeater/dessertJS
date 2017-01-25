/**
 * @file A simple prototype that defines a data model.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define(
        ["./dessert.common"],
        /**
         * The dessertJS Model module that exposes the Model prototype.
         * 
         * @param {Common} $common The dessertJS common helper library.
         * 
         * @returns {Model} The Model prototype.
         */
        function dessertModelModule($common) {
            /**
             * Defines a data model for the dessertJS MVC application.
             * 
             * @class
             * 
             * @param {Object} members The members hash table to merge into the current
             * Model instance.
             */
            function Model(members) {
                if ($common.utils.isObject(members)) {
                    Object.assign(this, members);
                }
            };
            return Model;
        });

})();
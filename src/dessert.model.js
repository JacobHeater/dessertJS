﻿/**
 * @file A simple prototype that defines a data model.
 * @author Jacob Heater
 */
define("dessert.model", function() {
    "use strict";
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
            Object.keys(members).forEach(function(key) {
                this[key] = members[key];
            }.bind(this));
        }
    };
    return Model;
});

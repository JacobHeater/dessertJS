
define(function() {
    "use strict";
    //A Model is a data object for the view.
    function Model(members) {
        if (typeof members === 'object') {
            Object.keys(members).forEach(function(key) {
                this[key] = members[key];
            }.bind(this));
        }
    };
    return Model;
});

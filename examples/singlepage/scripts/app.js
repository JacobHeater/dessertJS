define(['dessert.core'], function (dessert) {
    "use strict";
    
    return dessert
    .app('package', function() {
        this.src = "./views/";
        this.templates = "./templates/";
        this.dessertPath = "./scripts/dessert/";
    });
});

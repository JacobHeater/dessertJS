define(['dessert.core'], function(dessert) {
    "use strict";
    return dessert
        .app('app')
        .onInit(function() {
            this.src = "./views/";
            this.templates = "./templates/";
            this.dessertPath = "./scripts/dessert/";
        })
        .cache()
        .ready();
});
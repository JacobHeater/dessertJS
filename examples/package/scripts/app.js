define(['dessert.core', "jquery"], function(dessert, $) {
    "use strict";
    return dessert
        .app('package', function() {
            this.src = "./views/";
            this.templates = "./templates/";
            this.providers.jquery = $;
        });
});
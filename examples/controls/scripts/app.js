(function() {
    "use strict";

    require.config({
        paths: {
            jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min"
        }
    });

    require([
        "dessert.core",
        "./scripts/register-components",
        "./scripts/register-tags",
        "./scripts/module-main"
    ], function(dessert, registerComponents, registerTags, setupMainModule) {
        var app = dessert
            .app('controls', function() {
                this.src = "./views/";
                this.templates = "./templates/";
                this.dessertPath = "./scripts/dessert/";
                registerTags(this);
                registerComponents(this);
            });

        setupMainModule(app);

        app.init();
    });

})();
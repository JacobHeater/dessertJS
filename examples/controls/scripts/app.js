(function() {
    "use strict";

    require.config({
        paths: {
            jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min"
        }
    });

    require([
        "../../../bin/dessertJS/dessert.core",
        "./scripts/register-components",
        "./scripts/register-tags",
        "./scripts/module-main",
        "jquery"
    ], function(dessert, registerComponents, registerTags, setupMainModule, $) {
        var app = dessert
            .app('controls', function() {
                this.src = "./views/";
                this.templates = "./templates/";
                this.providers.jquery = $;

                registerTags(this);
                registerComponents(this);
            });

        setupMainModule(app);

        app.init();
    });

})();
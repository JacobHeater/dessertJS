(function() {
    'use strict';

    require.config({
        paths: {
            handlebars: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.min",
            jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min"
        }
    });

    require(["./scripts/app"]);
    
})();

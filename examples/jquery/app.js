(function() {

    'use strict';
    

    require.config({
        paths: {
            'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min'
        }
    });

    require(
        [
            'jquery',
            'dessert.core',
            './extensions/custom-element',
            './components/register',
            './routing/route',
            './controllers/jquery-example-controller'
        ],
        main
    );


    function main(
        $,
        dessert,
        CustomElement,
        registerComponents,
        registerRoutes,
        jQueryExampleController
    ) {
        var app = dessert.app('jquery-example', {
            DessertElement: CustomElement
        });

        app.addHttpHandler(404, function () {
            app.page.element.innerHTML = '<h1>Whoops! Something went wrong!</h1>';
        });

        jQueryExampleController(app);
        registerComponents(app);
        registerRoutes(app);

        app.render();
    }

})();

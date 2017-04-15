(() => {

    'use strict';

    require(
        [
            'dessert.core',
            './controllers/hello-world-controller',
            './components/register',
            './routing/route'
        ],
        main
    );

    function main(
        dessert,
        helloWorldController,
        registerComponents,
        registerRoutes
    ) {
        var app = dessert.app('hello-world');

        helloWorldController(app);
        registerComponents(app);

        app.addHttpHandler(404, function () {
            app.page.innerHTML = '<h1>Whoops! Something went wrong!</h1>';
        });

        registerRoutes(app);
        
        app.render();
    }

})();
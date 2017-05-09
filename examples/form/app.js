(() => {

    'use strict';

    require.config({
        paths: {
            handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.7/handlebars.min'
        }
    });

    require([
        'dessert.core',
        './routing/route',
        './controllers/form-controller',
        './controllers/authenticate-controller',
        './controllers/account-controller',
        './components/register',
        './resources/resources'
    ], main);

    function main(
        dessert,
        mapRoutes,
        formController,
        authController,
        accountController,
        registerComponents,
        resources
    ) {
        var app = dessert.app('form-demo');

        mapRoutes(app);
        formController(app);
        authController(app);
        accountController(app);
        registerComponents(app);
        resources(app);

        app.render();
    }

})();

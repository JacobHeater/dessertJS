(() => {

    'use strict';

    require([
        'dessert.core',
        './routing',
        './controllers/form-controller',
        './components/register'
    ], main);

    function main(
        dessert,
        mapRoutes,
        formController,
        registerComponents
    ) {
        var app = dessert.app('form-demo');

        mapRoutes(app);
        formController(app);
        registerComponents(app);

        app.render();
    }

})();

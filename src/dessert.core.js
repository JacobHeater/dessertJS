(() => {
    
    'use strict';

    var Application;
    var EventHelper;
    var $Promise;
    
    define(
        [
            'helpers/event-helper',
            'helpers/promise',
            'dessert.application',
            'dessert.component',
            'dessert.partialview'
        ],
        main
    );

    const APP_CACHE = {};
    const DESSERT = {
        app: appFactory,
        promise: promiseFactory
    };

    function main(
        $EventHelper,
        _Promise,
        $Application,
    ) {
        Application = $Application;
        EventHelper = $EventHelper;
        $Promise = _Promise;

        initEvents();
        
        return DESSERT;
    };

    function appFactory(name) {
        var app = APP_CACHE[name];

        if (!app) {
            app = new Application(name);
            APP_CACHE[name] = app;
        }

        return app;
    }

    function initEvents() {
        EventHelper.initHashChange(onHashChange);
    }

    function onHashChange() {
        Object
            .keys(APP_CACHE)
            .map(k => APP_CACHE[k])
            .forEach(app => app.render());
    }

    function promiseFactory() {
        return new $Promise();
    }

})();

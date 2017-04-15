(function () {

    'use strict';

    var Application;
    var EventHelper;
    var $Promise;

    define(['helpers/event-helper', 'helpers/promise', 'dessert.application', 'dessert.component'], main);

    var APP_CACHE = {};
    var DESSERT = {
        app: appFactory,
        promise: promiseFactory
    };

    function main($EventHelper, _Promise, $Application) {
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
        Object.keys(APP_CACHE).map(function (k) {
            return APP_CACHE[k];
        }).forEach(function (app) {
            return app.render();
        });
    }

    function promiseFactory() {
        return new $Promise();
    }
})();
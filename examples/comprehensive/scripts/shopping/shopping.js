(function() {

    'use strict';


    define([
        '../../controllers/shopping/store-controller.js'
    ], main);

    function main(
        initStoreController
    ) {
        return function initShopping(app) {

            app.registerTags([{
                name: "shoppingCart",
                renderAs: app.customTagTypes.component,
                renderAsValue: "shopping-cart",
                tag: "shoppingCart"
            }, {
                name: "store",
                renderAs: app.customTagTypes.component,
                renderAsValue: "store",
                tag: "store"
            }]);

            app.components.register([{
                name: "shopping-cart",
                entry: "./components/shopping/cart/cart"
            }, {
                name: "store",
                entry: "./components/shopping/store/store"
            }]);

            var module = app.module('shopping');
            initStoreController(module);
        };
    }

})();
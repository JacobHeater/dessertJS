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
            }]);

            app.components.register([{
                name: "shopping-cart",
                entry: "./components/shopping/cart/cart"
            }]);

            var module = app.module('shopping');
            initStoreController(module);
        };
    }

})();
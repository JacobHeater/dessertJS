(function() {


    'use strict';

    define(main);

    function main() {
        return function initStoreController($module) {
            $module.controller('store-controller', function() {

                var view;
                var components;
                var store;
                var cart;

                this.scope = function($scope) {
                    view = $scope.view;
                    components = view.components;
                };

                this.init = function() {
                    store = components.store;
                    cart = components.cart;

                    store.resolve(function() {
                        store = this;
                        this.onItemAddedToCart = function() {
                            cart.buildCart();
                        };
                        this.addItem({
                            name: "Ethiopain Yirgacheffe Beans",
                            price: "$9.99",
                            numericalPrice: 9.99,
                            quantity: 20,
                            description: "Only the finest bean."
                        });
                        this.addItem({
                            name: 'AeroPress',
                            price: '$25.00',
                            numericalPrice: 25,
                            quantity: 20,
                            description: 'AeroPress coffee maker.'
                        });
                    });

                    cart.resolve(function() {
                        cart = this;
                    });
                };

            });
        }
    }


})();

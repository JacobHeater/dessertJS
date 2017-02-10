(function() {

    'use strict';

    define([
        'jquery',
        '../../../services/shopping/cart-service.js'
    ], main);

    function main($, cartService) {
        var _html;
        var cart = cartService.cart;
        return function buildShoppingCart(component) {
            var ShoppingCart = component.extend(function() {
                component.call(this);

                this.render = function(done) {
                    if (!_html) {
                        $.get('./components/shopping/cart/views/cart.html')
                         .then(function(html) {
                            _html = html;
                            done($(_html));
                         });
                    } else {
                        done($(_html));
                    }
                };

                this.constructor = function(elem) {
                    
                    this.buildCart = function() {
                        if (cart.Items.length) {
                            //Do build here...
                        } else {
                            elem.html('No items in your cart');
                        }
                    };

                    this.buildCart();
                };
            });

            return ShoppingCart;
        };
    }

})();
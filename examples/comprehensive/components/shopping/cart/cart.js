(function() {

    'use strict';

    define([
        'jquery',
        'handlebars',
        '../../../services/shopping/cart-service.js'
    ], main);

    function main($, handlebars, cartService) {
        var _html;
        var _template;
        return function buildShoppingCart(component) {
            var ShoppingCart = component.extend(function() {
                component.call(this);

                this.render = function(done) {
                    if (!_html && !_template) {
                        $.when(
                            $.get('./components/shopping/cart/views/cart.html'),
                            $.get('./components/shopping/cart/views/item-template.html')
                        ).then(function(cart, template) {
                            _html = cart[0];
                            _template = template[0];
                            done($(_html));
                        });
                    } else {
                        done($(_html));
                    }
                };

                this.constructor = function(elem) {

                    var that = this;
                    var $items = elem.find('.items');
                    var $btnCheckout = elem.find('.btn-checkout');
                    
                    this.buildCart = function() {
                        var cart = cartService.cart;
                        this.clearCart();
                        if (cart.Items.length) {
                            var compiled = handlebars.compile(_template);
                            var item;
                            var $item;
                            cart.Items.forEach(function(i) {
                                item = compiled(i);
                                $item = $(item);
                                $items.append($item);
                            });
                        } else {
                            $items.html('No items in your cart');
                        }
                    };

                    this.clearCart = function() {
                        $items.empty();
                    };

                    this.buildCart();

                    $btnCheckout.click(function() {
                        var cart = cartService.cart;

                        cart.clear();
                        cart.saveTo(cartService);

                        that.buildCart();
                    });
                };
            });

            return ShoppingCart;
        };
    }

})();
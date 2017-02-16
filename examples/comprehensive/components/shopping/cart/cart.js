(function () {

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
            var ShoppingCart = component.extend(function () {
                component.call(this);

                this.render = function (done) {
                    if (!_html && !_template) {
                        $.when(
                            $.get('./components/shopping/cart/views/cart.html'),
                            $.get('./components/shopping/cart/views/item-template.html')
                        ).then(function (cart, template) {
                            _html = cart[0];
                            _template = template[0];
                            done($(_html));
                        });
                    } else {
                        done($(_html));
                    }
                };

                this.constructor = function (elem) {

                    var that = this;
                    var $items = elem.find('.items');
                    var $btnCheckout = elem.find('.btn-checkout');
                    var total = elem.find('.total .value');

                    this.buildCart = function () {
                        var cart = cartService.cart;
                        this.clearCart();
                        if (cart.Items.length) {
                            var compiled = handlebars.compile(_template);
                            var item;
                            var $item;
                            var groups = groupArray(cart.Items, function(item) {
                                return item.name;
                            });
                            var subTotal = 0;
                            Object.keys(groups).forEach(function(key) {
                                var group = groups[key];
                                var i = group[0];
                                i.quantity = groups[i.name].length;
                                subTotal += i.numericalPrice * i.quantity;
                                item = compiled(i);
                                $item = $(item);
                                $items.append($item);
                            });

                            total.text(`$${subTotal.toFixed(2)}`);
                        } else {
                            total.text('$0');
                            $items.html('No items in your cart');
                        }
                    };

                    this.clearCart = function () {
                        $items.empty();
                    };

                    this.buildCart();

                    $btnCheckout.click(function () {
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

    function groupArray(arr, predicate) {
        var groups = {};

        arr.forEach(function(item) {
            var result = predicate(item);

            if (!groups[result]) {
                groups[result] = [];
            }

            groups[result].push(item);
        });

        return groups;
    }

})();
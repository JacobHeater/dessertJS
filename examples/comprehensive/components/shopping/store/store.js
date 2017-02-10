(function () {

    'use strict';

    define([
        'jquery',
        'handlebars',
        '../../../services/shopping/cart-service',
        '../../../helpers/uuid'
    ], main);

    var _html;
    var _template;

    function main($, handlebars, cartService, uuid) {

        return function buildStore(component) {
            var Store = component.extend(function() {
                component.call(this);

                this.render = function(done) {

                    if (!_html && !_template) {
                        $.when(
                            $.get('./components/shopping/store/views/store.html'),
                            $.get('./components/shopping/store/views/item-template.html')
                        ).then(function(html, template) {
                            _html = html[0];
                            _template = template[0];

                            done($(_html));
                        });
                    } else {
                        done($(_html));
                    }

                };

                this.constructor = function(elem) {
                    var that = this;

                    this.onItemAddedToCart;

                    this.addItem = function(item) {

                        item.Id = uuid();

                        var compiled = handlebars.compile(_template);
                        var bound = compiled(item);
                        var $elem = $(bound);
                        addItemEventListeners($elem, item);
                        elem.find(".items").append($elem);
                    };

                    function addItemEventListeners(elem, item) {
                        var quantity = elem.find('.quantity');
                        elem.find(".btn-add").click(function() {
                            var cart = cartService.cart;
                            var quant = parseInt(quantity.text());
                            if (quant > 0) {

                                cart.addItem(item);
                                cart.saveTo(cartService);

                                if ($.isFunction(that.onItemAddedToCart)) {
                                    that.onItemAddedToCart();
                                }

                                quant = quant - 1;
                                quantity.text(quant);

                                if (quant === 0) {
                                    $(this).attr('disabled', true);
                                }
                            }
                        });
                    }

                };
            });

            return Store;
        };
    }

})();

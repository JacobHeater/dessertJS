(function () {

    'use strict';

    define([
        '../../helpers/uuid',
        './cart'
    ], main);

    function main(uuid, Cart) {
        var _cartId;
        var _cart;
        var KEY_USER_CART = 'user-cart';
        var KEY_CART_ID = 'user-cart-id';

        var cartService = {
            get cart() {
                if (!_cartId && !_cart) {
                    //It's possible that no cart has been created,
                    //or the cart hasn't been retrieved yet.

                    var cartId = localStorage.getItem(KEY_CART_ID);
                    var cart = localStorage.getItem(KEY_USER_CART);

                    if (!cartId && !cart) {
                        //There is no cart, we need to create one!
                        cartId = uuid();
                        _cart = new Cart(cartId);

                        localStorage.setItem(KEY_CART_ID, cartId);
                        localStorage.setItem(KEY_USER_CART, _cart.serialize());

                        return _cart;
                    } else {
                        return Cart.Parse(cart);
                    }
                } else {
                    cart = localStorage.getItem(KEY_USER_CART);
                    return Cart.Parse(cart);
                }
            },

            set cart(cart) {
                localStorage.setItem(KEY_USER_CART, cart.serialize());
            }
        };

        return cartService;
    }

})();
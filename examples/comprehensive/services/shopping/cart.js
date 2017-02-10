(function() {

    'use strict';


    define([
        '../../helpers/uuid',
    ], main);

    function main(uuid) {

        class Cart {
            constructor(id, items) {
                this.Id = id;
                this.Items = items || [];
            }

            static Parse(json) {
                var parsed = JSON.parse(json);
                return new Cart(parsed.Id, parsed.Items);
            }

            addItem(item) {
                this.Items.push(new Item(item));
            }

            removeItem(predicate) {
                var match = this.Items.find(predicate);

                if (match) {
                    var idx = this.Items.indexOf(match);

                    this.Items.splice(idx, 1);
                }
            }

            clear() {
                this.Items.length = 0;
            }

            serialize() {
                return JSON.stringify(this);
            }
            
        }

        class Item {
            constructor(definition) {
                Object.assign(this, definition);

                this.Id = uuid();
            }
        }

        return Cart;

    }

})();

(function () {

    'use strict';

    define(
        [
            'jquery',
            'dessert.element'
        ],
        main
    );

    function main(
        $,
        DessertElement
    ) {
        class jQueryElement extends DessertElement {
            constructor(element) {
                super(element);
            }

            static factory(html) {
                return new jQueryElement($(html));
            }

            static find(selector) {
                return new jQueryElement($(selector));
            }

            static findAll(selector) {
                return $(selector).map(function() {
                    return new jQueryElement($(this));
                });
            }

            attr(name, value = '') {
                if (name && value !== '') {
                    //set
                    this.element.attr(name, value);
                } else {
                    return this.element.attr(name);
                }
            }

            replaceWith(element) {
                if (element) {
                    this.element.replaceWith(element);
                }
            }

            clone() {
                return this.element.clone();
            }

            empty() {
                this.element.empty();
            }

            find(selector) {
                return new jQueryElement(this.element.find(selector));
            }

            findAll(selector) {
                return this.element.find(selector).map(function() {
                    return new jQueryElement($(this));
                });
            }

            append(child) {
                this.element.append(child);
            }
        }

        return jQueryElement;
    }

})();
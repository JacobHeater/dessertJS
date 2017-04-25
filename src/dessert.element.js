(() => {

    'use strict';
    
    var dom;
    var types;
    var PropertyHelper;

    define([
        './helpers/dom-helper',
        './helpers/type-helper',
        './helpers/property-helper'
    ], main);

    function main(
        $dom,
        $types,
        $PropertyHelper
    ) {
        dom = $dom;
        types = $types;
        PropertyHelper = $PropertyHelper;

        return DessertElement;
    }

    class DessertElement {
        constructor(element) {
            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'element',
                value: DessertElement.factory(element)
            }]);
        }

        static factory(html) {
            if (types.isString(html)) {
                return new DessertElement(dom.createDocFrag(html));
            } 
            return html;
        }

        static find(selector) {
            return new DessertElement(document.querySelector(selector));
        }

        static findAll(selector) {
            let matches = document.querySelectorAll(selector);
            let arrayLike = makeArray(matches);

            return arrayLike.map(toDessertElement);
        }

        attr(name, value = '') {
            if (name && value !== '') {
                //set
                this.element.setAttribute(name, value);
            } else {
                return this.element.getAttribute(name);
            }
        }

        replaceWith(element) {
            if (element) {
                this.element.parentNode.replaceChild(element, this.element);
            }
        }

        clone() {
            return this.element.cloneNode(true);
        }

        empty() {
            dom.emptyElement(this.element);
        }

        find(selector) {
            return new DessertElement(this.element.querySelector(selector));
        }

        findAll(selector) {
            let matches = this.element.querySelectorAll(selector);
            let arrayLike = makeArray(matches);

            return arrayLike.map(toDessertElement);
        }

        append(child) {
            this.element.appendChild(child);
        }
    }

    function makeArray(nodeList) {
        return Array.from(nodeList);
    }

    function toDessertElement(elem) {
        return new DessertElement(elem);
    }


})();

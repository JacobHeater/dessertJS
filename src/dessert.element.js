(() => {

    'use strict';
    
    var dom;
    var types;
    var PropertyHelper;
    var ArrayHelper;

    define([
        './helpers/dom-helper',
        './helpers/type-helper',
        './helpers/property-helper',
        './helpers/array-helper'
    ], main);

    function main(
        $dom,
        $types,
        $PropertyHelper,
        $ArrayHelper
    ) {
        dom = $dom;
        types = $types;
        PropertyHelper = $PropertyHelper;
        ArrayHelper = $ArrayHelper;

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

        static find(selector, context = document) {
            return new DessertElement(context.querySelector(selector));
        }

        static findAll(selector, context = document) {
            let matches = context.querySelectorAll(selector);
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

        data(name, value) {
            var elem = this.element;
            if (name && value !== undefined) {
                elem.dataset[name] = value;
                return this;
            }

            return elem.dataset[name];
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

        on(event, handler) {
            this.element.addEventListener(event, handler);
        }

        value(value) {
            if (value) {
                this.element.value = value;
                return this;
            }
            return this.element.value;
        }
    }

    function makeArray(nodeList) {
        return ArrayHelper.castArray(nodeList);
    }

    function toDessertElement(elem) {
        return new DessertElement(elem);
    }


})();

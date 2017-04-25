(() => {

    'use strict';

    define(['./hello-world'], main);

    function main(HelloWorld) {
        class HelloJohnDoe extends HelloWorld {
            static get name() {
                return 'hello-john-doe';
            }

            init(element) {
                super.init(element);

                var tb = element.find('.hello-world-tb').element;
                var output = element.find('.output').element;
                var resource = this.requestResource('hello-john-doe');

                tb.setAttribute('readonly', '');
                output.textContent = tb.value = resource.JohnDoe;
            }
        }

        return HelloJohnDoe;
    }


})();
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

                var tb = element.querySelector('.hello-world-tb');
                var output = element.querySelector('.output');

                tb.setAttribute('readonly', '');
                output.textContent = tb.value = 'Hello, John Doe!';
            }
        }

        return HelloJohnDoe;
    }


})();
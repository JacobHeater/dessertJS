(() => {

    'use strict';

    define(main);

    function main() {
        return addController;
    }

    function addController(app) {
        app.controller('hello-world-controller', function (page) {
            var components = this.components;
            var hw = components.hw;
            var that = this;

            hw.when('user clicks say hello', val => {
                console.info(val);
            });

            hw.setText(this.state.salutation || 'Hello, world!');
        });
    }

})();
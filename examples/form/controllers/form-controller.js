(() => {

    'use strict';

    define(main);

    function main() {
        return setupFormController;
    }

    function setupFormController(app) {
        app.controller('form-controller', function(page) {
            var components = this.components;
            
            components.test.addFormControl(`<input type="text" placeholder="test" />`);
        });
    }

})();

(() => {

    'use strict';

    define(main);

    function main() {
        return setupAuthController;
    }

    function setupAuthController(app) {
        app.controller('account-controller', function(page) {
            var controls = this.controls;
            var name = controls.name;
            
            name.element.textContent = page.args.name;
        });
    }

})();

(function() {

    'use strict';


    define(
        [
            'dessert.component'
        ],
        main
    );

    function main(
        Component
    ) {

        class Button extends Component {
            constructor(resources, state, element, id) {
                super(resources, state, element, id);
            }

            static get name() {
                return 'auth-button';
            }

            render() {
                return `<input type="button" data-dsrt-control="btn" />`;
            }

            api(element) {
                this.setValue = function(value) {
                    this.controls.btn.value(value);
                };
            }

            init(element) {
                super.init(element);
                var controls = this.controls;
                var click = this.describe('button is clicked', function() {
                    controls.btn.on('click', function(e) {
                        click.fire(e);
                    });
                });
            }
        }

        return Button;

    }

})();
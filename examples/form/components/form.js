(() => {

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
        class Form extends Component {
            static get name() {
                return 'custom-form';
            }

            render() {
                return `
                    <div class="form">
                    </div>
                `;
            }

            init(element) {
                this.addFormControl = function(html) {
                    debugger;
                    element.appendChild(document.createRange().createContextualFragment(html));
                };
            }
        }

        return Form;
    }

})();
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

        class Authenticate extends Component {
            constructor(resources, state, element, id) {
                super(resources, state, element, id);
            }

            static get name() {
                return 'authenticate';
            }

            render() {
                return Component.resource('authenticate');
            }

            init(element) {
                var btnLogin = element.find('.btnLogin');
                var userName = element.find('.username');
                var password = element.find('.password');
                var state = this.state;

                if (state.userName) {
                    userName.element.value = this.state.userName;
                }

                var authBehavior = this.describe('User has authenticated', function() {
                    btnLogin.on('click', function() {
                        if (userName.element.value && password.element.value) {
                            state.userName = userName.element.value;
                            authBehavior.fire([userName.element.value, password.element.value])
                        }
                    });
                });
            }
        }

        return Authenticate;

    }

})();
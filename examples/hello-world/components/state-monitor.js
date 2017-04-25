(() => {

    'use strict';

    'use strict';

    define(['dessert.component'], main);

    function main(
        Component
    ) {
        
        class StateMonitor extends Component {
            static get name() {
                return 'state-mon';
            }

            render() {
                return `<h3>Controller State Bag</h3>
                        <div class="state-mon"></div>`;
            }

            init(element) {
                var output = element.find('.state-mon').element;
                var that = this;

                setInterval(() => {
                    output.textContent = JSON.stringify(that.state);
                }, 0);
            }
        }

        return StateMonitor;
    }

})();

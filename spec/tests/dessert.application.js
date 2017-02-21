(() => {

    'use strict';

    const BaseTest = require('../BaseTest.js');

    class ApplicationTest extends BaseTest {
        constructor() {
            super();
            this.name = "Dessert Application Test";
        }

        setup(runner) {
            super.setup(runner);

            this.createTests();
        }

        createTests() {
            var that = this;
            that.assert('dessertJS Application Creates Application Instance', function (done) {
                that.r([
                    'dessert.core',
                    'dessert.application'
                ], (
                    dessert,
                    Application
                ) => {
                    var app = dessert.app('TestApplication', function () {
                        this.src = './views/';
                        this.templates = './templates';
                    });

                    done(app instanceof Application);
                });
            });

            that.assert("dessertJS Application Gets Same Application", function(done) {
                that.r([
                    'dessert.core'
                ], dessert => {
                    var app = dessert.app('TestApplication');

                    app.name = 'Bogus name';

                    done(app.name === 'TestApplication');
                });
            });
        }
    }

    module.exports = ApplicationTest;

})();
(() => {

    'use strict';


    const BaseTest = require('../BaseTest.js');

    class CommonTests extends BaseTest {
        constructor() {
            super();

            this.name = "Dessert Common Module Tests";
        }

        setup(runner) {
            super.setup(runner);

            this.createTests();
        }

        createTests() {
            var that = this;

            that.assert('dessertJS Common Helpers isFunction Passes Valid Function', done => {
                that.r([
                    'dessert.common'
                ], common => {
                    done(common.utils.isFunction(function () {}));
                });
            });

            that.assert('dessertJS Common Helpers isFunction Fails Invalid Function', done => {
                that.r([
                    'dessert.common'
                ], common => {
                    done(!common.utils.isFunction('Not a function!'));
                });
            });

            that.assert('dessertJS Common Helpers parseQueryString Returns Correct Value', done => {
                that.r([
                    'dessert.common'
                ], common => {
                    var path = 'http://someurl.com?arg1=true&arg2=false';
                    var parsed = common.utils.parseQueryString(path);
                    done(common.utils.isObject(parsed) && parsed.arg1 === true && parsed.arg2 === false);
                });
            });

            that.assert('dessertJS Common Helpers addReadOnlyProperty Creates Immutable Property', done => {
                that.r([
                    'dessert.common'
                ], common => {
                    var obj = {

                    };
                    var isReadOnly;

                    common.utils.addReadOnlyProperty(obj, 'val', true);

                    try {
                        obj.val = false;
                    } catch (e) {
                        //Error is thrown when attempting to set value of read only Property.
                        isReadOnly = true;
                    }

                    done(isReadOnly);
                });
            });
        }
    }

    module.exports = CommonTests;

})();
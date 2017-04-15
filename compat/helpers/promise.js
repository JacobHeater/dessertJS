/*!

==========================================
===============             ==============
=============== promise.js  ==============
===============             ==============
==========================================

https://github.com/JacobHeater/JSHelpers

MIT License

Copyright (c) 2017 Jacob Heater

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(function promiseModule() {
            return $Promise;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = $Promise;
    } else if (typeof window !== 'undefined') {
        window.$Promise = $Promise;
    }

    /**
     * A prototype to deal with asynchronous operations by providing a 
     * simple API that can be used to wait for the asynchronous operation
     * to complete.
     * 
     * @class
     * 
     * @classdesc
     * 
     * The $Promise class is a simple class that can be used to allow users
     * to wait for an asynchronous operation to complete, and be notified of
     * the success or failure of that operation. A simple example usage of 
     * the $Promise prototype can be found below.
     * 
     * ```javascript
     * 
     * var promise = asyncAction(function() {
     *     return "Hello, world!";
     * });
     * 
     * promise.then(function(msg) {
     *     console.assert(msg === "Hello, world!");
     * });
     * 
     * function asyncAction(action) {
     *     const promise = new $Promise();
     *      
     *     setTimeout(function() {
     *         try {
     *             const val = action();
     *             promise.resolve(val);
     *         } catch (err) {
     *             promise.reject(err);
     *         }
     *     }, 0);
     * 
     *     return promise;
     * }
     * 
     * ```
     */
    function $Promise() {
        //The callstack for .then()
        var callstack = [];
        //The callstack for .fail()
        var errorHandlers = [];
        //The callstack for .always()
        var alwaysHandlers = [];
        //When pending is true, that means the promise has not been resolved.
        var pending = true;

        /**
         * Adds a callback to the callstack for when the $Promise has been
         * resolved, as long as the promise has not already been resolved.
         * 
         * @param {Function} action The callback to add to the callstack.
         * @return {$Promise} The current $Promise instance.
         */
        this.then = function then(action) {
            pushWhen(callstack, action);
            return this; //Chainable API
        };

        /**
         * Adds an error handler to the error handler callstack as long as
         * the $Promise has not already been resolved.
         * 
         * @param {Function} action The error handler to add to the callstack.
         * @return {$Promise} The current $Promise instance.
         */
        this.fail = function fail(action) {
            pushWhen(errorHandlers, action);
            return this; //Chainable API
        };

        /**
         * Adds a callback to a callstack that will always be triggered
         * as long as the $Promise has not been resolved, regardless of
         * whether the promise has been rejected or not.
         * 
         * @param {Function} action The callback to add to the callstack.
         * @return {$Promise} The current $Promise instance.
         */
        this.always = function always(action) {
            pushWhen(alwaysHandlers, action);
            return this; //Chainable API
        };

        /**
         * Notifies the $Promise that the asynchronous operation has completed
         * and the callstack needs to be iterated to notify all listeners. The
         * arguments that are given to the .resolve() function will be passed along
         * to all callbacks in the callstack.
         * 
         * @return {$Promise} The current $Promise instance.
         */
        this.resolve = function notify() {
            if (pending) {
                pending = false;
                var args = arguments;

                //Iterate over the callstack and pass along all arguments to each function.
                iterateStack(callstack, function (fn) {
                    fn.apply(null, args);
                });

                //Iterate over the always callstack and pass along all arguments to each function.
                iterateStack(alwaysHandlers, function (fn) {
                    fn.apply(null, args);
                });
            }

            return this; //Chainable API
        };

        /**
         * Notifies the $Promise that the asynchronous operation has completed,
         * but something went wrong and there has been an error. The arguemnts 
         * that are passed into the .reject() function will be passed along to all
         * callbacks in the error callstack and all always callbacksl.
         * 
         * @return {$Promise} The current $Promise instance.
         */
        this.reject = function () {
            if (pending) {
                pending = false;
                var args = arguments;

                //Iterate over all of the error handlers and pass along the arguments to those
                //functions.
                iterateStack(errorHandlers, function (fn) {
                    fn.apply(null, args);
                });

                //Iterate over all of the always handlers and pass along the arguments to those
                //functions.
                iterateStack(alwaysHandlers, function (fn) {
                    fn.apply(null, args);
                });
            }

            return this; //Chainable API
        };

        /**
         * Pushes the given function to the array as long as the
         * current $Promise has not been resolved, and the given
         * arr parameter is an Array instance.
         * 
         * @param {Function[]} arr The callstack to push to.
         * @param {Function} action The callback to push to the callstack. 
         */
        function pushWhen(arr, action) {
            //action must be a function and the $Promise must not have been
            //resolved. Duck type the array.
            if (isFunction(action) && pending && arr && arr.push) {
                arr.push(action);
            }
        }
    }

    /**
     * A simple helper for type checking if the given 
     * object is a function.
     * 
     * @param {Function} fn The object to check.
     */
    function isFunction(fn) {
        return typeof fn === 'function';
    }

    /**
     * Iterates the given callstack and passes back the
     * given function in the array to the provided
     * action callback. This can be cancelled at any time
     * granted the action callback returns the value `false`.
     * 
     * @param {Function[]} stack The callstack to iterate.
     * @param {Function} action The callback to pass the function to.
     */
    function iterateStack(stack, action) {
        while (stack.length) {
            //We need to treat this like a stack, so we'll use the pop
            //method to take the last item out of the array, or off the
            //top of the stack. This is a last-in-first-out operation.
            var fn = stack.pop();
            //If the action callback gives back a value of false, then
            //we'll need to break out the loop.
            var ret = action(fn);

            if (ret === false) {
                break;
            }
        }
    }
})();
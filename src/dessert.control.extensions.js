/**
@file Extensions of the dessertJS Control, which be nature is just a jQuery object. 
These are simply just extensions of the jQuery object, which are added to the dsrt "namespace."
@author Jacob Heater
*/
(function () {

    "use strict";

    define([
            './dessert.control.repeat',
            './dessert.common',
            './dessert.ajax',
            "./dessert.databinding",
            './dessert.viewhelpers'
        ],
        /**
         * A module that extends the dessertJS Control with additional functionality.
         * 
         * @param {ControlRepeat} repeater The repeater function that adds repeater capabilities to the Control.
         * @param {Common} common The dessertJS common helper library.
         * @param {Ajax} ajax The dsessertJS AJAX helper library.
         * @param {DataBinding} $dataBindingUtil The utility that helps with data binding for dessertJS.
         * @param {ViewHelper} $viewHelpers The helper library that aids in constructing dessertJS Views.
         * 
         * @returns {Function} A function that extends dessertJS Controls with additional functionality.
         */
        function dessertControlExtensionsModule(repeater, common, ajax, $dataBindingUtil, $viewHelpers) {

            var attrs = common.attrs;
            var utils = common.utils;
            var eventStr = 'keyup keydown change click blur focus modelinit';
            //The $ factory element result to extend with the dsrt object.
            return function dessertControlExtensionsInit(element, app, view) {

                var $ = null;
                var databinding = null;

                if (app.providers.IDataBindingProvider) {
                    databinding = app.providers.IDataBindingProvider;
                }

                if (app.providers.jquery) {
                    $ = app.providers.jquery;
                    ajax.jquery = $;
                }


                /**
                 * Binds the control to the given model using event driven
                 * data binding. This is unlike two-way data binding because
                 * this is not dirty checking. This is synchronization with native
                 * DOM events.
                 * 
                 * @param {Object} model The data model to bind.
                 * @returns {Object} The current dsrt control instance for chaining.
                 */
                element.dsrt.bind = function dessertElementBind(model) {
                    var modelKey = element.attr(attrs.control);
                    var modelVal = model[modelKey];
                    if (model) {
                        //First init the control with the model value
                        if (modelVal) {
                            if (element.isAny('input:text', 'textarea', 'input:password')) {
                                element.val(modelVal);
                            } else if (element.contains('input:radio') || element.is('input:radio')) {
                                var radios = element.find('input:radio').addBack();
                                var hasValue = radios.filter('[value="' + modelVal + '"]');

                                hasValue.attr('checked', true);

                            } else if (element.contains('select') || element.is('select')) {
                                var options = element.find('option').addBack();

                                if (Array.isArray(modelVal)) {
                                    modelVal.forEach(function (val) {
                                        options.filter('[value="' + val + '"]').attr('selected', true);
                                    });
                                } else {
                                    options.filter('[value="' + modelVal + '"]').attr('selected', true);
                                }
                            } else {
                                element.val(modelVal);
                                element.text(modelVal);
                            }
                            element.trigger('modelinit');
                        }
                        //Then set the handler to track the changes.
                        element
                            .find('input, select, input, textarea')
                            .addBack()
                            .on(eventStr, function () {
                                var $this = $(this);
                                var val;

                                if ($this.isAny('input:text', 'textarea', 'input:password')) {
                                    val = $this.val();
                                } else if ($this.contains('input:radio') || $this.is('input:radio')) {
                                    val = $this.find('input:radio:checked').val() || $this.filter(':checked').val();
                                } else if ($this.contains('select') || $this.is('select')) {
                                    val = $this.find('option:selected').map(function (i, e) {
                                        return $(e).val();
                                    }).toArray();
                                } else {
                                    return $this.val() || $this.text();
                                }

                                model[modelKey] = val;;
                            });
                    }
                    return this;
                };
                /**
                 * Adds an event listener to watch for any changes in the control.
                 * This is a fairly comprehensive set of event listeners to listen for,
                 * therefore, watchers should be pretty concise.
                 * 
                 * @param {Function} watcher The function to fire when the event has been raised.
                 * @returns {Object} The current instance of the dsrt control for chaining.
                 */
                element.dsrt.watch = function dessertElementWatch(watcher) {
                    if (typeof watcher === 'function') {
                        element.on(eventStr, function () {
                            watcher.call($(this));
                        });
                    }
                    return this;
                };
                /**
                 * Bind the control to a data object.
                 * 
                 * @param {Object} data The data to bind the control to.
                 * @returns {Object} The current instance of the control dsrt namespace.
                 */
                element.dsrt.dataBind = function (data) {
                    if (data) {
                        var dataBoundTemplate = databinding.bindTemplateToData(element.html(), data);
                        dataBoundTemplate = $dataBindingUtil.cleanupDeferredAttrs(dataBoundTemplate);
                        element.html(dataBoundTemplate);
                    }
                    return this;
                };
                /**
                 * TODO: reinvestigate why this is necessary.
                 */
                element.dsrt.src = function dessertElementSrc(path) {
                    return {
                        path: path
                    };
                };
                /**
                 * Adds the native jQuery .on() method to the dsrt namespace
                 * for easier chaining of dsrt methods.
                 * 
                 * @param {String} event The name(s) of the event(s) to listen for.
                 * @param {Function} handler The function to invoke when the event has been raised.
                 * @returns {Object} The current instance of the dessertJS control for chaining.
                 */
                element.dsrt.on = function dessertElementOn(event, handler) {
                    element.on(event, handler);
                    return this;
                };
                /**
                 * Gives the ability to escape out to the $.fn namespace to hook into
                 * additional jQuery methods. This is convenient because it allows for
                 * easier chaining between the element .dsrt namespace and the element .fn
                 * namespace.
                 * 
                 * @type {Object}
                 */
                element.dsrt.jq = element;
                /**
                 * Loads a module asynchronously from the given path and executes the function
                 * after the module has been loaded.
                 * 
                 * @param {String} path The url of the path to load asynchronously.
                 * @param {Function} callback The function to invoke when the module has been loaded.
                 */
                element.dsrt.load = function dessertElementLoad(path, callback) {
                    var app = element.dsrt.view.controller.module.app;
                    var dsrtPath = app.dsrtPath;
                    require([
                        dsrtPath.concat('dsrt.context.init'),
                        dsrtPath.concat('dsrt.externalmodules.init')
                    ], function (contextInit, externalInit) {
                        ajax.get(path.path)
                            .then(function (data) {
                                element.children().remove();
                                element.append(data);
                                var asyncInit = externalInit(element, app);
                                asyncInit(0, function () {
                                    contextInit(element, element.dsrt.view.controller.module.app, {}, callback);
                                });
                            });
                    });
                };
                /**
                 * Gets the outer HTML of the provided jQuery object instance.
                 * 
                 * @param {Object} $elem The jQuery object instance to get the outer HTML of.
                 * @returns {String} The outer HTML of the DOM element.
                 */
                element.dsrt.outerHtml = function dessertElementGetOuterHtml($elem) {
                    return common.utils.getOuterHtml($elem);
                };

                /**
                 * Injects the given dessert view element into the current element
                 * and given a callback is present, allows for interaction with
                 * newly injected view element.
                 * 
                 * @param {Object} config The configuration that instructs dessert what to inject into
                 *                        the current element.
                 */
                element.dsrt.inject = function (config) {
                    if (typeof config === "object") {
                        var TYPE_COMPONENT = "component";
                        var TYPE_CONTROL = "control";
                        var TYPE_SRC = "src";
                        var IS_INJECTION = true;
                        var settings = Object.assign({
                            type: "",
                            name: "",
                            control: null,
                            target: null,
                            callback: null,
                            id: "",
                            url: ""
                        }, config);

                        switch (settings.type.toLowerCase()) {
                            case TYPE_COMPONENT:
                                $viewHelpers.renderComponent(app, view, element, settings.name, settings.id, IS_INJECTION);
                                break;
                            case TYPE_CONTROL:
                                $viewHelpers.renderControl(app, view, settings.control, settings.name, settings.target || element);
                                break;
                            case TYPE_SRC:
                                $viewHelpers.renderExternalModule(app, settings.url, settings.target || element, callback)
                                break;
                            default:
                                //Do nothing, there's nothing to inject...
                                break;
                        }

                        if (common.utils.isFunction(settings.callback)) {
                            settings.callback(view);
                        }
                    }
                    return this;
                };

                /**
                 * Repeats the given template over the given sequence for n times
                 * where n is the length of the sequence.
                 * 
                 * @function
                 * @param {any[]} sequence The sequence or data set to enumerate.
                 * @param {String|Object} template The template to repeat into the control.
                 * @param {Object} config The configuration for the repeater. 
                 */
                element.dsrt.repeat = repeater(element, app);
            };
        });

})();
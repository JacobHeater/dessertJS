/**
@file Defines the repeat method which is defined in the dsrt.control.extensions module.
@author Jacob Heater
*/
(function () {

    "use strict";

    define([
        './dessert.ajax',
        './dessert.common',
        "./dessert.databinding"
    ],  
    /**
     * The module that add repeater capabilities to dessertJS Controls. 
     * 
     * @param {Ajax} ajax The dessertJS ajax helper library.
     * @param {Common} common The dessertJS common helper library.
     * @param {DataBinding} $dataBindingUtil The utility that is responsible for doing databinding in dessertJS.
     * 
     * @returns {Function} The dessertJS function that extends the control with repeater capabilities.
     */
    function dessertControlRepeatModule(ajax, common, $dataBindingUtil) {

        var selectors = common.selectors;

        /**
         * Creates a closure and returns a function that aids in repeating
         * the given template using the data set.
         * 
         * @param {Object} element The jQuery object instance.
         * @param {Object} app The dessertJS application instance.
         * @returns {Function} A closure that is used to repeat the template.
         */
        return function dessertControlRepeatInit(element, app) {

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
             * Enumerates over the given sequence or data set, and injects the template
             * content into the DOM element.
             * 
             * @param {any[]} sequence The data set to enumerate over.
             * @param {Object|String} template The template to repeat into the DOM element.
             * @param {Object} config The configuration for the repeater.
             * @returns {Object} The current dessertJS control for chaining.
             */
            return function dessertControlRepeat(sequence, template, config) {
                var iterateSequence;
                var bindTemplate;
                var bindable;
                var outer;
                var $bindable;
                var $output = [];
                var $elem;
                var _config = Object.assign({
                    clear: true
                }, config);
                var buildOutput = function buildOutput(output) {
                    var html = output.map(function buildOutputMap(elem) {
                        return $('<div />').append($(elem).clone()).html();
                    }).join('');
                    if (_config.clear === true) {
                        element.children().remove();
                    }
                    html = $dataBindingUtil.cleanupDeferredAttrs(html);
                    element.append(!!outer ? outer.append(html) : html);
                    if (typeof _config.done === "function") {
                        _config.done();
                    }
                };
                if (sequence && sequence.length) {
                    iterateSequence = function iterateSequence(callback) {
                        for (var i = 0; i < sequence.length; i++) {
                            callback(sequence[i]);
                        }
                    };
                    bindTemplate = databinding.bindTemplateToData;
                    if (typeof template === 'string') {
                        bindable = template;
                        outer = "";
                        $bindable = $(bindable);
                        if ($bindable.find(selectors.rpt).length === 1) {
                            bindable = $bindable.find(selectors.rpt).eq(0).html();
                            $bindable.find(selectors.rpt).remove();
                            outer = $bindable;
                        }
                        iterateSequence(function iterateSequenceCallback(obj) {
                            $elem = bindTemplate(bindable, obj);
                            $output.push($elem);
                        });
                        buildOutput($output);
                    } else if (typeof template === 'object') {
                        //We need to look up the template in the templates
                        //directory and bind the string data.
                        var templateCacheEntry = app.cache.templateCache.getEntry(template.path);
                        var doTemplateDataBinding = function doTemplateDataBinding(data) {
                            bindable = data;
                            outer = "";
                            $bindable = $(bindable);
                            if ($bindable.find(selectors.rpt).length === 1) {
                                bindable = $bindable.find(selectors.rpt).eq(0).html();
                                $bindable.find(selectors.rpt).remove();
                                outer = $bindable;
                            }
                            iterateSequence(function internalIterateSequenceCallback(obj) {
                                $elem = bindTemplate(bindable, obj);
                                $output.push($elem);
                            })
                            buildOutput($output);
                        };

                        if (!templateCacheEntry) {
                            ajax.get(template.path)
                                .then(function dessertControlRepeatGetThen(data) {
                                    app.cache.templateCache.addEntry(template.path, data);

                                    doTemplateDataBinding(data);
                                });
                        } else {
                            doTemplateDataBinding(templateCacheEntry);
                        }

                    }
                }
                return this;
            }
        };
    });
})();
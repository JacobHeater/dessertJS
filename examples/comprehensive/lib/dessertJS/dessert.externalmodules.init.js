/**
 * @file A require.js module responsible for loading dessertJS modules asynchronously.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define([
        './dessert.common',
        './dessert.ajax',
        "./dessert.viewhelpers"
    ], dessertExternalModulesInitModule);

    /**
     * The dessertJS module that is responsible for initializing external modules.
     * 
     * @param {Common} common The dessertJS common helper library.
     * @param {Ajax} ajax The dessertJS ajax helper library.
     * @param {ViewHelpers} $viewHelpers The dessertJS helper library for dessert views.
     * 
     * @returns {Function} The function that is responsible for initializing external modules.
     */
    function dessertExternalModulesInitModule(
        common,
        ajax,
        $viewHelpers
    ) {

        return externalModulesInit;

        /**
         * Creates a closure that will be used for loading all dessertJS context
         * external modules asynchronously. External modules can be defined as those
         * dessertJS modules that are defined with the [dsrt-src] attribute. They may
         * or may not have functional modules that are part of their loadup. However,
         * all external modules must be loaded recursively before synchronously loading
         * dessertJS sync modules.
         * 
         * @param {Object} $context The context in which the dessertJS async loading
         * should be executed.
         * @param {Object} app The dessertJS application that the context is running in.
         * @param {Boolean} isPage Determines if the page called the external module init.
         * @returns {Function} A recursive function that loads async dessertJS modules.
         */
        function externalModulesInit($context, app, isPage) {

            var $ = null;

            if (app.providers.jquery) {
                $ = app.providers.jquery;
                ajax.jquery = $;
            }

            var selectors = common.selectors;
            var attrs = common.attrs;
            var utils = common.utils;
            var externalModules = isPage ? $context.find(selectors.page) : $context.find(selectors.src);
            var $exMod;
            var url;
            //TODO: Determine if we need to do any query string parsing in 
            //the external module init.
            var qStringParams; //eslint-disable-line no-unused-vars
            var cleanedPath;

            /**
             * Internally calls a recursive function to load dessertJS modules asynchronously.
             * This asynchronously module loading does not apply to modules that are not defined
             * with [dsrt-src] attributes. These modules with external sources need to be initiailzed
             * asynchronously first so that their module definitions can be loaded into the application
             * context.
             * 
             * @param {Function} done The function that is to be invoked when the async module loading
             * has completed.
             * @param {Function} syncModulesDone The function that is to be invoked when the synchronous
             * module loading has completed.
             * @param {Boolean} isPage Determines if the page triggered this initialization.
             */
            function processExternalModules(done, syncModulesDone) {
                /**
                 * Iterates over all of the matched selectors ([dsrt-src]) for async
                 * modules and recursively loads all of the modules.
                 */
                function processExternalModulesRecursive(i) {
                    //Get the [data-src] element at index i.
                    $exMod = externalModules.eq(i);
                    //Parse any query string params on the path.
                    qStringParams = utils.parseQueryString($exMod.attr(attrs.src));
                    //Clean the path of any characters that we're not allowing.
                    cleanedPath = utils.cleanQueryString($exMod.attr(attrs.src));

                    if (cleanedPath.trim()) {
                        //Build out the URL that we're going to use for the AJAX call.
                        url = "$base$modulePath.html".replace("$base", app.src).replace("$modulePath", cleanedPath);
                        //Make sure that the url doesn't contain any undefined vars because something didn't get replaced properly.
                        if (url && !((/undefined/g).test(url))) {
                            $viewHelpers.renderExternalModule(
                                app,
                                url,
                                $exMod,
                                function doneRenderExternalModule() {
                                    if (externalModules.length) {
                                        externalModulesInit($context, app)(done, syncModulesDone);
                                    }
                                },
                                function externalModuleRenderFail() {
                                    /*
                                    When rendering of an external module fails, don't reprocess
                                    it. Just remove src attr so it doesn't get picked up
                                    again.
                                    */
                                    $exMod.removeAttr(attrs.src);
                                }
                            );
                        }
                    }
                }
                if (externalModules.length > 0) {
                    //Only begin the external module initialization if there are truly
                    //any external modules to init. Start with index 0.
                    processExternalModulesRecursive(0);
                } else {
                    /*
                    When we're done constructing all of the external modules, let's build out
                    The sync modules. Sync modules don't require any calls to the server, because
                    they rely on all of the application module, and controller configuration to
                    build out the views.
                    */
                    done(syncModulesDone);
                }
            }
            //Return the function that does the external module initialization.
            return processExternalModules;
        }
    }

})();
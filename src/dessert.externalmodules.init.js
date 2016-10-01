/**
 * @file A require.js module responsible for loading dessertJS modules asynchronously.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.externalmodules.init", [
        'dessert.common',
        'dessert.ajax',
        "dessert.routing",
        "dessert.customtag",
        "jquery"
    ], function dessertExternalModulesInitModule(
        common,
        ajax,
        $routing,
        $customTag,
        $
    ) {

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
        return function externalModulesInit($context, app, isPage) {
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
            var $data;

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
                    //Build out the URL that we're going to use for the AJAX call.
                    url = utils.cleanPath("$base$modulePath.html".replace("$base", app.src).replace("$modulePath", cleanedPath));
                    //Make sure that the url doesn't contain any undefined vars because something didn't get replaced properly.
                    if (url && !((/undefined/g).test(url))) {
                        //Let's go out and fetch the HTML for the external module.
                        ajax.get(url)
                            .done(function externalModulesInitDone(html) {
                                //We got the html back from the server, let's build it out.
                                $data = $(html);
                                //Replace the [dsrt-src] element with the newly created element from our server call.
                                //Don't replace it if this is the page element. We need to be able to find this later.
                                if ($exMod.is(selectors.page)) {
                                    $exMod.setContent($data);
                                    $exMod.removeAttr(attrs.src);
                                } else {
                                    $exMod.replaceContent($data);
                                }
                                $customTag.init(app);
                                //If there are any more external modules to process, let's recursively call the initialize function again.
                                if (externalModules.length) {
                                    externalModulesInit($context, app)(done, syncModulesDone);
                                }
                            }).fail(function externalModulesInitFail(xhr) {
                                //Hanlde any errors here by looking up any error handlers in the 
                                //application httpHandlers cache.
                                if ($exMod.is(selectors.page)) {
                                    //If you $exMod object is the single page element, then we need to handle that here.
                                    app
                                        .httpHandlers
                                        .page
                                        .getHandlersByStatusCode(xhr.status)
                                        .forEach(function externalModuleInitFailForEach(h) {
                                            h.handler(xhr, $routing);
                                        });
                                }
                            });
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
        };
    });

})();
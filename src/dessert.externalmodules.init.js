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
        "jquery"
    ], function(
        common,
        ajax,
        $routing,
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
            var qStringParams;
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
             */
            function processExternalModules(done, syncModulesDone) {
                /**
                 * Iterates over all of the matched selectors ([dsrt-src]) for async
                 * modules and recursively loads all of the modules.
                 */
                function processExternalModulesRecursive(i) {
                    $exMod = externalModules.eq(i);
                    qStringParams = utils.parseQueryString($exMod.attr(attrs.src));
                    cleanedPath = utils.cleanQueryString($exMod.attr(attrs.src));
                    url = utils.cleanPath("$base$modulePath.html".replace("$base", app.src).replace("$modulePath", cleanedPath));
                    if (url && url.indexOf("undefined") === -1) {
                        ajax.get(url)
                            .done(function(data) {
                                $data = $(data);
                                $exMod.html("");
                                $exMod.append($data).removeAttr(attrs.src);

                                if (qStringParams && qStringParams.unwrap) {
                                    $data.unwrap();
                                }

                                if ((i + 1) < externalModules.length) {
                                    processExternalModulesRecursive(i + 1);
                                } else { //Let's run the module init again until there aren't any left
                                    externalModulesInit($context, app)(done, syncModulesDone);
                                }
                            }).fail(function(xhr) {
                                if ($exMod.is(selectors.page)) {
                                    //We need to access the application page http handlers and deal with them.
                                    app.httpHandlers.page.getHandlersByStatusCode(xhr.status).forEach(function(h) {
                                        h.handler(xhr, $routing);
                                    });
                                }
                            });
                    }
                }
                if (externalModules.length > 0) {
                    processExternalModulesRecursive(0);
                } else {
                    done(syncModulesDone);
                }
            }

            return processExternalModules;
        };
    });

})();
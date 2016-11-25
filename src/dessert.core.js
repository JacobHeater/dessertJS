/**
 * @file The dessertJS core library.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define([
            "./dessert.application",
            "./dessert.common",
            "./dessert.init",
            "./dessert.singlepage.init",
            "./dessert.routing",
            "./dessert.customtag",
            "./dessert.jquery.extend"
        ],
        /**
         * The core module of dessertJS that the rest of dessertJS is built off of.
         * 
         * @param {Application} Application The dessertJS Application class.
         * @param {Common} common The dessertJS common helper library.
         * @param {Init} $init The dessertJS initialization function.
         * @param {SinglePageInit} spa The dessertJS helper for single page app initialization.
         * @param {Routing} routing The dessertJS routing helper library.
         * @param {CustomTag} $customTag The dessertJS custom tag helper library.
         * @param {jQueryExtend} $jQueryExtend The function that extends jQuery for dessertJS.
         * 
         * @returns {Object} The dessertJS core helper library.
         */
        function dessertCoreModule(
            Application,
            common,
            $init,
            spa,
            routing,
            $customTag,
            $jQueryExtend
        ) {

            /**
             * Holds all dessertJS App singletons for later retrieval.
             */
            var appCache = {};
            var selectors = common.selectors;
            var attrs = common.attrs;
            var utils = common.utils;
            //This is a private wrapper for our $.dsrt object
            var $dsrt = {
                /**
                 * Initializes all dessertJS [dsrt-app] scopes within the current
                 * application or view. dessertJS can be used in a single-page-application
                 * methodology, or can be used for a simple MVC framework.
                 * 
                 * @param {Application} app The application instance to initialize.
                 * @param {Function} done The callback to invoke when initialization is complete.
                 * @param {any[]} args The global arguments to be passed during initialization.
                 * @param {Boolean} isPage Indicates if the page called the init method.
                 * @param {Boolean} isHash Indicates if the hash changed event called the init method.
                 * @returns {Object} The current $dsrt instance for chaining.
                 */
                init: function init(app, done, args, isPage, isHash) {

                    var $ = null;

                    if (app.providers.jquery) {
                        $ = app.providers.jquery;
                    }

                    var $app = $("[" + attrs.app + "=" + app.name + "]");
                    var $page = $app.find(selectors.page);

                    $jQueryExtend($);

                    $customTag.init(app);
                    if (!isPage && $page.length > 0) {
                        spa(app, $page);
                    } else {
                        $init($app, app, args, isPage, isHash, done);
                    }
                    return this;
                },
                /**
                 * Internally calls the $dsrt.init() method indicating that the page is
                 * initializing the dessertJS context.
                 */
                pageInit: function pageInit(app, args) {
                    this.init(app, null, args, true, false);
                    return this;
                },
                /**
                 * Internally calls the $dsrt.init() method indicating that the hash changed event
                 * is initializing the dessertJS context.
                 */
                hashInit: function hashInit(app, args) {
                    this.init(app, null, args, false, true);
                    return this;
                }
            };
            /**
             * Exposes the dessertJS core functionality to set up a new dessertJS
             * application context.
             */
            var dsrtModule = {
                /**
                 * Sets up a function to be invoked before the dessertJS context
                 * is initialized. This allows for some environment setup that
                 * dessertJS may be contigent upon.
                 * 
                 * @param {Function} handler The method to invoke prior to dessertJS init.
                 * @returns {Object} The dsrtModule instance for chaining.
                 */
                preinit: function preInit(handler) {
                    handler.call(this);
                    return this;
                },
                /**
                 * requires The given dependency array, and initializes the dessertJS
                 * application context. Calls the provided callback after dessertJS
                 * has been fully initialized.
                 * 
                 * @param {String[]} dependencies The list of dependencies to require.
                 * @param {Function} done The callback to invoke when dessertJS has been initialized.
                 */
                init: function init(dependencies, done) {
                    require(dependencies, function () {
                        $dsrt.init(done);
                    });
                },
                /**
                 * Creates a new dessertJS App singleton using the given name
                 * and exposes methods to prepare to initialize the app.
                 * 
                 * @param {String} name The name of the application to add to the appCache.
                 * @param {Function} onInit A function to call after the application has been initialized.
                 * @returns {Object} The newly constructed app, or the singleton from the app cache if one already exists.
                 */
                app: function app(name, onInit) {
                    var app;
                    if (!appCache[name]) {
                        app = new Application(name, $dsrt);
                        appCache[name] = app;
                    } else {
                        app = appCache[name];
                    }
                    routing.onRouteChange(function appHashChangeHandler() {
                        clearApplicationScope(app);
                        $dsrt.hashInit(app, []);
                    });
                    if (common.utils.isFunction(onInit)) {
                        onInit.call(app, app);
                    }
                    return app;
                }
            };

            function clearApplicationScope(app) {
                app.modules.each(function () {
                    this.controllers.each(function () {
                        if (this.instance && utils.isFunction(this.instance.destroy)) {
                            this.instance.destroy();
                        }
                        this.instance = null;
                    });
                });
                app.components.each(function () {
                    if (common.utils.isArray(this.constructorInstances)) {
                        this.constructorInstances.forEach(function (inst) {
                            if (inst && utils.isFunction(inst.destroy)) {
                                inst.destroy();
                                inst = null;
                            }
                        });
                        this.constructorInstances.length = 0;
                    }
                });
            }

            return dsrtModule;
        }
    );

})();
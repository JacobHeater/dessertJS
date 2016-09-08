/**
 * @file The dessertJS core library.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.core", [
            "dessert.app",
            "dessert.common",
            "dessert.init",
            "dessert.singlepage.init",
            "dessert.routing",
            "jquery"
        ],
        function(
            App,
            common,
            init,
            spa,
            routing,
            $
        ) {

            /**
             * Holds all dessertJS App singletons for later retrieval.
             */
            var appCache = {};
            var selectors = common.selectors;
            var attrs = common.attrs;
            //This is a private wrapper for our $.dsrt object
            var $dsrt = {
                /**
                 * Initializes all dessertJS [dsrt-app] scopes within the current
                 * application or view. dessertJS can be used in a single-page-application
                 * methodology, or can be used for a simple MVC framework.
                 * 
                 * @param {Function} done The callback to invoke when initialization is complete.
                 * @param {any[]} args The global arguments to be passed during initialization.
                 * @param {Boolean} isPage Indicates if the page called the init method.
                 * @param {Boolean} isHash Indicates if the hash changed event called the init method.
                 * @returns {Object} The current $dsrt instance for chaining.
                 */
                init: function(done, args, isPage, isHash) {
                    //TODO: figure out why when the hash changes that the old page url is getting requested again.
                    var apps = $(selectors.app);
                    var $page = $(selectors.page);
                    var $app;
                    var app;
                    apps.each(function() {
                        $app = $(this);
                        app = appCache[$app.attr(attrs.app)]; //Lookup the app in the cache
                        init($app, app, args, isPage, isHash, done);
                        if (!isPage && $page.length > 0) { //Don't init the page if it's the page init method.
                            spa(app, $page);
                        }
                    });
                    $(selectors.mask).removeAttr(attrs.mask);
                    return this;
                },
                /**
                 * Internally calls the $dsrt.init() method indicating that the page is
                 * initializing the dessertJS context.
                 */
                pageInit: function(args) {
                    this.init(null, args, true, false);
                    return this;
                },
                /**
                 * Internally calls the $dsrt.init() method indicating that the hash changed event
                 * is initializing the dessertJS context.
                 */
                hashInit: function(args) {
                    this.init(null, args, false, true);
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
                preinit: function(handler) {
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
                init: function(dependencies, done) {
                    require(dependencies, function() {
                        $dsrt.init(done);
                    });
                },
                /**
                 * Creates a new dessertJS App singleton using the given name
                 * and exposes methods to prepare to initialize the app.
                 * 
                 * @param {String} name The name of the application to add to the appCache.
                 * @returns {Object} An object that exposes app specific capabilities.
                 */
                app: function(name) {
                    var app = appCache[name] || new Application(name, $dsrt);
                    return {
                        /**
                         * Sets up a method to be invoked when the application is being
                         * initialized. Allows for further set up of the application before
                         * the app is fully initialized.
                         * 
                         * @param {Function} handler The function to invoke when App init begins.
                         * @returns {Object} The current app object instance for chaining.
                         */
                        onInit: function(handler) {
                            if (typeof handler === 'function') {
                                handler.call(app, app);
                            }
                            return this;
                        },
                        /**
                         * Caches the App singleton in the appCache hash table for lookup later.
                         * This method must be invoked prior to calling ready. If the appCache
                         * hash table does not contain an App using the given name, it will raise
                         * an exception.
                         */
                        cache: function() {
                            appCache[app.name] = app;
                            return this;
                        },
                        /**
                         * Sets up additional event handlers for the application context and
                         * returns the App singleton instance from the appCache hash table.
                         * 
                         * @throws ReferenceError
                         * 
                         * @returns {Object} The dessertJS App singleton instance for initialization.
                         */
                        ready: function() {
                            if (appCache[app.name] === app) {
                                routing.initBackButtonHandler(function() {
                                    $dsrt.hashInit([]);
                                });
                                return appCache[app.name];
                            }
                            throw new ReferenceError("You did not add this application context to the dsrt appCache. You must call the \".cache()\" method before calling \".ready()\"");
                        }
                    };
                }
            };
            return dsrtModule;
        }
    );

})();
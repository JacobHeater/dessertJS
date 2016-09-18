/**
 * @file The dessertJS core library.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.core", [
            "dessert.application",
            "dessert.common",
            "dessert.init",
            "dessert.singlepage.init",
            "dessert.routing",
            "jquery"
        ],
        function(
            Application,
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
                init: function(appName, done, args, isPage, isHash) {
                    //TODO: figure out why when the hash changes that the old page url is getting requested again.
                    var $app = $("[" + attrs.app + "=" + appName + "]");
                    var $page = $app.find(selectors.page);
                    var app = appCache[appName];
                    init($app, app, args, isPage, isHash, done);
                    if (!isPage && $page.length > 0) {
                        spa(app, $page);
                    }
                    $(selectors.mask).removeAttr(attrs.mask);
                    return this;
                },
                /**
                 * Internally calls the $dsrt.init() method indicating that the page is
                 * initializing the dessertJS context.
                 */
                pageInit: function(appName, args) {
                    this.init(appName, null, args, true, false);
                    return this;
                },
                /**
                 * Internally calls the $dsrt.init() method indicating that the hash changed event
                 * is initializing the dessertJS context.
                 */
                hashInit: function(appName, args) {
                    this.init(appName, null, args, false, true);
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
                 * @param {Function} onInit A function to call after the application has been initialized.
                 * @returns {Object} The newly constructed app, or the singleton from the app cache if one already exists.
                 */
                app: function(name, onInit) {
                    var app;
                    if (!appCache[name]) {
                        app = new Application(name, $dsrt);
                        appCache[name] = app;
                    } else {
                        app = appCache[name];
                    }
                    routing.initBackButtonHandler(function() {
                        $dsrt.hashInit(app.name, []);
                    });
                    if (common.utils.isFunction(onInit)) {
                        onInit.call(app, app);
                    }
                    return app;
                }
            };
            return dsrtModule;
        }
    );

})();
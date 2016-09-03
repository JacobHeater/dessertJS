define(function() {
    /**
     * @class
     * A simple cache for storing HTTP handlers for different HTTP status codes.
     */
    function HttpHandlerCache() {
        /**
         * @class
         * @private
         * Represents an HTTP handler to handle different HTTP status codes throughout the application.
         * 
         * @param {String} name The name of the HTTP handler.
         * @param {Decimal|Number} The HTTP status code to handle.
         * @param {Function} handler The function that gets executed when the HTTP status code gets returned in the response.
         * @throws {InvalidArgumentException} Raises an exception when the arguments are not defined properly.
         */
        function HttpHandler(name, httpStatusCode, handler) {
            if (name && httpStatusCode && typeof handler === "function") {
                /**
                 * The name of the HttpHandler instance.
                 */
                this.name = name;
                /**
                 * The HTTP status code of the HttpHandler instance.
                 */
                this.statusCode = httpStatusCode;
                /**
                 * The function that will be invoked when the HTTP status code is returned.
                 */
                this.handler = handler;
            } else {
                throw new Error("Invalid HTTP handler! Arguments must be defined as: {String} name, {Number} httpStatusCode, {Function} handler.");
            }
        }
        /**
         * @private
         * @memberOf HttpHandlerCache
         * 
         * A list of HttpHandler instance.
         */
        var handlers = [];
        /**
         * Gets all the handlers from the handler cache by the HTTP status code.
         * 
         * @param {Number|Decimal} code The HTTP status code to match.
         */
        this.getHandlersByStatusCode = function(code) {
            return handlers.filter(function(h) {
                return h.statusCode === code;
            });
        };
        /**
         * Gets all the handlers from the handler cache by the handler name.
         * 
         * @param {String} name The name of the HTTP status handler.
         */
        this.getHandlersByName = function(name) {
            return handlers.filter(function(h) {
                return h.name === name;
            });
        };
        /**
         * Adds a new HttpHandler instance to the HttpHandlerCache instance.
         * 
         * @param {String} name The name of the handler.
         * @param {Number|Decimal} The HTTP status code to listen for.
         * @param {Function} handler The function to invoke when the HTTP status code is returned.
         * @returns {Object} The current HttpHandlerCache instance for chaining.
         */
        this.addHandler = function(name, httpStatusCode, handler) {
            handlers.push(new HttpHandler(name, httpStatusCode, handler));  
            return this;
        };
        /**
         * Removes an HttpHandler instance from the HttpHandlerCache instance by name.
         * 
         * @param {String} name The name of the handlers to remove.
         * @returns {Object} The current HttpHandlerCache instance for chaining.
         */
        this.removeHandler = function(name) {
            var matchedHandlers = handlers.filter(function(h) {
                return h.name === name;
            });
            matchedHandlers.forEach(function(h, index){
                handlers.splice(index, 1);
            });
            return this;
        };
    }

    return HttpHandlerCache;
});
/**
 * @file A require.js module responsible for routing in the application.
 * @author Jacob Heater
 * @since
 */
(function() {

    "use strict";

    define("dessert.routing", [
        "jquery"
    ], function dessertRoutingModel($) {

        var location = window.location;

        /**
         * Convert the arguments array into a dessertJS routing arguments string.
         * 
         * @param {Object[]} args The array of key value pairs to convert.
         * @returns {String} The arguments string.
         */
        function parseArgs(args) {
            var result = "";
            if (args && args.length && args.length > 0) {
                result += "/:";
                result += args.map(function argsMap(a) {
                    return a.key.concat("=").concat(escape(a.value));
                }).reduce(function argsReduce(current, next) {
                    return current.concat("&").concat(next);
                });
            }
            return result;
        };

        /**
         * Cleans any hash tags from the given path.
         * 
         * @param {String} path The path to clean.
         * @returns {String} The cleaned string.
         */
        function cleanHash(path) {
            return path.replace(/[#]+/g, '');
        }

        /**
         * Inspects the path for a hash tag and any arguments to determine if
         * this is a valid route for dessertJS routing.
         * 
         * @param {String} path The path to inspect.
         * @returns {Boolean} True of the path is a valid dessertJS route.
         */
        function hasRoute(path) {
            var routeRegex = /(#\/[\w\d\/&=:]+)/gi;
            return routeRegex.test(path);
        }

        /**
         * Insepcts the given path to determine if any arguments
         * are present in the given string.
         * 
         * @param {String} path The path to insepct for arguments.
         * @returns {Boolean} True if the path contains any routing arguments.
         */
        function hasArgs(path) {
            return (path.split('#')[1] || "").indexOf(":") > -1;
        }

        return {
            hasRoute: function routingHasRoute(path) {
                var href = path || location.href;
                return hasRoute(href);
            },
            setRoute: function routingSetRoute(path, params) {
                var href = location.href;
                if (params) {
                    path += parseArgs(params);
                }
                //This will resolve to http://host:{port}/path/:arg1=value&arg2=value
                if (hasRoute(location.href)) {
                    href = location.href.split("#")[0]; //Take the left side of the split
                }
                location.href = cleanHash(href).concat("#").concat(path);
            },
            getRoute: function routingGetRoute(path) {
                var href = path || location.href;
                var pathWithParams = href.split('#')[1] || "";
                var pathOnly = pathWithParams.split(':')[0] || "";
                var endForwardSlash = /\/$/gmi;
                if (pathOnly.match(endForwardSlash)) {
                    pathOnly = pathOnly.replace(endForwardSlash, '');
                }
                return pathOnly;
            },
            getParams: function routingGetParams(path) {
                var protocol = /[a-z]+:\/\//gmi;
                var href = path || location.href;
                if (protocol.test(href)) {
                    href = href.replace(location.protocol.concat("//").concat(location.host).concat("/"), "");
                }
                var params = [];
                var args = "";
                if (hasArgs(href)) {
                    args = href.split(":")[1]; //Get the right side, because the args will be on the right of the split.
                    params = args.split("&");
                    params = params.map(function(p) {
                        var kvp = p.split("="); //Creates a key value pair
                        return {
                            key: kvp[0] || "",
                            value: unescape(kvp[1] || "")
                        };
                    }); //Resolves to [{key: 'key', value: 'value'},...];
                }
                return params;
            },
            onRouteChange: function routingOnRouteChange(handler) {
                var $this = this;
                $(window).on("hashchange", function() {
                    //Handle hash change when there is truly only a hash in the url.
                    if ($this.hasRoute()) {
                        handler();
                    }
                });
            }
        };
    });

})();
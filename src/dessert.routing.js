define([], function() {
    "use strict";
    var location = window.location;

    function parseArgs(args) {
        var result = "";
        if (args && args.length && args.length > 0) {
            result += "/:";
            result += args.map(function(a) {
                return a.key.concat("=").concat(escape(a.value));
            }).reduce(function(current, next) {
                return current.concat("&").concat(next);
            });
        }
        return result;
    };

    function cleanHash(path) {
      return path.replace(/[#]+/g, '');
    }

    function hasRoute(path) {
        var routeRegex = /(#\/[\w\d\/&=:]+)/gi;
        return routeRegex.test(path);
    }

    function hasArgs(path) {
        return (path.split('#')[1] || "").indexOf(":") > -1;
    }
    return {
        hasRoute: function(path) {
            var href = path || location.href;
            return hasRoute(href);
        },
        setRoute: function(path, params) {
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
        getRoute: function(path) {
            var href = path || location.href;
            var pathWithParams = href.split('#')[1] || "";
            var pathOnly = pathWithParams.split(':')[0] || "";
            var endForwardSlash = /\/$/gmi;
            if (pathOnly.match(endForwardSlash)) {
                pathOnly = pathOnly.replace(endForwardSlash, '');
            }
            return pathOnly;
        },
        getParams: function(path) {
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
        initBackButtonHandler: function(handler) {
            var $this = this;
            if (!window.onhashchange) {
                window.onhashchange = function() {
                    //Handle hash change when there is truly only a hash in the url.
                    if ($this.hasRoute()) {
                      handler();
                    }
                };
            }
        }
    };
});

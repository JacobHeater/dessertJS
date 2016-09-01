define(['./muv.common', './muv.ajax'], function(common, ajax) {
    "use strict";
    return function externalModulesInit($context, app, isPage) {
        var selectors = common.selectors;
        var attrs = common.attrs;
        var utils = common.utils;
        var externalModules = isPage ? $context.find(selectors.page) : $context.find(selectors.src);
        var processedModules = [];
        var $exMod;
        var url;
        var qStringParams;
        var cleanedPath;
        var $data;
        
        function processExternalModules(done, syncModulesDone) {
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

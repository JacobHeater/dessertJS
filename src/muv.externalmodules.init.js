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
        
        function processExternalModules(done, syncModulesDone) {
            function processExternalModulesRecursive(i) {
                $exMod = externalModules.eq(i);
                url = utils.cleanPath("$base$modulePath.html".replace("$base", app.src).replace("$modulePath", $exMod.attr(attrs.src)));
                ajax.get(url)
                    .done(function(data) {
                        $exMod.html("");
                        $exMod.append(data).removeAttr(attrs.src);
                        if ((i + 1) < externalModules.length) {
                            processExternalModulesRecursive(i + 1);
                        } else { //Let's run the module init again until there aren't any left
                            externalModulesInit($context, app)(done, syncModulesDone);
                        }
                    });
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

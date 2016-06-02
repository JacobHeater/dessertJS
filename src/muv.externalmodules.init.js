define(['./muv.common', './muv.ajax'], function(common, ajax) {
    "use strict";
    return function($context, app) {
        var selectors = common.selectors;
        var attrs = common.attrs;
        var utils = common.utils;
        externalModules = $context.find(selectors.src);
        var externalModules;
        var $exMod;
        var url;
        return function processExternalModules(index, complete) {
            if (externalModules.length > 0 && index < externalModules.length) {
                $exMod = externalModules.eq(index);
                url = utils.cleanPath("$base$modulePath.html".replace("$base", app.src).replace("$modulePath", $exMod.attr(attrs.src)));
                ajax.get(url)
                    .then(function(data) {
                        $exMod.children().remove();
                        $exMod.append(data).removeAttr(attrs.src); //Remove the muv-src attribute so this doesn't get reprocessed.
                        setTimeout(function() {
                            processExternalModules(index + 1, complete);
                        }, 0);
                    });
            } else if (index >= externalModules.length && externalModules.length > 0) {
                setTimeout(function() {
                    externalModules = $context.find(selectors.src);
                    processExternalModules(0, complete); //Restart at zero and look for any missing links.
                }, 0);
            } else {
                //This means that all external modules have been processed. Call next event.
                complete();
            }
        };
    };
});

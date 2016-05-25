define(['./muv.externalmodules.init', './muv.syncmodules.init'], function(exmod, syncmod) {
  return function($app, app, args) {
    var externalInit = exmod($app, app);
    var syncInit = syncmod($app, app, args);
    var externalModuleIndex = 0;

    externalInit(externalModuleIndex, syncInit);
  };
});

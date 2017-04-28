(() => {

  'use strict';

  var PropertyHelper;
  var RouteManager;

  define(
    [
      './helpers/property-helper',
      'dessert.routemanager'
    ],
    main
  );

  function main(
    $PropertyHelper,
    $RouteManager
  ) {

    PropertyHelper = $PropertyHelper;
    RouteManager = $RouteManager;

    return Page;
  }

  class Page {
    constructor(element, args) {
      PropertyHelper.addReadOnlyProperties(this, [{
        name: 'element',
        value: element
      }, {
        name: 'args',
        value: args
      }])
    }

    routeTo(path, args) {
        RouteManager.routeTo(...arguments);
    }
  }
})();
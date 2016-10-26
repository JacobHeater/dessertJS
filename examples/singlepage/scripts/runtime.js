define(function () {
  "use strict";
  require.config({
    paths: {
      jquery: "../../../lib/jquery/jquery",
      handlebars: "../../../lib/handlebars/handlebars"
    }
  });
  require([
    './scripts/home',
    './scripts/controls/login'
  ]);
  return null;
});
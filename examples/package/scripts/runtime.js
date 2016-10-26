define(function() {
  "use strict";
  require.config({
    paths: {
      jquery: "../../../lib/jquery/jquery"
    }
  });
  require([
    './scripts/controls/autoSaveTextbox'
  ]);
  return null;
});
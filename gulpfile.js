(() => {
  var gulp = require('gulp');

  require('./gulp/tasks/build');
  require('./gulp/tasks/build.debug');
  require('./gulp/tasks/lint');
  require('./gulp/tasks/watch');
  require('./gulp/tasks/travis');
  require('./gulp/tasks/clean');

  gulp.task('default', ['watch']);
})();

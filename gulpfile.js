(() => {
  var gulp = require('gulp');

  require('./gulp/tasks/build');
  require('./gulp/tasks/muv.lint');
  require('./gulp/tasks/watch');

  gulp.task('default', ['watch']);
})();

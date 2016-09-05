(() => {
  var gulp = require('gulp');

  require('./gulp/tasks/build');
  require('./gulp/tasks/dessert.lint');
  require('./gulp/tasks/watch');

  gulp.task('default', ['watch']);
})();

(() => {
    var gulp = require('gulp');

    gulp.task('watch', function(){
      gulp.watch("src/**/*.js", ['dsrt-build', 'dsrt-lint']);
    });
})();

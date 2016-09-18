(() => {
    var gulp = require('gulp');

    gulp.task('watch', function(){
      gulp.watch("src/**/*.js", ['build', 'lint']);
    });

    gulp.task("watch-build", function() {
      gulp.watch("src/**/*.js", ["build"]);
    });
})();

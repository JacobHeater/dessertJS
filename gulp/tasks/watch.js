(() => {
    var gulp = require('gulp');
    var path = "src/**/*.js";

    gulp.task('watch', function(){
      gulp.watch(path, ['build', 'lint']);
    });

    gulp.task("watch-build", function() {
      gulp.watch(path, ["build"]);
    });

    gulp.task("watch-build-debug", function() {
      gulp.watch(path, ["build-debug"]);
    });
})();

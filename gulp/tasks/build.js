(() => {
    var gulp = require('gulp');
    var uglify = require("gulp-uglify");
    var zip = require("gulp-zip");
    gulp.task('build', ['clean'], function() {
        gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(zip("dessertjs.min.zip"))
        .pipe(gulp.dest("./bin/dessertJS"));
    });
})();

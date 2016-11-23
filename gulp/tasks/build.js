(() => {
    var gulp = require('gulp');
    var uglify = require("gulp-uglify");
    var zip = require("gulp-zip");
    var cache = require('gulp-cached');
    gulp.task('build', ['clean'], function() {
        gulp.src('src/**/*.js')
        //.pipe(cache("dessertJS"))
        .pipe(uglify())
        .pipe(zip("dessertjs.min.zip"))
        .pipe(gulp.dest("./bin/dessertJS"));
    });
})();

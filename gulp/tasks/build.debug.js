(() => {
    var gulp = require('gulp');
    var uglify = require("gulp-uglify");
    var cache = require('gulp-cached');
    gulp.task('build-debug', ['clean'], function() {
        gulp.src('src/**/*.js')
        //.pipe(cache("dessertJS"))
        .pipe(uglify())
        .pipe(gulp.dest("./bin/dessertJS"));
    });
})();

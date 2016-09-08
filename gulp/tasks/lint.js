(() => {
    var gulp = require('gulp');
    var lint = require('gulp-eslint');
    gulp.task('lint', function(done) {
        return gulp.src(['src/**/*.js', "!src/jquery.js"])
            .pipe(lint())
            .pipe(lint.format())
            .pipe(lint.failAfterError());
    });
})();

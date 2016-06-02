(() => {
    var gulp = require('gulp');
    var lint = require('gulp-eslint');
    gulp.task('muv-lint', function(done) {
        return gulp.src('src/**/*.js')
            .pipe(lint())
            .pipe(lint.format())
            .pipe(lint.failAfterError());
    });
})();

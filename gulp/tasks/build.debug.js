(() => {
    var gulp = require('gulp');
    
    gulp.task('build-debug', ['clean'], function() {
        gulp.src('src/**/*.js')
        .pipe(gulp.dest("./bin/dessertJS"))
        .pipe(gulp.dest("./examples/comprehensive/lib/dessertJS"));
    });
})();

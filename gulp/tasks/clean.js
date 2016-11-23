(() => {
    var gulp = require('gulp');
    var clean = require("gulp-clean");
    gulp.task('clean', function () {
        gulp.src('./bin/dessertJS/**/*.*', {
                read: false
            })
            .pipe(clean());
    });
})();
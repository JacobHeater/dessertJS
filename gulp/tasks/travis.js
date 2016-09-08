(() => {
    var gulp = require('gulp');

    gulp.task("travis", ["build", "lint"]);
})();
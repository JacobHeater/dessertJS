(() => {
    var gulp = require('gulp');
    var rjs = require('requirejs');
    var cache = require('gulp-cached');
    var config = {
        baseUrl: "src",
        out: "./bin/muv.min.js",
        name: "muv.core"
    };
    gulp.task('muv-build', function(done) {
        gulp.src('src/**/*.js')
        .pipe(cache("muvJS"));
        rjs.optimize(config, function(buildResponse) {
            done();
        }, done);
    });
})();

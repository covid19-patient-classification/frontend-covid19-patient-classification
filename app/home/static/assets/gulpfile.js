var gulp = require('gulp');
var path = require('path');
var rename = require("gulp-rename");
var cleanCss = require('gulp-clean-css');

var Paths = {
    HERE: './',
    DIST: 'dist/',
    CSS: './css/',
};

// Minify CSS
gulp.task('minify:css', function() {
    return gulp.src(Paths.CSS + '/*.css')
        .pipe(cleanCss())
        .pipe(rename(function(path) {
            // Updates the object in-place
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest(Paths.CSS))
});

// Default
gulp.task('default', gulp.series('minify:css'));
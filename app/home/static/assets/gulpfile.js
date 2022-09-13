var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var Paths = {
    HERE: './',
    DIST: 'dist/',
    CSS: './css/',
    JS: './js/',
};

// Minify CSS
gulp.task('minify:css', function () {
    return gulp
    .src([Paths.CSS + '/*.css', '!' + Paths.CSS + '/*.min.css'])
        .pipe(cleanCss())
        .pipe(
            rename(function (path) {
                path.extname = '.min.css';
            })
        )
        .pipe(gulp.dest(Paths.CSS));
});

// Minify JS
gulp.task('minify:js', function () {
    return gulp
        .src(Paths.JS + '/*.js')
        .pipe(uglify())
        .pipe(
            rename(function (path) {
                path.extname = '.min.js';
            })
        )
        .pipe(gulp.dest(Paths.JS + Paths.DIST));
});

// Default
gulp.task('default', gulp.series('minify:css', 'minify:js'));

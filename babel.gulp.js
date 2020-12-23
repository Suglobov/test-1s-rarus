const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
// const gulpCopy = require('gulp-copy');

// const rename = require('gulp-rename');
function copyimg () {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dev/img/'))
        .pipe(gulp.dest('./build/img/'));
}
function scss () {
    return gulp.src('./src/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev/css/'))
        .pipe(csso())
        .pipe(gulp.dest('./build/css/'));
}
exports.copyimg = copyimg;
exports.default = scss;
exports.watch = function () {
    gulp.watch('./src/scss/**/*.scss', scss);
    gulp.watch('./src/img/**', copyimg);
};

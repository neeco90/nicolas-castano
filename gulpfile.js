'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files in folder
    .src('./assets/**/*.scss')
    // Run Sass plugin on found files
    .pipe(sass())
    // Pipe resulting CSS to destination
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.scss', ['sass']);
});
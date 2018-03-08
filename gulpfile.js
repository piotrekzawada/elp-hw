'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
});
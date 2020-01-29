'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Сборка в разрботку
gulp.task('sass', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('source/css'))
  .pipe(browserSync.stream()));

gulp.task('server', () => {
  browserSync.init({
    server: 'source'
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('source/**/*.html').on('change', browserSync.reload);
  gulp.watch('source/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('start', gulp.series('sass', 'server'));

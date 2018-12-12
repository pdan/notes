'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

var paths = {
  styles: {
    src: './src/index.scss',
    dest: './src'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch('./src/**/*.scss', styles);
}

var build = gulp.series(styles, watch);

gulp.task(build);
gulp.task('default', build);


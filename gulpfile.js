const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('default', ['js', 'sass']);

gulp.task('js', () => {
  return gulp.src('scripts/*.js')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-amd']
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('sass', () => {
  return gulp.src('styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('watch', () => {
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch('scripts/*.js', ['js']);
});

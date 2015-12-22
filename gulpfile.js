var gulp = require('gulp'),
    path = require('path'),
    livereload = require('gulp-livereload');

gulp.task('reload', function() {
  gulp.src('*.*')
      .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.*', ['reload']);
});
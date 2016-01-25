var gulp = require('gulp'),
    path = require('path'),
    livereload = require('gulp-livereload');
    autoprefixer = require('gulp-autoprefixer');

gulp.task('reload', function() {
  gulp.src('*.*')
      .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.*', ['reload']);
});

gulp.task('testAutoFx', function () {
    gulp.src('css/base.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});
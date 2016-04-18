var gulp = require('gulp'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    pngquant = require('imagemin-pngquant');

//自动刷新页面
gulp.task('reload', function() {
  gulp.src('*.*')
      .pipe(livereload());
});
//监听文件变动
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.*', ['reload']);
});
//自动添加css前缀
gulp.task('testAutoFx', function () {
    gulp.src('css/base.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});
//自动编译less文件
gulp.task('less',function(){
    gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
//压缩图片
gulp.task('imagemin', function() {
    gulp.src('images/sys/*.{jpg,png,gif}')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('images/sys/dist'));
});
//压缩合并js文件
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/js'));
});
//压缩合并css文件
gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('build/css'));
});


gulp.task('test',function(){
    var time = new Date();
    console.log(time);
});
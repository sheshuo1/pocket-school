var gulp = require('gulp'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-clean-css'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    fontSpider = require( 'gulp-font-spider' );

//自动刷新页面
gulp.task('reload', function() {
    livereload.reload();
});
//监听文件变动
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.*', ['reload']);
});
//自动添加css前缀
gulp.task('autofx', function () {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0','> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(rename({ suffix: '.fx' }))
        .pipe(gulp.dest('css'));
});
//自动编译less文件
gulp.task('less',function(){
    gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});
//压缩图片
gulp.task('imagemin', function() {
    gulp.src('images/sys/*.{jpg,png,gif}')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/images'));
});
//压缩js文件
gulp.task('minjs', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});
//压缩css文件
gulp.task('mincss',function() {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0','> 5%'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(minifyCSS({compatibility: 'ie8'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
});


//字蛛
gulp.task('fontspider', function() {
    return gulp.src('index.html')
        .pipe(fontSpider());
});

gulp.task('help', function() {
    console.log('  gulp watch           自动刷新页面');
    console.log('  gulp imagemin        压缩图片');
    console.log('  gulp minjs           压缩JS');
    console.log('  gulp mincss          压缩CSS');
    console.log('  gulp less            编译less');
    console.log('  gulp autofx          自动添加CSS前缀');
});

gulp.task('default',function(){
    gulp.start('help');
});
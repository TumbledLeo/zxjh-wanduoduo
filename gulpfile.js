//提前声明好路径常量
var app = {
    srcPath: 'src/',
    buildPath: 'build/',
    distPath: 'dist/'
};

/*引入gulp与gulp插件*/
var gulp = require('gulp');
var scss = require('gulp-sass');         // css 预编译
var cssmin = require('gulp-cssmin');        // 压缩css
var uglify = require('gulp-uglify');        // 压缩js
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');        // 合并文件
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');  // 压缩图片
var open = require('open');
var babel = require("gulp-babel");


/*任务1  把下载的前端框架放到我们项目中lib*/
gulp.task('lib', function () {
    gulp.src('src/lib/**/*')
        .pipe(gulp.dest(app.buildPath + 'lib'))
        .pipe(gulp.dest(app.distPath + 'lib'))
        .pipe(connect.reload())
});
/* 任务2 media 音视频媒体文件的移动 */
gulp.task('media', function () {
    gulp.src('src/media/**/*')
        .pipe(gulp.dest(app.buildPath + 'media'))
        .pipe(gulp.dest(app.distPath + 'media'))
        .pipe(connect.reload())
});

/*任务3 把所有html文件移动到另一个位置*/
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        //removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        //removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        //minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(app.srcPath + '*.html')
        .pipe(gulp.dest(app.buildPath))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(app.distPath))
        .pipe(connect.reload())
});

/*任务4 把scss编译成css*/
gulp.task('scss', function () {
    gulp.src(app.srcPath + 'style/*.scss')
        .pipe(scss())
        .pipe(gulp.dest(app.buildPath + 'css/'))
        .pipe(cssmin())
        .pipe(gulp.dest(app.distPath + 'css/'))
        .pipe(connect.reload())
});

/*任务5 移动js*/
gulp.task('js', function () {
    gulp.src(app.srcPath + 'js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(app.buildPath + 'js/'))
        .pipe(uglify())
        .pipe(gulp.dest(app.distPath + 'js/'))
        .pipe(connect.reload())
});

/*任务6 压缩图片*/
gulp.task('image', function () {
    gulp.src(app.srcPath + 'images/**/*')
        .pipe(gulp.dest(app.buildPath + 'images'))
        .pipe(imagemin())
        .pipe(gulp.dest(app.distPath + 'images'))
        .pipe(connect.reload());
});

/*任务7 把手机端文件移动到 m 文件夹下*/
gulp.task('mobile', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/m/*.html')
        .pipe(gulp.dest(app.buildPath + 'm'))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(app.distPath + 'm'))
        .pipe(connect.reload())
});

/*任务7-1 把所有mobile下的图片文件移动到 m/imags 文件夹下*/
gulp.task('mobile-image', function () {
    gulp.src('src/m/images/**/*')
        .pipe(gulp.dest(app.buildPath + 'm/images'))
        .pipe(imagemin())
        .pipe(gulp.dest(app.distPath + 'm/images'))
        .pipe(connect.reload());
})

/*任务7-2  移动端的css解析和移动*/
gulp.task('mobile-css', function () {
    gulp.src(app.srcPath + 'm/style/*.scss')
        .pipe(scss())
        .pipe(gulp.dest(app.buildPath + "m/css"))
        .pipe(cssmin())
        .pipe(gulp.dest(app.distPath + 'm/css'))
        .pipe(connect.reload())
})
/*任务7-js  移动端的js 搞到 m/js 文件夹下*/
gulp.task('mobile-js', function () {
    gulp.src(app.srcPath + 'm/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(app.buildPath + 'm/js'))
        .pipe(uglify())
        .pipe(gulp.dest(app.distPath + 'm/js'))
        .pipe(connect.reload())
})

/*同时执行多个任务【其他任务的名称】
* 当bulid执行时，会把数组中的所有任务执行了
* */
gulp.task('build', ['lib', 'html', 'scss', 'js', 'image', 'media', 'mobile', 'mobile-css', 'mobile-js', 'mobile-image']);

/*定义server服务
* 搭建一个服务器，设置运行构建目录
* 目的时刻监听文件里面内容的变化
* */
gulp.task('server', ['build'], function () {
    // 设置服务器
    connect.server({
        root: [app.buildPath],//要运行那个目录
        livereload: true,// 是否热更新
        port: 9999 // 端口号
    });

    // 监听哪些任务
    gulp.watch(app.srcPath + '*.html', ['html']);
    gulp.watch(app.srcPath + 'm/*.html', ['mobile']);
    gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'm/js/**/*.js', ['mobile-js']);
    gulp.watch(app.srcPath + 'images/**/*', ['image']);
    gulp.watch(app.srcPath + 'm/images/**/*', ['mobile-image']);
    gulp.watch(app.srcPath + 'style/**/*.scss', ['scss']);
    gulp.watch(app.srcPath + 'm/style/**/*.scss', ['mobile-css']);
    open('http://localhost:9999');
});
gulp.task('default', ['server']);

"use strict";

const gulp = require('gulp');
const del = require('del');
const less = require("gulp-less");
const babel = require('gulp-babel');
const browserify = require('browserify');  
const uglify = require('gulp-uglify');  
const source = require('vinyl-source-stream');

var paths = {
  scripts: ['gulpfile.js','src/**/*.js', 'src/*js'],
  less:['src/less/**/*.less'],
  dist:['./dist/js/test/testAjax.js'],
  build:['./build/module.js']
};


//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {

    return gulp.src(paths.less) //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
});




/*gulp.task('clean:mobile', function (cb) {
  del([
    'dist/report.csv',
    这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    'dist/mobile/**',
    我们不希望删掉这个文件，所以我们取反这个匹配模式
    '!dist/mobile/deploy.json'
  ], cb);
});*/
   

gulp.task('babel', () => {
    return gulp.src(paths.scripts.slice(1))
        .pipe(babel({
            presets: ['es2015','babel-preset-react']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('bundle',["babel"], function() {  
  return browserify(paths.dist)
    .bundle()
    .pipe(source('module.js'))
    .pipe(gulp.dest('build/'));//
});

gulp.task("uglify",['bundle'], () => {
  return gulp.src(paths.build).pipe(uglify())
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['bundle']);

  gulp.watch(paths.less, ['testLess']);

});
 
gulp.task('default',['testLess','bundle', 'watch']);
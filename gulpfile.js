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

// gulp.task('testLess', function () {
//     return gulp.src(paths.less) //该任务针对的文件
//         .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
// });

gulp.task('clean:mobile', function (cb) {
  del(['build', 'dist'], cb);
});

gulp.task('babel', () => {
  return gulp.src(paths.scripts.slice(1))
    .pipe(babel({
        presets: ['es2015','babel-preset-react']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('boundle',["babel"], function() {  
  return browserify(paths.dist)
    .bundle()
    .pipe(source('module.js'))
    .pipe(gulp.dest('build/'));//
});

gulp.task("uglify",['boundle'], () => {
  return gulp.src(paths.build).pipe(uglify())
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['boundle']);
});
 
gulp.task('start',['clean:mobile','boundle', 'watch']);
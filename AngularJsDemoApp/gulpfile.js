/// <vs BeforeBuild='compress' SolutionOpened='watch' />
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var watch = require('gulp-watch');

 var config = {
    srcJSFiles : [
	"./app/*.js",
	"./app/*/*.js",
	"./app/*/*/*.js"
	]
 };



gulp.task('watch', function(){
    return gulp.watch(config.srcJSFiles, ['compress']);
});

gulp.task('clean', function(){
  del.sync(['dist/complete.min.js'])
});

gulp.task("vet", function(){
	gulp.src(config.srcJSFiles)
	.pipe(jscs())
	.pipe(jshint())
	.pipe(jshint.reporter("jshint-stylish",{verbose:true}));
});


gulp.task('compress',["vet", "clean"], function() {
  return gulp.src(config.srcJSFiles)
	.pipe(concat('complete.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//Set a default tasks
gulp.task('default', ['compress'], function(){});
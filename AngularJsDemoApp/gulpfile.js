/// <vs BeforeBuild='compress' SolutionOpened='watch' />
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var watch = require('gulp-watch');

gulp.task('watch', function(){
    return gulp.watch([
	"./app/*.js",
	"./app/*/*.js",
	"./app/*/*/*.js"
	], ['compress']);
});

gulp.task('clean', function(){
  del.sync(['dist/complete.min.js'])
});

gulp.task("vet", function(){
	gulp.src([
	"./app/*/*.js",
	"./app/*/*/*.js"
	])
	.pipe(jscs())
	.pipe(jshint())
	.pipe(jshint.reporter("jshint-stylish",{verbose:true}));
});


gulp.task('compress',["vet", "clean"], function() {
  return gulp.src([
	"./app/*.js",
	"./app/*/*.js",
	"./app/*/*/*.js"
	])
	.pipe(concat('complete.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//Set a default tasks
gulp.task('default', ['compress'], function(){});
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task("vet", function(){
	gulp.src([
	"./app/*/*.js",
	"./app/*/*/*.js"
	])
	.pipe(jscs())
	.pipe(jshint())
	.pipe(jshint.reporter("jshint-stylish",{verbose:true}));
});


gulp.task('compress',["vet"], function() {
  return gulp.src([
	"./app/*.js",
	"./app/*/*.js",
	"./app/*/*/*.js"
	])
	.pipe(concat('complete.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
/// <vs BeforeBuild='default' SolutionOpened='watch' />
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var del = require("del");
var watch = require("gulp-watch");
var inject = require('gulp-inject');

var config = {
    srcJSFiles: [
        "./app/*.js",
        "./app/*/*.js",
        "./app/*/*/*.js",
        "!./node_modules/**/*.js"
    ],
    targetHtmlFile: "./index.html",
    targetMinJsFile: "complete.min.js",
    targetMinFolder: "dist/"
};



gulp.task("watch", function(){
    return gulp.watch(config.srcJSFiles, ["compress"]);
});

gulp.task("clean", function() {
    del.sync(["dist/complete.min.js"]);
});

gulp.task("vet", function() {
    gulp.src(config.srcJSFiles)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish", { verbose: true }));
});

gulp.task('inject', ["compress"], function () {
    var target = gulp.src(config.targetHtmlFile);
    var sources = gulp.src(config.targetMinFolder + config.targetMinJsFile);

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});

gulp.task("compress",["vet", "clean"], function() {
  return gulp.src(config.srcJSFiles)
    .pipe(concat(config.targetMinJsFile))
    .pipe(uglify())
    .pipe(gulp.dest(config.targetMinFolder));
});

//Set a default tasks
gulp.task("default", ["compress", "inject"], function(){});

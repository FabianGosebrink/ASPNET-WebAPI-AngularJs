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
    targetMinAppJsFile: "app.min.js",
    targetDistFolder: "dist/",
    targetDistJsFolder: "dist/js/",
    root: "./"
};

gulp.task("watch", function(){
    return gulp.watch(config.srcJSFiles, ["compress"]);
});

gulp.task("clean", function() {
    del.sync([config.targetDistFolder + "**/*.*"]);
});

gulp.task("vet", function() {
    gulp.src(config.srcJSFiles)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish", { verbose: true }));
});

gulp.task("uglifyApp",["vet", "clean"], function() {
  return gulp.src(config.srcJSFiles)
    .pipe(concat(config.targetMinAppJsFile))
    .pipe(uglify())
    .pipe(gulp.dest(config.targetDistJsFolder));
});

gulp.task('serve-dist', ["uglifyApp"], function () {
    var target = gulp.src(config.targetHtmlFile);
    var sources = gulp.src(config.targetDistJsFolder + config.targetMinAppJsFile);

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.targetDistFolder));
});

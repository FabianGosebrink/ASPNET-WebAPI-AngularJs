var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var del = require("del");
var inject = require('gulp-inject');

var config = require("./gulp.config")();

gulp.task("vet", function() {
    return gulp.src(config.srcJSFiles)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish", { verbose: true }));
});

gulp.task('injectJsIntoIndex', ["vet"], function () {
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    var target = gulp.src(config.targetIndexHtmlFile);
    var sources = gulp.src(config.srcJSFiles);

    return target
        .pipe(inject(sources, {
            addRootSlash: false
        }))
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.root));
});
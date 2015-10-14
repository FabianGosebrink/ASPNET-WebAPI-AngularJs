module.exports = function () {

    var config = {
        srcJSFiles: [
            "./app/*.js",
            "./app/*/*.js",
            "./app/*/*/*.js",
            "!./node_modules/**/*.js"
        ],
        targetIndexHtmlFile: "index.html",
        root: "./",

        bower: {
            json: require("./bower.json"),
            directory: "./libs",
            ignorePath: "../.."
        }
    }

    config.getWiredepDefaultOptions = function () {

        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};
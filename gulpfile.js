const { src, dest } = require("gulp");
const zip = require("gulp-zip");

exports.default = function () {
  return src([
    "**/*",
    "!node_modules/**",
    "!src/**/*.js",
    "!src/**/*.scss",
    "!bundled/**",
    "!gulpfile.js",
    "!package.json",
    "!package-lock.json",
    "!webpack.config.js",
    "!.gitignore",
  ])
    .pipe(zip("artmanns-hello-gutenberg.zip"))
    .pipe(dest("bundled"));
};

var autoprefixer = require('autoprefixer');
var Core = require('css-modules-loader-core');
require('es6-promise');
var fs = require('fs');
var genericNames = require('generic-names');
var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var _ = require('lodash');
var _postcss = require('postcss');
var Parser = require('postcss-modules-parser');

var core = new Core([
  Core.values,
  Core.localByDefault,
  Core.extractImports,
  Core.scope({
    generateScopedName: genericNames("[name]__[local]"),
  }),
  autoprefixer,
]);

var templateData = {
  require: require,
};

require.extensions['.css'] = function(module, path) {
  var instance = _postcss(core.plugins.concat(new Parser));
  var css = fs.readFileSync(path, 'utf8');
  var tokens = instance.process(css, { from: path }).root.tokens;
  return module._compile("module.exports = " + JSON.stringify(tokens), path);
};

require.extensions['.html'] = function(module, path) {
  var templateHTML = fs.readFileSync(path, 'utf8');
  var html = _.template(templateHTML)(templateData);
  return module._compile("module.exports = " + JSON.stringify(html), path);
};

gulp.task('styles', ['templates'], function() {
  return gulp.src("./styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(core.plugins))
    .pipe(concat("./styles.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./build"));
});

gulp.task('templates', function() {
  Object.keys(require.cache).map(function(path) {
    if (/\.(css|html)$/.test(path)) delete require.cache[path];
  });
  return gulp.src("./*.html")
    .pipe(template(templateData))
    .pipe(gulp.dest("./build"));
});

gulp.task('build', ['styles', 'templates']);

gulp.task('watch', ['build'], function() {
  gulp.watch("./styles/*.css", ['styles']);
  gulp.watch(["./*.html", "./includes/*.html"], ['templates']);
});

gulp.task('default', ['build']);

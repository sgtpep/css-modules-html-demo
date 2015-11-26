var autoprefixer = require('autoprefixer');
var Core = require('css-modules-loader-core');
var hook = require('css-modules-require-hook');
require('es6-promise');
var fs = require('fs');
var genericNames = require('generic-names');
var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var _ = require('lodash');

var core = new Core([
  Core.values,
  Core.localByDefault,
  Core.extractImports,
  Core.scope({
    generateScopedName: genericNames("[name]__[local]"),
  }),
  autoprefixer,
]);

hook({
  use: core.plugins,
});

var templateData = {
  require: require,
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

gulp.task('watch', function() {
  gulp.watch("./styles/*.css", ['styles']);
  gulp.watch(["./*.html", "./includes/*.html"], ['templates']);
});

gulp.task('default', [
  'styles',
  'templates',
  'watch',
]);

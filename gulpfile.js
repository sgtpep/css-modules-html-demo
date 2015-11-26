require('es6-promise');
var autoprefixer = require('autoprefixer');
var Core = require('css-modules-loader-core');
var hook = require('css-modules-require-hook');
var genericNames = require('generic-names');
var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');

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

gulp.task('styles', function() {
  return gulp.src("./styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(core.plugins))
    .pipe(concat("./styles.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./build"));
});

gulp.task('templates', function() {
  return gulp.src("./*.html")
    .pipe(template({
      require: require,
    }))
    .pipe(gulp.dest("./build"));
});

gulp.task('watch', function() {
  gulp.watch("./styles/*.css", ['styles']);
  gulp.watch("./*.html", ['templates']);
});

gulp.task('default', [
  'styles',
  'templates',
  'watch',
]);

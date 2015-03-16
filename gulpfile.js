var gulp = require('gulp'),
    path = require('path'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    argv = require('minimist')(process.argv.slice(2)),
    del = require('del'),
    notify = require('gulp-notify'),
    pkg = require('./package.json'),
    header = require('gulp-header'),
    karma = require('gulp-karma')
;

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

var defaults = {

  // build dir
  build_dir : 'dist/',

  // JS default config
  js : {
    // path source files
    source_dir : 'src/',

    // main file for app
    dest_app_filename : 'angular-partners-api.js',
  },

  // Test config
  tests : {
    // path files for tests
    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/api.module.js',
      'src/api.config.js',
      'src/api.factory.js',
      'src/api.interceptor.js',
      'src/api.factory.spec.js',
      'src/api.interceptor.spec.js'
    ]
  }

};

// Lint task
gulp.task('lint', function() {
  return gulp.src(path.join(defaults.js.source_dir, '/*.js'))
    .pipe(jshint())
    .pipe(notify(function (file) {
      if (!file.jshint.success) {
        var errors = file.jshint.results.map(function (data) {
          if (data.error) {
            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
          }
        }).join("\n");

        return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
      }
    }))
  ;
});

// JS task - require lint
gulp.task('js', ['lint'], function() {

  var files = [];

  files.push(path.join(defaults.js.source_dir, '/*.module.js'));
  files.push(path.join(defaults.js.source_dir, '/*.*.js'));

  return gulp.src(files)
    .pipe(plumber())
    .pipe(concat(defaults.js.dest_app_filename))
    .pipe(gulpif(argv.prod !== undefined, uglify()))
    .pipe(gulpif(argv.prod !== undefined, rename(function(filepath) {
      filepath.basename += '.min';
    })))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(defaults.build_dir))
  ;
});

gulp.task('tests', function() {
  return gulp.src(defaults.tests.files)
    .pipe(karma({
      configFile: 'karma.conf.js'
    }))
  ;
});

// --------------------------------

gulp.task('default', ['tests', 'js']);

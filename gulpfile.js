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
    notify = require('gulp-notify')
;

var defaults = {

  // build dir
  build_dir : 'dist/',

  // JS default config
  js : {
    // path source files
    source_dir : 'src/',

    // main file for app
    dest_app_filename : 'angular-partners-api.js',
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
    .pipe(gulp.dest(defaults.build_dir))
  ;
});

// --------------------------------

gulp.task('default', ['js']);

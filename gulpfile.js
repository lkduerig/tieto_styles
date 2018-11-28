var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'docs';

gulp.task('styleguide:generate:dev', function() {
  return gulp.src('styles-guide/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Tieto Styleguide',
        server: true,
        rootPath: outputPath,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:generate', function() {
  return gulp.src('styles-guide/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Tieto Styleguide',
        server: false,
        rootPath: outputPath,
        appRoot: '.',
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('styles-guide/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:dev', ['styleguidedev'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['styles-guide/**/*.scss'], ['styleguide']);
});

gulp.task('styleguidedev', ['styleguide:generate:dev', 'styleguide:applystyles']);
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
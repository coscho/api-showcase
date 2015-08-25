var gulp      = require('gulp');
var inject    = require('gulp-inject');
var rename    = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');

gulp.task('default', ['buildjs']);

gulp.task('minifycss', function() {
    return gulp.src('./css/revtoaster.css')
        .pipe(rename('revtoaster.min.css'))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(gulp.dest('./build'));
});

gulp.task('embedcss', ['minifycss'], function () {
    return gulp.src('./js/revtoaster.js')
      .pipe(inject(gulp.src(['./build/*.css']), {
        starttag: '/* inject:css */',
        endtag: '/* endinject */',
        transform: function (filePath, file) {
          return file.contents.toString('utf8')
        }
      }))
      .pipe(gulp.dest('./build'));
});

gulp.task('buildjs', ['minifycss', 'embedcss'], function() {
    return gulp.src(['./build/*.js', '!./build/revtoaster.min.js', '!./build/revtoaster.pkgd.js'])
        .pipe(concat('revtoaster.pkgd.js'))
        .pipe(gulp.dest('./build'))
        .pipe(uglify({
            mangle: false
            }))
        .pipe(rename('revtoaster.min.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch(['./js/*', './css/revtoaster.css'], ['buildjs']);
});
var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

gulp.task('default', function() {

  return gulp.src([
     'src/toolbar.js', 
     'src/service.js',
     'src/directives.js',
     'src/main.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      basename: "mdRichEditor",
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));

});

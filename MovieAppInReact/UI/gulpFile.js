var gulp=require('gulp');
var browserify=require('browserify');
var reactify=require('reactify');
var source=require('vinyl-source-stream');


gulp.task(
  'browserify',function() {
    browserify('./src/js/movieContainer.js')
      .transform('reactify')
      .bundle()
      .pipe(source ('app.js'))
      .pipe(gulp.dest('dist/js'))
  }
);
gulp.task(
  'copy',function() {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    gulp.src('src/css/*')
    .pipe(gulp.dest('dist/css'));
    gulp.src('src/font/*')
    .pipe(gulp.dest('dist/font'));


  }
);

gulp.task('default',['browserify','copy'],function(){
  return gulp.watch('src/**/*.*',['browserify','copy']);
});

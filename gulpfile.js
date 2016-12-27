var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
sass = require('gulp-sass'),
watch = require('gulp-watch'),
babel = require('gulp-babel'),
px2rem = require('gulp-px2rem'),
uglify = require('gulp-uglify'),
cssmin = require('gulp-minify-css'),
clean = require('gulp-clean');

gulp.task('browser-sync', ['es62es5'], function(){
  browserSync.init({
    server:{
    	baseDir:'./demo'
    }
  });
  gulp.watch('./src/*.js', [ 'es62es5' ]);
  gulp.watch('./demo/index.html').on('change', reload);
});

gulp.task('es62es5', function(){
	return gulp.src('./src/*.js')
      .pipe( uglify() )
    	.pipe(gulp.dest( './demo' ))
      .pipe( browserSync.stream() );
});

gulp.task('clean-css', function (){
  return gulp.src('demo/*.css', {read: false})
      .pipe(clean());
});

gulp.task('clean-scripts', function (){
  return gulp.src('demo/*.js', {read: false})
      .pipe(clean());
});
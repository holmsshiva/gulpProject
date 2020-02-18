/*
CSS − SASS, LESS and Stylus.
JS − CoffeeScript, LiveScript, TypeScript, etc.
HTML − Markdown, HAML, Slim, Jade, etc.
*/
// sudo npm install -g gulp
// npm init
// npm dependencies

const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const autoprefix = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();


gulp.task('default', ['imagemin', 'styles', 'js'], function() {

	gulp.watch('src/css/*.css', function() {
      // run styles upon changes
      gulp.run('styles');
   });

});

//reload
gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'build'
      },
   })
})

// images gulp
gulp.task('imagemin', function() {
   var img_src = 'src/images/**/*', img_dest = 'build/images';

   gulp.src(img_src)
   .pipe(changed(img_dest))
   .pipe(imagemin())
   .pipe(gulp.dest(img_dest));
});

// css gulp
gulp.task('styles', function() {
   gulp.src(['src/css/*.css'])
   .pipe(concat('styles.css'))
   .pipe(autoprefix('last 2 versions'))
   .pipe(minifyCSS())
   .pipe(gulp.dest('build/css/'));
});

// js gulp
gulp.task('js', function(){
   gulp.src('src/js/*.js')
   .pipe(concat('script.js'))
   .pipe(uglify())
   .pipe(gulp.dest('build/scripts/'));
});
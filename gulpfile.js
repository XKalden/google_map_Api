var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create(),
    plumber    = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano');



gulp.task('sass', function() {
   gulp.src('./style.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});  


gulp.task('scripts', function(){
    gulp.src('./script.js') // What files do we want gulp to consume?
    .pipe(plumber()) // avoid gulp crash 
    .pipe(eslint())
    .pipe(eslint.format())
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
      .pipe(gulp.dest('./build/js')) // Where do we put the result?
});


gulp.task('server', function() {
    browserSync.init({
        server:{
            baseDir: "./"
        }    
    });
    gulp.watch("./*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./script.js").on('change', browserSync.reload);
});

gulp.task('default',['scripts', 'server']);


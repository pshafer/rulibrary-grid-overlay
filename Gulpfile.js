var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var notify 			= require('gulp-notify');
var gutil			= require('gulp-util');
var gshell			= require('gulp-shell');
var watch			= require('gulp-watch');
var bookmarklet     = require('gulp-bookmarklet');
var cssmin          = require('gulp-cssmin');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');

var config = {
    scss_src:   'src/scss',
    js_src:     'src/js',
    css_dest:   'css',
    js_dest:    'js'
};

var cssMinifyLocation = ['css/*.css', '!css/*.min.css'];

gulp.task('bookmarklet', function() {
   return gulp.src('src/js/*.js')
       .pipe(bookmarklet({
           format: 'htmlsingle',
           file: 'bookmarklet.html'
       }))
       .pipe(gulp.dest('./'))
       .pipe(notify({
           title: "JS Bookmarklet",
           message: "JS Bookmarklet was created!"
       }));
});

gulp.task('compile:scss', function() {
    return gulp.src(config.scss_src + "/**/*scss")
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: [
                config.scss_src
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.css_dest))
        .pipe(notify({
            title: "SASS/SCSS Compiled",
            message: "All SASS/SCSS files have been compiled!"
        }));
});

gulp.task('minify-css', function() {
    return gulp.src(cssMinifyLocation)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.css_dest));
});

gulp.task('compile:js', function(){
    return gulp.src(config.js_src + "/**/*.js")
        .pipe(uglify({
            preserveComments: 'false'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.js_dest));
});


gulp.task('compile', ['compile:scss', 'minify-css', 'compile:js']);
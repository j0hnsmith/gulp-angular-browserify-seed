var http = require('http');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var lrserver = lr();
//var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');
var ecstatic = require('ecstatic');
var imagemin = require('gulp-imagemin');

var livereloadport = 35729,
    serverport = 5001;

gulp.task('lint', function() {
  gulp.src(['./app/app/**/*.js'])
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean-dist', function() {
    gulp.src('./dist/*', {read: false})
        .pipe(clean());
});

gulp.task('scripts', function() {
    return gulp.src(['app/app/app.js'])  // browserify entry points only
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
//        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/app'))
        .pipe(refresh(lrserver));
});

gulp.task('styles', function() {
    return gulp.src(['app/styles/*.less'])
        .pipe(less())
        .on('error', console.log)
//        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/styles'))
        .pipe(refresh(lrserver));
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(serverport);

  //Set up the livereload server
  lrserver.listen(livereloadport);
});

gulp.task('html', function() {
    return gulp.src(["app/**/*.html"])
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(lrserver));
})

gulp.task('assets', function() {
    return gulp.src("app/assets/**")
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/assets/'))
        .pipe(refresh(lrserver));
});

// Requires gulp >=v3.5.0
gulp.task('watch', function () {
    gulp.watch('app/app/**/*.js', ['lint']);
    gulp.watch('app/app/**', ['scripts']);
    gulp.watch('app/styles/*', ['styles']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/assets/**', ['assets']);
});

gulp.task('default', [
    'scripts',
    'styles',
    'html',
    'assets',
    'serve',
    'watch'
]);

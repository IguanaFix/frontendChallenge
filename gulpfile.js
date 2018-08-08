var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var del = require('del');
var gulpSequence = require('gulp-sequence')
var browserSync = require('browser-sync').create()

gulp.task('styles', function () {
   return gulp.src('source/scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('public/assets/css'));
});

gulp.task('images', function () {
   return gulp.src('source/img/**')
   .pipe(gulp.dest('public/assets/img'));
});

gulp.task('scripts', function () {
    return gulp.src('source/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('html', function() {
   return gulp.src('source/*.html')
   .pipe(gulp.dest('public'));
});

gulp.task('clean:all', function() {
	return del(['public/assets/**', 'public/*.html']).then(paths => {
    	console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});

gulp.task('build', gulpSequence('clean:all', 'styles', 'scripts', 'images', 'html'));

gulp.task('server',['build'], function() {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
    
    gulp.watch('source/scss/*.scss', ['styles']);
    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("source/js/*.js",['scripts'], browserSync.reload);
});

gulp.task('default', ['server']);

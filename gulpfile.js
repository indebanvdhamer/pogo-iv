var gulp = require('gulp'),
    browserify = require('browserify'),
    // prefix = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream');

var config = {
	js: {watch: './frontend/src/**/*.js', src: './frontend/src/app.js'},
	css: {src: './frontend/src/**/*.css'},
	index: {src: './frontend/src/index.html'},
	dist: './frontend/dist'
}

gulp.task('js', function() {
	return browserify(config.js.src)
		.bundle()
		.pipe(source('app.bundle.js'))
		.pipe(gulp.dest(config.dist));
});

gulp.task('css', function() {
	gulp.src(config.css.src)
		.pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('index', function() {
	gulp.src(config.index.src)
		.pipe(gulp.dest(config.dist));
});

gulp.task('default', ['js', 'css', 'index'], function() {
	gulp.watch(config.js.watch, ['js']);
	gulp.watch(config.css.src, ['css']);
	gulp.watch(config.index.src, ['index']);
});
var gulp 			= require('gulp'),
    browserify 		= require('browserify'),
    source 			= require('vinyl-source-stream'),
    templateCache 	= require('gulp-angular-templatecache'),
	gulp         	= require('gulp'),
	gulpif       	= require('gulp-if'),
	gutil        	= require('gulp-util'),
	watchify     	= require('watchify'),
	browserify   	= require('browserify'),
	uglify       	= require('gulp-uglify'),
	handleErrors 	= require('./gulp/handleErrors'),
	ngAnnotate   	= require('browserify-ngannotate'),
	changed      	= require('gulp-changed');

var config = {
	js: {
		watch: ['./frontend/src/**/*.js', './frontend/temp/**/*.js'],
		src: './frontend/src/app.js'
	},
	css: {
		src: './frontend/src/css/**/*.css'
	},
	fa: {
		src: './frontend/src/fontawesome/**/*'
	},
	index: {
		src: './frontend/src/index.html'
	},
	assets: {
		src: './frontend/src/img/**/*'
	},
	templates: {
		src: './frontend/src/**/*.html'
	},
	dist: './frontend/dist'
};

function buildScript(src, file, cb) {

   var bundler = browserify({
       entries: src,
       debug: false,
       cache: {},
       packageCache: {},
       fullPaths: false
   }, watchify.args);

   bundler = watchify(bundler);
   bundler.on('update', function() {
       rebundle(false);
   });

   var transforms = [
       ngAnnotate,
       'brfs',
       'bulkify',
   ];

   transforms.forEach(function(transform) {
       bundler.transform(transform);
   });

   function rebundle(trigger) {
       var stream = bundler.bundle();
       gutil.log('Rebundling...');
       return stream.on('error', handleErrors)
           .pipe(source(file))
           // .pipe(changed(config.dist + '/js'))
           .pipe(gulp.dest(config.dist + '/js'))
           .on('end', function() {
               gutil.log('Rebundling', '\033[32m', 'finished', '\033[0m', '');
               if(trigger) cb();
           });
   }

   return rebundle(true);

}

gulp.task('js', function(cb) {
	buildScript(config.js.src, 'app.bundle.js', cb)
	// return browserify(config.js.src)
	// 	.bundle()
	// 	.pipe(source('app.bundle.js'))
	// 	.pipe(gulp.dest(config.dist));
});

gulp.task('css', function() {
	gulp.src(config.css.src)
		.pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('fa', function() {
	gulp.src(config.fa.src)
		.pipe(gulp.dest(config.dist + '/fontawesome'));
});

gulp.task('index', function() {
	gulp.src(config.index.src)
		.pipe(gulp.dest(config.dist));
});

gulp.task('templates', function() {
	return gulp.src(config.templates.src)
		.pipe(templateCache('templates.js',{
			standalone: true,
			module: 'iv.templates',
			transformUrl: function(url){
				var idx = url.replace(/\\/g, '/').lastIndexOf('/');
				url = url.substr(idx + 1);
				return url;
			}
		}))
		.pipe(gulp.dest('./frontend/temp'));
});
gulp.task('assets', function() {
	gulp.src(config.assets.src)
		.pipe(gulp.dest(config.dist + '/img'));
});

gulp.task('default', ['js', 'css', 'index', 'assets', 'fa', 'templates'], function() {
	// gulp.watch(config.js.watch, ['js']);
	gulp.watch(config.css.src, ['css']);
	gulp.watch(config.index.src, ['index']);
	gulp.watch(config.fa.src, ['fa']);
	gulp.watch(config.templates.src, ['templates']);
	gulp.watch(config.assets.src, ['assets']);
});
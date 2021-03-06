var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	express = require('express'),
	app = express(),
	gutil = require('gulp-util'),
	path = require('path'),
	data = require('gulp-data');

	var http = require('http');
	var server = http.createServer(app);


app.use(express.static(path.resolve('./build' )));

app.listen('9000', function() {
	gutil.log('listinging on', '9000');
})


/*--------------------------------------
Convert JADE to HTML task 
---------------------------------------*/

gulp.task('html',function() {
	gulp.src('jade/index.jade')
	.pipe(data(function(file) {
		return require('./data.json')
	}))
	.pipe(jade({
			pretty:true 
		}))
	.pipe(gulp.dest('build'))
	.pipe(livereload())
});

/*--------------------------------------
Convert saas to css task 
---------------------------------------*/

gulp.task('css',function() {
	gulp.src(['css/*.css','sass/*.scss'])
		.pipe(sass().on('error',sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(livereload())
});

/*--------------------------------------
Convert Image tasks
---------------------------------------*/

gulp.task('images',function() {
	gulp.src('images/*')
		.pipe(gulp.dest('build/images'))
		.pipe(livereload())
})

/*--------------------------------------
Convert JS task 
---------------------------------------*/


gulp.task('js',function() {
	gulp.src('js/**')
		.pipe(gulp.dest('build/js'))
		.pipe(livereload())
})


/*--------------------------------------
Watch command
---------------------------------------*/

gulp.task('watch', ['build'], function() {

	livereload.listen();

	gulp.watch('jade/**/*.jade',['html']);
	gulp.watch('sass/*.scss',['css']);
	gulp.watch('images/*',['images']);
})

gulp.task('build',['html','css','images','js']);
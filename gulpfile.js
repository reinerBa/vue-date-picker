var gulp = require('gulp');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var rename = require("gulp-rename");
var extract = require("gulp-html-extract");
var babel = require('gulp-babel');
var jshint = require("gulp-jshint");
var fs = require('fs')


gulp.task('default',function(){
	var template = fs.readFileSync('src/es5/vue-date-picker.html', 'utf8');
	template = template.replace(/'/g,"\\\'").replace(/[\t\n\r]+/g,' ').replace(/\s+/g,' ');

	gulp.src('./src/es5/vue-date-picker.js')
		.pipe(replace(/(-@templateString@-)+/, template))
		.pipe(gulp.dest('./dist/'))
//		.pipe(uglify({preserveComments: 'license'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/'));
		
	gulp.src('./src/es5/vue-date-picker.css')
		.pipe(gulp.dest('./dist/'))

});

/*
gulp.task("jshint:html", function () {
  gulp
*///   .src("site/**/*.html")
/*    .pipe(extract({
      sel: "script, code.javascript"
    }))
	.pipe(babel({
		presets: ['es2015']
	}))

    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});
*/

/*
gulp.task('default', () => {
    return gulp.src('src/app.js')
	.pipe(babel({
			presets: ['es2015']
	}))
    .pipe(gulp.dest('dist'));
});
*/
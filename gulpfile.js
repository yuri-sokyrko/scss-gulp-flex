var gulp =         require('gulp'),
	scss =         require('gulp-sass'),
	browserSync =  require('browser-sync'),
	concat =       require('gulp-concat'),
	uglify =       require('gulp-uglifyjs'),
	cssnano =      require('gulp-cssnano'),
	rename =       require('gulp-rename'),
	del =          require('del'),
	imagemin =     require('gulp-imagemin'),
	pngquant =     require('imagemin-pngquant'),
	cache =        require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps =   require('gulp-sourcemaps'),
	rigger =       require('gulp-rigger'),
	notify =       require('gulp-notify'),
	watch =        require('gulp-watch'),
	babel =        require("gulp-babel"),
	htmlmin =      require("gulp-htmlmin");

gulp.task('scss', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe( scss().on( 'error', notify.onError(
			{
				sound: false,
		        message: "<%= error.message %>",
		        title  : "Sass Error!"
		    }))
		)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest('src/tmp/css'))
		.pipe( notify({
				sound: false,
				message: 'SCSS - Good Job!',
			}
		))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html-php', function () {
    gulp.src(['src/*.html', 'src/*.php'])
        .pipe(rigger())
        .pipe(gulp.dest('src/tmp'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src/tmp'
		},
		notify: true
	});
});

gulp.task('scripts', function() {
	return gulp.src([
			'./src/libs/jquery/dist/jquery.min.js',
			'./src/libs/jquery-migrate/jquery-migrate.js',
			'./src/js/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest('./src/tmp/js'));
});

// gulp.task('css-libs', ['scss'], function() {
// 	return gulp.src('src/tmp/css/libs.css')
// 		.pipe(cssnano())
// 		.pipe(rename({suffix: '.min'}))
// 		.pipe(gulp.dest('src/tmp/css'));
// });

gulp.task('fonts-images', function() {
	var devImg = gulp.src('src/img/**/*')
	.pipe(gulp.dest('src/tmp/img'));

	var devFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('src/tmp/fonts'));
});

gulp.task('clean-dev', function() {
	return del.sync('src/tmp');
});

gulp.task('watch', ['clean-dev', 'fonts-images', 'browser-sync', 'html-php', 'scss', 'scripts'], function() {
	watch('src/scss/**/*.scss', function(event, cb) {
		 setTimeout(function() {gulp.start('scss')}, 500);
	});
	watch(['src/templates/**/*.html', 'src/templates/**/*.php'], function(event, cb) {
		 gulp.start('html-php');
	});
	watch(['src/*.html', 'src/*.php'], function(event, cb) {
		 gulp.start('html-php');
	});
	watch('src/js/*.js', function(event, cb) {
		 gulp.start('scripts');
	}).on('change' , browserSync.reload);

	watch(['src/img/**/*', 'src/fonts/**/'], function(event, cb) {
		 setTimeout(function() {gulp.start('fonts-images')}, 500);
	});
});

gulp.task('clean-dist', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			optimizationLevel: 3,
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('dist', ['clean-dev', 'clean-dist', 'html-php', 'scss', 'scripts', 'img'], function() {
	var distCss = gulp.src([
			'src/tmp/css/*.css',
		])
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'));

	var distFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var distJs = gulp.src('src/tmp/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));

	var distHtml = gulp.src('src/tmp/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		preserveLineBreaks: true,
		removeComments: true,
	}))
	.pipe(gulp.dest('dist'));

	var distPhp = gulp.src('src/tmp/*.php')
	.pipe(gulp.dest('dist'));
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
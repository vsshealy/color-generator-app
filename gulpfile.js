/**
 * gulpfile.js
 * @package color-generator-app
 * @author Scott Shealy
 * @version 1.0.0 (2024.02.05)
 * @copyright 2024 (2024.02.05)
**/

// PLUGINS
    const
        gulp = require('gulp'),
        sass = require('gulp-dart-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        mediaqueries = require('gulp-group-css-media-queries'),
        minifycss = require('gulp-clean-css'),
        plumber = require('gulp-plumber'),
        rename = require('gulp-rename'),
        sourcemaps = require('gulp-sourcemaps'),
        concat = require('gulp-concat'),
        minifyjs = require('gulp-terser')
    ;

// FILE PATHS
    var paths = {
        root: '.',

        sass: {
            src: './sass/style.scss',
            dir: './sass/**/**/*.scss',
            dest: '.'
        }
    }

// TASK | CSS
    function compileCSS() {
        return gulp
            .src(paths.sass.src, {allowEmpty: true})
            .pipe(plumber())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(autoprefixer('last 4 versions'))
            .pipe(sourcemaps.write())
            .pipe(mediaqueries())
            .pipe(gulp.dest(paths.sass.dest))

            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest(paths.sass.dest))
    }

// TASK | WATCHFILES
    function watchFiles() {
        gulp.watch(paths.sass.dir, compileCSS)
    }

// EXECUTE TASKS
    gulp.task('build', compileCSS);
    gulp.task('default', gulp.series('build', watchFiles));
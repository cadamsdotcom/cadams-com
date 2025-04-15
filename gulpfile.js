import gulp from 'gulp';

// gulp plugins and utils
import gutil from 'gulp-util';
import livereload from 'gulp-livereload';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import { default as zip } from 'gulp-zip';

// postcss plugins
import autoprefixer from 'autoprefixer';
import colorFunction from 'postcss-color-function';
import cssnano from 'cssnano';
import customProperties from 'postcss-custom-properties';
import easyimport from 'postcss-easy-import';

const swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

const nodemonServerInit = function () {
    livereload.listen(1234);
};

function css() {
    const processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer(),
        cssnano()
    ];

    return gulp.src('assets/css/*.css')
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/built/'))
        .pipe(livereload());
}

function watch() {
    gulp.watch('assets/css/**', css);
}

async function zipTask() {
    const targetDir = 'dist/';
    const pkg = await import('./package.json', { assert: { type: 'json' } });
    const themeName = pkg.default.name;
    const filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
}

function build(cb) {
    nodemonServerInit();
    cb();
}

const buildTask = gulp.series(css, build);
const zipBuild = gulp.series(css, zipTask);

export const defaultTask = gulp.series(buildTask, watch);
export { css, watch, zipBuild as zip };

// Set the default task
export default defaultTask;

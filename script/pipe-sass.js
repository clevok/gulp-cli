// @ts-check
const gulp = require('gulp');
const sass = require('gulp-sass');

// @ts-ignore
sass.compiler = require('sass');

/**
 * pipeSass
 * @param {{entry: string|string[], out: string}} params - 来源
 */
exports.pipeSass = function (params) {
    console.log('[更新]', params.entry);
    return gulp
        .src(params.entry)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(params.out));
};

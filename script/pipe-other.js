// @ts-check
const gulp = require('gulp');

/**
 * taskCopy
 * @param {{entry: string|string[], out: string, params?: any}} params - 来源
 */
exports.pipeOther = function (params) {
    console.log('[更新]', params.entry);
    return gulp
        .src(params.entry, params.params || {})
        .pipe(gulp.dest(params.out));
};

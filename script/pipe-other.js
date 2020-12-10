// @ts-check
const gulp = require('gulp');

/**
 * taskCopy
 * @param {{entry: string|string[], out: string}} params - 来源
 */
exports.pipeOther = function (params) {
    return gulp.src(params.entry).pipe(gulp.dest(params.out));
};

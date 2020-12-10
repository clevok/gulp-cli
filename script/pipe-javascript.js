// @ts-check
const gulp = require('gulp');
const gulp_babel = require('gulp-babel');

/**
 * taskJavascript
 * @param {{src: string|string[], out: string}} params - 来源
 * @param {{'preset-env': any}} config - 配置
 */
exports.pipeJavascript = function (
    params,
    config = {
        // target不能设置es几, 不设置target默认兼容es5
        // https://babeljs.io/docs/en/babel-preset-env
        'preset-env': {
            target: {
                electron: '11.0.3',
            },
        },
    },
) {
    return gulp
        .src(params.src)
        .pipe(
            gulp_babel({
                presets: ['@babel/preset-env'],
            }),
        )
        .pipe(gulp.dest(params.out));
};

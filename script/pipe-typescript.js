// @ts-check
const gulp = require('gulp');
const gulp_typescript = require('gulp-typescript');
const gulp_plumber = require('gulp-plumber');

/**
 * taskTypescript
 * @param {{entry: string|string[], out: string, params?: any}} params - 来源
 * @param {{[key: string]: any}} config - 配置
 */
exports.pipeTypescript = function (
    params,
    config = {
        target: 'ES2017',
        module: 'commonjs',
    },
) {
    console.log('[更新]', params.entry);
    return gulp
        .src(params.entry, params.params || {})
        .pipe(gulp_plumber())
        .pipe(
            gulp_typescript({
                ...config,
                declaration: true,
                removeComments: true,
                emitDecoratorMetadata: true,
                allowSyntheticDefaultImports: true,
                incremental: true,

                noImplicitAny: false,
                experimentalDecorators: true,
                noEmitOnError: true,
                allowJs: true,
                isolatedModules: true,
            }),
        )
        .pipe(gulp.dest(params.out));
};

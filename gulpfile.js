// @ts-check
const { watch } = require('./script/util-watch');
const { pipeTypescript } = require('./script/pipe-typescript');
const { pipeSass } = require('./script/pipe-sass');
const { pipeOther } = require('./script/pipe-other');
const { parallel, series } = require('gulp');

const Config = {
    entry: 'src',
    out: 'dist',
    babel: {
        ts: {
            target: 'ES2017',
            module: 'commonjs',
        },
        js: {
            'preset-env': {
                target: {
                    electron: '11.0.3',
                },
            },
        },
    },
};

/**
 * @type {{[key: string]: (config: {entry: string|string[], out: string}) => () => any}}
 */
const Rules = {
    '.js': (params) => () =>
        pipeTypescript(
            {
                entry: params.entry,
                out: params.out,
            },
            Config.babel.ts,
        ),
    '.ts': (params) => () =>
        pipeTypescript(
            {
                entry: params.entry,
                out: params.out,
            },
            Config.babel.ts,
        ),
    '.scss': (params) => () =>
        pipeSass({
            entry: params.entry,
            out: params.out,
        }),
    default: (params) => () =>
        pipeOther({
            entry: params.entry,
            out: Config.out,
        }),
};

function taskDefault() {
    return [
        Rules['.js']({
            entry: [`${Config.entry}/**/*.js`],
            out: Config.out,
        }),
        Rules['.ts']({
            entry: [`${Config.entry}/**/*.ts`],
            out: Config.out,
        }),
        Rules['.scss']({
            // 必须得先定义取全部, 然后在反选不要ts,js
            entry: [`${Config.entry}/**/*.scss`],
            out: Config.out,
        }),
        Rules['default']({
            // 必须得先定义取全部, 然后在反选不要ts,js
            entry: [
                `${Config.entry}/**/*`,
                `!${Config.entry}/**/{*.ts|*.js|*.sass}`,
            ],
            out: Config.out,
        }),
    ];
}

function taskWatch() {
    /**
     * @param {string} file - .js
     */
    return watch(
        {
            entry: [`${Config.entry}/**/*`],
        },
        (event) => {
            const rule = Rules[event.extname] || Rules['default'];

            switch (event.type) {
                case 'add':
                case 'change':
                    rule({
                        entry: event.url,
                        out: event.dirname.replace(Config.entry, Config.out),
                    })();
                    break;

                default:
                    break;
            }
        },
    );
}

exports.default = parallel(taskDefault());
exports.watch = series(exports.default, taskWatch);

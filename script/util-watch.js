// @ts-check
const path = require('path');
const { watch } = require('gulp');

/**
 * 监听
 * watch((event) => {
 * event.type // 类型 add
 * event.url // 路径
 * event.extname // 扩展名
 * event.dirname // 目录名 (目录名+文件名 = 路径)
 * })
 * @param {{entry: string | string[]}} params
 * @param {(params: {type: string, url: string, dirname: string, extname: string}) => void} callback
 */

exports.watch = function (params, callback = () => {}) {
    const getUrl = (url) => path.normalize(url).replace('\\', '/');
    /**
     *
     * @param {string} url
     * @param {string} type
     */
    const getCallbackResult = (url, type) => {
        return {
            type,
            url,
            extname: path.extname(url),
            dirname: path.dirname(url),
        };
    };

    return watch(params.entry, {
        delay: 300,
    })
        .on('add', (url) => {
            callback(getCallbackResult(getUrl(url), 'add'));
        })
        .on('change', (url) => {
            callback(getCallbackResult(getUrl(url), 'change'));
        });
};

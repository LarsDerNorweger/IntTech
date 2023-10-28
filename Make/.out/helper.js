"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileWatcher = exports.getAbsoluteOrResolve = exports.cleanUp = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function cleanUp(directory) {
    if (!(0, path_1.isAbsolute)(directory))
        throw Error("Only Absolut path could be processed");
    if ((0, fs_1.existsSync)(directory))
        (0, fs_1.rmSync)(directory, { recursive: true });
    (0, fs_1.mkdirSync)(directory);
}
exports.cleanUp = cleanUp;
function getAbsoluteOrResolve(base, path) {
    return (0, path_1.isAbsolute)(path) ? path : (0, path_1.join)(base, path);
}
exports.getAbsoluteOrResolve = getAbsoluteOrResolve;
function fileWatcher(path, handleChange) {
    if (!(0, fs_1.statSync)(path).isDirectory())
        return;
    console.log('WATCH DIRECTORY' + path);
    let last = '';
    let timer = null;
    (0, fs_1.watch)(path, { recursive: process.platform == 'win32' }, (e, f) => handler(e, f ?? ''));
    if (process.platform == 'win32')
        return;
    for (let i of (0, fs_1.readdirSync)(path))
        fileWatcher((0, path_1.join)(path, i), handleChange);
    function handler(type, filename) {
        if (last != filename || timer == null) {
            if (timer)
                clearTimeout(timer);
            handleChange(type, filename);
            timer = setTimeout(() => { timer = null; }, 50);
            last = filename;
        }
    }
}
exports.fileWatcher = fileWatcher;

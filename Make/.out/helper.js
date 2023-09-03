"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsoluteOrResolve = exports.cleanUp = void 0;
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

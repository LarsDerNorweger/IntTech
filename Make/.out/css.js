"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSass = void 0;
const sass_1 = require("sass");
const path_1 = require("path");
const helper_1 = require("./helper");
const fs_1 = require("fs");
function compileSass(base, opt, outDir, debug) {
    console.log("Process Sass");
    let inp = (0, helper_1.getAbsoluteOrResolve)(base, opt.sass);
    let out = (0, helper_1.getAbsoluteOrResolve)(base, outDir);
    let n = (0, path_1.basename)(inp).replace('.sass', '.css');
    let res = (0, sass_1.compile)(inp, { style: 'compressed', sourceMap: debug });
    if (!res.sourceMap) {
        writeResult(out, res.css, n);
        return;
    }
    let map = n + '.map';
    let css = res.css;
    css += "/*# sourceMappingURL=";
    css += n;
    css += '*/';
    writeResult(out, css, n);
    writeResult(out, JSON.stringify(res.sourceMap), map);
}
exports.compileSass = compileSass;
function writeResult(base, result, file) {
    (0, fs_1.writeFileSync)((0, helper_1.getAbsoluteOrResolve)(base, file), result);
}

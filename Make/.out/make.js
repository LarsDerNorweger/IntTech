"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path_1 = require("path");
const ts_1 = require("./ts");
const js_1 = require("./js");
const helper_1 = require("./helper");
const fs_1 = require("fs");
const css_1 = require("./css");
async function run(Options, base) {
    checkOptions(Options);
    let tsconfig = (0, ts_1.readTsConfig)(base, Options.tsconfig);
    if (!tsconfig.outDir)
        throw Error('Need tsconfig.outDir to Process Files');
    cleanUpWorkingSpace(base, tsconfig);
    if (Options.typescript)
        await processJavascript(base, Options, tsconfig);
    if (Options.sass)
        processCss(base, Options, tsconfig);
    if (process.argv[2] == '--watch') {
        if (Options.sass)
            (0, helper_1.fileWatcher)((0, path_1.dirname)((0, path_1.join)(base, Options.sass)), (_, f) => {
                console.log('Sass change: ' + f);
                processCss(base, Options, tsconfig);
            });
        if (Options.typescript)
            (0, helper_1.fileWatcher)((0, path_1.dirname)((0, path_1.join)(base, Options.typescript)), (_, f) => {
                console.log('Typescript change: ' + f);
                processJavascript(base, Options, tsconfig);
            });
    }
}
exports.run = run;
async function processCss(base, Options, tsconfig) {
    if (!tsconfig.outDir)
        throw Error('Need tsconfig.outDir to Process Css');
    (0, css_1.compileSass)(base, Options, tsconfig.outDir, tsconfig.sourceMap);
}
function cleanUpWorkingSpace(base, tsconfig) {
    if (!tsconfig.outDir)
        throw Error("Need tsconfig.outDir to cleanUp");
    (0, helper_1.cleanUp)((0, helper_1.getAbsoluteOrResolve)(base, tsconfig.outDir));
}
async function processJavascript(base, Options, tsconfig) {
    console.log("Process Javascript");
    let n = (0, path_1.basename)(Options.typescript);
    if (Options.minify)
        await packJS(base, tsconfig, Options, n);
    else
        (0, ts_1.compileTypescript)(base, Options, tsconfig);
}
async function packJS(base, tsconfig, Options, FileName) {
    if (!tsconfig.outDir)
        throw Error('Need Outdir to Process Files');
    let tmp = '~tmp';
    let out = tsconfig.outDir;
    tsconfig.outDir = tmp;
    try {
        (0, ts_1.compileTypescript)(base, Options, tsconfig);
        await (0, js_1.rollupFiles)(base, (0, path_1.join)(tmp, FileName), (0, path_1.join)(out, FileName));
        if (!tsconfig.declaration)
            return;
        let n = FileName.replace('.ts', '.d.ts');
        (0, js_1.rollupFiles)(base, (0, path_1.join)(tmp, n), (0, path_1.join)(out, n));
    }
    catch (e) {
        throw e;
    }
    finally {
        (0, fs_1.rmSync)(tmp, { recursive: true });
        tsconfig.outDir = out;
    }
}
function checkOptions(opt) {
    if (!opt.tsconfig)
        throw Error("TsConfig is missing");
}

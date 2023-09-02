"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path_1 = require("path");
const ts_1 = require("./ts");
const js_1 = require("./js");
const helper_1 = require("./helper");
const fs_1 = require("fs");
async function run(Options, base) {
    checkOptions(Options);
    let tsconfig = (0, ts_1.readTsConfig)((0, path_1.join)(base, Options.tsconfig));
    if (!tsconfig.outDir)
        throw Error('Need Outdir to Process Files');
    let n = (0, path_1.basename)(Options.typescript);
    (0, helper_1.cleanUp)((0, path_1.join)(base, tsconfig.outDir));
    if (!Options.singleFile) {
        (0, ts_1.compileTypescript)(base, Options, tsconfig);
        return;
    }
    let tmp = '~tmp';
    console.log(base);
    let out = tsconfig.outDir;
    tsconfig.outDir = tmp;
    try {
        (0, ts_1.compileTypescript)(base, Options, tsconfig);
        await (0, js_1.rollupFiles)((0, path_1.join)(base, tmp, n), (0, path_1.join)(base, out, n), tsconfig.declaration ? 'esm' : 'amd');
        if (tsconfig.declaration) {
            n = n.replace('.ts', '.d.ts');
            (0, js_1.rollupFiles)((0, path_1.join)(base, tmp, n), (0, path_1.join)(base, out, n), tsconfig.types ? 'esm' : 'amd');
        }
    }
    catch (e) {
        console.error(e);
    }
    (0, fs_1.rmSync)(tmp, { recursive: true });
}
exports.run = run;
function checkOptions(opt) {
    if (opt.minify)
        throw Error("Cant minify a module");
    if (!opt.tsconfig)
        throw Error("TsConfig is missing");
}

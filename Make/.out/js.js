"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollupFiles = void 0;
const rollup_1 = require("rollup");
const dts = require('rollup-plugin-dts');
const helper_1 = require("./helper");
async function rollupFiles(base, inpFile, outFile) {
    let out = (0, helper_1.getAbsoluteOrResolve)(base, outFile);
    let inp = (0, helper_1.getAbsoluteOrResolve)(base, inpFile);
    if (!inp.endsWith('.d.ts')) {
        inp = inp.replace('.ts', '.js');
        out = out.replace('.ts', '.js');
        let bundle = await (0, rollup_1.rollup)({ input: inp });
        return await bundle.write({ file: out, format: 'esm' });
    }
    if (!out.endsWith('.d.ts')) {
        out = out.replace('.ts', '.d.ts');
        out = out.replace('.js', '.d.ts');
    }
    let bundle = await (0, rollup_1.rollup)({ input: inp, plugins: [dts.default()] });
    await bundle.write({ file: out, format: 'esm' });
}
exports.rollupFiles = rollupFiles;

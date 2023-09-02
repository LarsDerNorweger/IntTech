"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollupFiles = void 0;
const rollup_1 = require("rollup");
const dts = require('rollup-plugin-dts');
const path = require("path");
async function rollupFiles(inputFile, outFile, format) {
    if (!path.isAbsolute(inputFile) || !path.isAbsolute(outFile))
        throw Error('Can only Procesess absolute Paths');
    if (!inputFile.endsWith('.d.ts')) {
        inputFile = inputFile.replace('.ts', '.js');
        outFile = outFile.replace('.ts', '.js');
        let bundle = await (0, rollup_1.rollup)({ input: inputFile });
        return await bundle.write({ file: outFile, format: 'esm' });
    }
    if (!outFile.endsWith('.d.ts')) {
        outFile = outFile.replace('.ts', '.d.ts');
        outFile = outFile.replace('.js', '.d.ts');
    }
    let bundle = await (0, rollup_1.rollup)({ input: inputFile, plugins: [dts.default()] });
    await bundle.write({ file: outFile, format: 'esm' });
}
exports.rollupFiles = rollupFiles;

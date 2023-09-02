/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { rollup, ModuleFormat } from "rollup"
const dts = require('rollup-plugin-dts');
import * as path from "path"

export async function rollupFiles(inputFile: string, outFile: string, format: ModuleFormat) {
    if (!path.isAbsolute(inputFile) || !path.isAbsolute(outFile))
        throw Error('Can only Procesess absolute Paths')
    if (!inputFile.endsWith('.d.ts')) {
        inputFile = inputFile.replace('.ts', '.js')
        outFile = outFile.replace('.ts', '.js')
        let bundle = await rollup({ input: inputFile })
        return await bundle.write({ file: outFile, format: 'esm' })
    }
    if(!outFile.endsWith('.d.ts')){
        outFile = outFile.replace('.ts', '.d.ts')
        outFile = outFile.replace('.js', '.d.ts')
    }
    let bundle = await rollup({ input: inputFile ,plugins:[dts.default()]})
    await bundle.write({ file: outFile, format: 'esm' })
}
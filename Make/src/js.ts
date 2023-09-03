/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { rollup, ModuleFormat } from "rollup"
const dts = require('rollup-plugin-dts');
import { getAbsoluteOrResolve } from "./helper";

export async function rollupFiles(base:string,inpFile: string, outFile: string) {
    let out = getAbsoluteOrResolve(base,outFile)
    let inp = getAbsoluteOrResolve(base,inpFile)

    if (!inp.endsWith('.d.ts')) {
        inp = inp.replace('.ts', '.js')
        out = out.replace('.ts', '.js')
        let bundle = await rollup({ input: inp })
        return await bundle.write({ file: out, format: 'esm' })
    }

    if (!out.endsWith('.d.ts')) {
        out = out.replace('.ts', '.d.ts')
        out = out.replace('.js', '.d.ts')
    }

    let bundle = await rollup({ input: inp, plugins: [dts.default()] })
    await bundle.write({ file: out, format: 'esm' })
}
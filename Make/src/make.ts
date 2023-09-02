/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Options } from "./interfaces";
import { basename, join } from 'path'
import { compileTypescript, readTsConfig } from "./ts";
import { rollupFiles } from "./js";
import { cleanUp } from "./helper";
import { rmSync } from "fs";

export async function run(Options: Options, base: string) {
    checkOptions(Options)
    let tsconfig = readTsConfig(join(base, Options.tsconfig))
    if (!tsconfig.outDir)
        throw Error('Need Outdir to Process Files')

    let n = basename(Options.typescript)
    cleanUp(join(base, tsconfig.outDir))
    if (!Options.singleFile) {
        compileTypescript(base, Options, tsconfig)
        return
    }
    let tmp = '~tmp'
    console.log(base)
    let out = tsconfig.outDir
    tsconfig.outDir = tmp

    try {
        compileTypescript(base, Options, tsconfig)

        await rollupFiles(
            join(base, tmp, n),
            join(base, out, n),
            tsconfig.declaration ? 'esm' : 'amd'
        )
        if (tsconfig.declaration) {
            n = n.replace('.ts', '.d.ts');
            rollupFiles(
                join(base, tmp, n),
                join(base, out, n),
                tsconfig.types ? 'esm' : 'amd'
            )
        }
    }
    catch (e) {
        console.error(e)
    }
    rmSync(tmp, { recursive: true })
}

function checkOptions(opt: Options) {
    if (opt.minify)
        throw Error("Cant minify a module")
    if (!opt.tsconfig)
        throw Error("TsConfig is missing")

}
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
import * as ts from "typescript";
import { rmSync } from "fs";

export async function run(Options: Options, base: string) {
    checkOptions(Options)
    if (Options.tsconfig && Options.typescript)
        await processJavascript(base, Options);
}

async function processJavascript(base: string, Options: Options) {
    console.log("Process Javascript")
    let tsconfig = readTsConfig(join(base, Options.tsconfig));
    if (!tsconfig.outDir)
        throw Error('Need Outdir to Process Files');
    let n = basename(Options.typescript);
    cleanUp(join(base, tsconfig.outDir));
    if (Options.minify)
        await packJS(base, tsconfig, Options, n);
    else compileTypescript(base, Options, tsconfig);
}

async function packJS(base: string, tsconfig: ts.CompilerOptions, Options: Options, FileName: string) {
    if (!tsconfig.outDir)
        throw Error('Need Outdir to Process Files');
    let tmp = '~tmp';
    let out = tsconfig.outDir;
    tsconfig.outDir = tmp;

    try {
        compileTypescript(base, Options, tsconfig);

        await rollupFiles(
            join(base, tmp, FileName),
            join(base, out, FileName),
            tsconfig.declaration ? 'esm' : 'amd'
        );
        if (!tsconfig.declaration)
            return

        let n = FileName.replace('.ts', '.d.ts');
        rollupFiles(
            join(base, tmp, n),
            join(base, out, n),
            tsconfig.types ? 'esm' : 'amd'
        );
    }
    catch (e) {
        throw e
    }
    finally {
        rmSync(tmp, { recursive: true });
    }
}

function checkOptions(opt: Options) {
    if (!opt.tsconfig)
        throw Error("TsConfig is missing")
}
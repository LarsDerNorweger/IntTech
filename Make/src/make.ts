/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { Options } from "./interfaces";
import { basename, join } from 'path'
import { compileTypescript, readTsConfig } from "./ts";
import { rollupFiles } from "./js";
import { cleanUp, getAbsoluteOrResolve } from "./helper";
import * as ts from "typescript";
import { rmSync } from "fs";
import { compileSass } from "./css";

export async function run(Options: Options, base: string) {
    checkOptions(Options)
    let tsconfig = readTsConfig(base,Options.tsconfig);
    if (!tsconfig.outDir)
        throw Error('Need tsconfig.outDir to Process Files');

    cleanUpWorkingSpace(base, tsconfig)

    if (Options.typescript)
        await processJavascript(base, Options, tsconfig);
    if (Options.sass)
        processCss(base, Options, tsconfig)
}

async function processCss(base: string, Options: Options, tsconfig: ts.CompilerOptions) {
    if (!tsconfig.outDir)
        throw Error('Need tsconfig.outDir to Process Css');
    compileSass(base, Options, tsconfig.outDir,tsconfig.sourceMap)
}

function cleanUpWorkingSpace(base: string, tsconfig: ts.CompilerOptions) {
    if (!tsconfig.outDir)
        throw Error("Need tsconfig.outDir to cleanUp");

    cleanUp(getAbsoluteOrResolve(base,tsconfig.outDir));
}
async function processJavascript(base: string, Options: Options, tsconfig: ts.CompilerOptions) {
    console.log("Process Javascript")
    let n = basename(Options.typescript);
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
            base,
            join(tmp, FileName),
            join(out, FileName)
        );

        if (!tsconfig.declaration)
            return

        let n = FileName.replace('.ts', '.d.ts');
        rollupFiles(
            base,
            join(tmp, n),
            join(out, n)
        );
    }
    catch (e) {
        throw e
    }
    finally {
        rmSync(tmp, { recursive: true });
        tsconfig.outDir = out
    }
}

function checkOptions(opt: Options) {
    if (!opt.tsconfig)
        throw Error("TsConfig is missing")
}
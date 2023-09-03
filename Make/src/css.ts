/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { compile } from 'sass'
import { Options } from './interfaces'
import { basename, isAbsolute, join } from 'path'
import { getAbsoluteOrResolve } from './helper'
import { writeFileSync } from 'fs'

export {
    compileSass
}

function compileSass(base: string, opt: Options, outDir: string,debug?:boolean) {
    console.log("Process Sass")
    let inp = getAbsoluteOrResolve(base, opt.sass)
    let out = getAbsoluteOrResolve(base, outDir)
    let n = basename(inp).replace('.sass', '.css')
    let res = compile(inp, { style: 'compressed', sourceMap: debug })
    if (!res.sourceMap) {
        writeResult(out, res.css, n)
        return
    }
    let map = n + '.map'
    let css = res.css
    css += "/*# sourceMappingURL="
    css += n
    css += '*/'
    writeResult(out, css, n)
    writeResult(out, JSON.stringify(res.sourceMap), map)
}

function writeResult(base: string, result: string, file: string) {
    writeFileSync(getAbsoluteOrResolve(base, file), result)
}


/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/
import { existsSync, rmSync, mkdirSync } from 'fs'
import { isAbsolute, join } from 'path'

export { cleanUp,getAbsoluteOrResolve }

function cleanUp(directory: string) {
    if (!isAbsolute(directory))
        throw Error("Only Absolut path could be processed")
    if (existsSync(directory))
        rmSync(directory, { recursive: true })
    mkdirSync(directory)
}

function getAbsoluteOrResolve(base: string, path: string) {
    return isAbsolute(path) ? path : join(base, path)
}
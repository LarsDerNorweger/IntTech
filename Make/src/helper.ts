/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/
import {existsSync,rmSync,mkdirSync}from 'fs'
import {isAbsolute}from 'path'

export { cleanUp }

function cleanUp(directory:string){
    if(!isAbsolute(directory))
        throw Error("Only Absolut path could be processed")
    if(existsSync(directory))
        rmSync(directory,{recursive:true})
    mkdirSync(directory)
}
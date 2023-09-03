/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

export {
    Options,
    tsconfig
}

interface Options {
    tsconfig:string,
    typescript:string,
    sass:string,
    minify:boolean,
    singleFile:boolean,
}


interface tsconfig {
    outDir?:string
}

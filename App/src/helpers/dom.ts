/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import { transform } from "typescript"

export{
create
}

function create<K extends keyof HTMLElementTagNameMap>(tagname:K,target?:HTMLElement,text?:string): HTMLElementTagNameMap[K]{
    let res = document.createElement(tagname)
    if(target)
        target.appendChild(res)
    if(text)
        res.innerText = text
    return res
}
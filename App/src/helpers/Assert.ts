/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

export{
equal,
isTrue,
mustFail 
}

function equal(var1:null,var2:null):void
function equal(var1:boolean,var2:boolean):void
function equal(var1:string,var2:string):void
function equal(var1:number,var2:number):void
function equal(var1:any,var2:any):void
{
    if(var1 !== var2)
        throw Error(`Test Failed:\n\t${var1} is not equal ${var2}`)
}

function mustFail(callback:()=>void){
    try{
        callback()
    }
    catch(e){
        return
    }
    throw Error("Test Failed:\n\t Callback didnt failed as expected")
}
function isTrue(value:boolean){
    if(!value)
        throw Error("Test Failed:\n\t Test dintdt return true")
}
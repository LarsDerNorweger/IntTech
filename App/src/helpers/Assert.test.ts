/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

import {test} from 'test'
import {equal, mustFail,isTrue} from './Assert.js'

test('Assert',async t=>{
    await t.test("must Fail",()=>{
      mustFail(()=>{throw Error})  
    })
    await t.test('equal',()=>{
        equal(1,1)
        equal("1","1")
        equal(true,true)
        equal(false,false)
        equal(null,null)
        mustFail(()=>equal(1,2))
    })
    await t.test('is true',()=>{
        isTrue(true)
        mustFail(()=>isTrue(false))
    })
})
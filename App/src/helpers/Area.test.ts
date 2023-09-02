/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/
import { test } from 'test';
import { equal, mustFail, isTrue } from './Assert.js';
import { Area } from './Area.js';
import { Vektor } from './Vektor.js';

test('Area', async t =>
{
    t.test("area", () =>
    {
        let v = Vektor.create(0, 0);
        equal(Area.area(Area.create(v, Vektor.create(1, 1))), 1);
        equal(Area.area(Area.create(v, Vektor.create(0, 1))), 0);
        equal(Area.area(Area.create(v, Vektor.create(0, 0))), 0);
        equal(Area.area(Area.create(v, Vektor.create(-1, 0))), 0);
        equal(Area.area(Area.create(v, Vektor.create(-1, -1))), 1);
        equal(Area.area(Area.create(v, Vektor.create(-1, 1))), 1);
    });
});